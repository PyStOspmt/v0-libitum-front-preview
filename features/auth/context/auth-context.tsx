import { UserRoles } from "@/graphql/generated/graphql"
import { BaseAuthenticatedUser } from "@/types/user"
import { createContext, useContext } from "react"

type AuthContextType = {
    user: BaseAuthenticatedUser | null
    handleLoginWithEmailAndPassword: (email: string, password: string) => Promise<void>
    handleLogout: () => Promise<void>
    handleRegisterWithEmailAndPassword: (name: string, email: string, password: string, role: UserRoles) => Promise<void>
    handleOauth: (role: UserRoles) => Promise<void>
    loginWithEmailAndPasswordLoading: boolean
    logoutLoading: boolean
    registerWithEmailAndPasswordLoading: boolean
    requestOAuthUrlLoading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuthContext() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider")
    }

    return context
}
