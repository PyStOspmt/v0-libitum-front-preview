"use client"

import { ApolloProvider } from "@apollo/client/react"
import { useMemo, type ReactNode } from "react"
import { makeClient } from "./client"

export function ApolloWrapper({ children }: { children: ReactNode }) {
    const client = useMemo(() => makeClient(), [])

    return <ApolloProvider client={client}>{children}</ApolloProvider>
}
