"use client"

import { Globe } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { type Locale, defaultLocale, locales } from "@/lib/i18n/config"
import { useLocale } from "@/lib/locale-context"

const languageLabels: Record<Locale, string> = {
    uk: "Українська",
    en: "English",
    ru: "Русский",
}

const languageShort: Record<Locale, string> = {
    uk: "UA",
    en: "EN",
    ru: "RU",
}

export function LanguageSwitcher() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0)
        return () => clearTimeout(timer)
    }, [])

    const handleLanguageChange = (newLocale: Locale) => {
        if (newLocale === locale) return

        let pathWithoutLocale = pathname
        for (const loc of locales) {
            if (pathname.startsWith(`/${loc}/`)) {
                pathWithoutLocale = pathname.slice(`/${loc}`.length)
                break
            } else if (pathname === `/${loc}`) {
                pathWithoutLocale = "/"
                break
            }
        }

        const newPath = newLocale === defaultLocale ? pathWithoutLocale || "/" : `/${newLocale}${pathWithoutLocale}`

        router.push(newPath)
    }

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="h-10 w-14 rounded-xl border border-border/50">
                <Globe className="h-5 w-5" />
            </Button>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-14 rounded-xl border border-border/50">
                    <Globe className="h-5 w-5" />
                    <span className="ml-1 text-xs font-semibold">{languageShort[locale]}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-[100]">
                {locales.map((loc) => (
                    <DropdownMenuItem
                        key={loc}
                        onClick={() => handleLanguageChange(loc)}
                        className={locale === loc ? "bg-accent font-bold" : ""}
                    >
                        {languageLabels[loc]}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
