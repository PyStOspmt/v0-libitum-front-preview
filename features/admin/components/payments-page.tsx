"use client"

import { DollarSign, Eye, Filter, RefreshCw, Search, ShieldCheck, XCircle } from "lucide-react"
import { useMemo, useState } from "react"

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
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { cn } from "@/lib/utils"

type PaymentStatus = "pending" | "paid" | "refunded" | "failed"

type Payment = {
    id: string
    client: string
    specialist: string
    amount: number
    fee: number
    status: PaymentStatus
    method: string
    createdAt: string
    updatedAt: string
    requestId: string
}

const paymentsMock: Payment[] = [
    {
        id: "PAY-1023",
        client: "Анна К.",
        specialist: "Олег С.",
        amount: 1500,
        fee: 150,
        status: "pending",
        method: "Card",
        createdAt: "2026-01-12 10:45",
        updatedAt: "2026-01-12 10:45",
        requestId: "REQ-4580",
    },
    {
        id: "PAY-1019",
        client: "Максим Т.",
        specialist: "Ірина Л.",
        amount: 2200,
        fee: 220,
        status: "paid",
        method: "Apple Pay",
        createdAt: "2026-01-11 18:10",
        updatedAt: "2026-01-11 18:12",
        requestId: "REQ-4570",
    },
    {
        id: "PAY-1015",
        client: "Данило М.",
        specialist: "Наталія П.",
        amount: 1800,
        fee: 180,
        status: "failed",
        method: "Google Pay",
        createdAt: "2026-01-10 15:05",
        updatedAt: "2026-01-10 15:06",
        requestId: "REQ-4561",
    },
    {
        id: "PAY-1008",
        client: "Вікторія Р.",
        specialist: "Ростислав К.",
        amount: 1300,
        fee: 130,
        status: "refunded",
        method: "Card",
        createdAt: "2026-01-08 12:20",
        updatedAt: "2026-01-09 09:10",
        requestId: "REQ-4544",
    },
]

function statusBadge(status: PaymentStatus) {
    const map: Record<PaymentStatus, { label: string; className: string }> = {
        pending: { label: "Очікує", className: "bg-orange-100 text-orange-700 hover:bg-orange-100/80" },
        paid: { label: "Оплачено", className: "bg-[#e8fffb] text-[#00a389] hover:bg-[#e8fffb]/80" },
        refunded: { label: "Повернено", className: "bg-blue-100 text-blue-700 hover:bg-blue-100/80" },
        failed: { label: "Помилка", className: "bg-red-100 text-red-700 hover:bg-red-100/80" },
    }
    const { label, className } = map[status]
    return (
        <Badge variant="secondary" className={cn("font-[600] border-0", className)}>
            {label}
        </Badge>
    )
}

export function AdminPaymentsPage() {
    const [query, setQuery] = useState("")
    const [status, setStatus] = useState<PaymentStatus | "all">("all")

    const filtered = useMemo(
        () =>
            paymentsMock.filter((p) => {
                const matchQuery = query
                    ? [p.id, p.client, p.specialist, p.requestId].some((v) => v.toLowerCase().includes(query.toLowerCase()))
                    : true
                const matchStatus = status === "all" ? true : p.status === status
                return matchQuery && matchStatus
            }),
        [query, status],
    )

    const totals = useMemo(() => {
        const paid = paymentsMock.filter((p) => p.status === "paid").reduce((acc, p) => acc + p.amount, 0)
        const pending = paymentsMock.filter((p) => p.status === "pending").reduce((acc, p) => acc + p.amount, 0)
        const avg = paymentsMock.length
            ? Math.round(paymentsMock.reduce((acc, p) => acc + p.amount, 0) / paymentsMock.length)
            : 0
        return { paid, pending, avg }
    }, [])

    return (
        <ProtectedRoute allowedRoles={["admin"]}>
            <SidebarLayout userType="admin">
                <div className="container mx-auto max-w-7xl space-y-6 p-6 font-sans">
                    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-[700] text-[#121117]">Платежі</h1>
                            <p className="text-[15px] font-[500] text-[#69686f]">
                                Фінансова статистика та рух коштів по заявках
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <div className="flex items-center gap-2 rounded-[12px] border border-slate-200/80 bg-white px-3 py-2 h-12 shadow-sm focus-within:ring-2 focus-within:ring-[#00c5a6]/20">
                                <Search className="h-5 w-5 text-[#69686f]" />
                                <Input
                                    placeholder="Пошук по ID, клієнту, спеціалісту"
                                    className="border-0 focus-visible:ring-0 shadow-none px-1 text-[15px]"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-2 rounded-[12px] border border-slate-200/80 bg-white px-3 py-2 h-12 shadow-sm focus-within:ring-2 focus-within:ring-[#00c5a6]/20">
                                <Filter className="h-5 w-5 text-[#69686f]" />
                                <select
                                    className="bg-transparent text-[15px] outline-none font-[500] text-[#121117]"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as PaymentStatus | "all")}
                                >
                                    <option value="all">Всі статуси</option>
                                    <option value="pending">Очікує</option>
                                    <option value="paid">Оплачено</option>
                                    <option value="refunded">Повернено</option>
                                    <option value="failed">Помилка</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
                        <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-[14px] font-[600] text-[#69686f]">Оплачено</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-[32px] font-[700] text-[#00c5a6]">{totals.paid.toLocaleString()} ₴</div>
                                <p className="text-[13px] font-[500] text-[#69686f] mt-1">Підтверджені оплати</p>
                            </CardContent>
                        </Card>
                        <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-[14px] font-[600] text-[#69686f]">Очікує оплату</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-[32px] font-[700] text-orange-500">
                                    {totals.pending.toLocaleString()} ₴
                                </div>
                                <p className="text-[13px] font-[500] text-[#69686f] mt-1">Сума інвойсів в очікуванні</p>
                            </CardContent>
                        </Card>
                        <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-[14px] font-[600] text-[#69686f]">Середній чек</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-[32px] font-[700] text-[#121117]">{totals.avg} ₴</div>
                                <p className="text-[13px] font-[500] text-[#69686f] mt-1">Середній платіж за заявку</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="bg-[#f0f3f3] rounded-[12px] p-1 border-0 mb-4">
                            <TabsTrigger
                                value="all"
                                className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f]"
                            >
                                Всі ({paymentsMock.length})
                            </TabsTrigger>
                            <TabsTrigger
                                value="pending"
                                className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f]"
                            >
                                Очікують
                            </TabsTrigger>
                            <TabsTrigger
                                value="paid"
                                className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f]"
                            >
                                Оплачені
                            </TabsTrigger>
                            <TabsTrigger
                                value="refunded"
                                className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f]"
                            >
                                Повернені
                            </TabsTrigger>
                            <TabsTrigger
                                value="failed"
                                className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f]"
                            >
                                Помилки
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className="space-y-4">
                            <PaymentTable payments={filtered} />
                        </TabsContent>
                        <TabsContent value="pending" className="space-y-4">
                            <PaymentTable payments={filtered.filter((p) => p.status === "pending")} />
                        </TabsContent>
                        <TabsContent value="paid" className="space-y-4">
                            <PaymentTable payments={filtered.filter((p) => p.status === "paid")} />
                        </TabsContent>
                        <TabsContent value="refunded" className="space-y-4">
                            <PaymentTable payments={filtered.filter((p) => p.status === "refunded")} />
                        </TabsContent>
                        <TabsContent value="failed" className="space-y-4">
                            <PaymentTable payments={filtered.filter((p) => p.status === "failed")} />
                        </TabsContent>
                    </Tabs>
                </div>
            </SidebarLayout>
        </ProtectedRoute>
    )
}

function PaymentTable({ payments }: { payments: Payment[] }) {
    if (!payments.length) {
        return (
            <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] font-sans">
                <CardContent className="py-12 text-center text-[#69686f] font-[500]">
                    Немає записів за обраними фільтрами
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] font-sans">
            <CardHeader>
                <CardTitle className="text-xl font-[700] text-[#121117]">Рух коштів</CardTitle>
                <CardDescription className="text-[#69686f] font-[500]">Оплати, повернення та помилки</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="hidden md:grid gap-3 rounded-[12px] bg-[#f0f3f3] px-4 py-3 text-[13px] font-[600] text-[#69686f] md:grid-cols-[repeat(7,minmax(0,1fr))_auto]">
                    <span>ID</span>
                    <span>Запит</span>
                    <span>Клієнт</span>
                    <span>Спеціаліст</span>
                    <span>Сума / комісія</span>
                    <span>Метод</span>
                    <span>Статус</span>
                    <span className="text-right">Дії</span>
                </div>
                <div className="space-y-3">
                    {payments.map((p) => (
                        <Card
                            key={p.id}
                            className="border-slate-200/80 md:border-0 md:bg-transparent md:shadow-none transition-colors hover:bg-slate-50/50 rounded-[16px]"
                        >
                            <CardContent className="grid gap-3 px-4 py-4 md:items-center md:rounded-[12px] md:bg-white md:border md:border-slate-200/80 shadow-sm md:grid-cols-[repeat(7,minmax(0,1fr))_auto]">
                                <div className="text-[14px] font-[600] text-[#121117]">{p.id}</div>
                                <div className="text-[14px] font-[500] text-[#69686f]">{p.requestId}</div>
                                <div>
                                    <p className="text-[14px] font-[600] text-[#121117]">{p.client}</p>
                                    <p className="text-[12px] font-[500] text-[#69686f]">Клієнт</p>
                                </div>
                                <div>
                                    <p className="text-[14px] font-[600] text-[#121117]">{p.specialist}</p>
                                    <p className="text-[12px] font-[500] text-[#69686f]">Спеціаліст</p>
                                </div>
                                <div className="text-[14px]">
                                    <p className="font-[700] text-[#121117]">{p.amount.toLocaleString()} ₴</p>
                                    <p className="text-[12px] font-[500] text-[#69686f]">Комісія: {p.fee} ₴</p>
                                </div>
                                <div className="text-[14px] font-[500] text-[#69686f]">{p.method}</div>
                                <div className="flex items-center gap-2 text-[14px]">{statusBadge(p.status)}</div>
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 w-full mt-2 md:mt-0">
                                    <PaymentDetails payment={p} />
                                    {p.status === "pending" && <ConfirmMarkPaid paymentId={p.id} />}
                                    {p.status === "paid" && <ConfirmRefund paymentId={p.id} />}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

function PaymentDetails({ payment }: { payment: Payment }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto rounded-[8px] border-slate-200/80 text-[#121117] font-[600] hover:bg-slate-50 shadow-sm"
                >
                    <Eye className="mr-2 h-4 w-4" /> Деталі
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[24px] border-0 shadow-[0_8px_32px_rgba(0,0,0,0.08)] sm:max-w-md font-sans">
                <DialogHeader className="pb-4 border-b border-slate-200/80">
                    <DialogTitle className="text-[24px] font-[700] text-[#121117]">Оплата {payment.id}</DialogTitle>
                    <DialogDescription className="text-[#69686f] font-[500] text-[15px]">
                        Запит {payment.requestId}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 text-[15px]">
                    <div className="flex items-center justify-between">
                        <span className="text-[#69686f] font-[500]">Клієнт</span>
                        <span className="font-[600] text-[#121117]">{payment.client}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[#69686f] font-[500]">Спеціаліст</span>
                        <span className="font-[600] text-[#121117]">{payment.specialist}</span>
                    </div>
                    <Separator className="bg-slate-200/80" />
                    <div className="flex items-center justify-between">
                        <span className="text-[#69686f] font-[500]">Сума</span>
                        <span className="font-[700] text-[#121117]">{payment.amount.toLocaleString()} ₴</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[#69686f] font-[500]">Комісія платформи</span>
                        <span className="font-[700] text-[#121117]">{payment.fee} ₴</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[#69686f] font-[500]">Метод</span>
                        <span className="font-[600] text-[#121117]">{payment.method}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[#69686f] font-[500]">Статус</span>
                        <span>{statusBadge(payment.status)}</span>
                    </div>
                    <div className="flex items-center justify-between text-[13px] font-[500] text-[#69686f]">
                        <span>Створено</span>
                        <span>{payment.createdAt}</span>
                    </div>
                    <div className="flex items-center justify-between text-[13px] font-[500] text-[#69686f]">
                        <span>Оновлено</span>
                        <span>{payment.updatedAt}</span>
                    </div>
                    <Separator className="bg-slate-200/80" />
                    <div className="flex items-center justify-between">
                        <span className="text-[#69686f] font-[500]">Дії</span>
                        <div className="flex gap-2">
                            {payment.status === "pending" && <ConfirmMarkPaid paymentId={payment.id} />}
                            {payment.status === "paid" && <ConfirmRefund paymentId={payment.id} />}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function ConfirmMarkPaid({ paymentId }: { paymentId: string }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    size="sm"
                    variant="secondary"
                    className="w-full sm:w-auto rounded-[8px] font-[600] bg-[#e8fffb] text-[#00a389] hover:bg-[#e8fffb]/80 border-0"
                >
                    <ShieldCheck className="mr-2 h-4 w-4" /> Позначити оплачено
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-[24px] border-0 shadow-[0_8px_32px_rgba(0,0,0,0.08)] font-sans">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-[20px] font-[700] text-[#121117]">Підтвердити оплату?</AlertDialogTitle>
                    <AlertDialogDescription className="text-[#69686f] font-[500]">
                        Платіж {paymentId} стане зі статусом paid.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-[8px] border-slate-200/80 hover:bg-[#f0f3f3] text-[#121117] font-[600]">
                        Скасувати
                    </AlertDialogCancel>
                    <AlertDialogAction className="rounded-[8px] bg-[#00c5a6] text-white hover:bg-[#00a389] font-[600]">
                        Підтвердити
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

function ConfirmRefund({ paymentId }: { paymentId: string }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    size="sm"
                    variant="outline"
                    className="w-full sm:w-auto rounded-[8px] border-slate-200/80 text-[#121117] font-[600] hover:bg-slate-50 shadow-sm"
                >
                    <XCircle className="mr-2 h-4 w-4" /> Оформити повернення
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-[24px] border-0 shadow-[0_8px_32px_rgba(0,0,0,0.08)] font-sans">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-[20px] font-[700] text-[#121117]">
                        Підтвердити повернення коштів?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-[#69686f] font-[500]">
                        Платіж {paymentId} буде відмічено як refunded.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-[8px] border-slate-200/80 hover:bg-[#f0f3f3] text-[#121117] font-[600]">
                        Скасувати
                    </AlertDialogCancel>
                    <AlertDialogAction className="rounded-[8px] font-[600]">Повернути</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
