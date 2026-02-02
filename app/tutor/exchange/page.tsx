"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { useRequestStore } from "@/lib/request-store"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, Clock, User, MapPin, MessageSquare, ArrowDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useMemo, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function TutorExchangePage() {
  const { toast } = useToast()
  const { getPublicLeads, takePublicLead, autoReducePublicLeads } = useRequestStore()
  const { user } = useAuth()
  const [selectedLead, setSelectedLead] = useState<string | null>(null)

  const mySubjects = useMemo(() => user?.subjects ?? [], [user?.subjects])
  const publicLeads = getPublicLeads().filter((lead) => mySubjects.length === 0 || mySubjects.includes(lead.subject))

  useEffect(() => {
    autoReducePublicLeads()
    const intervalId = setInterval(() => {
      autoReducePublicLeads()
    }, 30 * 1000)
    return () => clearInterval(intervalId)
  }, [autoReducePublicLeads])

  const handleTakeLead = (leadId: string) => {
    takePublicLead(leadId, "specialist-1")
    setSelectedLead(null)
    toast({
      title: "Заявку взято!",
      description: "Контакти клієнта тепер доступні у вкладці 'Запити'",
    })
  }

  const getTimeToNextPriceDrop = (lead: { createdAt: string; lastPriceUpdate?: string }) => {
    const nowMs = Date.now()
    const createdAtMs = new Date(lead.createdAt).getTime()
    const lastUpdateMs = lead.lastPriceUpdate ? new Date(lead.lastPriceUpdate).getTime() : createdAtMs
    const nextDropAtMs = lead.lastPriceUpdate ? lastUpdateMs + 60 * 60 * 1000 : createdAtMs + 2 * 60 * 60 * 1000
    const diff = nextDropAtMs - nowMs
    const hours = Math.max(0, Math.floor(diff / (1000 * 60 * 60)))
    const minutes = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)))
    return { hours, minutes, isDue: diff <= 0 }
  }

  return (
    <ProtectedRoute allowedRoles={["specialist"]}>
      <SidebarLayout userType="tutor">
        <div className="container mx-auto max-w-7xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">Біржа заявок</h1>
            <p className="text-muted-foreground">Публічні заявки з аукціонною ціною</p>
          </div>

          <Card className="border-teal-200 bg-teal-50/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <TrendingDown className="h-5 w-5 text-teal-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-teal-900">Як працює аукціон?</h3>
                  <p className="mt-1 text-sm text-teal-700">
                    Перше зниження ціни відбувається через 2 години після публікації. Далі ціна знижується кожну годину
                    на 100 грн, поки не досягне мінімуму.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {publicLeads.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {publicLeads.map((lead) => {
                const timeToDrop = getTimeToNextPriceDrop(lead)
                const priceReduction = lead.basePrice && lead.currentPrice ? lead.basePrice - lead.currentPrice : 0

                return (
                  <Card key={lead.id} className="flex flex-col border-2 hover:border-teal-200 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{lead.subject}</CardTitle>
                          <CardDescription className="mt-1">{lead.clientName}</CardDescription>
                        </div>
                        <Badge variant="secondary" className="text-lg font-bold">
                          {lead.currentPrice} грн
                        </Badge>
                      </div>
                      {priceReduction > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          <ArrowDown className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-600 font-medium">Знижено на {priceReduction} грн</span>
                        </div>
                      )}
                    </CardHeader>

                    <CardContent className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{lead.format === "online" ? "Онлайн" : "Офлайн"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>
                            {new Date(lead.date).toLocaleDateString("uk-UA")} о {lead.time}
                          </span>
                        </div>
                      </div>

                      {lead.message && (
                        <div className="rounded-lg bg-muted p-3">
                          <div className="flex items-start gap-2">
                            <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <p className="text-sm">{lead.message}</p>
                          </div>
                        </div>
                      )}

                      <div
                        className={`rounded-lg border p-3 ${
                          timeToDrop.hours < 1 ? "border-red-200 bg-red-50" : "border-yellow-200 bg-yellow-50"
                        }`}
                      >
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Clock className={`h-4 w-4 ${timeToDrop.hours < 1 ? "text-red-600" : "text-yellow-600"}`} />
                          <span className={timeToDrop.hours < 1 ? "text-red-600" : "text-yellow-600"}>
                            {timeToDrop.isDue
                              ? "Очікується оновлення ціни"
                              : `Наступне зниження через ${timeToDrop.hours}г ${timeToDrop.minutes}хв`}
                          </span>
                        </div>
                      </div>

                      <Button onClick={() => setSelectedLead(lead.id)} className="w-full">
                        Взяти за {lead.currentPrice} грн
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <User className="mb-4 h-16 w-16 text-muted-foreground" />
                <h3 className="mb-2 text-xl font-semibold">Немає доступних заявок</h3>
                <p className="text-center text-muted-foreground">Нові публічні заявки з'являться тут автоматично</p>
              </CardContent>
            </Card>
          )}

          <Dialog open={selectedLead !== null} onOpenChange={() => setSelectedLead(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Підтвердження взяття заявки</DialogTitle>
                <DialogDescription>
                  Після взяття заявки потрібно зв'язатися з клієнтом протягом 30 хв. Загальний дедлайн відповіді — 3
                  години. Контакти будуть доступні у вкладці "Запити".
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                {selectedLead && (
                  <>
                    <div className="rounded-lg bg-muted p-4">
                      <p className="text-sm text-muted-foreground mb-2">Вартість ліда:</p>
                      <p className="text-2xl font-bold">
                        {publicLeads.find((l) => l.id === selectedLead)?.currentPrice} грн
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Ця сума буде нарахована після успішного пробного заняття, якщо клієнт продовжить навчання.
                    </p>
                  </>
                )}
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setSelectedLead(null)} className="flex-1 bg-transparent">
                    Скасувати
                  </Button>
                  <Button onClick={() => selectedLead && handleTakeLead(selectedLead)} className="flex-1">
                    Підтвердити
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
