"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-context"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { Locale } from "@/lib/i18n"
import { useI18nStore } from "@/lib/i18n-store"

export function LanguageSwitcher() {
  const { user } = useAuth()
  const { language, setLanguage } = useI18nStore()
  // Hydration safeguard 
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (user?.language && user.language !== language) {
      setLanguage(user.language as Locale)
    }
  }, [user?.language, language, setLanguage])

  const languages: { code: Locale; label: string }[] = [
    { code: "UA", label: "Українська" },
    { code: "EN", label: "English" },
    { code: "RU", label: "Русский" },
  ]

  const handleLanguageChange = (code: Locale) => {
    setLanguage(code)
    // If they change language here, we don't necessarily need to reload.
    // The store should update everywhere context is used if they rerender properly.
    if (user) {
      const updatedUser = { ...user, language: code }
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl border border-border/50">
        <Globe className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl border border-border/50">
          <Globe className="h-5 w-5" />
          <span className="ml-1 text-xs font-semibold">{language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[100]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={language === lang.code ? "bg-accent font-bold" : ""}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
