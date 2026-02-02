"use client"

import { use, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, ArrowLeft, CheckCircle } from "lucide-react"
import { useRequestStore } from "@/lib/request-store"

export default function GuestBookingPage({ params }: { params: Promise<{ specialistId: string }> }) {
  const { specialistId } = use(params)
  const router = useRouter()
  const { addRequest } = useRequestStore()

  const [step, setStep] = useState(1)
  const [leadType, setLeadType] = useState<"private" | "public">("private")
  const [bookingData, setBookingData] = useState({
    subject: "",
    level: "",
    message: "",
    date: undefined as Date | undefined,
    time: "",
  })
  const [contactData, setContactData] = useState({
    name: "",
    phone: "",
    email: "",
  })
  const [success, setSuccess] = useState(false)

  const handleStepOneSubmit = () => {
    if (!bookingData.subject) return
    setStep(2)
  }

  const handleFinalSubmit = () => {
    addRequest({
      type: leadType,
      clientId: `shadow-${Date.now()}`, // Shadow user ID
      clientName: contactData.name,
      clientPhone: contactData.phone,
      specialistId: leadType === "private" ? specialistId : null,
      subject: bookingData.subject,
      date: bookingData.date?.toISOString().split("T")[0] || "",
      time: bookingData.time,
      format: "online",
      message: bookingData.message,
    })

    setSuccess(true)
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-8">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="mb-2 text-2xl font-bold">Заявку відправлено!</h2>
            <p className="mb-6 text-muted-foreground">
              {leadType === "private"
                ? "Спеціаліст отримає вашу заявку та зв'яжеться з вами протягом 3 годин"
                : "Ваша заявка розміщена на біржі. Репетитори зможуть її побачити та відгукнутися"}
            </p>
            <div className="w-full space-y-3">
              <Button
                onClick={() => router.push(`/login?phone=${contactData.phone}`)}
                className="w-full bg-gradient-to-r from-libitum-teal to-libitum-emerald"
              >
                Увійти в особистий кабінет
              </Button>
              <Link href="/" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  Повернутися на головну
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Ми надіслали SMS з кодом для входу на номер {contactData.phone}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-libitum-teal to-libitum-emerald">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-semibold">Libitum</span>
                <span className="block text-xs text-muted-foreground">Education</span>
              </div>
            </Link>
            <Link href={`/specialists/${specialistId}`}>
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад до профілю
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-2xl px-4 py-8">
        {/* Progress */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className={`h-2 w-24 rounded-full ${step >= 1 ? "bg-libitum-teal" : "bg-muted"}`} />
          <div className={`h-2 w-24 rounded-full ${step >= 2 ? "bg-libitum-teal" : "bg-muted"}`} />
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Крок 1: Параметри заняття</CardTitle>
              <CardDescription>Розкажіть нам про ваші потреби</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Тип заявки</Label>
                <RadioGroup value={leadType} onValueChange={(v) => setLeadType(v as "private" | "public")}>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="private" id="private" />
                      <div className="flex-1">
                        <Label htmlFor="private" className="font-medium">
                          Приватна заявка
                        </Label>
                        <p className="text-sm text-muted-foreground">Заявка буде надіслана тільки цьому спеціалісту</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="public" id="public" />
                      <div className="flex-1">
                        <Label htmlFor="public" className="font-medium">
                          Публічна заявка
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Розмістити на біржі, щоб всі репетитори могли відгукнутися
                        </p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Предмет</Label>
                <Select
                  value={bookingData.subject}
                  onValueChange={(v) => setBookingData({ ...bookingData, subject: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Оберіть предмет" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Математика</SelectItem>
                    <SelectItem value="english">Англійська мова</SelectItem>
                    <SelectItem value="physics">Фізика</SelectItem>
                    <SelectItem value="chemistry">Хімія</SelectItem>
                    <SelectItem value="ukrainian">Українська мова</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Рівень підготовки</Label>
                <Select value={bookingData.level} onValueChange={(v) => setBookingData({ ...bookingData, level: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Оберіть рівень" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Початковий</SelectItem>
                    <SelectItem value="intermediate">Середній</SelectItem>
                    <SelectItem value="advanced">Високий</SelectItem>
                    <SelectItem value="zno">Підготовка до ЗНО</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Мета та деталі</Label>
                <Textarea
                  id="message"
                  placeholder="Розкажіть про свої цілі, клас, рівень знань..."
                  value={bookingData.message}
                  onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                  rows={4}
                />
              </div>

              <Button onClick={handleStepOneSubmit} className="w-full" disabled={!bookingData.subject}>
                Далі
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Крок 2: Контактні дані</CardTitle>
              <CardDescription>Щоб спеціаліст міг з вами зв'язатися</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Ваше ім'я</Label>
                <Input
                  id="name"
                  placeholder="Іван Петренко"
                  value={contactData.name}
                  onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Номер телефону</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+380 XX XXX XX XX"
                  value={contactData.phone}
                  onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email (необов'язково)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                />
              </div>

              <div className="rounded-lg bg-teal-50 p-4 text-sm text-teal-900">
                <p className="font-medium">Після відправки заявки:</p>
                <ul className="ml-4 mt-2 list-disc space-y-1">
                  <li>Ви отримаєте SMS з кодом для входу в особистий кабінет</li>
                  <li>Зможете відслідковувати статус заявки</li>
                  <li>Отримаєте контакти спеціаліста після прийняття</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Назад
                </Button>
                <Button
                  onClick={handleFinalSubmit}
                  className="flex-1 bg-gradient-to-r from-libitum-teal to-libitum-emerald"
                  disabled={!contactData.name || !contactData.phone}
                >
                  Відправити заявку
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
