"use client"

import { Ban, CheckCircle2, Clock3, DollarSign, Eye, LogIn, XCircle } from "lucide-react"
import { useState } from "react"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { type BookingRequest, useRequestStore } from "@/lib/request-store"
import { cn } from "@/lib/utils"
import { UserRoles } from "@/graphql/generated/graphql"

export function AdminRequestsPage() {
    const { requests, acceptRequest, rejectRequest, cancelRequest, markAsPaid } = useRequestStore()

    const pendingRequests = requests.filter((req) => req.status === "pending")
    const activeRequests = requests.filter((req) => ["accepted", "communicating", "trial_scheduled"].includes(req.status))
    const completedRequests = requests.filter((req) => ["trial_completed", "paid"].includes(req.status))

    return (
        <ProtectedRoute allowedRoles={[UserRoles.SuperAdmin]}>
            <SidebarLayout userType="admin">
                <div className="container mx-auto max-w-7xl space-y-6 p-6 font-sans">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-[700] text-[#121117]">Всі запити</h1>
                        <p className="text-[15px] font-[500] text-[#69686f]">Перегляд та управління запитами на платформі</p>
                    </div>

                    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
                        <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-[14px] font-[600] text-[#69686f]">Нові</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-[32px] font-[700] text-[#121117]">{pendingRequests.length}</div>
                            </CardContent>
                        </Card>
                        <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-[14px] font-[600] text-[#69686f]">Активні</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-[32px] font-[700] text-[#00c5a6]">{activeRequests.length}</div>
                            </CardContent>
                        </Card>
                        <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-[14px] font-[600] text-[#69686f]">Завершені</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-[32px] font-[700] text-[#00a389]">{completedRequests.length}</div>
                            </CardContent>
                        </Card>
                    </div>

                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="bg-[#f0f3f3] rounded-[12px] p-1 border-0 mb-4">
                            <TabsTrigger
                                value="all"
                                className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f]"
                            >
                                Всі ({requests.length})
                            </TabsTrigger>
                            <TabsTrigger
                                value="pending"
                                className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f]"
                            >
                                Нові ({pendingRequests.length})
                            </TabsTrigger>
                            <TabsTrigger
                                value="active"
                                className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f]"
                            >
                                Активні ({activeRequests.length})
                            </TabsTrigger>
                            <TabsTrigger
                                value="completed"
                                className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f]"
                            >
                                Завершені ({completedRequests.length})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className="space-y-4">
                            <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                                <CardHeader>
                                    <CardTitle className="text-xl font-[700] text-[#121117]">Всі запити</CardTitle>
                                    <CardDescription className="text-[#69686f] font-[500]">
                                        Повний список запитів на платформі
                                    </CardDescription>
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
                                            />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="pending" className="space-y-4">
                            <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                                <CardHeader>
                                    <CardTitle className="text-xl font-[700] text-[#121117]">Нові запити</CardTitle>
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
                                            />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="active" className="space-y-4">
                            <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                                <CardHeader>
                                    <CardTitle className="text-xl font-[700] text-[#121117]">Активні запити</CardTitle>
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
                                            />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="completed" className="space-y-4">
                            <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                                <CardHeader>
                                    <CardTitle className="text-xl font-[700] text-[#121117]">Завершені запити</CardTitle>
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

function RequestRow({ request, onAccept, onReject, onCancel, onMarkPaid }: RequestRowProps) {
    const [rejectReason, setRejectReason] = useState("")
    const [rejectOpen, setRejectOpen] = useState(false)

    const deadlineLabel = request.responseDeadline ? new Date(request.responseDeadline).toLocaleString("uk-UA") : undefined

    const canAccept = request.status === "pending"
    const canMarkPaid = request.status === "awaiting_payment" || request.status === "trial_completed"
    const canCancel = ["accepted", "communicating", "trial_scheduled"].includes(request.status)

    return (
        <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] font-sans transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
            <CardContent className="space-y-3 p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-[14px] text-[#69686f] font-[500]">
                            <Badge
                                variant={request.type === "public" ? "outline" : "secondary"}
                                className="rounded-[8px] bg-[#f0f3f3]/50 text-[#121117] border-slate-200/80 font-[600]"
                            >
                                {request.type === "public" ? "Публічний" : "Приватний"}
                            </Badge>
                            <Badge
                                className={cn(
                                    "font-[600] border-0",
                                    request.status === "pending"
                                        ? "bg-orange-100 text-orange-700"
                                        : ["accepted", "communicating", "trial_scheduled"].includes(request.status)
                                            ? "bg-[#e8fffb] text-[#00a389]"
                                            : ["trial_completed", "paid"].includes(request.status)
                                                ? "bg-[#00c5a6] text-white"
                                                : "bg-slate-100 text-slate-700",
                                )}
                            >
                                {statusLabel(request.status)}
                            </Badge>
                        </div>
                        <p className="font-[700] text-[16px] text-[#121117] break-words">{request.subject}</p>
                        <p className="text-[14px] font-[500] text-[#69686f]">
                            Клієнт: {request.clientName} → {request.specialistName || "(не призначено)"}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-[13px] font-[500] text-[#69686f]">
                            <span className="flex items-center gap-1 bg-[#f0f3f3]/50 px-2 py-1 rounded-[8px] border border-slate-200/80">
                                <Clock3 className="h-3.5 w-3.5" />
                                Дедлайн відповіді: {deadlineLabel || "—"}
                            </span>
                            {request.currentPrice && (
                                <span className="flex items-center gap-1 bg-[#e8fffb] px-2 py-1 rounded-[8px] border border-[#00c5a6]/20 text-[#00a389] font-[600]">
                                    <DollarSign className="h-3.5 w-3.5" />
                                    Поточна ціна: {request.currentPrice} ₴ (мін {request.minPriceLimit || ""})
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row flex-wrap gap-2 w-full shrink-0 md:w-auto mt-2 md:mt-0">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full sm:w-auto rounded-[8px] border-slate-200/80 text-[#121117] font-[600] hover:bg-slate-50 shadow-sm"
                                >
                                    <Eye className="mr-2 h-4 w-4" />
                                    Деталі
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="rounded-[24px] border-0 shadow-[0_8px_32px_rgba(0,0,0,0.08)] sm:max-w-md font-sans">
                                <DialogHeader className="pb-4 border-b border-slate-200/80">
                                    <DialogTitle className="text-[24px] font-[700] text-[#121117]">
                                        Запит: {request.subject}
                                    </DialogTitle>
                                    <DialogDescription className="text-[#69686f] font-[500] text-[15px]">
                                        {request.message || "Без опису"}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-3 text-[15px]">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#69686f] font-[500]">Тип</span>
                                        <span className="font-[600] text-[#121117]">
                                            {request.type === "public" ? "Публічний" : "Приватний"}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#69686f] font-[500]">Формат</span>
                                        <span className="font-[600] text-[#121117]">{request.format}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#69686f] font-[500]">Дата/час</span>
                                        <span className="font-[600] text-[#121117]">
                                            {request.date} {request.time}
                                        </span>
                                    </div>
                                    <Separator className="bg-slate-200/80" />
                                    <div className="space-y-1">
                                        <p className="text-[13px] font-[500] text-[#69686f]">Клієнт</p>
                                        <div className="flex justify-between items-center text-[15px]">
                                            <span className="font-[600] text-[#121117]">{request.clientName}</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="rounded-[8px] font-[600] text-[#00a389] hover:bg-[#e8fffb]"
                                            >
                                                <LogIn className="mr-1 h-4 w-4" /> Support Access
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[13px] font-[500] text-[#69686f]">Спеціаліст</p>
                                        <div className="flex justify-between items-center text-[15px]">
                                            <span className="font-[600] text-[#121117]">
                                                {request.specialistName || "(не призначено)"}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                disabled={!request.specialistId}
                                                className="rounded-[8px] font-[600] text-[#00a389] hover:bg-[#e8fffb]"
                                            >
                                                <LogIn className="mr-1 h-4 w-4" /> Support Access
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>

                        {canAccept && (
                            <Button
                                size="sm"
                                variant="default"
                                onClick={onAccept}
                                className="w-full sm:w-auto rounded-[8px] bg-[#00c5a6] text-white hover:bg-[#00a389] font-[600] shadow-[0_2px_8px_rgba(0,197,166,0.2)]"
                            >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Прийняти
                            </Button>
                        )}

                        <AlertDialog open={rejectOpen} onOpenChange={setRejectOpen}>
                            <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive" className="w-full sm:w-auto rounded-[8px] font-[600]">
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Відхилити
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="rounded-[24px] border-0 shadow-[0_8px_32px_rgba(0,0,0,0.08)] font-sans">
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-[20px] font-[700] text-[#121117]">
                                        Відхилити запит?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="text-[#69686f] font-[500]">
                                        Вкажіть причину, буде збережено для аналітики.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <textarea
                                    className="w-full rounded-[12px] border-slate-200/80 p-3 text-[15px] focus-visible:ring-[#00c5a6] focus:outline-none focus:ring-2 focus:ring-offset-2"
                                    placeholder="Причина відхилення"
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    rows={4}
                                />
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="rounded-[8px] border-slate-200/80 hover:bg-[#f0f3f3] text-[#121117] font-[600]">
                                        Скасувати
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => {
                                            onReject(rejectReason || "Без причини")
                                            setRejectReason("")
                                            setRejectOpen(false)
                                        }}
                                        className="rounded-[8px] font-[600]"
                                    >
                                        Відхилити
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        {canCancel && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="w-full sm:w-auto rounded-[8px] border-slate-200/80 text-[#121117] font-[600] hover:bg-slate-50 shadow-sm"
                                    >
                                        <Ban className="mr-2 h-4 w-4" />
                                        Скасувати
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="rounded-[24px] border-0 shadow-[0_8px_32px_rgba(0,0,0,0.08)] font-sans">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="text-[20px] font-[700] text-[#121117]">
                                            Скасувати запит?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription className="text-[#69686f] font-[500]">
                                            Запит перейде у статус cancelled.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="rounded-[8px] border-slate-200/80 hover:bg-[#f0f3f3] text-[#121117] font-[600]">
                                            Назад
                                        </AlertDialogCancel>
                                        <AlertDialogAction onClick={onCancel} className="rounded-[8px] font-[600]">
                                            Скасувати
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}

                        {canMarkPaid && (
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={onMarkPaid}
                                className="w-full sm:w-auto rounded-[8px] font-[600] bg-[#e8fffb] text-[#00a389] hover:bg-[#e8fffb]/80 border-0"
                            >
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
