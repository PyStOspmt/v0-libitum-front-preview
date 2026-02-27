"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Ban, CheckCircle2, Mail, Phone, Eye, LogIn } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"
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
}

export function AdminClientsPage() {
  const [searchQuery, setSearchQuery] = useState("")

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
    },
  ]

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const activeClients = filteredClients.filter((c) => c.status === "active")
  const blockedClients = filteredClients.filter((c) => c.status === "blocked")

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <SidebarLayout userType="admin">
        <div className="container mx-auto max-w-7xl space-y-6 p-6 font-sans">
          <div className="space-y-1">
            <h1 className="text-3xl font-[700] text-[#121117]">Управління клієнтами</h1>
            <p className="text-[15px] font-[500] text-[#69686f]">Перегляд та модерація клієнтів платформи</p>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <CardContent className="p-6">
                <div className="text-[14px] font-[600] text-[#69686f]">Всього клієнтів</div>
                <div className="text-[32px] font-[700] text-[#121117] mt-2">{clients.length}</div>
              </CardContent>
            </Card>
            <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <CardHeader className="pb-3">
                <div className="text-[14px] font-[600] text-[#69686f]">Активні</div>
              </CardHeader>
              <CardContent>
                <div className="text-[32px] font-[700] text-[#00c5a6]">{activeClients.length}</div>
              </CardContent>
            </Card>
            <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <CardHeader className="pb-3">
                <div className="text-[14px] font-[600] text-[#69686f]">Заблоковані</div>
              </CardHeader>
              <CardContent>
                <div className="text-[32px] font-[700] text-red-500">{blockedClients.length}</div>
              </CardContent>
            </Card>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#69686f]" />
            <Input
              placeholder="Пошук за ім'ям або email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-[12px] border-slate-200/80 focus-visible:ring-[#00c5a6] text-[15px]"
            />
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-[#f0f3f3] rounded-[12px] p-1 border-0">
              <TabsTrigger value="all" className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f]">Всі ({filteredClients.length})</TabsTrigger>
              <TabsTrigger value="active" className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f]">Активні ({activeClients.length})</TabsTrigger>
              <TabsTrigger value="blocked" className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f]">Заблоковані ({blockedClients.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredClients.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              {activeClients.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
            </TabsContent>

            <TabsContent value="blocked" className="space-y-4">
              {blockedClients.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}

function ClientCard({ client }: { client: AdminClient }) {
  const { impersonate } = useAuth()
  const [supportConfirmOpen, setSupportConfirmOpen] = useState(false)
  const roleLabel = client.role === "parent" ? "Батько (керує)" : client.role === "student" ? "Учень" : "Клієнт (самостійний)"

  const handleSupportAccess = () => {
    if (client.status !== "active") return
    impersonate({
      id: client.id,
      name: client.name,
      email: client.email,
      role: "client",
      isEmailVerified: true,
      hasPassedQuiz: true,
      status: "active",
      language: "UA",
    })
    setSupportConfirmOpen(false)
  }
  return (
    <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] font-sans transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 space-y-3 min-w-0">
            <div className="flex flex-wrap items-center gap-2 lg:gap-3">
              <div className="w-full sm:w-auto">
                <h3 className="font-[700] text-[18px] text-[#121117] break-words">{client.name}</h3>
                <p className="text-[14px] font-[500] text-[#69686f]">{roleLabel}</p>
              </div>
              <Badge variant={client.status === "active" ? "default" : "destructive"} className={cn(
                "font-[600] border-0",
                client.status === "active" ? "bg-[#00c5a6] text-white" : "bg-red-100 text-red-700"
              )}>
                {client.status === "active" ? "Активний" : "Заблокований"}
              </Badge>
              <Badge variant="outline" className="rounded-[8px] bg-white text-[#121117] border-slate-200/80 font-[500]">{roleLabel}</Badge>
            </div>

            <div className="grid gap-2 text-[14px] md:grid-cols-2 font-[500] text-[#69686f]">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {client.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {client.phone}
              </div>
            </div>

            <div className="flex gap-4 text-[14px] font-[600] text-[#121117] flex-wrap bg-[#f0f3f3]/50 p-3 rounded-[12px] border border-slate-200/80">
              <span className="flex items-center gap-1.5"><span className="text-[#69686f] font-[500]">Всього бронювань:</span> {client.totalBookings}</span>
              <span className="flex items-center gap-1.5"><span className="text-[#69686f] font-[500]">Активні:</span> {client.activeBookings}</span>
              <span className="flex items-center gap-1.5"><span className="text-[#69686f] font-[500]">Завершені заняття:</span> {client.completedLessons}</span>
              <span className="flex items-center gap-1.5"><span className="text-[#69686f] font-[500]">Приєднався:</span> {new Date(client.joinedDate).toLocaleDateString("uk-UA")}</span>
            </div>

            {client.role === "parent" && client.childName && (
              <div className="text-[14px] font-[500] text-[#69686f]">
                Керує учнем: <Badge variant="secondary" className="rounded-[6px] bg-white text-[#121117] border border-slate-200/80 font-[500] ml-1">{client.childName}</Badge>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-2 w-full shrink-0 md:w-auto">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full sm:w-auto rounded-[8px] border-slate-200/80 text-[#121117] font-[600] hover:bg-slate-50 shadow-sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Деталі
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-[24px] border-0 shadow-[0_8px_32px_rgba(0,0,0,0.08)] sm:max-w-xl font-sans">
                <DialogHeader className="pb-4 border-b border-slate-200/80">
                  <DialogTitle className="text-[24px] font-[700] text-[#121117]">Деталі клієнта</DialogTitle>
                  <DialogDescription className="text-[#69686f] font-[500] text-[15px]">Повна інформація про {client.name}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label className="text-[#69686f] font-[500]">Ім'я</Label>
                    <p className="text-[16px] font-[600] text-[#121117] mt-1">{client.name}</p>
                  </div>
                  <div>
                    <Label className="text-[#69686f] font-[500]">Email</Label>
                    <p className="text-[16px] font-[600] text-[#121117] mt-1">{client.email}</p>
                  </div>
                  <div>
                    <Label className="text-[#69686f] font-[500]">Телефон</Label>
                    <p className="text-[16px] font-[600] text-[#121117] mt-1">{client.phone}</p>
                  </div>
                  <div>
                    <Label className="text-[#69686f] font-[500]">Роль</Label>
                    <p className="text-[16px] font-[600] text-[#121117] mt-1">{roleLabel}</p>
                  </div>
                  {client.role === "parent" && client.childName && (
                    <div>
                      <Label className="text-[#69686f] font-[500]">Учень під керуванням</Label>
                      <p className="text-[16px] font-[600] text-[#121117] mt-1">{client.childName}</p>
                    </div>
                  )}
                  <div>
                    <Label className="text-[#69686f] font-[500]">Статус</Label>
                    <p className="text-[16px] font-[600] text-[#121117] mt-1">{client.status === "active" ? "Активний" : "Заблокований"}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#69686f] font-[500]">Support Access</Label>
                    <AlertDialog open={supportConfirmOpen} onOpenChange={setSupportConfirmOpen}>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="w-full justify-start rounded-[8px] font-[600] bg-[#e8fffb] text-[#00a389] hover:bg-[#e8fffb]/80 border-0"
                          disabled={client.status !== "active"}
                        >
                          <LogIn className="mr-2 h-4 w-4" />
                          Увійти в кабінет (режим підтримки)
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-[24px] border-0 shadow-[0_8px_32px_rgba(0,0,0,0.08)] font-sans">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-[20px] font-[700] text-[#121117]">Підтвердити Support Access</AlertDialogTitle>
                          <AlertDialogDescription className="text-[#69686f] font-[500]">
                            Ви перейдете в кабінет клієнта без зміни його пароля. Дія доступна лише для Super Admin.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-[8px] border-slate-200/80 hover:bg-[#f0f3f3] text-[#121117] font-[600]">Скасувати</AlertDialogCancel>
                          <AlertDialogAction onClick={handleSupportAccess} className="rounded-[8px] bg-[#00c5a6] text-white hover:bg-[#00a389] font-[600]">Увійти</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <p className="text-[13px] font-[500] text-[#69686f]">
                      Доступний лише для Super Admin для перегляду кабінету без зміни пароля користувача.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {client.status === "active" ? (
              <Button size="sm" variant="destructive" className="w-full sm:w-auto rounded-[8px] font-[600]">
                <Ban className="mr-2 h-4 w-4" />
                Заблокувати
              </Button>
            ) : (
              <Button size="sm" variant="default" className="w-full sm:w-auto rounded-[8px] bg-[#121117] text-white hover:bg-[#121117]/90 font-[600]">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Розблокувати
              </Button>
            )}
            <AlertDialog open={supportConfirmOpen} onOpenChange={setSupportConfirmOpen}>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="outline" disabled={client.status !== "active"} className="w-full sm:w-auto rounded-[8px] border-slate-200/80 text-[#121117] font-[600] hover:bg-[#e8fffb] hover:text-[#00a389] hover:border-[#00c5a6]/20 shadow-sm">
                  <LogIn className="mr-2 h-4 w-4" />
                  Support Access
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-[24px] border-0 shadow-[0_8px_32px_rgba(0,0,0,0.08)] font-sans">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-[20px] font-[700] text-[#121117]">Підтвердити Support Access</AlertDialogTitle>
                  <AlertDialogDescription className="text-[#69686f] font-[500]">
                    Ви перейдете в кабінет клієнта без зміни його пароля. Дія доступна лише для Super Admin.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-[8px] border-slate-200/80 hover:bg-[#f0f3f3] text-[#121117] font-[600]">Скасувати</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSupportAccess} className="rounded-[8px] bg-[#00c5a6] text-white hover:bg-[#00a389] font-[600]">Увійти</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
