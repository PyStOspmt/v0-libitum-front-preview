"use client"

import { BookOpen, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { useAuth } from "@/lib/auth-context"

export function StudentAccessPage({ token }: { token?: string | string[] }) {
    const router = useRouter()
    const { impersonate } = useAuth()

    useEffect(() => {
        // Simulate token validation and auto-login for student
        const timer = setTimeout(() => {
            // In a real app, verify token via API first
            impersonate({
                id: "student-child-1",
                name: "Марія Коваленко",
                email: "maria_child@example.com",
                role: "client", // Student uses simplified client interface
                isEmailVerified: true,
                hasPassedQuiz: true,
                status: "active",
                language: "UA",
            })
            router.push("/student")
        }, 2000)

        return () => clearTimeout(timer)
    }, [token, impersonate, router])

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
            <Card className="max-w-md w-full text-center">
                <CardHeader>
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <BookOpen className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl">Libitum Education</CardTitle>
                    <CardDescription>Вхід до кабінету учня...</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-6">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                    <p className="text-sm text-muted-foreground">Будь ласка, зачекайте. Ми налаштовуємо ваш робочий простір.</p>
                </CardContent>
            </Card>
        </div>
    )
}
