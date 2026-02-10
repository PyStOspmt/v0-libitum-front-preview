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
import { AlertCircle, Chrome, Eye, EyeOff, ArrowLeft, Users, TrendingUp, Check } from "lucide-react"
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
    <div className="min-h-screen bg-white flex">
      {/* Left decorative panel - hidden on mobile */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[540px] flex-shrink-0 bg-[#0891b2] relative overflow-hidden flex-col justify-between p-10">
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
            Приєднуйтесь до спільноти
          </h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-sm">
            Створіть акаунт та отримайте доступ до найкращих спеціалістів
          </p>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-4 bg-white/10 rounded-lg p-4">
            <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <Check className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Безкоштовне пробне заняття</p>
              <p className="text-white/60 text-xs">Перше заняття з кожним спеціалістом</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/10 rounded-lg p-4">
            <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Персональний підхід</p>
              <p className="text-white/60 text-xs">Індивідуальна програма навчання</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/10 rounded-lg p-4">
            <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Відстеження прогресу</p>
              <p className="text-white/60 text-xs">Детальна аналітика навчання</p>
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

        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-[440px]">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight">Створити акаунт</h1>
              <p className="text-slate-500 text-sm">Приєднуйтесь до нашої спільноти</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* User Type Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Я хочу</Label>
                <RadioGroup value={userType} onValueChange={(value) => setUserType(value as "client" | "specialist")} className="grid grid-cols-2 gap-3">
                  <div className={`flex flex-col items-center justify-center rounded-lg border p-4 transition-all cursor-pointer ${userType === "client" ? "border-[#0891b2] bg-[#e0f7fa]" : "border-slate-200 bg-white hover:bg-slate-50"}`}>
                    <RadioGroupItem value="client" id="client" className="sr-only" />
                    <Label htmlFor="client" className="cursor-pointer text-center">
                      <span className="text-2xl mb-2 block">&#127891;</span>
                      <span className="font-bold text-slate-800 block text-sm">Знайти репетитора</span>
                      <span className="text-xs text-slate-500 mt-0.5 block">Для учнів</span>
                    </Label>
                  </div>
                  <div className={`flex flex-col items-center justify-center rounded-lg border p-4 transition-all cursor-pointer ${userType === "specialist" ? "border-[#f59e0b] bg-[#fef3c7]" : "border-slate-200 bg-white hover:bg-slate-50"}`}>
                    <RadioGroupItem value="specialist" id="specialist" className="sr-only" />
                    <Label htmlFor="specialist" className="cursor-pointer text-center">
                      <span className="text-2xl mb-2 block">&#128104;&#8205;&#127979;</span>
                      <span className="font-bold text-slate-800 block text-sm">Стати репетитором</span>
                      <span className="text-xs text-slate-500 mt-0.5 block">Для вчителів</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm font-medium text-slate-700">Повне ім{"'"}я</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Іван Петренко"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-11 rounded-lg border-4 border-slate-200 bg-white px-4 text-sm hover:border-black focus:border-[#0891b2] focus:ring-0 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email адреса</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-11 rounded-lg border-4 border-slate-200 bg-white px-4 text-sm hover:border-black focus:border-[#0891b2] focus:ring-0 transition-colors"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-700">Пароль</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="--------"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      minLength={8}
                      className="h-11 rounded-lg border-4 border-slate-200 bg-white px-4 pr-11 text-sm hover:border-black focus:border-[#0891b2] focus:ring-0 transition-colors"
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

                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">Підтвердити</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="--------"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    minLength={8}
                    className="h-11 rounded-lg border-4 border-slate-200 bg-white px-4 text-sm hover:border-black focus:border-[#0891b2] focus:ring-0 transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="rules"
                  checked={acceptedRules}
                  onCheckedChange={(checked) => setAcceptedRules(checked as boolean)}
                  className="mt-0.5 border-slate-300 data-[state=checked]:bg-[#0891b2] data-[state=checked]:border-[#0891b2]"
                />
                <label htmlFor="rules" className="text-sm leading-relaxed text-slate-500">
                  Я приймаю{" "}
                  <button type="button" onClick={() => setShowRules(true)} className="font-semibold text-[#0891b2] hover:underline cursor-pointer">
                    правила платформи
                  </button>{" "}
                  та політику конфіденційності
                </label>
              </div>

              <Button
                type="submit"
                className="h-11 w-full rounded-lg bg-[#0891b2] text-sm font-semibold text-white hover:bg-[#0e7490] cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Створення акаунту..." : "Створити акаунт"}
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
                Зареєструватись через Google
              </Button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-500">
              Вже маєте акаунт?{" "}
              <Link href="/login" className="font-semibold text-[#0891b2] hover:text-[#0e7490]">
                Увійти
              </Link>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 text-center">
          <p className="text-xs text-slate-400">Реєструючись, ви погоджуєтесь з нашими умовами використання</p>
        </div>
      </div>

      {/* Rules Dialog */}
      <Dialog open={showRules} onOpenChange={setShowRules}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto rounded-lg border border-slate-200">
          <DialogHeader className="pb-5 border-b border-slate-100">
            <DialogTitle className="text-2xl font-bold text-slate-800">Правила платформи</DialogTitle>
            <DialogDescription className="text-slate-500">Будь ласка, ознайомтесь перед реєстрацією</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-5 text-sm text-slate-600">
            <section className="space-y-4">
              <h3 className="font-bold text-base text-slate-800 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e0f7fa] text-[#0891b2] text-xs font-bold">1</span>
                Для спеціалістів
              </h3>
              <ul className="space-y-3 pl-2">
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#22d3ee] mt-2 shrink-0" />
                  <span><strong className="text-slate-700">Час відповіді:</strong> 3 години для прийняття/відхилення заявок.</span>
                </li>
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#22d3ee] mt-2 shrink-0" />
                  <span><strong className="text-slate-700">Оновлення статусу:</strong> 2 години після прийняття для оновлення статусу комунікації.</span>
                </li>
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#22d3ee] mt-2 shrink-0" />
                  <span><strong className="text-slate-700">Результат пробного уроку:</strong> 2 години після пробного уроку для звіту про результат.</span>
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="font-bold text-base text-slate-800 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e0f7fa] text-[#0891b2] text-xs font-bold">2</span>
                Для учнів
              </h3>
              <ul className="space-y-3 pl-2">
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#22d3ee] mt-2 shrink-0" />
                  <span><strong className="text-slate-700">Ліміт бронювань:</strong> Максимум 3 активні заявки одночасно.</span>
                </li>
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#22d3ee] mt-2 shrink-0" />
                  <span><strong className="text-slate-700">Пробні уроки:</strong> Будь ласка, повідомте репетитора про ваше рішення після пробного уроку.</span>
                </li>
              </ul>
            </section>

            <section className="bg-[#fff8e1] p-5 rounded-lg">
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
              className="border-slate-300 data-[state=checked]:bg-[#0891b2] data-[state=checked]:border-[#0891b2]"
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
