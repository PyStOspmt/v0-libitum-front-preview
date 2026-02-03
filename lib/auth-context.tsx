"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type UserRole = "client" | "specialist" | "admin"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  subjects?: string[]
  isEmailVerified: boolean
  hasPassedQuiz: boolean
  status: "pending" | "active" | "rejected"
  language: "UA" | "EN" | "RU"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
  isLoading: boolean
  impersonate: (user: User) => void
  stopImpersonating: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Mock login - in production, this would call your API
    let role: UserRole = "client"

    if (email.includes("admin")) {
      role = "admin"
    } else if (email.includes("specialist") || email.includes("tutor") || email.includes("teacher") || email.includes("psych")) {
      role = "specialist"
    }

    const isPsychologist = email.includes("psych")

    const mockUser: User = {
      id: "1",
      name: role === "admin" ? "Адміністратор" : isPsychologist ? "Олена Психолог" : "Іван Петренко",
      email,
      role,
      subjects: role === "specialist" 
        ? (isPsychologist ? ["Психологія", "Консультації"] : ["Англійська мова", "Математика"]) 
        : undefined,
      isEmailVerified: true,
      hasPassedQuiz: true,
      status: "active",
      language: "UA",
    }
    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))

    if (mockUser.role === "specialist") {
      router.push("/tutor")
    } else if (mockUser.role === "admin") {
      router.push("/admin")
    } else {
      router.push("/client")
    }
  }

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    // Mock registration
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
      subjects: role === "specialist" ? ["Англійська мова", "Математика"] : undefined,
      isEmailVerified: false, // New users must verify email
      hasPassedQuiz: false,
      status: "pending",
      language: "UA",
    }
    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))

    if (role === "specialist") {
      router.push("/tutor")
    } else {
      router.push("/client")
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("admin_user")
    router.push("/")
  }

  const impersonate = (targetUser: User) => {
    if (user?.role !== "admin" && !localStorage.getItem("admin_user")) return
    
    // Save current admin if not already saved
    if (!localStorage.getItem("admin_user")) {
      localStorage.setItem("admin_user", JSON.stringify(user))
    }
    
    setUser(targetUser)
    localStorage.setItem("user", JSON.stringify(targetUser))
    router.push(targetUser.role === "specialist" ? "/tutor" : "/client")
  }

  const stopImpersonating = () => {
    const adminUser = localStorage.getItem("admin_user")

    if (adminUser) {
      const parsedAdmin = JSON.parse(adminUser)
      setUser(parsedAdmin)
      localStorage.setItem("user", adminUser)
      localStorage.removeItem("admin_user")
    } else {
      const fallbackAdmin =
        user?.role === "admin"
          ? user
          : {
              id: "admin-fallback",
              name: "Адміністратор",
              email: "admin@example.com",
              role: "admin" as const,
              isEmailVerified: true,
              hasPassedQuiz: true,
              status: "active" as const,
              language: "UA" as const,
            }
      setUser(fallbackAdmin)
      localStorage.setItem("user", JSON.stringify(fallbackAdmin))
    }

    // Жорсткий перехід, щоб 100% підхопити оновлений localStorage та уникнути спінера
    window.location.replace("/admin")
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, impersonate, stopImpersonating }}>
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
