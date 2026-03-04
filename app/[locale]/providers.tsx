import { ApolloAppProvider } from "@/providers/apollo-app-provider"
import { ThemeProvider } from "@/providers/theme-provider"

import { AuthProvider } from "@/features/auth/providers/auth-provider"

import { Locale } from "@/lib/i18n/config"
import { LocaleProvider } from "@/lib/locale-context"

export function RootProviders({ children, locale }: { children: React.ReactNode; locale: Locale }) {
    return (
        <ApolloAppProvider>
            <LocaleProvider locale={locale}>
                <AuthProvider>
                    <ThemeProvider>{children}</ThemeProvider>
                </AuthProvider>
            </LocaleProvider>
        </ApolloAppProvider>
    )
}
