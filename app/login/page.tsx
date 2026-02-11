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
import { Chrome, Eye, EyeOff, ArrowLeft, Star, Shield, BookOpen } from "lucide-react"

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
    <div className="min-h-screen bg-white flex">
      {/* Left decorative panel - hidden on mobile */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[540px] flex-shrink-0 bg-[#009688] relative overflow-hidden flex-col justify-between p-10">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full -translate-x-1/4 translate-y-1/4" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/5 rounded-full" />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5 mb-16">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-white/20">
              <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
            </div>
            <span className="text-xl font-bold text-white">LIBITUM</span>
          </Link>

          <h2 className="text-3xl xl:text-4xl font-bold text-white mb-4 leading-tight tracking-tight">
            Знайдіть свого ідеального спеціаліста
          </h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-sm">
            Платформа з перевіреними репетиторами, психологами та логопедами
          </p>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-4 bg-white/10 rounded-lg p-4">
            <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Перевірені спеціалісти</p>
              <p className="text-white/60 text-xs">Кожен проходить верифікацію</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/10 rounded-lg p-4">
            <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <Star className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Рейтинг 4.9/5</p>
              <p className="text-white/60 text-xs">Середня оцінка від учнів</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/10 rounded-lg p-4">
            <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">500+ спеціалістів</p>
              <p className="text-white/60 text-xs">В усіх напрямках навчання</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <header className="lg:hidden px-6 py-5 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative h-9 w-9 overflow-hidden rounded-lg">
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

        {/* Desktop back link */}
        <div className="hidden lg:flex px-8 pt-6">
          <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            На головну
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-[420px]">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight">З поверненням</h1>
              <p className="text-slate-500 text-sm">Увійдіть у свій акаунт, щоб продовжити</p>
            </div>

            {/* Test Accounts */}
            <div className="mb-6 rounded-lg bg-slate-50 border border-slate-100 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Тестові акаунти</p>
              <div className="flex flex-wrap gap-2">
                {testAccounts.map((account) => (
                  <Button
                    key={account.email}
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-8 rounded-lg text-xs border-slate-200 bg-white hover:bg-[#E0F2F1] hover:text-[#009688] hover:border-[#b2ebf2] cursor-pointer"
                    onClick={() => quickLogin(account.email, account.password)}
                  >
                    {account.role}
                  </Button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email адреса</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 rounded-lg border-4 border-slate-200 bg-white px-4 text-sm hover:border-black focus:border-[#009688] focus:ring-0 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700">Пароль</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Введіть пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 rounded-lg border-4 border-slate-200 bg-white px-4 pr-11 text-sm hover:border-black focus:border-[#009688] focus:ring-0 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox className="border-slate-300 data-[state=checked]:bg-[#009688] data-[state=checked]:border-[#009688]" />
                  <span className="text-sm text-slate-600">Запам{"'"}ятати мене</span>
                </label>
                <Link href="/forgot-password" className="text-sm font-semibold text-[#009688] hover:text-[#00796B]">
                  Забули пароль?
                </Link>
              </div>

              <Button
                type="submit"
                className="h-11 w-full rounded-lg bg-[#009688] text-sm font-semibold text-white hover:bg-[#00796B] cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Завантаження..." : "Увійти"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-4 text-slate-400">або</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="h-11 w-full rounded-lg border-slate-200 bg-white font-medium text-slate-700 hover:bg-slate-50 text-sm cursor-pointer"
              >
                <Chrome className="mr-2 h-4 w-4" />
                Увійти через Google
              </Button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-500">
              Ще немає акаунту?{" "}
              <Link href="/register" className="font-semibold text-[#009688] hover:text-[#00796B]">
                Зареєструватись
              </Link>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 text-center">
          <p className="text-xs text-slate-400">Захищено та безпечно</p>
        </div>
      </div>
    </div>
  )
}
