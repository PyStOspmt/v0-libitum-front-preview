"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useMutation, useApolloClient } from "@apollo/client/react"
import {
  LOGIN,
  REGISTER,
  REFRESH_TOKEN,
  GET_OAUTH_URL,
} from "@/lib/graphql/auth"
import {
  UserRoles,
  ROLE_MAP,
  type FrontendRole,
} from "@/features/auth/types/auth.types"
import type { User } from "@/features/user/types/user.types"

/** Legacy role string used across existing UI components */
export type LegacyRole = "client" | "specialist" | "admin"

/** Map backend UserRoles to legacy role strings used in UI */
function toLegacyRole(role: UserRoles): LegacyRole {
  switch (role) {
    case UserRoles.SUPER_ADMIN:
      return "admin"
    case UserRoles.SPECIALIST:
      return "specialist"
    default:
      return "client"
  }
}

/** Extended user interface for UI (adds fields not yet available from backend) */
export interface AppUser extends User {
  /** Legacy role string for backward-compatible comparisons ("client" | "specialist" | "admin") */
  legacyRole: LegacyRole
  /** Display name (placeholder until `me` query provides it) */
  name: string
  /** Profile avatar URL */
  avatar?: string
}

interface AuthContextType {
  user: AppUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: FrontendRole) => Promise<void>
  logout: () => void
  loginWithGoogle: () => Promise<void>
  refreshSession: () => Promise<boolean>
  impersonate: (user: AppUser) => void
  stopImpersonating: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function makeAppUser(base: Omit<User, "createdAt" | "updatedAt"> & Partial<Pick<User, "createdAt" | "updatedAt">> & { name?: string }): AppUser {
  return {
    id: base.id,
    email: base.email,
    isVerified: base.isVerified,
    role: base.role,
    createdAt: base.createdAt ?? new Date().toISOString(),
    updatedAt: base.updatedAt ?? new Date().toISOString(),
    legacyRole: toLegacyRole(base.role),
    name: base.name ?? base.email.split("@")[0],
  }
}

// Mutation response types (until codegen is set up)
type LoginData = { loginWithEmailAndPassword: boolean }
type RegisterData = { registerUserWithEmailAndPassword: boolean }
type RefreshData = { refreshToken: boolean }
type OAuthURLData = { getOAuthURL: string }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const client = useApolloClient()

  const [loginMutation] = useMutation<LoginData>(LOGIN)
  const [registerMutation] = useMutation<RegisterData>(REGISTER)
  const [refreshMutation] = useMutation<RefreshData>(REFRESH_TOKEN)

  const refreshSession = useCallback(async (): Promise<boolean> => {
    try {
      const { data } = await refreshMutation()
      const success = !!data?.refreshToken
      setIsAuthenticated(success)
      if (success) {
        const stored = localStorage.getItem("user")
        if (stored) {
          try {
            const parsed = JSON.parse(stored)
            setUser(makeAppUser(parsed))
          } catch { /* ignore */ }
        }
      }
      return success
    } catch {
      setIsAuthenticated(false)
      setUser(null)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [refreshMutation])

  useEffect(() => {
    refreshSession()
  }, [refreshSession])

  const login = async (email: string, password: string) => {
    // Intercept test accounts to avoid "Failed to fetch" if backend is down
    if (["client@test.com", "specialist@test.com", "admin@test.com"].includes(email)) {
      let role = UserRoles.STUDENT
      let name = "Клієнт"
      
      if (email === "specialist@test.com") {
        role = UserRoles.SPECIALIST
        name = "Спеціаліст"
      } else if (email === "admin@test.com") {
        role = UserRoles.SUPER_ADMIN
        name = "Адміністратор"
      }

      const appUser = makeAppUser({
        id: "mock-" + role,
        email,
        isVerified: true,
        role,
        name,
      })

      setUser(appUser)
      setIsAuthenticated(true)
      localStorage.setItem("user", JSON.stringify(appUser))
      return
    }

    const { data } = await loginMutation({
      variables: { userPayload: { email, password } },
    })

    if (!data?.loginWithEmailAndPassword) {
      throw new Error("Login failed")
    }

    const appUser = makeAppUser({
      id: "authenticated",
      email,
      isVerified: true,
      role: UserRoles.STUDENT,
    })

    setUser(appUser)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(appUser))
  }

  const register = async (name: string, email: string, password: string, role: FrontendRole) => {
    const backendRole = ROLE_MAP[role]

    const { data } = await registerMutation({
      variables: { userPayload: { email, password, role: backendRole } },
    })

    if (!data?.registerUserWithEmailAndPassword) {
      throw new Error("Registration failed")
    }

    const appUser = makeAppUser({
      id: "authenticated",
      email,
      isVerified: false,
      role: backendRole,
      name,
    })

    setUser(appUser)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(appUser))
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
    localStorage.removeItem("admin_user")
    client.clearStore()
    router.push("/")
  }

  const loginWithGoogle = async () => {
    const { data } = await client.query<OAuthURLData>({ query: GET_OAUTH_URL, fetchPolicy: "no-cache" })
    const url = data?.getOAuthURL
    if (url) {
      window.location.href = url
    }
  }

  const impersonate = (targetUser: AppUser) => {
    if (user?.role !== UserRoles.SUPER_ADMIN && !localStorage.getItem("admin_user")) return
    if (!localStorage.getItem("admin_user")) {
      localStorage.setItem("admin_user", JSON.stringify(user))
    }
    setUser(targetUser)
    localStorage.setItem("user", JSON.stringify(targetUser))
    router.push(targetUser.role === UserRoles.SPECIALIST ? "/tutor" : "/client")
  }

  const stopImpersonating = () => {
    const adminUser = localStorage.getItem("admin_user")
    if (adminUser) {
      const parsed = JSON.parse(adminUser)
      setUser(makeAppUser(parsed))
      localStorage.setItem("user", adminUser)
      localStorage.removeItem("admin_user")
    }
    window.location.replace("/admin")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        loginWithGoogle,
        refreshSession,
        impersonate,
        stopImpersonating,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
