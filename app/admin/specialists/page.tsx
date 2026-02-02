"use client"

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
import { Search, CheckCircle2, XCircle, Ban, Eye, Mail, Phone, LogIn } from "lucide-react"
import { useState } from "react"

export default function AdminSpecialistsPage() {
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
    },
  ]

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
        <div className="container mx-auto max-w-7xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">Управління спеціалістами</h1>
            <p className="text-muted-foreground">Перегляд та модерація спеціалістів платформи</p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Всього</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{specialists.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Активні</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{activeSpecialists.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Очікують</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{pendingSpecialists.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Заблоковані</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{blockedSpecialists.length}</div>
              </CardContent>
            </Card>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Пошук за ім'ям, email або предметом..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">Всі ({filteredSpecialists.length})</TabsTrigger>
              <TabsTrigger value="active">Активні ({activeSpecialists.length})</TabsTrigger>
              <TabsTrigger value="pending">Очікують ({pendingSpecialists.length})</TabsTrigger>
              <TabsTrigger value="blocked">Заблоковані ({blockedSpecialists.length})</TabsTrigger>
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

function SpecialistCard({ specialist }: { specialist: any }) {
  const { impersonate } = useAuth()
  const [confirmAction, setConfirmAction] = useState<"block" | "unblock" | "approve" | "reject" | null>(null)
  const [rejectReason, setRejectReason] = useState("")
  const handleImpersonate = () => {
    if (specialist.status === "blocked") return
    impersonate({
      id: specialist.id,
      name: specialist.name,
      email: specialist.email,
      role: "specialist",
      isEmailVerified: true,
      hasPassedQuiz: true,
      status: "active",
      language: "UA",
    })
  }
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-semibold">{specialist.name}</h3>
                <p className="text-sm text-muted-foreground">{specialist.specialization}</p>
              </div>
              {specialist.verified && (
                <Badge variant="secondary" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
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
              >
                {specialist.status === "active"
                  ? "Активний"
                  : specialist.status === "pending"
                    ? "Очікує"
                    : "Заблокований"}
              </Badge>
            </div>

            <div className="grid gap-2 text-sm md:grid-cols-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                {specialist.email}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                {specialist.phone}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {specialist.subjects.map((subject: string) => (
                <Badge key={subject} variant="outline">
                  {subject}
                </Badge>
              ))}
            </div>

            <div className="flex gap-4 text-sm text-muted-foreground flex-wrap">
              <span>Рейтинг: {specialist.rating > 0 ? specialist.rating : "Немає"}</span>
              <span>Занять: {specialist.totalLessons}</span>
              <span>Ціна: {specialist.price}</span>
              <span>Приєднався: {new Date(specialist.joinedDate).toLocaleDateString("uk-UA")}</span>
            </div>
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
                  <DialogTitle>Деталі спеціаліста</DialogTitle>
                  <DialogDescription>Повна інформація про {specialist.name}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Ім'я</Label>
                    <p className="text-sm">{specialist.name}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="text-sm">{specialist.email}</p>
                  </div>
                  <div>
                    <Label>Телефон</Label>
                    <p className="text-sm">{specialist.phone}</p>
                  </div>
                  <div>
                    <Label>Спеціалізація</Label>
                    <p className="text-sm">{specialist.specialization}</p>
                  </div>
                  <div>
                    <Label>Предмети</Label>
                    <p className="text-sm">{specialist.subjects.join(", ")}</p>
                  </div>
                  <div>
                    <Label>Про себе (заявка)</Label>
                    <p className="text-sm text-muted-foreground">
                      Ціна: {specialist.price} • Рейтинг: {specialist.rating || "Немає"} • Занять: {specialist.totalLessons}
                    </p>
                  </div>
                  <div>
                    <Label>Документи</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Диплом
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Сертифікат
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Support Access</Label>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full justify-start"
                      onClick={handleImpersonate}
                      disabled={specialist.status === "blocked"}
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      Увійти як спеціаліст (підтримка)
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Доступ лише для Super Admin. Без зміни пароля спеціаліста.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {specialist.status === "pending" && (
              <div className="flex gap-2">
                <AlertDialog open={confirmAction === "approve"} onOpenChange={(open) => setConfirmAction(open ? "approve" : null)}>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="default">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Підтвердити
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Підтвердити спеціаліста</AlertDialogTitle>
                      <AlertDialogDescription>Статус буде змінено на active.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Скасувати</AlertDialogCancel>
                      <AlertDialogAction onClick={() => setConfirmAction(null)}>Підтвердити</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="destructive">
                      <XCircle className="mr-2 h-4 w-4" />
                      Відхилити
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Відхилити спеціаліста</DialogTitle>
                      <DialogDescription>Вкажіть причину відхилення.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2">
                      <Label>Причина</Label>
                      <Input
                        placeholder="Наприклад: не пройшов перевірку документів"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <Button variant="outline" onClick={() => setRejectReason("")}>Скасувати</Button>
                      <Button variant="destructive" onClick={() => setRejectReason("")}>Відхилити</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {specialist.status !== "blocked" ? (
              <AlertDialog open={confirmAction === "block"} onOpenChange={(open) => setConfirmAction(open ? "block" : null)}>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Ban className="mr-2 h-4 w-4" />
                    Заблокувати
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Заблокувати спеціаліста?</AlertDialogTitle>
                    <AlertDialogDescription>Він втратить доступ до кабінету до розблокування.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Скасувати</AlertDialogCancel>
                    <AlertDialogAction onClick={() => setConfirmAction(null)}>Заблокувати</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <AlertDialog open={confirmAction === "unblock"} onOpenChange={(open) => setConfirmAction(open ? "unblock" : null)}>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="default">
                    Розблокувати
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Розблокувати спеціаліста?</AlertDialogTitle>
                    <AlertDialogDescription>Доступ до кабінету буде відновлено.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Скасувати</AlertDialogCancel>
                    <AlertDialogAction onClick={() => setConfirmAction(null)}>Розблокувати</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            <Button size="sm" variant="secondary" onClick={handleImpersonate} disabled={specialist.status === "blocked"}>
              <LogIn className="mr-2 h-4 w-4" />
              Support Access
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
