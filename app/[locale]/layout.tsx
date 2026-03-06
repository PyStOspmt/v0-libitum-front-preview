import type React from "react"
import { isValidLocale, type Locale } from "@/lib/i18n/config"
import { LocaleProvider } from "@/lib/locale-context"
import { AuthProvider } from "@/lib/auth-context"
import { ThemeProvider } from "@/lib/theme-context"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/next"
import { ApolloWrapper } from "@/lib/apollo/provider"

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
        <ApolloWrapper>
            <LocaleProvider locale={locale}>
                <AuthProvider>
                    <ThemeProvider>{children}</ThemeProvider>
                </AuthProvider>
            </LocaleProvider>
            <Toaster />
            <Analytics />
        </ApolloWrapper>
    )
}
