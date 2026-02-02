"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BookOpen, ArrowLeft, Upload, Plus, X } from "lucide-react"
import Link from "next/link"

export default function SpecialistProfilePage() {
  const { user } = useAuth()
  const [subjects, setSubjects] = useState(["Англійська мова", "Німецька мова"])
  const [newSubject, setNewSubject] = useState("")

  const addSubject = () => {
    if (newSubject && !subjects.includes(newSubject)) {
      setSubjects([...subjects, newSubject])
      setNewSubject("")
    }
  }

  const removeSubject = (subject: string) => {
    setSubjects(subjects.filter((s) => s !== subject))
  }

  return (
    <ProtectedRoute allowedRoles={["specialist"]}>
      <div className="min-h-screen bg-muted/30">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Link href="/specialist/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <BookOpen className="h-6 w-6 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-semibold">Налаштування профілю</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="space-y-6">
            {/* Profile Photo */}
            <Card>
              <CardHeader>
                <CardTitle>Фото профілю</CardTitle>
                <CardDescription>Додайте професійне фото для вашого профілю</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="text-2xl">{user?.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button>
                      <Upload className="mr-2 h-4 w-4" />
                      Завантажити фото
                    </Button>
                    <p className="text-sm text-muted-foreground">JPG, PNG або GIF. Максимум 5MB.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Основна інформація</CardTitle>
                <CardDescription>Ваші особисті дані</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Ім'я</Label>
                    <Input id="firstName" defaultValue="Олена" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Прізвище</Label>
                    <Input id="lastName" defaultValue="Іваненко" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" type="tel" placeholder="+380 XX XXX XX XX" />
                </div>
              </CardContent>
            </Card>

            {/* Professional Info */}
            <Card>
              <CardHeader>
                <CardTitle>Професійна інформація</CardTitle>
                <CardDescription>Розкажіть про свій досвід та кваліфікацію</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="specialization">Спеціалізація</Label>
                  <Select defaultValue="tutor">
                    <SelectTrigger id="specialization">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tutor">Репетитор</SelectItem>
                      <SelectItem value="psychologist">Психолог</SelectItem>
                      <SelectItem value="speech-therapist">Логопед</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Предмети/Напрямки</Label>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map((subject) => (
                      <Badge key={subject} variant="secondary" className="gap-1">
                        {subject}
                        <button onClick={() => removeSubject(subject)} className="ml-1 hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Додати предмет"
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addSubject()}
                    />
                    <Button type="button" onClick={addSubject}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Досвід роботи (років)</Label>
                  <Input id="experience" type="number" defaultValue="5" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education">Освіта</Label>
                  <Textarea
                    id="education"
                    placeholder="Вкажіть вашу освіту, сертифікати, курси..."
                    defaultValue="Київський національний університет імені Тараса Шевченка, філологічний факультет"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Про себе</Label>
                  <Textarea
                    id="bio"
                    placeholder="Розкажіть про себе, свій підхід до навчання..."
                    defaultValue="Маю 5 років досвіду викладання англійської мови. Працюю з учнями різного віку та рівня підготовки. Використовую комунікативну методику та сучасні матеріали."
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Ціни та доступність</CardTitle>
                <CardDescription>Налаштуйте вартість занять та графік роботи</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="priceOnline">Ціна онлайн (грн/год)</Label>
                    <Input id="priceOnline" type="number" defaultValue="400" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priceOffline">Ціна офлайн (грн/год)</Label>
                    <Input id="priceOffline" type="number" defaultValue="500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Формати занять</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="online" defaultChecked />
                      <Label htmlFor="online" className="font-normal">
                        Онлайн заняття
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="offline" defaultChecked />
                      <Label htmlFor="offline" className="font-normal">
                        Офлайн заняття
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="home" />
                      <Label htmlFor="home" className="font-normal">
                        Виїзд додому до учня
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Місто</Label>
                  <Input id="location" defaultValue="Київ" />
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Документи</CardTitle>
                <CardDescription>Завантажте документи для верифікації</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Диплом про освіту</Label>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Upload className="mr-2 h-4 w-4" />
                    Завантажити диплом
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Сертифікати</Label>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Upload className="mr-2 h-4 w-4" />
                    Завантажити сертифікати
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end gap-3">
              <Link href="/specialist/dashboard">
                <Button variant="outline">Скасувати</Button>
              </Link>
              <Button>Зберегти зміни</Button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
