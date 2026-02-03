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
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3 transition-transform hover:scale-105">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 shadow-lg shadow-slate-200">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <span className="block text-xl font-bold tracking-tight text-slate-900">Libitum</span>
              <span className="block text-xs font-medium text-slate-500">Education Platform</span>
            </div>
          </Link>
        </div>

        <Card className="border-slate-200 bg-white/80 shadow-xl backdrop-blur-xl rounded-3xl overflow-hidden">
          <CardHeader className="space-y-1 text-center pb-8 pt-8">
            <CardTitle className="text-2xl font-bold text-slate-900">З поверненням!</CardTitle>
            <CardDescription className="text-base text-slate-500">
              Введіть свої дані для входу в систему
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="mb-6 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-indigo-900/60">Тестові акаунти</p>
              <div className="space-y-2">
                {testAccounts.map((account) => (
                  <div key={account.email} className="flex items-center justify-between rounded-xl bg-white p-2.5 text-xs shadow-sm ring-1 ring-slate-100">
                    <div>
                      <p className="font-bold text-slate-700">{account.role}</p>
                      <p className="text-slate-500 font-mono mt-0.5">{account.email}</p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="h-7 rounded-lg text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
                      onClick={() => quickLogin(account.email, account.password)}
                    >
                      Обрати
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700 ml-1">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 rounded-xl border-slate-200 bg-white/50 px-4 text-base transition-all focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-700">Пароль</Label>
                  <Link href="/forgot-password" className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
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
                  className="h-12 rounded-xl border-slate-200 bg-white/50 px-4 text-base transition-all focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <Button 
                type="submit" 
                className="h-12 w-full rounded-xl bg-slate-900 text-base font-semibold text-white shadow-lg shadow-slate-200 transition-all hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98]" 
                disabled={isLoading}
              >
                {isLoading ? "Завантаження..." : "Увійти"}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-400 font-medium">Або через</span>
                </div>
              </div>

              <Button 
                type="button" 
                variant="outline" 
                className="h-12 w-full rounded-xl border-slate-200 bg-white font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900" 
                onClick={() => {}}
              >
                <Chrome className="mr-2 h-5 w-5 text-slate-500" />
                Google
              </Button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-500">
              Ще не маєте акаунту?{" "}
              <Link href="/register" className="font-semibold text-slate-900 hover:underline">
                Зареєструватися
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
