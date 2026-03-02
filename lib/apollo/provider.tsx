"use client"

import { ApolloProvider } from "@apollo/client/react"
import { type ReactNode, useMemo } from "react"

import { makeClient } from "./client"

export function ApolloWrapper({ children }: { children: ReactNode }) {
    const client = useMemo(() => makeClient(), [])

    return <ApolloProvider client={client}>{children}</ApolloProvider>
}
