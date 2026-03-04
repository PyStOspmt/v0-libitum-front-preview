"use client"

import { UserRoles } from "@/graphql/generated/graphql"
import { usePathname, useRouter } from "next/navigation"
import type React from "react"
import { useEffect, useMemo } from "react"

import { useAuthContext } from "@/features/auth/context/auth-context"

interface ProtectedRouteProps {
    children: React.ReactNode
    allowedRoles?: UserRoles[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { user } = useAuthContext()
    const router = useRouter()
    const pathname = usePathname()

    const redirectPath = useMemo(() => {
        if (!user) {
            if (typeof window !== "undefined" && localStorage.getItem("user")) return null
            return "/login"
        }
        if (!user.isVerified && pathname !== "/verify-email") return "/verify-email"
        if (allowedRoles && !allowedRoles.includes(user.role)) {
            return user.role === UserRoles.Specialist ? "/tutor" : "/client"
        }
        return null
    }, [user, pathname, allowedRoles])

    useEffect(() => {
        if (redirectPath) {
            router.push(redirectPath)
        }
    }, [redirectPath, router])

    if (redirectPath) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        )
    }

    return <>{children}</>
}
