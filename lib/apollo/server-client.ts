import { type DocumentNode, print } from "graphql"
import { cookies } from "next/headers"

const GRAPHQL_URL = `${process.env.NEXT_PUBLIC_API_URL}/graphql` || "http://localhost:3001/graphql"

interface GraphQLResponse<T = Record<string, unknown>> {
    data?: T
    errors?: Array<{ message: string; extensions?: Record<string, unknown> }>
}

export async function fetchGraphQL<T = Record<string, unknown>>(
    query: string | DocumentNode,
    variables?: Record<string, unknown>,
): Promise<GraphQLResponse<T>> {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()

    const queryString = typeof query === "string" ? query : print(query)

    const res = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        },
        body: JSON.stringify({ query: queryString, variables }),
        cache: "no-store",
    })

    if (!res.ok) {
        throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}`)
    }

    return res.json() as Promise<GraphQLResponse<T>>
}
