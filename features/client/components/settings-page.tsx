"use client"

import { UserRoles } from "@/graphql/generated/graphql"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus, Copy, Share2, Users, Check, Trash2, Calendar, ShieldAlert, MessageCircle, Mail, AlertTriangle, Key } from "lucide-react"
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
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

import { useAuthContext } from "@/features/auth/context/auth-context"
import { useTelegramVerification } from "@/features/dashboard/hooks/use-telegram-verification"

export function ClientSettingsPage() {
  const { user } = useAuthContext()
  const { toast } = useToast()
  const router = useRouter()
  const [isAddChildOpen, setIsAddChildOpen] = useState(false)
  const [childName, setChildName] = useState("")
  const [childAge, setChildAge] = useState("")
  const [childGrade, setChildGrade] = useState("")
  const [childCity, setChildCity] = useState("")
  const [childNotes, setChildNotes] = useState("")
  const [referralCopied, setReferralCopied] = useState(false)
  const { handleRequestVerification, loading } = useTelegramVerification()

  const [householdChildren, setHouseholdChildren] = useState([
    {
      id: "1",
      name: "Марія Коваленко",
      age: 12,
      grade: "6 клас",
      city: "Київ",
      subjects: ["Англійська", "Математика"],
      notes: "Підготовка до вступу в ліцей",
      accessLink: "https://libitum.education/student/access/token-123",
      relation: "Дитина"
    },
  ])

  const selectableChildren = user
    ? [{ id: user.id, name: user.email, label: user.email || "Я", isParent: true }, ...householdChildren]
    : householdChildren

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
        description: "Заповніть обов'язкові поля",
        variant: "destructive",
      })
      return
    }

    setHouseholdChildren((prev) => [
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
        relation: "Дитина"
      },
    ])

    toast({
      title: "Профіль додано",
      description: `${childName} успішно додано до вашої сім'ї`,
    })

    setIsAddChildOpen(false)
    setChildName("")
    setChildAge("")
    setChildGrade("")
    setChildCity("")
    setChildNotes("")
  }

  return (
    <ProtectedRoute allowedRoles={[UserRoles.Student]}>
      <SidebarLayout userType="client">
        <div className="container mx-auto max-w-4xl space-y-6 sm:space-y-8 p-6 font-sans">
          <div>
            <h1 className="text-3xl font-[700] text-[#121117]">Налаштування</h1>
            <p className="text-[#69686f] mt-1 font-[500]">Управління вашим профілем, сім'єю та безпекою</p>
          </div>

          <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <CardHeader>
              <CardTitle className="text-xl font-[700] text-[#121117]">Особиста інформація</CardTitle>
              <CardDescription className="text-[#69686f] font-[500]">Оновіть свої особисті дані</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                <Avatar className="h-24 w-24 sm:h-20 sm:w-20 rounded-[20px] border-2 border-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] ring-1 ring-slate-100">
                  <AvatarImage src={user?.email} alt={user?.email} />
                  <AvatarFallback className="bg-[#f0f3f3] text-[#69686f] text-2xl sm:text-xl font-[700]">{user?.email?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex items-center sm:mt-4">
                  <Button variant="outline" size="sm" className="rounded-[8px] border-slate-200/80 text-[#121117] font-[600] hover:bg-slate-50 transition-colors">
                    Завантажити фото
                  </Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#121117] font-[600]">Ім'я</Label>
                  <Input id="name" defaultValue={user?.email} className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#121117]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#121117] font-[600]">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email} className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#121117]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[#121117] font-[600]">Телефон</Label>
                  <Input id="phone" type="tel" placeholder="+380" className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#121117]" />
                </div>
              </div>
              <Button className="rounded-[8px] bg-[#121117] text-white hover:bg-[#121117]/90 font-[600] shadow-[0_2px_8px_rgba(0,0,0,0.1)]">Зберегти зміни</Button>
            </CardContent>
          </Card>

          <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl font-[700] text-[#121117]">
                    <Users className="h-5 w-5 text-[#69686f]" />
                    Управління сім'єю
                  </CardTitle>
                  <CardDescription className="text-[#69686f] font-[500] mt-1">Додайте профілі дітей або іншого з батьків</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddChildOpen(true)}
                    className="rounded-[8px] border-slate-200/80 text-[#121117] hover:bg-slate-50 font-[600] w-full sm:w-auto justify-center"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Додати батька/матір
                  </Button>
                  <Button
                    onClick={() => setIsAddChildOpen(true)}
                    className="rounded-[8px] bg-[#00c5a6] text-white hover:bg-[#00a389] font-[600] shadow-[0_2px_8px_rgba(0,197,166,0.2)] w-full sm:w-auto justify-center"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Додати дитину
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {householdChildren.length > 0 ? (
                householdChildren.map((child) => (
                  <div key={child.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[16px] border border-slate-200/80 bg-white p-4 transition-colors hover:border-slate-300">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 rounded-[12px] border border-slate-200/80 bg-[#f0f3f3]">
                        <AvatarFallback className="text-[#121117] font-[700]">{child.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-[700] text-[#121117]">{child.name}</p>
                          <Badge variant="outline" className="text-[10px] py-0 h-5 bg-slate-50 text-slate-500 border-slate-200">{child.relation}</Badge>
                        </div>
                        <p className="text-[13px] font-[500] text-[#69686f] mt-0.5">
                          {child.age} років • {child.grade}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <Button variant="outline" size="sm" className="rounded-[8px] border-slate-200/80 text-[#121117] font-[600] hover:bg-slate-50 w-full sm:w-auto" onClick={() => {
                        if (child.accessLink) {
                          navigator.clipboard.writeText(child.accessLink)
                          toast({
                            title: "Посилання скопійовано",
                            description: "Передайте це посилання дитині для входу в кабінет учня",
                          })
                        }
                      }}>
                        <Copy className="mr-2 h-4 w-4" />
                        Лінк доступу
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-[8px] border-slate-200/80 text-[#121117] font-[600] hover:bg-slate-50 w-full sm:w-auto" onClick={() => router.push(`/client/progress?child=${child.id}`)}>
                        Прогрес
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-slate-200/80 bg-slate-50/50 p-8 text-center">
                  <Users className="mb-3 h-10 w-10 text-slate-300" />
                  <p className="text-[14px] font-[600] text-[#121117]">Ще немає доданих членів сім'ї</p>
                  <p className="text-[13px] font-[500] text-[#69686f] max-w-xs mt-1">Додайте профілі дітей або іншого з батьків для спільного керування</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <CardHeader>
                <CardTitle className="text-xl font-[700] text-[#121117]">Підтримка та зв'язок</CardTitle>
                <CardDescription className="text-[#69686f] font-[500]">Допомога з платформою</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-[16px] bg-blue-50 border border-blue-100 p-5">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-[600] text-blue-900">Чат з адміністратором</h4>
                      <p className="text-[13px] text-blue-700/80 mt-1 mb-3">Вирішення будь-яких питань щодо занять, оплат або роботи платформи.</p>
                      <Button className="w-full sm:w-auto rounded-[8px] bg-blue-600 hover:bg-blue-700 text-white font-[600]" onClick={() => window.open('https://t.me/libitum_admin', '_blank')}>
                        Написати в Telegram
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-[12px] border border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <Mail className="h-4 w-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-[600] text-[#121117] text-[14px]">Email підтримки</p>
                      <p className="text-[12px] text-slate-500">support@libitum.education</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => {
                    navigator.clipboard.writeText('support@libitum.education');
                    toast({ title: "Email скопійовано" });
                  }}>
                    <Copy className="h-4 w-4 text-slate-400" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <CardHeader>
                <CardTitle className="text-xl font-[700] text-[#121117] flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-slate-600" />
                  Безпека та Акаунт
                </CardTitle>
                <CardDescription className="text-[#69686f] font-[500]">Налаштування доступу</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-[#121117] font-[600]">Зміна пароля</Label>
                  <Button variant="outline" className="w-full justify-start text-left font-[500] text-[#121117] border-slate-200/80 h-[44px]">
                    <Key className="mr-2 h-4 w-4 text-slate-500" />
                    Оновити пароль
                  </Button>
                </div>

                <Separator className="bg-slate-200/80" />

                <div className="space-y-4">
                  <div>
                    <p className="text-[12px] font-[500] text-[#69686f] uppercase tracking-wider mb-2">Небезпечна зона</p>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-[600] text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 h-[44px]"
                        onClick={() => toast({ title: "Запит на видалення", description: "Ми надіслали підтвердження на email" })}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Видалити спейс (усі дані сім'ї)
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left font-[500] text-slate-500 hover:text-red-600 hover:bg-red-50 h-[44px]"
                        onClick={() => toast({ title: "Запит на видалення", description: "Інструкції надіслано на email" })}
                      >
                        Видалити лише мій акаунт
                      </Button>
                    </div>
                    <p className="text-[12px] text-slate-500 mt-2 leading-relaxed">
                      Видалення спейсу призведе до втрати всіх даних про заняття, фінанси та прогрес усіх членів сім'ї. Ця дія незворотна.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Dialog open={isAddChildOpen} onOpenChange={setIsAddChildOpen}>
          <DialogContent className="rounded-[24px] border-0 shadow-[0_8px_32px_rgba(0,0,0,0.08)] sm:max-w-md font-sans p-6 sm:p-8">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-[24px] font-[700] text-[#121117]">Додати члена сім'ї</DialogTitle>
              <DialogDescription className="text-[#69686f] font-[500] text-[15px]">Введіть інформацію для створення окремого профілю</DialogDescription>
            </DialogHeader>
            <div className="space-y-5 py-2">
              <div className="space-y-2">
                <Label htmlFor="child-name" className="text-[#121117] font-[600]">Ім'я *</Label>
                <Input
                  id="child-name"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="Іван Петренко"
                  className="h-[44px] rounded-[12px] border-slate-200/80 focus-visible:ring-[#121117]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="child-age" className="text-[#121117] font-[600]">Вік *</Label>
                  <Input
                    id="child-age"
                    type="number"
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    placeholder="12"
                    min="3"
                    max="99"
                    className="h-[44px] rounded-[12px] border-slate-200/80 focus-visible:ring-[#121117]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="child-grade" className="text-[#121117] font-[600]">Клас / Статус</Label>
                  <Input
                    id="child-grade"
                    value={childGrade}
                    onChange={(e) => setChildGrade(e.target.value)}
                    placeholder="6 клас"
                    className="h-[44px] rounded-[12px] border-slate-200/80 focus-visible:ring-[#121117]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="child-city" className="text-[#121117] font-[600]">Місто</Label>
                <Input
                  id="child-city"
                  value={childCity}
                  onChange={(e) => setChildCity(e.target.value)}
                  placeholder="Київ"
                  className="h-[44px] rounded-[12px] border-slate-200/80 focus-visible:ring-[#121117]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="child-notes" className="text-[#121117] font-[600]">Додаткова інформація</Label>
                <Input
                  id="child-notes"
                  value={childNotes}
                  onChange={(e) => setChildNotes(e.target.value)}
                  placeholder="Цілі, особливості..."
                  className="h-[44px] rounded-[12px] border-slate-200/80 focus-visible:ring-[#121117]"
                />
              </div>
            </div>
            <DialogFooter className="mt-4 gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setIsAddChildOpen(false)} className="h-[44px] rounded-[12px] border-slate-200/80 hover:bg-slate-50 text-[#121117] font-[600] w-full sm:w-auto px-6">
                Скасувати
              </Button>
              <Button onClick={handleAddChild} className="h-[44px] rounded-[12px] bg-[#121117] text-white hover:bg-[#121117]/90 font-[600] w-full sm:w-auto px-6">
                Створити профіль
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
