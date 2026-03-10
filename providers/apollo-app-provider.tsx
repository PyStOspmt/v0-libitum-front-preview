"use client"

import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs"

import { getApolloClient } from "@/lib/clients/apollo-client"

export function ApolloAppProvider({ children }: { children: React.ReactNode }) {
    return <ApolloNextAppProvider makeClient={getApolloClient}>{children}</ApolloNextAppProvider>
}
