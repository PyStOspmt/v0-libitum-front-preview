import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client"
import { registerApolloClient } from "@apollo/client-integration-nextjs"
import { cookies } from "next/headers"

const GRAPHQL_URL = `${process.env.NEXT_PUBLIC_API_URL}/graphql` || "http://localhost:3001/graphql"

const getHttpLink = async () => {
    const cookieStore = await cookies()
    const fingerprint = cookieStore.get("device-fingerprint")

    return new HttpLink({
        uri: GRAPHQL_URL,
        credentials: "include",
        headers: {
            Cookie: cookieStore.toString(),
            ...(fingerprint && { "x-device-fingerprint": fingerprint.value }),
        },
        fetch,
    })
}

export const { getClient, query } = registerApolloClient(async () => {
    const httpLink = await getHttpLink()

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: ApolloLink.from([httpLink]),
    })
})
