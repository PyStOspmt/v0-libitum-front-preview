"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { useRequestStore, type BookingRequest } from "@/lib/request-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Separator } from "@/components/ui/separator"
import { LogIn, Clock3, Eye, CheckCircle2, XCircle, Ban, DollarSign } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function AdminRequestsPage() {
  const { requests, acceptRequest, rejectRequest, cancelRequest, markAsPaid } = useRequestStore()
  const { impersonate } = useAuth()

  const pendingRequests = requests.filter((req) => req.status === "pending")
  const activeRequests = requests.filter((req) => ["accepted", "communicating", "trial_scheduled"].includes(req.status))
  const completedRequests = requests.filter((req) => ["trial_completed", "paid"].includes(req.status))

  const buildImpersonate = (request: BookingRequest, role: "client" | "specialist") =>
    impersonate({
      id: role === "client" ? request.clientId : request.specialistId || "specialist-mock",
      name: role === "client" ? request.clientName : request.specialistName || "Спеціаліст",
      email: role === "client" ? `${request.clientId}@example.com` : `${request.specialistId || "spec"}@example.com`,
      role: role === "client" ? "client" : "specialist",
      isEmailVerified: true,
      hasPassedQuiz: true,
      status: "active",
      language: "UA",
    })

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <SidebarLayout userType="admin">
        <div className="container mx-auto max-w-7xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">Всі запити</h1>
            <p className="text-muted-foreground">Перегляд та управління запитами на платформі</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Нові</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{pendingRequests.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Активні</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{activeRequests.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Завершені</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{completedRequests.length}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">Всі ({requests.length})</TabsTrigger>
              <TabsTrigger value="pending">Нові ({pendingRequests.length})</TabsTrigger>
              <TabsTrigger value="active">Активні ({activeRequests.length})</TabsTrigger>
              <TabsTrigger value="completed">Завершені ({completedRequests.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Всі запити</CardTitle>
                  <CardDescription>Повний список запитів на платформі</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {requests.map((request) => (
                      <RequestRow
                        key={request.id}
                        request={request}
                        onAccept={() => acceptRequest(request.id)}
                        onReject={(reason) => rejectRequest(request.id, reason)}
                        onCancel={() => cancelRequest(request.id)}
                        onMarkPaid={() => markAsPaid(request.id)}
                        onImpersonate={(role) => buildImpersonate(request, role)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Нові запити</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingRequests.map((request) => (
                      <RequestRow
                        key={request.id}
                        request={request}
                        onAccept={() => acceptRequest(request.id)}
                        onReject={(reason) => rejectRequest(request.id, reason)}
                        onCancel={() => cancelRequest(request.id)}
                        onMarkPaid={() => markAsPaid(request.id)}
                        onImpersonate={(role) => buildImpersonate(request, role)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Активні запити</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeRequests.map((request) => (
                      <RequestRow
                        key={request.id}
                        request={request}
                        onAccept={() => acceptRequest(request.id)}
                        onReject={(reason) => rejectRequest(request.id, reason)}
                        onCancel={() => cancelRequest(request.id)}
                        onMarkPaid={() => markAsPaid(request.id)}
                        onImpersonate={(role) => buildImpersonate(request, role)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Завершені запити</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {completedRequests.map((request) => (
                      <RequestRow
                        key={request.id}
                        request={request}
                        onAccept={() => acceptRequest(request.id)}
                        onReject={(reason) => rejectRequest(request.id, reason)}
                        onCancel={() => cancelRequest(request.id)}
                        onMarkPaid={() => markAsPaid(request.id)}
                        onImpersonate={(role) => buildImpersonate(request, role)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}

type RequestRowProps = {
  request: BookingRequest
  onAccept: () => void
  onReject: (reason: string) => void
  onCancel: () => void
  onMarkPaid: () => void
  onImpersonate: (role: "client" | "specialist") => void
}

function statusLabel(status: BookingRequest["status"]) {
  switch (status) {
    case "pending":
      return "Новий"
    case "accepted":
      return "Прийнятий"
    case "communicating":
      return "Комунікація"
    case "trial_scheduled":
      return "Пробне заплановане"
    case "trial_completed":
      return "Пробне завершене"
    case "awaiting_payment":
      return "Очікує оплату"
    case "paid":
      return "Оплачено"
    case "rejected":
      return "Відхилено"
    case "expired":
      return "Прострочено"
    case "cancelled":
      return "Скасовано"
    default:
      return status
  }
}

function RequestRow({ request, onAccept, onReject, onCancel, onMarkPaid, onImpersonate }: RequestRowProps) {
  const [rejectReason, setRejectReason] = useState("")
  const [rejectOpen, setRejectOpen] = useState(false)

  const deadlineLabel = request.responseDeadline
    ? new Date(request.responseDeadline).toLocaleString("uk-UA")
    : undefined

  const canAccept = request.status === "pending"
  const canMarkPaid = request.status === "awaiting_payment" || request.status === "trial_completed"
  const canCancel = ["accepted", "communicating", "trial_scheduled"].includes(request.status)

  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant={request.type === "public" ? "outline" : "secondary"}>
                {request.type === "public" ? "Публічний" : "Приватний"}
              </Badge>
              <Badge>{statusLabel(request.status)}</Badge>
            </div>
            <p className="font-medium">{request.subject}</p>
            <p className="text-sm text-muted-foreground">
              Клієнт: {request.clientName} → {request.specialistName || "(не призначено)"}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock3 className="h-3 w-3" />
                Дедлайн відповіді: {deadlineLabel || "—"}
              </span>
              {request.currentPrice && (
                <span className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  Поточна ціна: {request.currentPrice} ₴ (мін {request.minPriceLimit || ""})
                </span>
              )}
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
                  <DialogTitle>Запит: {request.subject}</DialogTitle>
                  <DialogDescription>{request.message || "Без опису"}</DialogDescription>
                </DialogHeader>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Тип</span>
                    <span className="font-medium">{request.type === "public" ? "Публічний" : "Приватний"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Формат</span>
                    <span className="font-medium">{request.format}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Дата/час</span>
                    <span className="font-medium">{request.date} {request.time}</span>
                  </div>
                  <Separator />
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Клієнт</p>
                    <div className="flex justify-between text-sm">
                      <span>{request.clientName}</span>
                      <Button variant="ghost" size="sm" onClick={() => onImpersonate("client")}>
                        <LogIn className="mr-1 h-4 w-4" /> Support Access
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Спеціаліст</p>
                    <div className="flex justify-between text-sm">
                      <span>{request.specialistName || "(не призначено)"}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={!request.specialistId}
                        onClick={() => onImpersonate("specialist")}
                      >
                        <LogIn className="mr-1 h-4 w-4" /> Support Access
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {canAccept && (
              <Button size="sm" variant="default" onClick={onAccept}>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Прийняти
              </Button>
            )}

            <AlertDialog open={rejectOpen} onOpenChange={setRejectOpen}>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive">
                  <XCircle className="mr-2 h-4 w-4" />
                  Відхилити
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Відхилити запит?</AlertDialogTitle>
                  <AlertDialogDescription>Вкажіть причину, буде збережено для аналітики.</AlertDialogDescription>
                </AlertDialogHeader>
                <textarea
                  className="w-full rounded-md border p-2 text-sm"
                  placeholder="Причина відхилення"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
                <AlertDialogFooter>
                  <AlertDialogCancel>Скасувати</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      onReject(rejectReason || "Без причини")
                      setRejectReason("")
                      setRejectOpen(false)
                    }}
                  >
                    Відхилити
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {canCancel && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Ban className="mr-2 h-4 w-4" />
                    Скасувати
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Скасувати запит?</AlertDialogTitle>
                    <AlertDialogDescription>Запит перейде у статус cancelled.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Назад</AlertDialogCancel>
                    <AlertDialogAction onClick={onCancel}>Скасувати</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            {canMarkPaid && (
              <Button size="sm" variant="secondary" onClick={onMarkPaid}>
                <DollarSign className="mr-2 h-4 w-4" />
                Позначити як оплачений
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
