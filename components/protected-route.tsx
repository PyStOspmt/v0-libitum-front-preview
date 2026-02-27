"use client"

import type React from "react"

import { useEffect, useMemo } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth, type LegacyRole } from "@/lib/auth-context"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: LegacyRole[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const redirectPath = useMemo(() => {
    if (isLoading) return null
    if (!user) {
      if (typeof window !== "undefined" && localStorage.getItem("user")) return null
      return "/login"
    }
    if (!user.isVerified && pathname !== "/verify-email") return "/verify-email"
    if (allowedRoles && !allowedRoles.includes(user.legacyRole)) {
      return user.legacyRole === "specialist" ? "/tutor" : "/client"
    }
    return null
  }, [user, pathname, allowedRoles, isLoading])

  useEffect(() => {
    if (redirectPath) {
      router.push(redirectPath)
    }
  }, [redirectPath, router])

  if (isLoading || redirectPath) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return <>{children}</>
}
