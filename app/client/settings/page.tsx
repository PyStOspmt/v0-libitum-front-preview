"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth-context"
import { UserPlus, Copy, Share2, Users, Check, Trash2, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ClientSettingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [isAddChildOpen, setIsAddChildOpen] = useState(false)
  const [childName, setChildName] = useState("")
  const [childAge, setChildAge] = useState("")
  const [childGrade, setChildGrade] = useState("")
  const [childCity, setChildCity] = useState("")
  const [childNotes, setChildNotes] = useState("")
  const [referralCopied, setReferralCopied] = useState(false)

  const [children, setChildren] = useState([
    {
      id: "1",
      name: "Марія Коваленко",
      age: 12,
      grade: "6 клас",
      city: "Київ",
      subjects: ["Англійська", "Математика"],
      notes: "Підготовка до вступу в ліцей",
      accessLink: "https://libitum.education/student/access/token-123",
    },
  ])

  const referralLink = `https://libitum.education/ref/${user?.id || "client123"}`
  const referralStats = {
    invited: 3,
    registered: 2,
    bonus: 150,
  }

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    setReferralCopied(true)
    toast({
      title: "Посилання скопійовано",
      description: "Реферальне посилання скопійовано в буфер обміну",
    })
    setTimeout(() => setReferralCopied(false), 2000)
  }

  const handleAddChild = () => {
    if (!childName || !childAge) {
      toast({
        title: "Помилка",
        description: "Заповніть всі поля",
        variant: "destructive",
      })
      return
    }

    setChildren((prev) => [
      ...prev,
      {
        id: `${prev.length + 1}`,
        name: childName,
        age: Number(childAge),
        grade: childGrade || "-",
        city: childCity || "-",
        subjects: [],
        notes: childNotes || "",
        accessLink: "https://libitum.education/student/access/token-new",
      },
    ])

    toast({
      title: "Дитину додано",
      description: `${childName} успішно доданий(а) до вашого профілю`,
    })

    setIsAddChildOpen(false)
    setChildName("")
    setChildAge("")
    setChildGrade("")
    setChildCity("")
    setChildNotes("")
  }

  return (
    <ProtectedRoute allowedRoles={["client"]}>
      <SidebarLayout userType="client">
        <div className="container mx-auto max-w-4xl space-y-8 p-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Налаштування</h1>
            <p className="text-slate-500 mt-1">Управління вашим профілем та налаштуваннями</p>
          </div>

          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900">Особиста інформація</CardTitle>
              <CardDescription className="text-slate-500">Оновіть свої особисті дані</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20 rounded-2xl border-2 border-white shadow-sm ring-1 ring-slate-100">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-slate-100 text-slate-600 text-xl font-bold">{user?.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="rounded-xl border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50">
                  Завантажити фото
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700">Ім'я</Label>
                  <Input id="name" defaultValue={user?.name} className="rounded-xl border-slate-200 focus-visible:ring-slate-900" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email} className="rounded-xl border-slate-200 focus-visible:ring-slate-900" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-700">Телефон</Label>
                  <Input id="phone" type="tel" placeholder="+380" className="rounded-xl border-slate-200 focus-visible:ring-slate-900" />
                </div>
              </div>
              <Button className="rounded-xl bg-slate-900 text-white hover:bg-slate-800">Зберегти зміни</Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl font-bold text-slate-900">
                    <Users className="h-5 w-5 text-slate-500" />
                    Мої діти
                  </CardTitle>
                  <CardDescription className="text-slate-500 mt-1">Управління профілями дітей та контроль прогресу</CardDescription>
                </div>
                <Button onClick={() => setIsAddChildOpen(true)} className="rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-sm">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Додати дитину
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {children.length > 0 ? (
                children.map((child) => (
                  <div key={child.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-colors hover:bg-slate-50 hover:border-slate-200">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 rounded-xl border border-slate-200">
                        <AvatarFallback className="bg-white text-slate-700 font-bold">{child.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-slate-900">{child.name}</p>
                        <p className="text-sm text-slate-500">
                          {child.age} років • {child.grade} • {child.city}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {child.subjects.map((subject) => (
                            <Badge key={subject} variant="secondary" className="rounded-md bg-white text-slate-600 border border-slate-100 font-normal">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" size="sm" className="rounded-lg border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white" onClick={() => {
                        if (child.accessLink) {
                          navigator.clipboard.writeText(child.accessLink)
                          toast({
                            title: "Посилання скопійовано",
                            description: "Передайте це посилання дитині для входу в кабінет учня",
                          })
                        }
                      }}>
                        <Copy className="mr-2 h-3.5 w-3.5" />
                        Лінк доступу
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-lg border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white" onClick={() => router.push(`/client/progress?child=${child.id}`)}>
                        Прогрес
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/30 p-8 text-center">
                  <Users className="mb-3 h-10 w-10 text-slate-300" />
                  <p className="text-sm text-slate-500 font-medium">Ще немає доданих дітей</p>
                  <p className="text-xs text-slate-400 max-w-xs mt-1">Додайте профілі дітей, щоб відстежувати їх успішність окремо</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900">Звітність</CardTitle>
              <CardDescription className="text-slate-500">Налаштуйте частоту звітів та отримання в Telegram</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-slate-700">Частота звітів</Label>
                <Select defaultValue="weekly">
                  <SelectTrigger className="rounded-xl border-slate-200 focus:ring-slate-900">
                    <SelectValue placeholder="Оберіть період" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200">
                    <SelectItem value="weekly">Щотижня</SelectItem>
                    <SelectItem value="biweekly">Кожні 2 тижні</SelectItem>
                    <SelectItem value="monthly">Щомісяця</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-bold text-slate-900">Підключення Telegram-бота</p>
                    <p className="text-sm text-slate-500">Отримуйте звіти та сповіщення у Telegram</p>
                  </div>
                  <Button variant="outline" className="rounded-lg border-slate-200 text-blue-600 hover:text-blue-700 hover:bg-blue-50">Підключити</Button>
                </div>
                <Separator className="bg-slate-200 my-4" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Switch id="tg-reports" defaultChecked className="data-[state=checked]:bg-slate-900" />
                    <Label htmlFor="tg-reports" className="text-slate-700 font-medium">Надсилати звіти в Telegram</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border-b border-indigo-100/50">
              <CardTitle className="flex items-center gap-2 text-xl font-bold text-slate-900">
                <Share2 className="h-5 w-5 text-indigo-500" />
                Реферальна програма
              </CardTitle>
              <CardDescription className="text-slate-600">Запрошуйте друзів та отримуйте бонуси</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              {/* Referral stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-slate-50 p-4 text-center border border-slate-100">
                  <p className="text-2xl font-bold text-slate-900">{referralStats.invited}</p>
                  <p className="text-sm font-medium text-slate-500">Запрошено</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4 text-center border border-slate-100">
                  <p className="text-2xl font-bold text-slate-900">{referralStats.registered}</p>
                  <p className="text-sm font-medium text-slate-500">Зареєструвалось</p>
                </div>
                <div className="rounded-xl bg-emerald-50 p-4 text-center border border-emerald-100">
                  <p className="text-2xl font-bold text-emerald-600">{referralStats.bonus} грн</p>
                  <p className="text-sm font-medium text-emerald-700/80">Ваш бонус</p>
                </div>
              </div>

              {/* Referral link */}
              <div className="space-y-3">
                <Label className="text-slate-700">Ваше реферальне посилання</Label>
                <div className="flex gap-2">
                  <Input value={referralLink} readOnly className="font-mono text-sm bg-slate-50 rounded-xl border-slate-200 text-slate-600" />
                  <Button variant="outline" size="icon" onClick={copyReferralLink} className="shrink-0 rounded-xl border-slate-200 hover:bg-slate-50">
                    {referralCopied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-500" />}
                  </Button>
                </div>
                <p className="text-xs text-slate-400">
                  Поділіться цим посиланням з друзями. За кожного зареєстрованого користувача ви отримаєте 100 грн
                  бонусу.
                </p>
              </div>

              {/* Share buttons */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 rounded-xl border-slate-200 text-slate-600 hover:text-blue-500 hover:bg-blue-50 hover:border-blue-100">
                  <Share2 className="mr-2 h-4 w-4" />
                  Telegram
                </Button>
                <Button variant="outline" className="flex-1 rounded-xl border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100">
                  <Share2 className="mr-2 h-4 w-4" />
                  Facebook
                </Button>
                <Button variant="outline" className="flex-1 rounded-xl border-slate-200 text-slate-600 hover:text-purple-600 hover:bg-purple-50 hover:border-purple-100">
                  <Share2 className="mr-2 h-4 w-4" />
                  Viber
                </Button>
              </div>

              <div className="rounded-xl bg-emerald-50/80 p-5 border border-emerald-100">
                <p className="text-sm font-bold text-emerald-900 mb-2">Як це працює:</p>
                <ul className="space-y-1.5 text-sm text-emerald-800/90">
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Поділіться посиланням з друзями</li>
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Вони реєструються за вашим посиланням</li>
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Ви отримуєте 100 грн бонусу за кожну реєстрацію</li>
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Ваш друг отримує знижку 10% на перше заняття</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="rounded-2xl border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Безпека</CardTitle>
                <CardDescription className="text-slate-500">Пароль та доступ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Поточний пароль</Label>
                  <Input id="current-password" type="password" className="rounded-xl border-slate-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Новий пароль</Label>
                  <Input id="new-password" type="password" className="rounded-xl border-slate-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Підтвердження</Label>
                  <Input id="confirm-password" type="password" className="rounded-xl border-slate-200" />
                </div>
                <Button className="w-full rounded-xl bg-slate-900 text-white hover:bg-slate-800">Змінити пароль</Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Акаунт</CardTitle>
                <CardDescription className="text-slate-500">Керування даними</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div>
                    <p className="font-medium text-slate-900">Статус акаунту</p>
                    <p className="text-xs text-slate-500 mt-0.5">Активний з 12.02.2024</p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200 shadow-none">
                    <Check className="mr-1 h-3 w-3" /> Активний
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Підтримка</p>
                    <p className="text-xs text-slate-500 mt-0.5">Є питання?</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg border-slate-200" onClick={() => window.open("mailto:support@libitum.education")}>
                    Написати
                  </Button>
                </div>
                
                <Separator className="bg-slate-100" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-600">Видалити акаунт</p>
                    <p className="text-xs text-red-400 mt-0.5">Незворотна дія</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg" onClick={() => toast({ title: "Запит на видалення", description: "Ми надіслали підтвердження на email" })}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900">Сповіщення</CardTitle>
              <CardDescription className="text-slate-500">Налаштування каналів зв'язку</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
                <div>
                  <p className="font-medium text-slate-900">Email сповіщення</p>
                  <p className="text-sm text-slate-500">Важливі оновлення та звіти</p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-slate-900" />
              </div>
              <Separator className="bg-slate-100" />
              <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
                <div>
                  <p className="font-medium text-slate-900">Push сповіщення</p>
                  <p className="text-sm text-slate-500">Миттєві повідомлення про заняття</p>
                </div>
                <Switch className="data-[state=checked]:bg-slate-900" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Dialog open={isAddChildOpen} onOpenChange={setIsAddChildOpen}>
          <DialogContent className="rounded-3xl border-0 shadow-2xl sm:max-w-md">
            <DialogHeader className="pb-4 border-b border-slate-100">
              <DialogTitle className="text-2xl font-bold text-slate-900">Додати дитину</DialogTitle>
              <DialogDescription className="text-slate-500">Введіть інформацію про вашу дитину для контролю прогресу</DialogDescription>
            </DialogHeader>
            <div className="space-y-5 py-4">
              <div className="space-y-2">
                <Label htmlFor="child-name" className="text-slate-700">Ім'я дитини *</Label>
                <Input
                  id="child-name"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="Іван Петренко"
                  className="rounded-xl border-slate-200 focus-visible:ring-slate-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="child-age" className="text-slate-700">Вік *</Label>
                  <Input
                    id="child-age"
                    type="number"
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    placeholder="12"
                    min="3"
                    max="18"
                    className="rounded-xl border-slate-200 focus-visible:ring-slate-900"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="child-grade" className="text-slate-700">Клас</Label>
                  <Input
                    id="child-grade"
                    value={childGrade}
                    onChange={(e) => setChildGrade(e.target.value)}
                    placeholder="6 клас"
                    className="rounded-xl border-slate-200 focus-visible:ring-slate-900"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="child-city" className="text-slate-700">Місто</Label>
                <Input
                  id="child-city"
                  value={childCity}
                  onChange={(e) => setChildCity(e.target.value)}
                  placeholder="Київ"
                  className="rounded-xl border-slate-200 focus-visible:ring-slate-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="child-notes" className="text-slate-700">Цілі/особливості</Label>
                <Input
                  id="child-notes"
                  value={childNotes}
                  onChange={(e) => setChildNotes(e.target.value)}
                  placeholder="Підготовка до вступу, особливі потреби..."
                  className="rounded-xl border-slate-200 focus-visible:ring-slate-900"
                />
              </div>
              <div className="rounded-xl bg-blue-50 p-4 border border-blue-100">
                <p className="text-xs text-blue-800 leading-relaxed">
                  Після додавання ви зможете переглядати прогрес, оцінки та домашні завдання вашої дитини в окремому профілі.
                </p>
              </div>
            </div>
            <DialogFooter className="pt-2">
              <Button variant="outline" onClick={() => setIsAddChildOpen(false)} className="rounded-xl border-slate-200 hover:bg-slate-50 text-slate-600">
                Скасувати
              </Button>
              <Button onClick={handleAddChild} className="rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-md">
                <UserPlus className="mr-2 h-4 w-4" />
                Додати профіль
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
