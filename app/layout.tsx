import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const satoshi = DM_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-satoshi"
})

export const metadata: Metadata = {
  title: "Libitum Education - Платформа для репетиторів, психологів та логопедів",
  description: "Знайдіть свого ідеального репетитора, психолога чи логопеда. Професійні спеціалісти онлайн та офлайн.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk">
      <body className={`${satoshi.className} ${satoshi.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
