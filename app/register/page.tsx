"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { BookOpen, AlertCircle } from "lucide-react"
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
  const [isLoading, setIsLoading] = useState(false)
  // Added state for rules acceptance dialog
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

    // Check if user accepted rules
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
            <CardTitle className="text-2xl font-bold text-slate-900">Створити акаунт</CardTitle>
            <CardDescription className="text-base text-slate-500">
              Оберіть тип профілю для початку
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-slate-700 ml-1">Я хочу</Label>
                <RadioGroup value={userType} onValueChange={(value) => setUserType(value as "client" | "specialist")} className="grid grid-cols-1 gap-3">
                  <div className={`flex items-center space-x-3 rounded-xl border p-4 transition-all cursor-pointer ${userType === 'client' ? 'border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-500' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                    <RadioGroupItem value="client" id="client" className="text-emerald-600 border-slate-300" />
                    <Label htmlFor="client" className="flex-1 cursor-pointer font-medium text-slate-700">
                      Знайти спеціаліста
                      <span className="block text-xs font-normal text-slate-500 mt-0.5">Для учнів та батьків</span>
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 rounded-xl border p-4 transition-all cursor-pointer ${userType === 'specialist' ? 'border-orange-500 bg-orange-50/50 ring-1 ring-orange-500' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                    <RadioGroupItem value="specialist" id="specialist" className="text-orange-600 border-slate-300" />
                    <Label htmlFor="specialist" className="flex-1 cursor-pointer font-medium text-slate-700">
                      Стати спеціалістом
                      <span className="block text-xs font-normal text-slate-500 mt-0.5">Репетитор, психолог, логопед</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-slate-700 ml-1">Повне ім'я</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Іван Петренко"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-12 rounded-xl border-slate-200 bg-white/50 px-4 text-base transition-all focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700 ml-1">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-12 rounded-xl border-slate-200 bg-white/50 px-4 text-base transition-all focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-700 ml-1">Пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength={8}
                    className="h-12 rounded-xl border-slate-200 bg-white/50 px-4 text-base transition-all focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700 ml-1">Підтвердження</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    minLength={8}
                    className="h-12 rounded-xl border-slate-200 bg-white/50 px-4 text-base transition-all focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>

              {/* Added rules acceptance checkbox */}
              <div className="flex items-start space-x-3 pt-2">
                <Checkbox
                  id="rules"
                  checked={acceptedRules}
                  onCheckedChange={(checked) => setAcceptedRules(checked as boolean)}
                  className="mt-1 border-slate-300 data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900"
                />
                <label htmlFor="rules" className="text-sm leading-tight text-slate-500">
                  Я приймаю{" "}
                  <button type="button" onClick={() => setShowRules(true)} className="font-semibold text-slate-900 hover:underline">
                    правила платформи
                  </button>{" "}
                  та погоджуюсь з умовами користування
                </label>
              </div>

              <Button 
                type="submit" 
                className="h-12 w-full rounded-xl bg-slate-900 text-base font-semibold text-white shadow-lg shadow-slate-200 transition-all hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98]" 
                disabled={isLoading}
              >
                {isLoading ? "Завантаження..." : "Зареєструватися"}
              </Button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-500">
              Вже маєте акаунт?{" "}
              <Link href="/login" className="font-semibold text-slate-900 hover:underline">
                Увійти
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Added rules dialog */}
      <Dialog open={showRules} onOpenChange={setShowRules}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl border-0 shadow-2xl">
          <DialogHeader className="pb-4 border-b border-slate-100">
            <DialogTitle className="text-2xl font-bold text-slate-900">Правила платформи Libitum</DialogTitle>
            <DialogDescription className="text-slate-500">Будь ласка, ознайомтесь з правилами перед реєстрацією</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4 text-sm text-slate-600">
            <section className="space-y-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs">1</span>
                Для спеціалістів
              </h3>
              <ul className="space-y-2 pl-2">
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                  <span><strong>Відповідь на заявку:</strong> У вас є 3 години на прийняття або відхилення заявки. Відповідь протягом 20 хвилин дає бонус до рейтингу.</span>
                </li>
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                  <span><strong>Оновлення статусу:</strong> Після прийняття заявки у вас є 2 години на оновлення статусу комунікації з клієнтом.</span>
                </li>
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                  <span><strong>Результат пробного:</strong> Протягом 2 годин після пробного заняття необхідно повідомити результат.</span>
                </li>
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                  <span><strong>Оплата за лід:</strong> Якщо клієнт продовжує навчання, у вас є 24 години для оплати за лід.</span>
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs">2</span>
                Для клієнтів
              </h3>
              <ul className="space-y-2 pl-2">
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                  <span><strong>Обмеження бронювань:</strong> Ви можете мати максимум 3 активні заявки одночасно.</span>
                </li>
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                  <span><strong>Пробні заняття:</strong> Після пробного заняття повідомте викладачу про ваше рішення.</span>
                </li>
              </ul>
            </section>

            <section className="bg-amber-50 p-5 rounded-2xl border border-amber-100">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-amber-900 mb-1">Важливо</h3>
                  <p className="text-amber-800/80 leading-relaxed">
                    Платформа працює за принципом довіри та взаємоповаги. Порушення правил може призвести до блокування акаунту без можливості відновлення.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="flex items-center space-x-3 pt-4 border-t border-slate-100 mt-2">
            <Checkbox
              id="rules-dialog"
              checked={acceptedRules}
              onCheckedChange={(checked) => {
                setAcceptedRules(checked as boolean)
                if (checked) {
                  setShowRules(false)
                }
              }}
              className="border-slate-300 data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900"
            />
            <label htmlFor="rules-dialog" className="text-sm font-medium text-slate-700 cursor-pointer select-none">
              Я прочитав і приймаю правила платформи
            </label>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
