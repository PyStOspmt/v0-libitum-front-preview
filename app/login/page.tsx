"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Chrome, Eye, EyeOff, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const testAccounts = [
    { role: "Клієнт", email: "client@test.com", password: "password123" },
    { role: "Спеціаліст", email: "specialist@test.com", password: "password123" },
    { role: "Адмін", email: "admin@test.com", password: "password123" },
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
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Header */}
      <header className="px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl">
              <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
            </div>
            <span className="text-lg font-bold text-slate-800">LIBITUM</span>
          </Link>

          <Link href="/" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            На головну
          </Link>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-[440px]">
          {/* Card */}
          <div className="bg-[#f5f5f0] rounded-3xl border-4 border-transparent hover:border-black transition-all overflow-hidden">
            <div className="p-8 sm:p-10">
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-slate-800 mb-3 tracking-tight">З поверненням</h1>
                <p className="text-slate-500">Увійдіть у свій акаунт</p>
              </div>

              {/* Test Accounts */}
              <div className="mb-8 rounded-2xl bg-white p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Тестові акаунти</p>
                <div className="flex flex-wrap gap-2">
                  {testAccounts.map((account) => (
                    <Button
                      key={account.email}
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-9 rounded-full text-xs border-slate-200 hover:bg-[#e8f5e9] hover:text-[#2e7d32] hover:border-[#c8e6c9] cursor-pointer"
                      onClick={() => quickLogin(account.email, account.password)}
                    >
                      {account.role}
                    </Button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email адреса</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-13 rounded-xl border-slate-200 bg-white px-4 text-base focus:border-[#43a047] focus:ring-2 focus:ring-[#c8e6c9]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-700">Пароль</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Введіть пароль"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-13 rounded-xl border-slate-200 bg-white px-4 pr-12 text-base focus:border-[#43a047] focus:ring-2 focus:ring-[#c8e6c9]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Пароль повинен містити мінімум 8 символів</p>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <Checkbox className="border-slate-300 data-[state=checked]:bg-[#43a047] data-[state=checked]:border-[#43a047]" />
                    <span className="text-sm text-slate-600">Запам{"'"}ятати мене</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm font-semibold text-[#2e7d32] hover:text-[#1b5e20]">
                    Забули пароль?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="h-13 w-full rounded-xl bg-[#43a047] text-base font-semibold text-white hover:bg-[#388e3c] cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? "Завантаження..." : "Увійти"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-[#f5f5f0] px-4 text-slate-400">або</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="h-13 w-full rounded-xl border-slate-200 bg-white font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <Chrome className="mr-2 h-5 w-5" />
                  Увійти через Google
                </Button>
              </form>

              <div className="mt-10 text-center text-sm text-slate-500">
                Ще немає акаунту?{" "}
                <Link href="/register" className="font-semibold text-[#2e7d32] hover:text-[#1b5e20]">
                  Зареєструватись
                </Link>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-slate-400">
            Захищено та безпечно
          </p>
        </div>
      </div>
    </div>
  )
}
