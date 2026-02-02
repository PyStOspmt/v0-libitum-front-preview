"use client"

import { useMemo, useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { DollarSign, Eye, Filter, RefreshCw, Search, ShieldCheck, XCircle } from "lucide-react"

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
  const map: Record<PaymentStatus, { label: string; variant: "outline" | "secondary" | "destructive" | "default" }> = {
    pending: { label: "Очікує", variant: "outline" },
    paid: { label: "Оплачено", variant: "secondary" },
    refunded: { label: "Повернено", variant: "default" },
    failed: { label: "Помилка", variant: "destructive" },
  }
  const { label, variant } = map[status]
  return <Badge variant={variant}>{label}</Badge>
}

export default function AdminPaymentsPage() {
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
    [query, status]
  )

  const totals = useMemo(() => {
    const paid = paymentsMock.filter((p) => p.status === "paid").reduce((acc, p) => acc + p.amount, 0)
    const pending = paymentsMock.filter((p) => p.status === "pending").reduce((acc, p) => acc + p.amount, 0)
    const avg = paymentsMock.length ? Math.round(paymentsMock.reduce((acc, p) => acc + p.amount, 0) / paymentsMock.length) : 0
    return { paid, pending, avg }
  }, [])

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <SidebarLayout userType="admin">
        <div className="container mx-auto max-w-7xl space-y-6 p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Платежі</h1>
              <p className="text-muted-foreground">Фінансова статистика та рух коштів по заявках</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex items-center gap-2 rounded-md border bg-card px-3 py-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Пошук по ID, клієнту, спеціалісту"
                  className="border-0 focus-visible:ring-0"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 rounded-md border bg-card px-3 py-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  className="bg-transparent text-sm outline-none"
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

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Оплачено</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totals.paid.toLocaleString()} ₴</div>
                <p className="text-sm text-muted-foreground">Підтверджені оплати</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Очікує оплату</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totals.pending.toLocaleString()} ₴</div>
                <p className="text-sm text-muted-foreground">Сума інвойсів в очікуванні</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Середній чек</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totals.avg} ₴</div>
                <p className="text-sm text-muted-foreground">Середній платіж за заявку</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">Всі ({paymentsMock.length})</TabsTrigger>
              <TabsTrigger value="pending">Очікують</TabsTrigger>
              <TabsTrigger value="paid">Оплачені</TabsTrigger>
              <TabsTrigger value="refunded">Повернені</TabsTrigger>
              <TabsTrigger value="failed">Помилки</TabsTrigger>
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
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">Немає записів за обраними фільтрами</CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Рух коштів</CardTitle>
        <CardDescription>Оплати, повернення та помилки</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="hidden grid-cols-8 gap-3 rounded-md bg-muted/60 px-3 py-2 text-xs font-medium text-muted-foreground md:grid">
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
            <Card key={p.id} className="border-muted md:border-0 md:bg-transparent md:shadow-none">
              <CardContent className="grid gap-3 px-3 py-3 md:grid-cols-8 md:items-center md:rounded-md md:bg-card">
                <div className="text-sm font-medium">{p.id}</div>
                <div className="text-sm text-muted-foreground">{p.requestId}</div>
                <div>
                  <p className="text-sm font-medium">{p.client}</p>
                  <p className="text-xs text-muted-foreground">Клієнт</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{p.specialist}</p>
                  <p className="text-xs text-muted-foreground">Спеціаліст</p>
                </div>
                <div className="text-sm">
                  <p className="font-semibold">{p.amount.toLocaleString()} ₴</p>
                  <p className="text-xs text-muted-foreground">Комісія: {p.fee} ₴</p>
                </div>
                <div className="text-sm text-muted-foreground">{p.method}</div>
                <div className="flex items-center gap-2 text-sm">{statusBadge(p.status)}</div>
                <div className="flex items-center justify-end gap-2">
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
        <Button variant="outline" size="sm">
          <Eye className="mr-2 h-4 w-4" /> Деталі
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Оплата {payment.id}</DialogTitle>
          <DialogDescription>Запит {payment.requestId}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Клієнт</span>
            <span className="font-medium">{payment.client}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Спеціаліст</span>
            <span className="font-medium">{payment.specialist}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Сума</span>
            <span className="font-semibold">{payment.amount.toLocaleString()} ₴</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Комісія платформи</span>
            <span className="font-semibold">{payment.fee} ₴</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Метод</span>
            <span className="font-medium">{payment.method}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Статус</span>
            <span>{statusBadge(payment.status)}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Створено</span>
            <span>{payment.createdAt}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Оновлено</span>
            <span>{payment.updatedAt}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Дії</span>
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
        <Button size="sm" variant="secondary">
          <ShieldCheck className="mr-2 h-4 w-4" /> Позначити оплачено
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Підтвердити оплату?</AlertDialogTitle>
          <AlertDialogDescription>Платіж {paymentId} стане зі статусом paid.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Скасувати</AlertDialogCancel>
          <AlertDialogAction>Підтвердити</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function ConfirmRefund({ paymentId }: { paymentId: string }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="outline">
          <XCircle className="mr-2 h-4 w-4" /> Оформити повернення
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Підтвердити повернення коштів?</AlertDialogTitle>
          <AlertDialogDescription>Платіж {paymentId} буде відмічено як refunded.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Скасувати</AlertDialogCancel>
          <AlertDialogAction>Повернути</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
