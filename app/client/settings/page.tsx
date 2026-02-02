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
        <div className="container mx-auto max-w-4xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">Налаштування</h1>
            <p className="text-muted-foreground">Управління вашим профілем та налаштуваннями</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Особиста інформація</CardTitle>
              <CardDescription>Оновіть свої особисті дані</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Завантажити фото
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Ім'я</Label>
                <Input id="name" defaultValue={user?.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" type="tel" placeholder="+380" />
              </div>
              <Button>Зберегти зміни</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Мої діти
                  </CardTitle>
                  <CardDescription>Управління профілями дітей та контроль прогресу</CardDescription>
                </div>
                <Button onClick={() => setIsAddChildOpen(true)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Додати дитину
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {children.length > 0 ? (
                children.map((child) => (
                  <div key={child.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{child.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{child.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {child.age} років • {child.grade} • {child.city}
                        </p>
                        <div className="mt-1 flex gap-1">
                          {child.subjects.map((subject) => (
                            <Badge key={subject} variant="secondary" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => {
                        if (child.accessLink) {
                          navigator.clipboard.writeText(child.accessLink)
                          toast({
                            title: "Посилання скопійовано",
                            description: "Передайте це посилання дитині для входу в кабінет учня",
                          })
                        }
                      }}>
                        <Copy className="mr-2 h-4 w-4" />
                        Посилання для входу
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => router.push(`/client/progress?child=${child.id}`)}>
                        Переглянути прогрес
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8">
                  <Users className="mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Ще немає доданих дітей</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Звітність</CardTitle>
              <CardDescription>Налаштуйте частоту звітів та отримання в Telegram</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Частота звітів</Label>
                <Select defaultValue="weekly">
                  <SelectTrigger>
                    <SelectValue placeholder="Оберіть період" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Щотижня</SelectItem>
                    <SelectItem value="biweekly">Кожні 2 тижні</SelectItem>
                    <SelectItem value="monthly">Щомісяця</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Підключення Telegram-бота</p>
                    <p className="text-sm text-muted-foreground">Отримуйте звіти та сповіщення у Telegram</p>
                  </div>
                  <Button variant="outline">Підключити</Button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch id="tg-reports" defaultChecked />
                    <Label htmlFor="tg-reports">Надсилати звіти в Telegram</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Реферальна програма
              </CardTitle>
              <CardDescription>Запрошуйте друзів та отримуйте бонуси</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Referral stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-muted p-4 text-center">
                  <p className="text-2xl font-bold">{referralStats.invited}</p>
                  <p className="text-sm text-muted-foreground">Запрошено</p>
                </div>
                <div className="rounded-lg bg-muted p-4 text-center">
                  <p className="text-2xl font-bold">{referralStats.registered}</p>
                  <p className="text-sm text-muted-foreground">Зареєструвалось</p>
                </div>
                <div className="rounded-lg bg-primary/10 p-4 text-center">
                  <p className="text-2xl font-bold text-primary">{referralStats.bonus} грн</p>
                  <p className="text-sm text-muted-foreground">Ваш бонус</p>
                </div>
              </div>

              {/* Referral link */}
              <div className="space-y-2">
                <Label>Ваше реферальне посилання</Label>
                <div className="flex gap-2">
                  <Input value={referralLink} readOnly className="font-mono text-sm" />
                  <Button variant="outline" size="icon" onClick={copyReferralLink}>
                    {referralCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Поділіться цим посиланням з друзями. За кожного зареєстрованого користувача ви отримаєте 100 грн
                  бонусу.
                </p>
              </div>

              {/* Share buttons */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Share2 className="mr-2 h-4 w-4" />
                  Telegram
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Share2 className="mr-2 h-4 w-4" />
                  Facebook
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Share2 className="mr-2 h-4 w-4" />
                  Viber
                </Button>
              </div>

              <div className="rounded-lg bg-green-50 p-4">
                <p className="text-sm font-medium text-green-900">Як це працює:</p>
                <ul className="mt-2 space-y-1 text-sm text-green-700">
                  <li>• Поділіться посиланням з друзями</li>
                  <li>• Вони реєструються за вашим посиланням</li>
                  <li>• Ви отримуєте 100 грн бонусу за кожну реєстрацію</li>
                  <li>• Ваш друг отримує знижку 10% на перше заняття</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Безпека</CardTitle>
              <CardDescription>Змініть пароль та налаштування безпеки</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Поточний пароль</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Новий пароль</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Підтвердіть пароль</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button>Змінити пароль</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Акаунт</CardTitle>
              <CardDescription>Керування доступом та даними</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Дата реєстрації</p>
                  <p className="text-sm text-muted-foreground">12 лютого 2024</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Активний
                </div>
              </div>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium">Підтримка</p>
                  <p className="text-sm text-muted-foreground">support@libitum.education</p>
                </div>
                <Button variant="outline" onClick={() => window.open("mailto:support@libitum.education")}>Звернутись</Button>
              </div>
              <Separator />
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium text-destructive">Видалити акаунт</p>
                  <p className="text-sm text-muted-foreground">Цю дію неможливо скасувати</p>
                </div>
                <Button variant="destructive" onClick={() => toast({ title: "Запит на видалення", description: "Ми надіслали підтвердження на email" })}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Видалити
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Сповіщення</CardTitle>
              <CardDescription>Налаштуйте, як ви отримуєте сповіщення</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email сповіщення</p>
                  <p className="text-sm text-muted-foreground">Отримувати сповіщення на email</p>
                </div>
                <Button variant="outline">Увімкнено</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push сповіщення</p>
                  <p className="text-sm text-muted-foreground">Отримувати push-сповіщення</p>
                </div>
                <Button variant="outline">Вимкнено</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Dialog open={isAddChildOpen} onOpenChange={setIsAddChildOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Додати дитину</DialogTitle>
              <DialogDescription>Введіть інформацію про вашу дитину для контролю прогресу</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="child-name">Ім'я дитини *</Label>
                <Input
                  id="child-name"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="Іван Петренко"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="child-age">Вік *</Label>
                <Input
                  id="child-age"
                  type="number"
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value)}
                  placeholder="12"
                  min="3"
                  max="18"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="child-grade">Клас</Label>
                <Input
                  id="child-grade"
                  value={childGrade}
                  onChange={(e) => setChildGrade(e.target.value)}
                  placeholder="6 клас"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="child-city">Місто</Label>
                <Input
                  id="child-city"
                  value={childCity}
                  onChange={(e) => setChildCity(e.target.value)}
                  placeholder="Київ"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="child-notes">Цілі/особливості</Label>
                <Input
                  id="child-notes"
                  value={childNotes}
                  onChange={(e) => setChildNotes(e.target.value)}
                  placeholder="Підготовка до вступу, особливі потреби..."
                />
              </div>
              <div className="rounded-lg bg-blue-50 p-3">
                <p className="text-sm text-blue-900">
                  Після додавання ви зможете переглядати прогрес, оцінки та домашні завдання вашої дитини.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddChildOpen(false)}>
                Скасувати
              </Button>
              <Button onClick={handleAddChild}>
                <UserPlus className="mr-2 h-4 w-4" />
                Додати
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
