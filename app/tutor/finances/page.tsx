"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Wallet,
  Clock,
  AlertCircle,
  ExternalLink,
  Receipt,
} from "lucide-react"
import { useLessonStore } from "@/lib/lesson-store"
import { useAuth } from "@/lib/auth-context"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function TutorFinancesPage() {
  const { user } = useAuth()
  const { lessons } = useLessonStore()
  const { toast } = useToast()
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [withdrawMethod, setWithdrawMethod] = useState("card")

  const tutorId = user?.id || "specialist-1"
  const tutorLessons = lessons.filter((l) => l.specialistId === tutorId)

  const completedPaidLessons = tutorLessons.filter((l) => l.status === "completed" && l.isPaid)
  const completedUnpaidLessons = tutorLessons.filter((l) => l.status === "completed" && !l.isPaid)

  const totalEarned = completedPaidLessons.reduce((sum, l) => sum + l.price, 0)
  const totalPending = completedUnpaidLessons.reduce((sum, l) => sum + l.price, 0)
  const availableForWithdraw = totalEarned - 1300 * 2

  const transactions = [
    {
      id: "1",
      type: "income",
      amount: 400,
      description: "Заняття з Марія Коваленко",
      date: "2025-01-15",
      status: "completed",
    },
    {
      id: "2",
      type: "income",
      amount: 400,
      description: "Заняття з Софія Бондаренко",
      date: "2025-01-16",
      status: "completed",
    },
    {
      id: "3",
      type: "expense",
      amount: 1300,
      description: "Оплата за ліда - Іван Петренко",
      date: "2025-01-17",
      status: "completed",
      receiptUrl: "https://check.monobank.ua/XXXX-XXXX-XXXX-XXXX",
    },
    {
      id: "4",
      type: "income",
      amount: 400,
      description: "Заняття з Марія Коваленко",
      date: "2025-01-18",
      status: "completed",
    },
    {
      id: "5",
      type: "income",
      amount: 400,
      description: "Заняття з Іван Петренко",
      date: "2025-01-20",
      status: "pending",
    },
  ]

  const handleWithdraw = () => {
    if (!withdrawAmount || Number.parseFloat(withdrawAmount) <= 0) {
      toast({
        title: "Помилка",
        description: "Введіть коректну суму для виведення",
        variant: "destructive",
      })
      return
    }

    if (Number.parseFloat(withdrawAmount) > availableForWithdraw) {
      toast({
        title: "Помилка",
        description: "Недостатньо коштів для виведення",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Заявку на виведення створено",
      description: `Кошти в розмірі ${withdrawAmount} грн будуть переведені протягом 2-3 робочих днів`,
    })

    setIsWithdrawOpen(false)
    setWithdrawAmount("")
  }

  const monthlyStats = {
    income: 2400,
    expenses: 2600,
    lessons: 6,
    avgPerLesson: 400,
  }

  return (
    <ProtectedRoute allowedRoles={["specialist"]}>
      <SidebarLayout userType="tutor">
        <div className="container mx-auto max-w-7xl space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Фінанси</h1>
              <p className="text-muted-foreground">Управління доходами та виведення коштів</p>
            </div>
            <Button onClick={() => setIsWithdrawOpen(true)} size="lg">
              <Wallet className="mr-2 h-4 w-4" />
              Вивести кошти
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Загальний дохід</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{totalEarned} грн</div>
                <p className="text-xs text-muted-foreground">За {completedPaidLessons.length} занять</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Очікується</CardTitle>
                <Clock className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{totalPending} грн</div>
                <p className="text-xs text-muted-foreground">За {completedUnpaidLessons.length} занять</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Доступно</CardTitle>
                <Wallet className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{availableForWithdraw} грн</div>
                <p className="text-xs text-muted-foreground">Для виведення</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Середнє за заняття</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{monthlyStats.avgPerLesson} грн</div>
                <p className="text-xs text-muted-foreground">{monthlyStats.lessons} занять цього місяця</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Транзакції</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Експорт
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">Всі</TabsTrigger>
                    <TabsTrigger value="income">Доходи</TabsTrigger>
                    <TabsTrigger value="expenses">Витрати</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4">
                    <div className="space-y-3">
                      {transactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                transaction.type === "income" ? "bg-green-100" : "bg-red-100"
                              }`}
                            >
                              {transaction.type === "income" ? (
                                <ArrowDownRight className="h-5 w-5 text-green-600" />
                              ) : (
                                <ArrowUpRight className="h-5 w-5 text-red-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {new Date(transaction.date).toLocaleDateString("uk-UA")}
                                {transaction.status === "pending" && (
                                  <Badge variant="outline" className="text-orange-600">
                                    Очікується
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <p
                              className={`text-lg font-bold ${
                                transaction.type === "income" ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {transaction.type === "income" ? "+" : "-"}
                              {transaction.amount} грн
                            </p>
                            {transaction.receiptUrl && (
                              <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
                                <a
                                  href={transaction.receiptUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1"
                                >
                                  <Receipt className="h-3 w-3" />
                                  Чек Monobank
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="income" className="space-y-4">
                    <div className="space-y-3">
                      {transactions
                        .filter((t) => t.type === "income")
                        .map((transaction) => (
                          <div key={transaction.id} className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center gap-4">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                <ArrowDownRight className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <p className="font-medium">{transaction.description}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(transaction.date).toLocaleDateString("uk-UA")}
                                </p>
                              </div>
                            </div>
                            <p className="text-lg font-bold text-green-600">+{transaction.amount} грн</p>
                          </div>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="expenses" className="space-y-4">
                    <div className="space-y-3">
                      {transactions
                        .filter((t) => t.type === "expense")
                        .map((transaction) => (
                          <div key={transaction.id} className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center gap-4">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                                <ArrowUpRight className="h-5 w-5 text-red-600" />
                              </div>
                              <div>
                                <p className="font-medium">{transaction.description}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(transaction.date).toLocaleDateString("uk-UA")}
                                </p>
                              </div>
                            </div>
                            <p className="text-lg font-bold text-red-600">-{transaction.amount} грн</p>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Статистика місяця</CardTitle>
                <CardDescription>Січень 2025</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Доходи</span>
                    <span className="text-lg font-bold text-green-600">+{monthlyStats.income} грн</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Витрати</span>
                    <span className="text-lg font-bold text-red-600">-{monthlyStats.expenses} грн</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Баланс</span>
                    <span
                      className={`text-xl font-bold ${
                        monthlyStats.income - monthlyStats.expenses >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {monthlyStats.income - monthlyStats.expenses >= 0 ? "+" : ""}
                      {monthlyStats.income - monthlyStats.expenses} грн
                    </span>
                  </div>
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Порада</p>
                      <p className="text-sm text-blue-700">
                        Заробляйте більше, збільшуючи ціну занять або кількість учнів
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Виведення коштів</DialogTitle>
              <DialogDescription>Введіть суму та оберіть спосіб виведення</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Доступно для виведення:</span>
                  <span className="text-2xl font-bold text-blue-700">{availableForWithdraw} грн</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Сума виведення *</Label>
                <Input
                  id="amount"
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="0"
                  min="0"
                  max={availableForWithdraw}
                />
                <p className="text-xs text-muted-foreground">Мінімальна сума виведення - 100 грн</p>
              </div>

              <div className="space-y-2">
                <Label>Спосіб виведення</Label>
                <Select value={withdrawMethod} onValueChange={setWithdrawMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Банківська картка (2-3 дні)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="bank">Банківський рахунок (1-2 дні)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {withdrawMethod === "card" && (
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Номер картки</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" maxLength={19} />
                </div>
              )}

              {withdrawMethod === "bank" && (
                <div className="space-y-2">
                  <Label htmlFor="iban">IBAN</Label>
                  <Input id="iban" placeholder="UA123456789012345678901234567" maxLength={29} />
                </div>
              )}

              <div className="rounded-lg bg-yellow-50 p-3 text-sm text-yellow-900">
                <p className="font-medium">Комісія: 0 грн</p>
                <p className="text-xs text-yellow-700">Платформа не стягує комісію за виведення коштів</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsWithdrawOpen(false)}>
                Скасувати
              </Button>
              <Button onClick={handleWithdraw}>
                <Wallet className="mr-2 h-4 w-4" />
                Вивести кошти
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
