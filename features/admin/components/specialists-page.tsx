"use client"

import { LocaleLink } from "@/components/locale-link"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAuth } from "@/lib/auth-context"
import { UserRoles } from "@/features/auth/types/auth.types"
import { Search, CheckCircle2, XCircle, Ban, Eye, Mail, Phone, LogIn, Settings2, ExternalLink, MapPin, Layers3 } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

type AdminSpecialist = {
  id: string
  name: string
  email: string
  phone: string
  specialization: string
  subjects: string[]
  verified: boolean
  rating: number
  totalLessons: number
  status: "active" | "pending" | "blocked"
  joinedDate: string
  price: string
  location: string
  formats: string[]
  isSearching: boolean
}

export function AdminSpecialistsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const specialists = [
    {
      id: "1",
      name: "Олена Іваненко",
      email: "olena@example.com",
      phone: "+380501234567",
      specialization: "Репетитор",
      subjects: ["Математика", "Фізика"],
      verified: true,
      rating: 4.8,
      totalLessons: 156,
      status: "active",
      joinedDate: "2024-01-15",
      price: "300-500 ₴/год",
      location: "Київ",
      formats: ["Онлайн", "Офлайн"],
      isSearching: true,
    },
    {
      id: "2",
      name: "Петро Коваль",
      email: "petro@example.com",
      phone: "+380502345678",
      specialization: "Психолог",
      subjects: ["Дитяча психологія"],
      verified: true,
      rating: 4.9,
      totalLessons: 89,
      status: "active",
      joinedDate: "2024-02-20",
      price: "600-800 ₴/год",
      location: "Львів",
      formats: ["Онлайн"],
      isSearching: true,
    },
    {
      id: "3",
      name: "Марія Петренко",
      email: "maria@example.com",
      phone: "+380503456789",
      specialization: "Логопед",
      subjects: ["Корекція мовлення"],
      verified: false,
      rating: 0,
      totalLessons: 0,
      status: "pending",
      joinedDate: "2024-03-10",
      price: "400-600 ₴/год",
      location: "Одеса",
      formats: ["Онлайн", "Офлайн"],
      isSearching: false,
    },
    {
      id: "4",
      name: "Іван Сидоренко",
      email: "ivan@example.com",
      phone: "+380504567890",
      specialization: "Репетитор",
      subjects: ["Англійська мова", "Німецька мова"],
      verified: true,
      rating: 4.7,
      totalLessons: 234,
      status: "active",
      joinedDate: "2023-11-05",
      price: "350-550 ₴/год",
      location: "Дніпро",
      formats: ["Онлайн", "Парні"],
      isSearching: true,
    },
    {
      id: "5",
      name: "Анна Мельник",
      email: "anna@example.com",
      phone: "+380505678901",
      specialization: "Репетитор",
      subjects: ["Українська мова", "Література"],
      verified: false,
      rating: 0,
      totalLessons: 0,
      status: "blocked",
      joinedDate: "2024-02-28",
      price: "300-450 ₴/год",
      location: "Харків",
      formats: ["Офлайн"],
      isSearching: false,
    },
  ] satisfies AdminSpecialist[]

  const filteredSpecialists = specialists.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.subjects.some((sub) => sub.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const activeSpecialists = filteredSpecialists.filter((s) => s.status === "active")
  const pendingSpecialists = filteredSpecialists.filter((s) => s.status === "pending")
  const blockedSpecialists = filteredSpecialists.filter((s) => s.status === "blocked")

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <SidebarLayout userType="admin">
        <div className="container mx-auto max-w-7xl space-y-6 p-6 font-sans">
          <div className="space-y-1">
            <h1 className="text-3xl font-[700] text-[#121117]">Управління спеціалістами</h1>
            <p className="text-[15px] font-[500] text-[#69686f]">Перегляд та модерація спеціалістів платформи</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Card className="rounded-[16px] border-slate-200/80 px-0 py-0 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <CardHeader className="px-3 pt-2.5 pb-1 sm:px-4 sm:pt-3">
                <CardTitle className="text-[12px] font-[600] text-[#69686f]">Всього</CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-2.5 sm:px-4 sm:pb-3">
                <div className="text-[22px] font-[700] leading-none text-[#121117]">{specialists.length}</div>
              </CardContent>
            </Card>
            <Card className="rounded-[16px] border-slate-200/80 px-0 py-0 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <CardHeader className="px-3 pt-2.5 pb-1 sm:px-4 sm:pt-3">
                <CardTitle className="text-[12px] font-[600] text-[#69686f]">Активні</CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-2.5 sm:px-4 sm:pb-3">
                <div className="text-[22px] font-[700] leading-none text-[#00c5a6]">{activeSpecialists.length}</div>
              </CardContent>
            </Card>
            <Card className="rounded-[16px] border-slate-200/80 px-0 py-0 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <CardHeader className="px-3 pt-2.5 pb-1 sm:px-4 sm:pt-3">
                <CardTitle className="text-[12px] font-[600] text-[#69686f]">Очікують</CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-2.5 sm:px-4 sm:pb-3">
                <div className="text-[22px] font-[700] leading-none text-orange-500">{pendingSpecialists.length}</div>
              </CardContent>
            </Card>
            <Card className="rounded-[16px] border-slate-200/80 px-0 py-0 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <CardHeader className="px-3 pt-2.5 pb-1 sm:px-4 sm:pt-3">
                <CardTitle className="text-[12px] font-[600] text-[#69686f]">Заблоковані</CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-2.5 sm:px-4 sm:pb-3">
                <div className="text-[22px] font-[700] leading-none text-red-500">{blockedSpecialists.length}</div>
              </CardContent>
            </Card>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#69686f]" />
            <Input
              placeholder="Пошук за ім'ям, email або предметом..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-[12px] border-slate-200/80 focus-visible:ring-[#00c5a6] text-[15px]"
            />
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-[#f0f3f3] rounded-[12px] p-1 border-0">
              <TabsTrigger value="all" className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f]">Всі ({filteredSpecialists.length})</TabsTrigger>
              <TabsTrigger value="active" className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f]">Активні ({activeSpecialists.length})</TabsTrigger>
              <TabsTrigger value="pending" className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f]">Очікують ({pendingSpecialists.length})</TabsTrigger>
              <TabsTrigger value="blocked" className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f]">Заблоковані ({blockedSpecialists.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredSpecialists.map((specialist) => (
                <SpecialistCard key={specialist.id} specialist={specialist} />
              ))}
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              {activeSpecialists.map((specialist) => (
                <SpecialistCard key={specialist.id} specialist={specialist} />
              ))}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              {pendingSpecialists.map((specialist) => (
                <SpecialistCard key={specialist.id} specialist={specialist} />
              ))}
            </TabsContent>

            <TabsContent value="blocked" className="space-y-4">
              {blockedSpecialists.map((specialist) => (
                <SpecialistCard key={specialist.id} specialist={specialist} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}

function SpecialistCard({ specialist }: { specialist: AdminSpecialist }) {
  const [confirmAction, setConfirmAction] = useState<"approve" | "reject" | "block" | null>(null)
  const [rejectReason, setRejectReason] = useState("")
  const { impersonate } = useAuth()
  const { toast } = useToast()

  const handleImpersonate = () => {
    if (specialist.status === "blocked") return
    const now = new Date().toISOString()
    impersonate({
      id: specialist.id,
      name: specialist.name,
      email: specialist.email,
      role: UserRoles.SPECIALIST,
      isVerified: true,
      createdAt: now,
      updatedAt: now,
      legacyRole: "specialist",
    })
  }
  return (
    <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] font-sans transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex-1 space-y-3 min-w-0">
            <div className="flex flex-wrap items-center gap-2 lg:gap-3">
              <div className="w-full sm:w-auto">
                <h3 className="font-[700] text-[18px] text-[#121117] break-words">{specialist.name}</h3>
                <p className="text-[14px] font-[500] text-[#69686f]">{specialist.specialization}</p>
              </div>
              {specialist.verified && (
                <Badge variant="secondary" className="gap-1 bg-[#e8fffb] text-[#00a389] border-0 font-[600]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Верифікований
                </Badge>
              )}
              <Badge
                variant={
                  specialist.status === "active"
                    ? "default"
                    : specialist.status === "pending"
                      ? "secondary"
                      : "destructive"
                }
                className={cn(
                  "font-[600] border-0",
                  specialist.status === "active" ? "bg-[#00c5a6] text-white" :
                    specialist.status === "pending" ? "bg-orange-100 text-orange-700" :
                      "bg-red-100 text-red-700"
                )}
              >
                {specialist.status === "active"
                  ? "Активний"
                  : specialist.status === "pending"
                    ? "Очікує"
                    : "Заблокований"}
              </Badge>
            </div>

            <div className="grid gap-2 text-[14px] md:grid-cols-2 font-[500] text-[#69686f]">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {specialist.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {specialist.phone}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {specialist.location}
              </div>
              <div className="flex items-center gap-2">
                <Layers3 className="h-4 w-4" />
                {specialist.formats.join(", ")}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {specialist.subjects.map((subject: string) => (
                <Badge key={subject} variant="outline" className="rounded-[8px] bg-white text-[#121117] border-slate-200/80 font-[500] px-3 py-1">
                  {subject}
                </Badge>
              ))}
            </div>

            <div className="flex gap-4 text-[14px] font-[600] text-[#121117] flex-wrap bg-[#f0f3f3]/50 p-3 rounded-[12px] border border-slate-200/80">
              <span className="flex items-center gap-1.5"><span className="text-[#69686f] font-[500]">Рейтинг:</span> {specialist.rating > 0 ? specialist.rating : "Немає"}</span>
              <span className="flex items-center gap-1.5"><span className="text-[#69686f] font-[500]">Занять:</span> {specialist.totalLessons}</span>
              <span className="flex items-center gap-1.5"><span className="text-[#69686f] font-[500]">Ціна:</span> {specialist.price}</span>
              <span className="flex items-center gap-1.5"><span className="text-[#69686f] font-[500]">Статус пошуку:</span> {specialist.isSearching ? "Шукає учнів" : "Пауза"}</span>
              <span className="flex items-center gap-1.5"><span className="text-[#69686f] font-[500]">Приєднався:</span> {new Date(specialist.joinedDate).toLocaleDateString("uk-UA")}</span>
            </div>
          </div>

          <div className="w-full xl:w-[280px] shrink-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-2 rounded-[16px] border border-slate-200/80 bg-[#f8f9fa] p-3">
              <LocaleLink href="/specialist/profile" className="w-full">
                <Button variant="outline" size="sm" className="w-full justify-start rounded-[8px] border-slate-200/80 text-[#121117] font-[600] hover:bg-slate-50 shadow-sm">
                  <Settings2 className="mr-2 h-4 w-4" />
                  Налаштувати профіль
                </Button>
              </LocaleLink>
              <LocaleLink href="/specialists" className="w-full">
                <Button variant="outline" size="sm" className="w-full justify-start rounded-[8px] border-slate-200/80 text-[#121117] font-[600] hover:bg-slate-50 shadow-sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Відкрити каталог
                </Button>
              </LocaleLink>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full justify-start rounded-[8px] border-slate-200/80 text-[#121117] font-[600] hover:bg-slate-50 shadow-sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Деталі
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-[24px] border-0 shadow-[0_8px_32px_rgba(0,0,0,0.08)] sm:max-w-xl font-sans">
                <DialogHeader className="pb-4 border-b border-slate-200/80">
                  <DialogTitle className="text-[24px] font-[700] text-[#121117]">Деталі спеціаліста</DialogTitle>
                  <DialogDescription className="text-[#69686f] font-[500] text-[15px]">Повна інформація про {specialist.name}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label className="text-[#69686f] font-[500]">Ім'я</Label>
                    <p className="text-[16px] font-[600] text-[#121117] mt-1">{specialist.name}</p>
                  </div>
                  <div>
                    <Label className="text-[#69686f] font-[500]">Email</Label>
                    <p className="text-[16px] font-[600] text-[#121117] mt-1">{specialist.email}</p>
                  </div>
                  <div>
                    <Label className="text-[#69686f] font-[500]">Телефон</Label>
                    <p className="text-[16px] font-[600] text-[#121117] mt-1">{specialist.phone}</p>
                  </div>
                  <div>
                    <Label className="text-[#69686f] font-[500]">Спеціалізація</Label>
                    <p className="text-[16px] font-[600] text-[#121117] mt-1">{specialist.specialization}</p>
                  </div>
                  <div>
                    <Label className="text-[#69686f] font-[500]">Локація</Label>
                    <p className="text-[16px] font-[600] text-[#121117] mt-1">{specialist.location}</p>
                  </div>
                  <div>
                    <Label className="text-[#69686f] font-[500]">Формати</Label>
                    <p className="text-[16px] font-[600] text-[#121117] mt-1">{specialist.formats.join(", ")}</p>
                  </div>
                  <div>
                    <Label className="text-[#69686f] font-[500]">Статус пошуку</Label>
                    <p className="text-[16px] font-[600] text-[#121117] mt-1">{specialist.isSearching ? "Активно шукає учнів" : "Тимчасово призупинив набір"}</p>
                  </div>
                  <div>
                    <Label className="text-[#69686f] font-[500]">Предмети</Label>
                    <p className="text-[16px] font-[600] text-[#121117] mt-1">{specialist.subjects.join(", ")}</p>
                  </div>
                  <div>
                    <Label className="text-[#69686f] font-[500]">Про себе (заявка)</Label>
                    <p className="text-[15px] font-[500] text-[#121117] bg-[#f0f3f3]/50 p-3 rounded-[12px] mt-1">
                      Ціна: {specialist.price} • Рейтинг: {specialist.rating || "Немає"} • Занять: {specialist.totalLessons}
                    </p>
                  </div>
                  <div>
                    <Label className="text-[#69686f] font-[500]">Документи</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="rounded-[8px] border-slate-200/80 text-[#121117] font-[600] hover:bg-slate-50">
                        <Eye className="mr-2 h-4 w-4" />
                        Диплом
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-[8px] border-slate-200/80 text-[#121117] font-[600] hover:bg-slate-50">
                        <Eye className="mr-2 h-4 w-4" />
                        Сертифікат
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#69686f] font-[500]">Support Access</Label>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full justify-start rounded-[8px] font-[600] bg-[#e8fffb] text-[#00a389] hover:bg-[#e8fffb]/80 border-0"
                      onClick={handleImpersonate}
                      disabled={specialist.status === "blocked"}
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      Увійти як спеціаліст (підтримка)
                    </Button>
                    <p className="text-[13px] font-[500] text-[#69686f]">
                      Доступ лише для Super Admin. Без зміни пароля спеціаліста.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {specialist.status === "pending" && (
              <div className="contents">
                <AlertDialog open={confirmAction === "approve"} onOpenChange={(open) => setConfirmAction(open ? "approve" : null)}>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="default" className="w-full justify-start rounded-[8px] bg-[#00c5a6] text-white hover:bg-[#00a389] font-[600] shadow-[0_2px_8px_rgba(0,197,166,0.2)]">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Підтвердити
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-[24px] border-0 shadow-[0_8px_32px_rgba(0,0,0,0.08)] font-sans">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-[20px] font-[700] text-[#121117]">Підтвердити спеціаліста</AlertDialogTitle>
                      <AlertDialogDescription className="text-[#69686f] font-[500]">Статус буде змінено на active.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="rounded-[8px] border-slate-200/80 hover:bg-[#f0f3f3] text-[#121117] font-[600]">Скасувати</AlertDialogCancel>
                      <AlertDialogAction onClick={() => setConfirmAction(null)} className="rounded-[8px] bg-[#00c5a6] text-white hover:bg-[#00a389] font-[600]">Підтвердити</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="destructive" className="w-full justify-start rounded-[8px] font-[600]">
                      <XCircle className="mr-2 h-4 w-4" />
                      Відхилити
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-[24px] border-0 shadow-[0_8px_32px_rgba(0,0,0,0.08)] font-sans">
                    <DialogHeader>
                      <DialogTitle className="text-[20px] font-[700] text-[#121117]">Відхилити спеціаліста</DialogTitle>
                      <DialogDescription className="text-[#69686f] font-[500]">Вкажіть причину відхилення.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2">
                      <Label className="text-[#121117] font-[600]">Причина</Label>
                      <Input
                        placeholder="Наприклад: не пройшов перевірку документів"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <Button variant="outline" onClick={() => setRejectReason("")} className="rounded-[8px] border-slate-200/80 hover:bg-[#f0f3f3] text-[#121117] font-[600]">Скасувати</Button>
                      <Button variant="destructive" onClick={() => setRejectReason("")} className="rounded-[8px] font-[600]">Відхилити</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {specialist.status !== "blocked" ? (
              <AlertDialog open={confirmAction === "block"} onOpenChange={(open) => setConfirmAction(open ? "block" : null)}>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="outline" className="w-full justify-start rounded-[8px] border-red-200 text-red-600 hover:bg-red-50 font-[600]">
                    <Ban className="mr-2 h-4 w-4" />
                    Заблокувати
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-[24px] border-0 shadow-[0_8px_32px_rgba(0,0,0,0.08)] font-sans">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-[20px] font-[700] text-[#121117]">Заблокувати спеціаліста?</AlertDialogTitle>
                    <AlertDialogDescription className="text-[#69686f] font-[500]">Він втратить доступ до кабінету до розблокування.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-[8px] border-slate-200/80 hover:bg-[#f0f3f3] text-[#121117] font-[600]">Скасувати</AlertDialogCancel>
                    <AlertDialogAction onClick={() => setConfirmAction(null)} className="rounded-[8px] bg-red-600 text-white hover:bg-red-700 font-[600]">Заблокувати</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full justify-start rounded-[8px] border-emerald-200 text-emerald-600 hover:bg-emerald-50 font-[600]"
                onClick={() => {
                  toast({
                    title: "Акаунт розблоковано",
                    description: `Спеціаліст ${specialist.name} знову має доступ до платформи.`
                  })
                }}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Розблокувати
              </Button>
            )}

            <Button size="sm" variant="secondary" onClick={handleImpersonate} disabled={specialist.status === "blocked"} className="w-full justify-start rounded-[8px] font-[600] bg-[#e8fffb] text-[#00a389] hover:bg-[#e8fffb]/80 border-0">
              <LogIn className="mr-2 h-4 w-4" />
              Support Access
            </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
