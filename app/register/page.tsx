"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, Chrome, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function RegisterPage() {
  const { register } = useAuth()
  const [userType, setUserType] = useState<"client" | "specialist">("client")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showRules, setShowRules] = useState(false)
  const [acceptedRules, setAcceptedRules] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password.length < 8) {
      alert("Пароль повинен містити мінімум 8 символів")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Паролі не співпадають")
      return
    }

    if (!acceptedRules) {
      setShowRules(true)
      return
    }

    setIsLoading(true)
    try {
      await register(formData.name, formData.email, formData.password, userType)
    } catch (error) {
      console.error("Registration error:", error)
    } finally {
      setIsLoading(false)
    }
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
        <div className="w-full max-w-[480px]">
          {/* Card */}
          <div className="bg-white rounded-3xl border border-slate-100/80 overflow-hidden">
            <div className="p-8 sm:p-10">
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-slate-800 mb-3 tracking-tight">Створити акаунт</h1>
                <p className="text-slate-500">Приєднуйтесь до нашої спільноти</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Type Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">Я хочу</Label>
                  <RadioGroup value={userType} onValueChange={(value) => setUserType(value as "client" | "specialist")} className="grid grid-cols-2 gap-4">
                    <div className={`flex flex-col items-center justify-center rounded-2xl border-2 p-5 transition-all cursor-pointer ${userType === 'client' ? 'border-[#43a047] bg-[#f1f8e9]' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                      <RadioGroupItem value="client" id="client" className="sr-only" />
                      <Label htmlFor="client" className="cursor-pointer text-center">
                        <span className="text-3xl mb-3 block">🎓</span>
                        <span className="font-bold text-slate-800 block">Знайти репетитора</span>
                        <span className="text-xs text-slate-500 mt-1 block">Для учнів</span>
                      </Label>
                    </div>
                    <div className={`flex flex-col items-center justify-center rounded-2xl border-2 p-5 transition-all cursor-pointer ${userType === 'specialist' ? 'border-[#f9a825] bg-[#fffde7]' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                      <RadioGroupItem value="specialist" id="specialist" className="sr-only" />
                      <Label htmlFor="specialist" className="cursor-pointer text-center">
                        <span className="text-3xl mb-3 block">👨‍🏫</span>
                        <span className="font-bold text-slate-800 block">Стати репетитором</span>
                        <span className="text-xs text-slate-500 mt-1 block">Для вчителів</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-slate-700">Повне ім'я</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Іван Петренко"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-13 rounded-xl border-slate-200 bg-white px-4 text-base focus:border-[#43a047] focus:ring-2 focus:ring-[#c8e6c9]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email адреса</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-13 rounded-xl border-slate-200 bg-white px-4 text-base focus:border-[#43a047] focus:ring-2 focus:ring-[#c8e6c9]"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-slate-700">Пароль</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        minLength={8}
                        className="h-13 rounded-xl border-slate-200 bg-white px-4 pr-12 text-base focus:border-[#43a047] focus:ring-2 focus:ring-[#c8e6c9]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">Підтвердити</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                      minLength={8}
                      className="h-13 rounded-xl border-slate-200 bg-white px-4 text-base focus:border-[#43a047] focus:ring-2 focus:ring-[#c8e6c9]"
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="rules"
                    checked={acceptedRules}
                    onCheckedChange={(checked) => setAcceptedRules(checked as boolean)}
                    className="mt-0.5 border-slate-300 data-[state=checked]:bg-[#43a047] data-[state=checked]:border-[#43a047]"
                  />
                  <label htmlFor="rules" className="text-sm leading-relaxed text-slate-500">
                    Я приймаю{" "}
                    <button type="button" onClick={() => setShowRules(true)} className="font-semibold text-[#2e7d32] hover:underline">
                      правила платформи
                    </button>{" "}
                    та політику конфіденційності
                  </label>
                </div>

                <Button 
                  type="submit" 
                  className="h-13 w-full rounded-xl bg-[#43a047] text-base font-semibold text-white hover:bg-[#388e3c] transition-colors" 
                  disabled={isLoading}
                >
                  {isLoading ? "Створення акаунту..." : "Створити акаунт"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-slate-400">або</span>
                  </div>
                </div>

                <Button 
                  type="button" 
                  variant="outline" 
                  className="h-13 w-full rounded-xl border-slate-200 bg-white font-medium text-slate-700 hover:bg-slate-50" 
                >
                  <Chrome className="mr-2 h-5 w-5" />
                  Зареєструватись через Google
                </Button>
              </form>

              <div className="mt-10 text-center text-sm text-slate-500">
                Вже маєте акаунт?{" "}
                <Link href="/login" className="font-semibold text-[#2e7d32] hover:text-[#1b5e20]">
                  Увійти
                </Link>
              </div>
            </div>
          </div>

          {/* Footer text */}
          <p className="mt-8 text-center text-xs text-slate-400">
            Реєструючись, ви погоджуєтесь з нашими умовами використання
          </p>
        </div>
      </div>

      {/* Rules Dialog */}
      <Dialog open={showRules} onOpenChange={setShowRules}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl border border-slate-100/80 shadow-lg">
          <DialogHeader className="pb-5 border-b border-slate-100">
            <DialogTitle className="text-2xl font-bold text-slate-800">Правила платформи</DialogTitle>
            <DialogDescription className="text-slate-500">Будь ласка, ознайомтесь перед реєстрацією</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-5 text-sm text-slate-600">
            <section className="space-y-4">
              <h3 className="font-bold text-base text-slate-800 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8f5e9] text-[#2e7d32] text-xs font-bold">1</span>
                Для спеціалістів
              </h3>
              <ul className="space-y-3 pl-2">
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#66bb6a] mt-2 shrink-0" />
                  <span><strong className="text-slate-700">Час відповіді:</strong> 3 години для прийняття/відхилення заявок. Бонус за відповідь протягом 20 хвилин.</span>
                </li>
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#66bb6a] mt-2 shrink-0" />
                  <span><strong className="text-slate-700">Оновлення статусу:</strong> 2 години після прийняття для оновлення статусу комунікації.</span>
                </li>
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#66bb6a] mt-2 shrink-0" />
                  <span><strong className="text-slate-700">Результат пробного уроку:</strong> 2 години після пробного уроку для звіту про результат.</span>
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="font-bold text-base text-slate-800 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8f5e9] text-[#2e7d32] text-xs font-bold">2</span>
                Для учнів
              </h3>
              <ul className="space-y-3 pl-2">
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#66bb6a] mt-2 shrink-0" />
                  <span><strong className="text-slate-700">Ліміт бронювань:</strong> Максимум 3 активні заявки одночасно.</span>
                </li>
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#66bb6a] mt-2 shrink-0" />
                  <span><strong className="text-slate-700">Пробні уроки:</strong> Будь ласка, повідомте репетитора про ваше рішення після пробного уроку.</span>
                </li>
              </ul>
            </section>

            <section className="bg-[#fff8e1] p-5 rounded-2xl border border-[#ffecb3]">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-[#f9a825] mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-[#e65100] mb-1">Важливо</h3>
                  <p className="text-[#795548] leading-relaxed">
                    Наша платформа працює на основі довіри та взаємної поваги. Порушення правил може призвести до постійного призупинення облікового запису.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="flex items-center space-x-3 pt-5 border-t border-slate-100 mt-2">
            <Checkbox
              id="rules-dialog"
              checked={acceptedRules}
              onCheckedChange={(checked) => {
                setAcceptedRules(checked as boolean)
                if (checked) {
                  setShowRules(false)
                }
              }}
              className="border-slate-300 data-[state=checked]:bg-[#43a047] data-[state=checked]:border-[#43a047]"
            />
            <label htmlFor="rules-dialog" className="text-sm font-medium text-slate-700 cursor-pointer select-none">
              Я прочитав та приймаю правила платформи
            </label>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
