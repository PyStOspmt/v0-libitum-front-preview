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
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-600 to-emerald-500">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-semibold">Libitum Education</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Реєстрація</CardTitle>
            <CardDescription>Створіть акаунт для початку роботи</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <Label>Я хочу</Label>
                <RadioGroup value={userType} onValueChange={(value) => setUserType(value as "client" | "specialist")}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="client" id="client" />
                    <Label htmlFor="client" className="font-normal">
                      Знайти спеціаліста (учень/клієнт)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="specialist" id="specialist" />
                    <Label htmlFor="specialist" className="font-normal">
                      Стати спеціалістом (репетитор/психолог/логопед)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Повне ім'я</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Іван Петренко"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={8}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Підтвердіть пароль</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  minLength={8}
                />
              </div>

              {/* Added rules acceptance checkbox */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="rules"
                  checked={acceptedRules}
                  onCheckedChange={(checked) => setAcceptedRules(checked as boolean)}
                />
                <label htmlFor="rules" className="text-sm leading-tight text-muted-foreground">
                  Я приймаю{" "}
                  <button type="button" onClick={() => setShowRules(true)} className="text-teal-600 hover:underline">
                    правила платформи
                  </button>{" "}
                  та погоджуюсь з умовами користування
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Завантаження..." : "Зареєструватися"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Вже маєте акаунт? </span>
              <Link href="/login" className="font-medium text-primary hover:underline">
                Увійти
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Added rules dialog */}
      <Dialog open={showRules} onOpenChange={setShowRules}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Правила платформи Libitum Education</DialogTitle>
            <DialogDescription>Будь ласка, ознайомтесь з правилами перед реєстрацією</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-semibold text-base mb-2">Для спеціалістів:</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong>Відповідь на заявку:</strong> У вас є 3 години на прийняття або відхилення заявки. Відповідь
                  протягом 20 хвилин дає бонус до рейтингу.
                </li>
                <li>
                  <strong>Оновлення статусу:</strong> Після прийняття заявки у вас є 2 години на оновлення статусу
                  комунікації з клієнтом.
                </li>
                <li>
                  <strong>Результат пробного:</strong> Протягом 2 годин після пробного заняття необхідно повідомити
                  результат.
                </li>
                <li>
                  <strong>Оплата за лід:</strong> Якщо клієнт продовжує навчання, у вас є 24 години для оплати за лід.
                </li>
                <li>
                  <strong>Перед першою заявкою:</strong> Необхідно пройти короткий тест для перевірки готовності до
                  роботи.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">Для клієнтів:</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong>Обмеження бронювань:</strong> Ви можете мати максимум 3 активні заявки одночасно.
                </li>
                <li>
                  <strong>Пробні заняття:</strong> Після пробного заняття повідомте викладачу про ваше рішення.
                </li>
                <li>
                  <strong>Оплата:</strong> Оплата підтверджується спочатку клієнтом, потім спеціалістом.
                </li>
              </ul>
            </section>

            <section className="bg-teal-50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-teal-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-base mb-1">Важливо:</h3>
                  <p className="text-muted-foreground">
                    Платформа працює за принципом довіри та взаємоповаги. Порушення правил може призвести до блокування
                    акаунту.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="flex items-start space-x-2 mt-4">
            <Checkbox
              id="rules-dialog"
              checked={acceptedRules}
              onCheckedChange={(checked) => {
                setAcceptedRules(checked as boolean)
                if (checked) {
                  setShowRules(false)
                }
              }}
            />
            <label htmlFor="rules-dialog" className="text-sm leading-tight">
              Я прочитав і приймаю правила платформи
            </label>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
