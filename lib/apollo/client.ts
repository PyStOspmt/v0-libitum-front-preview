import { REFRESH_TOKEN } from "@/graphql/auth"
import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client"
import { CombinedGraphQLErrors } from "@apollo/client/errors"
import { setContext } from "@apollo/client/link/context"
import { ErrorLink } from "@apollo/client/link/error"
import { Observable } from "@apollo/client/utilities"

import { getFingerprint } from "@/lib/utils/fingerprint"

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:3001/graphql"

let isRefreshing = false
let pendingRequests: Array<() => void> = []

function resolvePending() {
    pendingRequests.forEach((cb) => cb())
    pendingRequests = []
}

const fingerprintLink = setContext(async (_, { headers }) => {
    const fingerprint = await getFingerprint()

    if (!fingerprint) return { headers }

    return {
        headers: {
            ...headers,
            "x-device-fingerprint": fingerprint,
        },
    }
})

const errorLink = new ErrorLink(({ error, operation, forward }) => {
    if (!CombinedGraphQLErrors.is(error)) return

    const isUnauthenticated = error.errors.some(
        (err) => err.extensions?.code === "UNAUTHENTICATED" || err.message?.toLowerCase().includes("unauthorized"),
    )

    if (!isUnauthenticated) return

    const opName = operation.operationName

    if (opName === "RefreshToken" || opName === "Login" || opName === "Register") return

    if (isRefreshing) {
        return new Observable((observer) => {
            pendingRequests.push(() => {
                forward(operation).subscribe(observer)
            })
        })
    }

    isRefreshing = true

    return new Observable((observer) => {
        makeClient()
            .mutate({ mutation: REFRESH_TOKEN })
            .then(() => {
                isRefreshing = false
                resolvePending()
                forward(operation).subscribe(observer)
            })
            .catch(() => {
                isRefreshing = false
                pendingRequests = []
                if (typeof window !== "undefined") {
                    window.location.href = "/login"
                }
                observer.error(new Error("Session expired"))
            })
    })
})

const httpLink = new HttpLink({
    uri: GRAPHQL_URL,
    credentials: "include",
})

export function makeClient() {
    return new ApolloClient({
        link: from([fingerprintLink, errorLink, httpLink]),
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: { fetchPolicy: "cache-and-network" },
            mutate: { fetchPolicy: "no-cache" },
        },
    })
}
