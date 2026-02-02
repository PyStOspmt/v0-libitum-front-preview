"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Ban, CheckCircle2, Mail, Phone, Eye, LogIn } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
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

export default function AdminClientsPage() {
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
        <div className="container mx-auto max-w-7xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">Управління клієнтами</h1>
            <p className="text-muted-foreground">Перегляд та модерація клієнтів платформи</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="text-sm font-medium text-muted-foreground">Всього клієнтів</div>
                <div className="text-2xl font-bold">{clients.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-sm font-medium text-muted-foreground">Активні</div>
                <div className="text-2xl font-bold text-green-600">{activeClients.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-sm font-medium text-muted-foreground">Заблоковані</div>
                <div className="text-2xl font-bold text-red-600">{blockedClients.length}</div>
              </CardContent>
            </Card>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Пошук за ім'ям або email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">Всі ({filteredClients.length})</TabsTrigger>
              <TabsTrigger value="active">Активні ({activeClients.length})</TabsTrigger>
              <TabsTrigger value="blocked">Заблоковані ({blockedClients.length})</TabsTrigger>
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
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-semibold">{client.name}</h3>
                <p className="text-sm text-muted-foreground">{roleLabel}</p>
              </div>
              <Badge variant={client.status === "active" ? "default" : "destructive"}>
                {client.status === "active" ? "Активний" : "Заблокований"}
              </Badge>
              <Badge variant="outline">{roleLabel}</Badge>
            </div>

            <div className="grid gap-2 text-sm md:grid-cols-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                {client.email}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                {client.phone}
              </div>
            </div>

            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Всього бронювань: {client.totalBookings}</span>
              <span>Активні: {client.activeBookings}</span>
              <span>Завершені заняття: {client.completedLessons}</span>
              <span>Приєднався: {new Date(client.joinedDate).toLocaleDateString("uk-UA")}</span>
            </div>

            {client.role === "parent" && client.childName && (
              <div className="text-sm text-muted-foreground">
                Керує учнем: <Badge variant="secondary">{client.childName}</Badge>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Деталі
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Деталі клієнта</DialogTitle>
                  <DialogDescription>Повна інформація про {client.name}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Ім'я</Label>
                    <p className="text-sm">{client.name}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="text-sm">{client.email}</p>
                  </div>
                  <div>
                    <Label>Телефон</Label>
                    <p className="text-sm">{client.phone}</p>
                  </div>
                  <div>
                    <Label>Роль</Label>
                    <p className="text-sm">{roleLabel}</p>
                  </div>
                  {client.role === "parent" && client.childName && (
                    <div>
                      <Label>Учень під керуванням</Label>
                      <p className="text-sm">{client.childName}</p>
                    </div>
                  )}
                  <div>
                    <Label>Статус</Label>
                    <p className="text-sm">{client.status === "active" ? "Активний" : "Заблокований"}</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Support Access</Label>
                    <AlertDialog open={supportConfirmOpen} onOpenChange={setSupportConfirmOpen}>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="w-full justify-start"
                          disabled={client.status !== "active"}
                        >
                          <LogIn className="mr-2 h-4 w-4" />
                          Увійти в кабінет (режим підтримки)
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Підтвердити Support Access</AlertDialogTitle>
                          <AlertDialogDescription>
                            Ви перейдете в кабінет клієнта без зміни його пароля. Дія доступна лише для Super Admin.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Скасувати</AlertDialogCancel>
                          <AlertDialogAction onClick={handleSupportAccess}>Увійти</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <p className="text-xs text-muted-foreground">
                      Доступний лише для Super Admin для перегляду кабінету без зміни пароля користувача.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {client.status === "active" ? (
              <Button size="sm" variant="destructive">
                <Ban className="mr-2 h-4 w-4" />
                Заблокувати
              </Button>
            ) : (
              <Button size="sm" variant="default">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Розблокувати
              </Button>
            )}
            <AlertDialog open={supportConfirmOpen} onOpenChange={setSupportConfirmOpen}>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="outline" disabled={client.status !== "active"}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Support Access
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Підтвердити Support Access</AlertDialogTitle>
                  <AlertDialogDescription>
                    Ви перейдете в кабінет клієнта без зміни його пароля. Дія доступна лише для Super Admin.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Скасувати</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSupportAccess}>Увійти</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
