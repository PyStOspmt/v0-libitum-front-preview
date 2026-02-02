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

export function LanguageSwitcher() {
  const { user } = useAuth()
  const [currentLanguage, setCurrentLanguage] = useState<Locale>("UA")

  useEffect(() => {
    if (user?.language) {
      setCurrentLanguage(user.language as Locale)
    }
  }, [user?.language])

  const languages: { code: Locale; label: string }[] = [
    { code: "UA", label: "Українська" },
    { code: "EN", label: "English" },
    { code: "RU", label: "Русский" },
  ]

  const handleLanguageChange = (code: Locale) => {
    setCurrentLanguage(code)
    if (user) {
      const updatedUser = { ...user, language: code }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      window.location.reload()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl border border-border/50">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[100]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={currentLanguage === lang.code ? "bg-accent font-bold" : ""}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
