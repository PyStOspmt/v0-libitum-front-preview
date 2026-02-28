"use client"

import { useState, useMemo, useEffect } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { useRequestStore } from "@/lib/request-store"
import { RequestCard } from "@/components/request-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "@/lib/theme-context"
import { TrendingDown, Clock, User, MapPin, MessageSquare, ArrowDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export function TutorRequestsPage() {
  const { toast } = useToast()
  const { 
    getRequestsBySpecialist, 
    acceptRequest, 
    rejectRequest,
    getPublicLeads,
    takePublicLead,
    autoReducePublicLeads
  } = useRequestStore()
  const { user } = useAuth()
  const { theme } = useTheme()

  const specialistId = user?.id || "specialist-1"

  const specialistRequests = getRequestsBySpecialist(specialistId)
  const pendingRequests = specialistRequests.filter((req) => req.status === "pending")
  const activeRequests = specialistRequests.filter((req) =>
    ["accepted", "communicating", "trial_scheduled"].includes(req.status),
  )
  const completedRequests = specialistRequests.filter((req) =>
    ["trial_completed", "awaiting_payment", "paid"].includes(req.status),
  )

  // Exchange state and logic
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
    takePublicLead(leadId, specialistId)
    setSelectedLead(null)
    toast({
      title: "Заявку взято!",
      description: "Контакти клієнта тепер доступні у вкладці 'Активні'",
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

  const handleAcceptRequest = (requestId: string) => {
    acceptRequest(requestId)
    toast({
      title: "Запит прийнято",
      description: "Заняття додано до вашого розкладу",
    })
  }

  const handleRejectRequest = (requestId: string) => {
    rejectRequest(requestId, "Не підходить графік")
    toast({
      title: "Запит відхилено",
      description: "Клієнт отримає повідомлення",
      variant: "destructive",
    })
  }

  return (
    <ProtectedRoute allowedRoles={["specialist"]}>
      <SidebarLayout userType="tutor">
        <div className="container mx-auto max-w-[1200px] space-y-8 p-6 font-sans">
          <div>
            <h1 className="text-[32px] font-bold text-[#121117] tracking-tight">Заявки та Біржа</h1>
            <p className="text-[16px] text-[#69686f] mt-1">Керуйте своїми запитами та шукайте нових учнів на біржі</p>
          </div>

          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-100/50 p-1 rounded-xl h-12">
              <TabsTrigger 
                value="pending" 
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-500 font-medium transition-all"
              >
                Вхідні ({pendingRequests.length})
              </TabsTrigger>
              <TabsTrigger 
                value="exchange" 
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[var(--theme-primary-dark)] data-[state=active]:shadow-sm text-slate-500 font-medium transition-all"
              >
                Біржа ({publicLeads.length})
              </TabsTrigger>
              <TabsTrigger 
                value="active" 
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-500 font-medium transition-all"
              >
                В роботі ({activeRequests.length})
              </TabsTrigger>
              <TabsTrigger 
                value="completed" 
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-500 font-medium transition-all"
              >
                Архів ({completedRequests.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="mt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Приватні запити</h2>
                  <p className="text-sm text-slate-500">Відповідайте протягом 3 годин для збереження рейтингу</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {pendingRequests.length > 0 ? (
                  pendingRequests.map((request) => (
                    <RequestCard
                      key={request.id}
                      request={request}
                      userType="specialist"
                      onAccept={handleAcceptRequest}
                      onReject={handleRejectRequest}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-12 text-center">
                    <p className="text-lg font-medium text-slate-900">Немає нових запитів</p>
                    <p className="text-sm text-slate-500">Ваш профіль зараз не отримує нових приватних заявок</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="exchange" className="mt-6 space-y-6">
              <div
                className="rounded-[24px] border border-slate-200/80 p-6 md:p-8 shadow-[0_15px_35px_rgba(0,0,0,0.08)] relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${theme.primaryLight} 0%, rgba(255,255,255,1) 100%)`,
                }}
              >
                <div className="flex items-start gap-4 relative z-10">
                  <div className="h-12 w-12 rounded-full bg-white/80 flex items-center justify-center shrink-0 shadow-sm">
                    <TrendingDown className="h-6 w-6" style={{ color: theme.primary }} />
                  </div>
                  <div>
                    <h3 className="text-[20px] font-bold" style={{ color: theme.primaryDark }}>Як працює аукціон?</h3>
                    <p className="mt-2 text-[15px] leading-relaxed" style={{ color: theme.primaryDark }}>
                      Перше зниження ціни відбувається через 2 години після публікації. Далі ціна знижується кожну годину
                      на 100 грн, поки не досягне мінімуму.
                    </p>
                  </div>
                </div>
              </div>

              {publicLeads.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {publicLeads.map((lead) => {
                    const timeToDrop = getTimeToNextPriceDrop(lead)
                    const priceReduction = lead.basePrice && lead.currentPrice ? lead.basePrice - lead.currentPrice : 0

                    return (
                      <div
                        key={lead.id}
                        className="flex flex-col rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 group"
                        style={{ borderTopWidth: '4px', borderTopColor: theme.primary }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-[600] text-[20px] text-[#121117]">{lead.subject}</h3>
                            <p className="text-[14px] text-[#69686f] mt-1">{lead.clientName}</p>
                          </div>
                          <Badge variant="outline" className="text-[16px] px-3 py-1 font-bold border-0 bg-[#f0f3f3]" style={{ color: theme.primaryDark }}>
                            {lead.currentPrice} ₴
                          </Badge>
                        </div>

                        {priceReduction > 0 && (
                          <div className="flex items-center gap-2 mb-6 bg-white border border-slate-200/80 px-3 py-1.5 rounded-[8px] inline-flex self-start">
                            <ArrowDown className="h-4 w-4" style={{ color: theme.primary }} />
                            <span className="text-[13px] font-[600]" style={{ color: theme.primaryDark }}>
                              Знижено на {priceReduction} ₴
                            </span>
                          </div>
                        )}
                        {!priceReduction && <div className="mb-6 h-[30px]"></div>}

                        <div className="flex-1 space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 text-[15px] text-[#69686f]">
                              <div className="h-8 w-8 rounded-full bg-[#f0f3f3] flex items-center justify-center shrink-0">
                                <MapPin className="h-4 w-4 text-[#121117]" />
                              </div>
                              <span className="font-[500] text-[#121117]">{lead.format === "online" ? "Онлайн" : "Офлайн"}</span>
                            </div>
                            <div className="flex items-center gap-3 text-[15px] text-[#69686f]">
                              <div className="h-8 w-8 rounded-full bg-[#f0f3f3] flex items-center justify-center shrink-0">
                                <Clock className="h-4 w-4 text-[#121117]" />
                              </div>
                              <span className="font-[500] text-[#121117]">
                                {new Date(lead.date).toLocaleDateString("uk-UA")} о {lead.time}
                              </span>
                            </div>
                          </div>

                          {lead.message && (
                            <div className="rounded-[12px] bg-[#f0f3f3] p-4 mt-4">
                              <div className="flex items-start gap-3">
                                <MessageSquare className="h-5 w-5 text-[#69686f] mt-0.5 shrink-0" />
                                <p className="text-[14px] text-[#121117] leading-relaxed">{lead.message}</p>
                              </div>
                            </div>
                          )}

                          <div
                            className={`rounded-[12px] p-4 mt-4 ${
                              timeToDrop.hours < 1 ? "bg-red-50" : "bg-[#fff8e1]"
                            }`}
                          >
                            <div className="flex items-center gap-2 text-[14px] font-[600]">
                              <Clock className={`h-4 w-4 ${timeToDrop.hours < 1 ? "text-red-600" : "text-[#f57c00]"}`} />
                              <span className={timeToDrop.hours < 1 ? "text-red-600" : "text-[#f57c00]"}>
                                {timeToDrop.isDue
                                  ? "Очікується оновлення ціни"
                                  : `Наступне зниження через ${timeToDrop.hours}г ${timeToDrop.minutes}хв`}
                              </span>
                            </div>
                          </div>

                          <button 
                            onClick={() => setSelectedLead(lead.id)} 
                            className="w-full mt-6 h-[48px] rounded-[8px] border-2 border-transparent text-white font-[600] text-[16px] transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-90 flex items-center justify-center"
                            style={{ backgroundColor: theme.primary }}
                          >
                            Взяти за {lead.currentPrice} ₴
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="rounded-[24px] border border-slate-200/80 bg-white p-12 shadow-[0_15px_35px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-[#f0f3f3] flex items-center justify-center mb-6">
                    <User className="h-10 w-10 text-[#69686f]" />
                  </div>
                  <h3 className="mb-2 text-[24px] font-bold text-[#121117]">Немає доступних заявок</h3>
                  <p className="text-center text-[16px] text-[#69686f]">Нові публічні заявки з'являться тут автоматично</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="active" className="mt-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Запити в роботі</h2>
                <p className="text-sm text-slate-500">Заявки, які ви прийняли та обробляєте зараз</p>
              </div>
              
              <div className="space-y-4">
                {activeRequests.length > 0 ? (
                  activeRequests.map((request) => (
                    <RequestCard
                      key={request.id}
                      request={request}
                      userType="specialist"
                      onAccept={handleAcceptRequest}
                      onReject={handleRejectRequest}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-12 text-center">
                    <p className="text-lg font-medium text-slate-900">Немає активних запитів</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Архів запитів</h2>
                <p className="text-sm text-slate-500">Історія ваших завершених заявок та оплат</p>
              </div>
              
              <div className="space-y-4">
                {completedRequests.length > 0 ? (
                  completedRequests.map((request) => (
                    <RequestCard key={request.id} request={request} userType="specialist" />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-12 text-center">
                    <p className="text-lg font-medium text-slate-900">Архів порожній</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Exchange Lead Take Confirmation Dialog */}
          <Dialog open={selectedLead !== null} onOpenChange={() => setSelectedLead(null)}>
            <DialogContent className="sm:max-w-md rounded-[24px] p-8">
              <DialogHeader>
                <DialogTitle className="text-[24px] font-bold text-[#121117] mb-2">Підтвердження взяття заявки</DialogTitle>
                <DialogDescription className="text-[15px] text-[#69686f] leading-relaxed">
                  Після взяття заявки потрібно зв'язатися з клієнтом протягом 30 хв. Загальний дедлайн відповіді — 3 години. Контакти будуть доступні у вкладці "В роботі".
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 pt-4">
                {selectedLead && (
                  <>
                    <div className="rounded-[16px] bg-[#f0f3f3] p-6 text-center">
                      <p className="text-[14px] font-[600] text-[#69686f] mb-1">Вартість ліда:</p>
                      <p className="text-[32px] font-bold text-[#121117]">
                        {publicLeads.find((l) => l.id === selectedLead)?.currentPrice} ₴
                      </p>
                    </div>
                    <p className="text-[14px] text-[#69686f] text-center">
                      Ця сума буде нарахована після успішного пробного заняття, якщо клієнт продовжить навчання.
                    </p>
                  </>
                )}
                <div className="flex gap-4">
                  <button 
                    onClick={() => setSelectedLead(null)} 
                    className="flex-1 h-[48px] rounded-[8px] border-2 border-[#121117] text-[#121117] bg-white hover:bg-gray-50 font-[600] text-[16px] transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  >
                    Скасувати
                  </button>
                  <button 
                    onClick={() => selectedLead && handleTakeLead(selectedLead)} 
                    className="flex-1 h-[48px] rounded-[8px] border-2 border-transparent text-white font-[600] text-[16px] transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-90"
                    style={{ backgroundColor: theme.primary }}
                  >
                    Підтвердити
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
