import { ApolloLink, CombinedGraphQLErrors, HttpLink, Observable } from "@apollo/client"
import { ApolloClient, InMemoryCache, SSRMultipartLink } from "@apollo/client-integration-nextjs"
import { SetContextLink } from "@apollo/client/link/context"
import { ErrorLink } from "@apollo/client/link/error"

import { getFingerprint } from "@/lib/utils/fingerprint"

let isRefreshing = false
let pendingRequests: (() => void)[] = []

const resolvePendingRequests = () => {
    pendingRequests.map((callback) => callback())
    pendingRequests = []
}

const GRAPHQL_URL = `${process.env.NEXT_PUBLIC_API_URL}/graphql` || "http://localhost:3001/graphql"

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
    if (!CombinedGraphQLErrors.is(error)) return

    const isUnauthenticated = error.errors.some(
        (err) => err.extensions?.code === "UNAUTHENTICATED" || err.message.toLowerCase().includes("unauthorized"),
    )

    if (
        !isUnauthenticated ||
        (operation.operationName && ["RefreshToken", "Login", "Register"].includes(operation.operationName))
    ) {
        return
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

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token/refresh`, {
            method: "POST",
            credentials: "include",
        })
            .then(() => {
                isRefreshing = false
                retry()
                resolvePendingRequests()
            })
            .catch((err) => {
                isRefreshing = false
                pendingRequests = []
                observer.error(err)
            })
    })
})

export function getApolloClient() {
    const IS_SERVER = typeof window === "undefined"

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: IS_SERVER
            ? ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), fingerprintLink, httpLink])
            : ApolloLink.from([fingerprintLink, errorLink, httpLink]),
    })
}
