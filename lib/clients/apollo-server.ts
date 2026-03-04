import { ApolloClient, ApolloLink, CombinedGraphQLErrors, HttpLink, InMemoryCache } from "@apollo/client"
import { SetContextLink } from "@apollo/client/link/context"
import { ErrorLink } from "@apollo/client/link/error"
import { cookies } from "next/headers"

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:3001/graphql"

const fingerprintLink = new SetContextLink(async ({ headers }) => {
    const cookiesStore = await cookies()

    const fingerprint = cookiesStore.get("device-fingerprint")

    if (!fingerprint) return { headers }

    const { value } = fingerprint

    return {
        headers: {
            ...headers,
            "x-device-fingerprint": value,
        },
    }
})

const errorLink = new ErrorLink(({ error, operation, forward }) => {
    if (!CombinedGraphQLErrors.is(error)) {
        return
    }

    const isUnauthenticated = error.errors.some(
        (err) => err.extensions?.code === "UNAUTHENTICATED" || err.message?.toLowerCase().includes("unauthorized"),
    )

    if (!isUnauthenticated) return

    const { operationName } = operation

    if (operationName === "RefreshToken" || operationName === "Login" || operationName === "Register") return

    fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to refresh token")
            }
            return res.json()
        })
        .then(() => {
            forward(operation)
        })
        .catch(() => {
            forward(operation)
        })
})

const getHttpLink = async () => {
    const cookieStore = await cookies()

    return new HttpLink({
        uri: GRAPHQL_URL,
        credentials: "include",
        headers: {
            Cookie: cookieStore.toString(),
        },
        fetch,
    })
}

export async function getApolloServerClient() {
    const httpLink = await getHttpLink()

    return new ApolloClient({
        link: ApolloLink.from([fingerprintLink, errorLink, httpLink]),
        cache: new InMemoryCache(),
        defaultOptions: {
            query: { fetchPolicy: "cache-first" },
            watchQuery: { fetchPolicy: "cache-and-network" },
            mutate: { fetchPolicy: "no-cache" },
        },
    })
}
