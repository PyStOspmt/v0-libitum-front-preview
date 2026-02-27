"use client"

import { createContext, useContext, useEffect, useState } from "react"

import { useAuth } from "@/lib/hooks/use-auth"

export type ThemeType = "tutor" | "psychologist" | "speech-therapist" | "client" | "admin"
type SpecialistType = "tutor" | "psychologist" | "speech-therapist"

export interface ThemeColors {
  type: ThemeType
  primary: string
  primaryHover: string
  primaryLight: string
  primaryDark: string
  gradient: string
  gradientLight: string
  accent: string
  bgGradient: string
  cardGradient: string
}

const colorThemes: Record<ThemeType, ThemeColors> = {
  tutor: {
    type: "tutor",
    primary: "#00c5a6",
    primaryHover: "#00b296",
    primaryLight: "rgba(0, 197, 166, 0.12)",
    primaryDark: "#0f172a",
    gradient: "linear-gradient(135deg, #00c5a6 0%, #10b981 100%)",
    gradientLight: "linear-gradient(135deg, rgba(0, 197, 166, 0.15) 0%, rgba(16, 185, 129, 0.08) 100%)",
    accent: "#00a389",
    bgGradient: "radial-gradient(ellipse at top, rgba(0, 197, 166, 0.1) 0%, transparent 52%)",
    cardGradient: "linear-gradient(135deg, rgba(0, 197, 166, 0.05) 0%, rgba(0, 197, 166, 0.01) 100%)",
  },
  psychologist: {
    type: "psychologist",
    primary: "#f97316",
    primaryHover: "#ea580c",
    primaryLight: "rgba(249, 115, 22, 0.1)",
    primaryDark: "#c2410c",
    gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)",
    gradientLight: "linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(234, 88, 12, 0.1) 100%)",
    accent: "#fb923c",
    bgGradient: "radial-gradient(ellipse at top, rgba(249, 115, 22, 0.08) 0%, transparent 50%)",
    cardGradient: "linear-gradient(135deg, rgba(249, 115, 22, 0.03) 0%, rgba(249, 115, 22, 0.01) 100%)",
  },
  "speech-therapist": {
    type: "speech-therapist",
    primary: "#f97316",
    primaryHover: "#ea580c",
    primaryLight: "rgba(249, 115, 22, 0.1)",
    primaryDark: "#c2410c",
    gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)",
    gradientLight: "linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(234, 88, 12, 0.1) 100%)",
    accent: "#fb923c",
    bgGradient: "radial-gradient(ellipse at top, rgba(249, 115, 22, 0.08) 0%, transparent 50%)",
    cardGradient: "linear-gradient(135deg, rgba(249, 115, 22, 0.03) 0%, rgba(249, 115, 22, 0.01) 100%)",
  },
  client: {
    type: "client",
    primary: "#00c5a6",
    primaryHover: "#00b296",
    primaryLight: "rgba(0, 197, 166, 0.12)",
    primaryDark: "#0f172a",
    gradient: "linear-gradient(135deg, #00c5a6 0%, #10b981 100%)",
    gradientLight: "linear-gradient(135deg, rgba(0, 197, 166, 0.15) 0%, rgba(16, 185, 129, 0.08) 100%)",
    accent: "#00a389",
    bgGradient: "radial-gradient(ellipse at top, rgba(0, 197, 166, 0.1) 0%, transparent 52%)",
    cardGradient: "linear-gradient(135deg, rgba(0, 197, 166, 0.05) 0%, rgba(0, 197, 166, 0.01) 100%)",
  },
  admin: {
    type: "admin",
    primary: "#64748b",
    primaryHover: "#475569",
    primaryLight: "rgba(100, 116, 139, 0.1)",
    primaryDark: "#334155",
    gradient: "linear-gradient(135deg, #64748b 0%, #475569 50%, #334155 100%)",
    gradientLight: "linear-gradient(135deg, rgba(100, 116, 139, 0.15) 0%, rgba(71, 85, 105, 0.1) 100%)",
    accent: "#94a3b8",
    bgGradient: "radial-gradient(ellipse at top, rgba(100, 116, 139, 0.08) 0%, transparent 50%)",
    cardGradient: "linear-gradient(135deg, rgba(100, 116, 139, 0.03) 0%, rgba(100, 116, 139, 0.01) 100%)",
  },
}

interface ThemeContextType {
  theme: ThemeColors
  themeType: ThemeType
  setTheme: (theme: ThemeType) => void
  isSpecialistTheme: boolean
  updateSpecialistTheme: (specialization: SpecialistType) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [themeType, setTheme] = useState<ThemeType>("client")
  const [isClient, setIsClient] = useState(false)

  // Handle client-side hydration
  useEffect(() => { const timer = setTimeout(() => setIsClient(true), 0); return () => clearTimeout(timer); }, [])

  // Auto-detect theme based on user role and specialization
  useEffect(() => {
    if (!isClient) return

    // Listen for theme changes from profile page
    const handleThemeChange = (event: CustomEvent) => {
      setTheme(event.detail.theme)
      // Save to localStorage
      localStorage.setItem('selectedTheme', event.detail.theme)
    }

    window.addEventListener('themeChange', handleThemeChange as EventListener)

    // Check localStorage first
    const savedTheme = localStorage.getItem('selectedTheme')
    if (savedTheme && ['tutor', 'psychologist', 'speech-therapist'].includes(savedTheme)) {
      setTimeout(() => setTimeout(() => setTheme(savedTheme as ThemeType), 0), 0)
    } else if (user) {
      // Set initial theme based on user
      if (user.legacyRole === "admin") {
        setTimeout(() => setTheme('admin'), 0)
      } else if (user.legacyRole === "client" || String(user.legacyRole) === "student") {
        setTimeout(() => setTheme('client'), 0)
      } else if (user.legacyRole === "specialist" || user.legacyRole === "tutor") {
        // Check specialization
        const subjects = user.subjects || []
        const isPsychologist = subjects.some((s: string) =>
          s.toLowerCase().includes("психол") || s.toLowerCase().includes("psych")
        )
        const isSpeechTherapist = subjects.some((s: string) =>
          s.toLowerCase().includes("логоп") || s.toLowerCase().includes("speech")
        )

        if (isPsychologist) {
          setTimeout(() => setTheme("psychologist"), 0)
        } else if (isSpeechTherapist) {
          setTimeout(() => setTheme("speech-therapist"), 0)
        } else {
          setTimeout(() => setTheme('tutor'), 0)
        }
      }
    }

    return () => {
      window.removeEventListener('themeChange', handleThemeChange as EventListener)
    }
  }, [user, isClient])

  const theme = colorThemes[themeType]
  const isSpecialistTheme = themeType === "tutor" || themeType === "psychologist" || themeType === "speech-therapist"

  // Apply theme to CSS variables only on client
  useEffect(() => {
    if (!isClient) return
    
    const root = document.documentElement
    root.style.setProperty("--theme-primary", theme.primary)
    root.style.setProperty("--theme-primary-hover", theme.primaryHover)
    root.style.setProperty("--theme-primary-light", theme.primaryLight)
    root.style.setProperty("--theme-primary-dark", theme.primaryDark)
    root.style.setProperty("--theme-gradient", theme.gradient)
    root.style.setProperty("--theme-gradient-light", theme.gradientLight)
    root.style.setProperty("--theme-accent", theme.accent)
    root.style.setProperty("--theme-bg-gradient", theme.bgGradient)
    root.style.setProperty("--theme-card-gradient", theme.cardGradient)
  }, [theme, isClient])

  // Function to update theme based on specialist specialization
  const updateSpecialistTheme = (specialization: SpecialistType) => {
    let newTheme: ThemeType
    if (specialization === "psychologist") {
      newTheme = "psychologist"
    } else if (specialization === "speech-therapist") {
      newTheme = "speech-therapist"
    } else {
      newTheme = "tutor"
    }
    setTheme(newTheme)
    // Save to localStorage
    if (isClient) {
      localStorage.setItem('selectedTheme', newTheme)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, themeType, setTheme, isSpecialistTheme, updateSpecialistTheme }}>
      <div
        className="min-h-screen transition-all duration-700"
        style={{
          background: isSpecialistTheme 
            ? `linear-gradient(to bottom, #ffffff 0%, #fafbfc 30%, #f8fafc 70%, #f1f5f9 100%)`
            : "#fafaf8",
        }}
      >
        {/* Background gradient overlay for specialists */}
        {isSpecialistTheme && (
          <div
            className="fixed inset-0 pointer-events-none opacity-60"
            style={{
              background: theme.type === 'psychologist' || theme.type === 'speech-therapist'
                ? `
                  radial-gradient(ellipse at 20% 0%, rgba(249, 115, 22, 0.15) 0%, transparent 50%),
                  radial-gradient(ellipse at 80% 0%, rgba(249, 115, 22, 0.10) 0%, transparent 40%),
                  radial-gradient(ellipse at 50% 100%, rgba(249, 115, 22, 0.08) 0%, transparent 60%)
                `
                : `
                  radial-gradient(ellipse at 20% 0%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
                  radial-gradient(ellipse at 80% 0%, rgba(16, 185, 129, 0.10) 0%, transparent 40%),
                  radial-gradient(ellipse at 50% 100%, rgba(16, 185, 129, 0.08) 0%, transparent 60%)
                `,
            }}
          />
        )}
        <div className="relative">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export { colorThemes }
