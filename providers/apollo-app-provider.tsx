"use client"

import { ApolloProvider } from "@apollo/client/react"
import { useMemo } from "react"

import { getApolloClient } from "@/lib/clients/apollo-client"

export function ApolloAppProvider({ children }: { children: React.ReactNode }) {
    const client = useMemo(() => getApolloClient(), [])

    return <ApolloProvider client={client}>{children}</ApolloProvider>
}
