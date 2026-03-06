import { ApolloClient, ApolloLink, CombinedGraphQLErrors, HttpLink, InMemoryCache, Observable } from "@apollo/client"
import { SetContextLink } from "@apollo/client/link/context"
import { ErrorLink } from "@apollo/client/link/error"
import { cookies } from "next/headers"

const GRAPHQL_URL = `${process.env.NEXT_PUBLIC_API_URL}/graphql` || "http://localhost:3001/graphql"

const fingerprintLink = new SetContextLink(async ({ headers }) => {
    const cookiesStore = await cookies()
    const allCookies = cookiesStore.toString()

    const fingerprint = cookiesStore.get("device-fingerprint")

    if (!fingerprint) return { headers }

    const { value } = fingerprint

    return {
        headers: {
            ...headers,
            cookies: allCookies,
            "x-device-fingerprint": value,
        },
    }
})

const errorLink = new ErrorLink(({ error, operation, forward }) => {
    if (!CombinedGraphQLErrors.is(error)) return

    const isUnauthenticated = error.errors.some(
        (err) => err.extensions?.code === "UNAUTHENTICATED" || err.message?.toLowerCase().includes("unauthorized"),
    )

    if (!isUnauthenticated) return

    const { operationName } = operation

    if (operationName && ["RefreshToken", "Login", "Register"].includes(operationName)) return

    return new Observable((observer) => {
        ;(async () => {
            try {
                const cookieStore = await cookies()
                const allCookies = cookieStore.toString()

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token/refresh`, {
                    method: "POST",
                    headers: {
                        cookies: allCookies,
                    },
                })

                if (!res.ok) throw new Error("Refresh failed")

                forward(operation).subscribe({
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                })
            } catch (err) {
                observer.error(err)
            }
        })()
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
    })
}
