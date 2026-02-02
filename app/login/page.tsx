"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, Chrome } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const testAccounts = [
    { role: "Клієнт", email: "client@test.com", password: "password123" },
    { role: "Спеціаліст", email: "specialist@test.com", password: "password123" },
    { role: "Адміністратор", email: "admin@test.com", password: "password123" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await login(email, password)
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const quickLogin = (email: string, password: string) => {
    setEmail(email)
    setPassword(password)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">Libitum Education</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Вхід</CardTitle>
            <CardDescription>Введіть свої дані для входу в систему</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="mb-3 text-sm font-medium">Тестові акаунти:</p>
              <div className="space-y-2">
                {testAccounts.map((account) => (
                  <div key={account.email} className="flex items-center justify-between rounded-md bg-card p-2 text-xs">
                    <div>
                      <p className="font-medium">{account.role}</p>
                      <p className="text-muted-foreground">{account.email}</p>
                      <p className="text-muted-foreground">{account.password}</p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => quickLogin(account.email, account.password)}
                    >
                      Використати
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Пароль</Label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Забули пароль?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Завантаження..." : "Увійти"}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Або увійдіть через</span>
                </div>
              </div>

              <Button type="button" variant="outline" className="w-full bg-transparent" onClick={() => {}}>
                <Chrome className="mr-2 h-4 w-4" />
                Google
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Ще не маєте акаунту? </span>
              <Link href="/register" className="font-medium text-primary hover:underline">
                Зареєструватися
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
