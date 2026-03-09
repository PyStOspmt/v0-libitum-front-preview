import { Analytics } from "@vercel/analytics/next"
import type React from "react"

import { Toaster } from "@/components/ui/toaster"

import { type Locale, isValidLocale } from "@/lib/i18n/config"

import { RootProviders } from "./providers"

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
                <RootProviders locale={locale}>{children}</RootProviders>
                <Toaster />
                <Analytics />
            </body>
        </html>
    )
}
