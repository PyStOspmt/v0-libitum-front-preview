import { getFingerprint } from "@/lib/fingerprint"
import { REFRESH_TOKEN } from "@/lib/graphql/auth"
import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client"
import { CombinedGraphQLErrors } from "@apollo/client/errors"
import { ErrorLink } from "@apollo/client/link/error"
import { Observable } from "@apollo/client/utilities"

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:3001/graphql"

let isRefreshing = false
let pendingRequests: Array<() => void> = []

function resolvePending() {
    pendingRequests.forEach((cb) => cb())
    pendingRequests = []
}

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
    fetch: async (uri, options) => {
        const fingerprint = await getFingerprint()
        const headers = new Headers(options?.headers)
        headers.set("x-fingerprint", fingerprint)
        return fetch(uri, { ...options, headers })
    },
})

export function makeClient() {
    return new ApolloClient({
        link: from([errorLink, httpLink]),
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: { fetchPolicy: "cache-and-network" },
            mutate: { fetchPolicy: "no-cache" },
        },
    })
}
