import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { IsTutorVerifiedQuery } from "@/graphql/generated/graphql"
import { IS_TUTOR_VERIFIED } from "@/graphql/tutor-profile"
import { getApolloServerClient } from "@/lib/clients/apollo-server"
import { Verified } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import type React from "react"
import { headers } from "next/headers"
import { TutorVerificationDialog } from "./tutor-verification-dialog"

export const metadata: Metadata = {
    title: "Libitum Education | Кабінет",
    description: "Кабінет спеціаліста. Знайдіть свого ідеального репетитора, психолога чи логопеда. Професійні спеціалісти онлайн та офлайн.",
    generator: "v0.app",
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const apolloClient = await getApolloServerClient()

    let isTutorVerified = false

    try {
        console.log("🔍 [Tutor Layout] Fetching IS_TUTOR_VERIFIED...")
        const response = await apolloClient.query<IsTutorVerifiedQuery>({
            query: IS_TUTOR_VERIFIED,
            errorPolicy: "all"
        })

        console.log("✅ [Tutor Layout] Query response:", JSON.stringify(response, null, 2))

        isTutorVerified = response.data?.tutorVerified || false
        console.log("ℹ️ [Tutor Layout] isTutorVerified:", isTutorVerified)
    } catch (error) {
        console.error("❌ [Tutor Layout] Query error:", error)
    }


    if (!isTutorVerified) {
        return (
            <>
                {children}
                <TutorVerificationDialog isTutorVerified={isTutorVerified} />
            </>
        )
    }

    return children
}