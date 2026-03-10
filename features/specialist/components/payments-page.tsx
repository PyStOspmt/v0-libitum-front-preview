"use client"

import { useToast } from "@/hooks/use-toast"
import { AlertTriangle, Calendar, CheckCircle2, Clock, CreditCard, DollarSign } from "lucide-react"
import { useState } from "react"

import { CountdownTimer } from "@/components/countdown-timer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useRequestStore } from "@/lib/request-store"

export function SpecialistPaymentsPage() {
    const { requests, markAsPaid } = useRequestStore()
    const { toast } = useToast()
    const [showPaymentDialog, setShowPaymentDialog] = useState(false)
    const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null)
    const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card")
    const [cardNumber, setCardNumber] = useState("")
    const [cardExpiry, setCardExpiry] = useState("")
    const [cardCvv, setCardCvv] = useState("")

    const specialistId = "specialist-1"
    const specialistRequests = requests.filter((req) => req.specialistId === specialistId)

    const awaitingPayment = specialistRequests.filter((req) => req.status === "awaiting_payment")
    const paidRequests = specialistRequests.filter((req) => req.status === "paid")

    const totalPaid = paidRequests.length * 1300
    const totalPending = awaitingPayment.length * 1300

    const handlePayment = () => {
        if (!selectedRequestId) return

        // Simulate payment processing
        setTimeout(() => {
            markAsPaid(selectedRequestId)
            toast({
                title: "Оплата успішна",
                description: "Заявку оплачено. Дякуємо за використання платформи!",
            })
            setShowPaymentDialog(false)
            setSelectedRequestId(null)
            setCardNumber("")
            setCardExpiry("")
            setCardCvv("")
        }, 1500)
    }

    const openPaymentDialog = (requestId: string) => {
        setSelectedRequestId(requestId)
        setShowPaymentDialog(true)
    }

    return (
        <div className="container mx-auto max-w-6xl space-y-6 p-6">
            <div>
                <h1 className="text-3xl font-bold">Оплати</h1>
                <p className="text-muted-foreground">Управління оплатами за успішні заявки</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Очікує оплати</CardTitle>
                        <Clock className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{awaitingPayment.length}</div>
                        <p className="text-xs text-muted-foreground">{totalPending} грн</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Оплачено</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{paidRequests.length}</div>
                        <p className="text-xs text-muted-foreground">{totalPaid} грн</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Всього витрачено</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalPaid} грн</div>
                        <p className="text-xs text-muted-foreground">За весь час</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="pending" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="pending">
                        Очікує оплати
                        {awaitingPayment.length > 0 && (
                            <Badge variant="secondary" className="ml-2">
                                {awaitingPayment.length}
                            </Badge>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="paid">Оплачені</TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="space-y-4">
                    {awaitingPayment.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <CheckCircle2 className="mb-4 h-12 w-12 text-muted-foreground" />
                                <p className="text-center text-muted-foreground">Немає заявок, що очікують оплати</p>
                            </CardContent>
                        </Card>
                    ) : (
                        awaitingPayment.map((request) => (
                            <Card key={request.id} className="border-orange-200 bg-orange-50/50">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-semibold">{request.clientName}</h3>
                                                    <p className="text-sm text-muted-foreground">{request.subject}</p>
                                                </div>
                                                <Badge variant="outline" className="text-orange-600 border-orange-600">
                                                    <AlertTriangle className="mr-1 h-3 w-3" />
                                                    Потрібна оплата
                                                </Badge>
                                            </div>

                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    Пробне: {request.date} о {request.time}
                                                </div>
                                            </div>

                                            {request.paymentDeadline && (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium">Термін оплати:</span>
                                                    <CountdownTimer expiresAt={request.paymentDeadline} variant="danger" />
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-3">
                                                <div>
                                                    <p className="text-sm font-medium">Сума до оплати</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Разовий платіж за успішну заявку
                                                    </p>
                                                </div>
                                                <p className="text-2xl font-bold text-green-700">1300 грн</p>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => openPaymentDialog(request.id)}
                                        className="mt-4 w-full bg-green-600 hover:bg-green-700"
                                    >
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        Оплатити зараз
                                    </Button>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </TabsContent>

                <TabsContent value="paid" className="space-y-4">
                    {paidRequests.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <DollarSign className="mb-4 h-12 w-12 text-muted-foreground" />
                                <p className="text-center text-muted-foreground">Поки що немає оплачених заявок</p>
                            </CardContent>
                        </Card>
                    ) : (
                        paidRequests.map((request) => (
                            <Card key={request.id}>
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-semibold">{request.clientName}</h3>
                                                    <p className="text-sm text-muted-foreground">{request.subject}</p>
                                                </div>
                                                <Badge variant="outline" className="text-green-600 border-green-600">
                                                    <CheckCircle2 className="mr-1 h-3 w-3" />
                                                    Оплачено
                                                </Badge>
                                            </div>

                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {request.date} о {request.time}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <DollarSign className="h-3 w-3" />
                                                    1300 грн
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </TabsContent>
            </Tabs>

            <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Оплата заявки</DialogTitle>
                        <DialogDescription>Оберіть спосіб оплати та введіть дані</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Сума до оплати:</span>
                                <span className="text-2xl font-bold text-green-700">1300 грн</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Спосіб оплати</Label>
                            <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as "card" | "bank")}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="card" id="card" />
                                    <Label htmlFor="card" className="flex items-center gap-2">
                                        <CreditCard className="h-4 w-4" />
                                        Банківська картка
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="bank" id="bank" />
                                    <Label htmlFor="bank">Банківський переказ</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {paymentMethod === "card" && (
                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <Label htmlFor="cardNumber">Номер картки</Label>
                                    <Input
                                        id="cardNumber"
                                        placeholder="1234 5678 9012 3456"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        maxLength={19}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="expiry">Термін дії</Label>
                                        <Input
                                            id="expiry"
                                            placeholder="MM/YY"
                                            value={cardExpiry}
                                            onChange={(e) => setCardExpiry(e.target.value)}
                                            maxLength={5}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cvv">CVV</Label>
                                        <Input
                                            id="cvv"
                                            placeholder="123"
                                            type="password"
                                            value={cardCvv}
                                            onChange={(e) => setCardCvv(e.target.value)}
                                            maxLength={3}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {paymentMethod === "bank" && (
                            <div className="rounded-lg border bg-muted p-4 text-sm">
                                <p className="font-medium">Реквізити для переказу:</p>
                                <p className="mt-2 text-muted-foreground">IBAN: UA123456789012345678901234567</p>
                                <p className="text-muted-foreground">Отримувач: ТОВ "Libitum Education"</p>
                                <p className="text-muted-foreground">Призначення: Оплата заявки #{selectedRequestId}</p>
                            </div>
                        )}

                        <Button onClick={handlePayment} className="w-full bg-green-600 hover:bg-green-700">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Оплатити 1300 грн
                        </Button>

                        <p className="text-center text-xs text-muted-foreground">
                            Оплата захищена. Ваші дані не зберігаються на нашому сервері.
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
