import { ApolloClient, ApolloLink, CombinedGraphQLErrors, HttpLink, InMemoryCache, Observable } from "@apollo/client"
import { SetContextLink } from "@apollo/client/link/context"
import { ErrorLink } from "@apollo/client/link/error"

import { getFingerprint } from "@/lib/utils/fingerprint"

let isRefreshing = false
let pendingRequests: (() => void)[] = []

function resolvePending() {
    pendingRequests.forEach((request) => request())
    pendingRequests = []
}

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:3001/graphql"

const fingerprintLink = new SetContextLink(async ({ headers }) => {
    const fingerprint = await getFingerprint()

    if (!fingerprint) return { headers }

    return {
        headers: {
            ...headers,
            "x-device-fingerprint": fingerprint,
        },
    }
})

const httpLink = new HttpLink({
    uri: GRAPHQL_URL,
    credentials: "include",
})

const errorLink = new ErrorLink(({ error, operation, forward }) => {
    if (!CombinedGraphQLErrors.is(error)) return forward(operation)

    const isUnauthenticated = error.errors.some(
        (err) => err.extensions?.code === "UNAUTHENTICATED" || err.message.toLowerCase().includes("unauthorized"),
    )

    if (!isUnauthenticated || !operation.operationName) return forward(operation)

    if (["RefreshToken", "Login", "Register"].includes(operation.operationName)) {
        return forward(operation)
    }

    return new Observable((observer) => {
        const retry = () => {
            forward(operation).subscribe({
                next: (value) => observer.next(value),
                error: (err) => observer.error(err),
                complete: () => observer.complete(),
            })
        }

        if (isRefreshing) {
            pendingRequests.push(retry)
            return
        }

        isRefreshing = true

        fetch("/api/auth/refresh", {
            method: "POST",
            credentials: "include",
        })
            .then(() => {
                isRefreshing = false
                resolvePending()
                retry()
            })
            .catch((err) => {
                isRefreshing = false
                pendingRequests.forEach((cb) => cb())
                pendingRequests = []
                observer.error(err)
            })
    })
})

export function getApolloClient() {
    return new ApolloClient({
        link: ApolloLink.from([fingerprintLink, errorLink, httpLink]),
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: { fetchPolicy: "cache-and-network" },
            mutate: { fetchPolicy: "no-cache" },
            query: { fetchPolicy: "cache-first" },
        },
    })
}
