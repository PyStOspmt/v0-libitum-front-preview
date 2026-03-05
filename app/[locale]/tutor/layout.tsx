import { IsTutorVerifiedQuery } from "@/graphql/generated/graphql"
import { IS_TUTOR_VERIFIED } from "@/graphql/tutor-profile"
import type { Metadata } from "next"
import type React from "react"

import { getApolloServerClient } from "@/lib/clients/apollo-server"

import { TutorVerificationDialog } from "./tutor-verification-dialog"

export const metadata: Metadata = {
    title: "Libitum Education | Кабінет",
    description: "Кабінет спеціаліста. Професійні спеціалісти онлайн та офлайн.",
}

async function getTutorVerificationStatus(): Promise<boolean> {
    try {
        const apolloClient = await getApolloServerClient()

        const { data } = await apolloClient.query<IsTutorVerifiedQuery>({
            query: IS_TUTOR_VERIFIED,
        })

        if (!data) {
            throw new Error("No data returned from query")
        }

        return data.tutorVerified
    } catch (error) {
        return false
    }
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const isTutorVerified = await getTutorVerificationStatus()

    return (
        <>
            {children}
            {!isTutorVerified && <TutorVerificationDialog isTutorVerified={isTutorVerified} />}
        </>
    )
}
