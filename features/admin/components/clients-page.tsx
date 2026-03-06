"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Ban, CheckCircle2, Eye, LogIn, Trash2, SlidersHorizontal } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

type AdminClient = {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "blocked"
  role: "parent" | "student" | "solo"
  childName?: string
  totalBookings: number
  activeBookings: number
  completedLessons: number
  joinedDate: string
  balance: number
  rating: number
  lastLogin: string
  spaceStatus: "active" | "inactive"
  unpaidLeads: number
}

const clients: AdminClient[] = [
  {
    id: "1",
    name: "Андрій Шевченко",
    email: "andriy@example.com",
    phone: "+380671234567",
    status: "active",
    role: "parent",
    childName: "Ігор Шевченко",
    totalBookings: 12,
    activeBookings: 2,
    completedLessons: 45,
    joinedDate: "2024-01-10",
    balance: 1500,
    rating: 4.8,
    lastLogin: "2024-03-15T10:30:00Z",
    spaceStatus: "active",
    unpaidLeads: 0,
  },
  {
    id: "2",
    name: "Катерина Бондаренко",
    email: "kateryna@example.com",
    phone: "+380672345678",
    status: "active",
    role: "student",
    totalBookings: 8,
    activeBookings: 1,
    completedLessons: 28,
    joinedDate: "2024-02-15",
    balance: 0,
    rating: 4.5,
    lastLogin: "2024-03-14T15:45:00Z",
    spaceStatus: "active",
    unpaidLeads: 0,
  },
  {
    id: "3",
    name: "Дмитро Ковальчук",
    email: "dmytro@example.com",
    phone: "+380673456789",
    status: "blocked",
    role: "student",
    totalBookings: 3,
    activeBookings: 0,
    completedLessons: 5,
    joinedDate: "2024-03-01",
    balance: -500,
    rating: 3.2,
    lastLogin: "2024-03-01T09:15:00Z",
    spaceStatus: "inactive",
    unpaidLeads: 4, // Боржник
  },
  {
    id: "4",
    name: "Олександра Мороз",
    email: "oleksandra@example.com",
    phone: "+380674567890",
    status: "active",
    role: "solo",
    totalBookings: 15,
    activeBookings: 3,
    completedLessons: 67,
    joinedDate: "2023-12-20",
    balance: 3200,
    rating: 4.9,
    lastLogin: "2024-03-15T11:20:00Z",
    spaceStatus: "active",
    unpaidLeads: 1,
  },
]

export function AdminClientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showDebtorsOnly, setShowDebtorsOnly] = useState(false)

  const filteredClients = clients.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || c.role === roleFilter
    const matchesStatus = statusFilter === "all" || c.status === statusFilter
    const matchesDebtors = showDebtorsOnly ? c.unpaidLeads >= 3 : true

    return matchesSearch && matchesRole && matchesStatus && matchesDebtors
  })

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <SidebarLayout userType="admin">
        <div className="container mx-auto max-w-7xl space-y-6 p-6 font-sans">
          <div className="space-y-1">
            <h1 className="text-3xl font-[700] text-[#121117]">Управління клієнтами</h1>
            <p className="text-[15px] font-[500] text-[#69686f]">Перегляд бази користувачів, фільтрація та управління доступом</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-sm">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#69686f]" />
              <Input
                placeholder="Пошук за ПІБ або email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-[8px] border border-slate-200">
                <Checkbox 
                  id="debtors" 
                  checked={showDebtorsOnly}
                  onCheckedChange={(c) => setShowDebtorsOnly(c as boolean)}
                />
                <Label htmlFor="debtors" className="text-sm font-medium cursor-pointer">Тільки боржники</Label>
              </div>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[140px] h-10 rounded-[8px]">
                  <SelectValue placeholder="Роль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Всі ролі</SelectItem>
                  <SelectItem value="parent">Батько</SelectItem>
                  <SelectItem value="student">Учень</SelectItem>
                  <SelectItem value="solo">Самостійний</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] h-10 rounded-[8px]">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Всі статуси</SelectItem>
                  <SelectItem value="active">Активні</SelectItem>
                  <SelectItem value="blocked">Заблоковані</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card className="rounded-[16px] border-slate-200/80 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Користувач</th>
                    <th className="px-6 py-4 font-semibold">Роль</th>
                    <th className="px-6 py-4 font-semibold">Статус</th>
                    <th className="px-6 py-4 font-semibold">Баланс / Рейтинг</th>
                    <th className="px-6 py-4 font-semibold">Дата реєстрації</th>
                    <th className="px-6 py-4 font-semibold text-right">Дії</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredClients.map((client) => (
                    <ClientTableRow key={client.id} client={client} />
                  ))}
                  {filteredClients.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                        Користувачів не знайдено
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}

function ClientTableRow({ client }: { client: AdminClient }) {
  const { impersonate } = useAuth()
  const { toast } = useToast()
  const [supportConfirmOpen, setSupportConfirmOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const roleLabel = client.role === "parent" ? "Батько" : client.role === "student" ? "Учень" : "Клієнт"

  const handleSupportAccess = () => {
    if (client.status !== "active") return
    impersonate({
      id: client.id,
      name: client.name,
      email: client.email,
      role: "client" as any,
      isVerified: true,
      hasPassedQuiz: true,
      status: "active",
      language: "UA"
    } as any)
    setSupportConfirmOpen(false)
  }

  const handleDeleteAccount = () => {
    // Implement delete logic here via API
    setDeleteConfirmOpen(false)
  }

  return (
    <tr className="hover:bg-slate-50/50 transition-colors bg-white">
      <td className="px-6 py-4">
        <div className="font-semibold text-slate-900">{client.name}</div>
        <div className="text-slate-500 text-xs mt-0.5">{client.email}</div>
        <div className="text-slate-500 text-xs">{client.phone}</div>
      </td>
      <td className="px-6 py-4">
        <Badge variant="outline" className="bg-white font-medium">{roleLabel}</Badge>
        {client.childName && <div className="text-xs text-slate-500 mt-1">Керує: {client.childName}</div>}
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col gap-1.5 items-start">
          <Badge
            variant={client.status === "active" ? "default" : "destructive"}
            className={cn(
              "font-semibold border-0",
              client.status === "active" ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-red-500 text-white"
            )}
          >
            {client.status === "active" ? "Активний" : "Заблокований"}
          </Badge>
          {client.unpaidLeads >= 3 && <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Боржник</Badge>}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className={cn("font-semibold", client.balance < 0 ? "text-red-600" : "text-slate-900")}>
          {client.balance} ₴
        </div>
        <div className="text-slate-500 text-xs mt-0.5">Рейтинг: {client.rating.toFixed(1)}</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-slate-900">{new Date(client.joinedDate).toLocaleDateString("uk-UA")}</div>
        <div className="text-slate-500 text-xs mt-0.5">Вхід: {new Date(client.lastLogin).toLocaleDateString("uk-UA")}</div>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900" title="Повна інформація">
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[24px] border-0 shadow-xl sm:max-w-2xl font-sans max-h-[90vh] overflow-y-auto">
              <DialogHeader className="pb-4 border-b border-slate-100">
                <DialogTitle className="text-2xl font-bold text-slate-900">Деталі клієнта</DialogTitle>
                <DialogDescription>Повна інформація про {client.name}</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4">
                <div className="space-y-4">
                  <div><Label className="text-slate-500">Ім'я ПІБ</Label><p className="font-semibold">{client.name}</p></div>
                  <div><Label className="text-slate-500">Email</Label><p className="font-semibold break-all">{client.email}</p></div>
                  <div><Label className="text-slate-500">Телефон</Label><p className="font-semibold">{client.phone}</p></div>
                  <div><Label className="text-slate-500">Роль</Label><p className="font-semibold">{roleLabel}</p></div>
                  {client.childName && <div><Label className="text-slate-500">Учень під керуванням</Label><p className="font-semibold">{client.childName}</p></div>}
                </div>
                <div className="space-y-4">
                  <div><Label className="text-slate-500">Статус акаунту</Label><p className="font-semibold">{client.status === "active" ? "Активний" : "Заблокований"}</p></div>
                  <div><Label className="text-slate-500">Баланс та рейтинг</Label><p className="font-semibold">{client.balance} ₴ • {client.rating.toFixed(1)} / 5.0</p></div>
                  <div><Label className="text-slate-500">Всього бронювань / Завершено</Label><p className="font-semibold">{client.totalBookings} / {client.completedLessons}</p></div>
                  <div><Label className="text-slate-500">Неоплачені ліди (Борг)</Label><p className="font-semibold text-red-600">{client.unpaidLeads}</p></div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <AlertDialog open={supportConfirmOpen} onOpenChange={setSupportConfirmOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50" title="Увійти як клієнт" disabled={client.status !== "active"}>
                <LogIn className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-[24px]">
              <AlertDialogHeader>
                <AlertDialogTitle>Підтвердити Support Access</AlertDialogTitle>
                <AlertDialogDescription>
                  Ви перейдете в кабінет клієнта {client.name} без зміни його пароля.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Скасувати</AlertDialogCancel>
                <AlertDialogAction onClick={handleSupportAccess} className="bg-indigo-600 hover:bg-indigo-700">Увійти</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {client.status === "blocked" && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50" 
              title="Розблокувати"
              onClick={() => {
                toast({
                  title: "Акаунт розблоковано",
                  description: `Користувач ${client.name} знову має доступ до платформи.`
                })
              }}
            >
              <CheckCircle2 className="h-4 w-4" />
            </Button>
          )}

          <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
             <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50" title="Видалити">
                   <Trash2 className="h-4 w-4" />
                </Button>
             </AlertDialogTrigger>
             <AlertDialogContent className="rounded-[24px]">
                <AlertDialogHeader>
                   <AlertDialogTitle>Видалити акаунт?</AlertDialogTitle>
                   <AlertDialogDescription>
                      Незворотня дія. Акаунт {client.name} буде видалено з бази.
                   </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                   <AlertDialogCancel>Скасувати</AlertDialogCancel>
                   <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">Видалити</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </td>
      </tr>
  )
}
