"use client"

import { IS_TUTOR_VERIFIED } from "@/graphql/tutor-profile"
import { useQuery } from "@apollo/client/react"
import type React from "react"

import { TutorVerificationDialog } from "./tutor-verification-dialog"

export default function TutorRootLayoutClient({ children }: { children: React.ReactNode }) {
    const { data, loading, error } = useQuery(IS_TUTOR_VERIFIED, {
        fetchPolicy: "network-only",
    })

    const isTutorVerified = data?.tutorVerified ?? true

    return (
        <>
            {children}
            {!loading && !error && !isTutorVerified && <TutorVerificationDialog isTutorVerified={isTutorVerified} />}
        </>
    )
}
