import { Analytics } from "@vercel/analytics/next"
import type React from "react"

import { Toaster } from "@/components/ui/toaster"

import { ApolloWrapper } from "@/lib/apollo/provider"
import { AuthProvider } from "@/lib/auth-context"
import { type Locale, isValidLocale } from "@/lib/i18n/config"
import { LocaleProvider } from "@/lib/locale-context"
import { ThemeProvider } from "@/lib/theme-context"

export function generateStaticParams() {
    return [{ locale: "uk" }, { locale: "en" }, { locale: "ru" }]
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale } = await params
    const locale: Locale = isValidLocale(rawLocale) ? rawLocale : "uk"

    return (
        <html lang={locale}>
            <body className="antialiased">
                <ApolloWrapper>
                    <LocaleProvider locale={locale}>
                        <AuthProvider>
                            <ThemeProvider>{children}</ThemeProvider>
                        </AuthProvider>
                    </LocaleProvider>
                </ApolloWrapper>
                <Toaster />
                <Analytics />
            </body>
        </html>
    )
}
