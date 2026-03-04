import { NextResponse } from "next/server"

import { REFRESH_TOKEN } from "@/features/auth/graphql/mutations/refresh-token"

import { getApolloServerClient } from "@/lib/clients/apollo-server"

export async function POST() {
    try {
        const apolloClient = await getApolloServerClient()

        const { data, error } = await apolloClient.mutate({
            mutation: REFRESH_TOKEN,
        })

        if (error) {
            return NextResponse.json({ message: error.message, data: null }, { status: 500 })
        }

        return NextResponse.json({ message: "Refresh token success", data })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message, data: null }, { status: 500 })
        }

        return NextResponse.json({ message: "Unknown error", data: null }, { status: 500 })
    }
}
