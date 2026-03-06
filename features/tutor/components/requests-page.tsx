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
import { TrendingDown, Clock, User, MapPin, MessageSquare, ArrowDown, CheckCircle2 } from "lucide-react"
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

  const ownSpecialistRequests = getRequestsBySpecialist(specialistId)
  const specialistRequests = ownSpecialistRequests.length > 0 ? ownSpecialistRequests : getRequestsBySpecialist("specialist-1")
  const isDemoFeed = ownSpecialistRequests.length === 0 && specialistId !== "specialist-1"
  const pendingRequests = specialistRequests.filter((req) => req.status === "pending")
  const activeRequests = specialistRequests.filter((req) =>
    ["accepted", "communicating", "trial_scheduled"].includes(req.status),
  )
  const completedRequests = specialistRequests.filter((req) =>
    ["trial_completed", "awaiting_payment", "paid"].includes(req.status),
  )
  const urgentPendingCount = pendingRequests.filter((req) => {
    const deadlineMs = new Date(req.responseDeadline).getTime()
    return !Number.isNaN(deadlineMs) && deadlineMs - Date.now() <= 60 * 60 * 1000
  }).length
  const totalPipelineValue = [...activeRequests, ...completedRequests].reduce(
    (sum, req) => sum + (req.currentPrice ?? req.basePrice ?? 0),
    0,
  )

  // Exchange state and logic
  const [selectedLead, setSelectedLead] = useState<string | null>(null)
  const mySubjects = useMemo(() => {
    const profile = user as { subjects?: string[] } | null
    return profile?.subjects ?? []
  }, [user])
  const publicLeads = getPublicLeads().filter((lead) => mySubjects.length === 0 || mySubjects.includes(lead.subject))
  const defaultTab = pendingRequests.length > 0 ? "pending" : publicLeads.length > 0 ? "exchange" : activeRequests.length > 0 ? "active" : "completed"

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
        <div className="container mx-auto max-w-[1240px] space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 font-sans">
          <div
            className="overflow-hidden rounded-[20px] sm:rounded-[28px] border border-slate-200/80 bg-white shadow-sm"
            style={{ backgroundImage: `linear-gradient(135deg, ${theme.primaryLight}15 0%, rgba(255,255,255,0.98) 40%, rgba(255,255,255,1) 100%)` }}
          >
            <div className="grid gap-5 sm:gap-6 p-5 sm:p-6 md:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <h1 className="text-[26px] sm:text-[28px] md:text-[36px] font-black tracking-tight text-slate-900">Заявки та біржа</h1>
                  <p className="mt-2 sm:mt-3 max-w-2xl text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-slate-500 font-medium">
                    Керуйте приватними запитами, слідкуйте за активними пробними та швидко забирайте нових учнів на аукціоні.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50 px-3 sm:px-3.5 py-1 sm:py-1.5 text-[13px] sm:text-sm font-medium text-slate-700">
                    Всього заявок: {specialistRequests.length}
                  </Badge>
                  <Badge variant="outline" className="rounded-full border-amber-200 bg-amber-50 px-3 py-1 sm:py-1.5 text-[13px] sm:text-sm text-amber-700">
                    Термінові відповіді: {urgentPendingCount}
                  </Badge>
                  <Badge variant="outline" className="rounded-full border-emerald-200 bg-emerald-50 px-3 py-1 sm:py-1.5 text-[13px] sm:text-sm text-emerald-700">
                    Біржа зараз: {publicLeads.length}
                  </Badge>
                  {isDemoFeed && (
                    <Badge variant="outline" className="rounded-full border-sky-200 bg-sky-50 px-3 py-1 sm:py-1.5 text-[13px] sm:text-sm text-sky-700">
                      Показано демо-стрічку для перегляду UX
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="rounded-[16px] sm:rounded-[22px] border border-slate-200/80 bg-white/85 p-3 sm:p-4 shadow-sm">
                  <p className="text-[11px] sm:text-[12px] font-[700] uppercase tracking-[0.16em] text-slate-400">Вхідні</p>
                  <div className="mt-2 sm:mt-3 flex items-end justify-between gap-2 sm:gap-3">
                    <p className="text-[24px] sm:text-[28px] font-black leading-none text-[#121117]">{pendingRequests.length}</p>
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
                  </div>
                </div>
                <div className="rounded-[16px] sm:rounded-[22px] border border-slate-200/80 bg-white/85 p-3 sm:p-4 shadow-sm">
                  <p className="text-[11px] sm:text-[12px] font-[700] uppercase tracking-[0.16em] text-slate-400">Активні</p>
                  <div className="mt-2 sm:mt-3 flex items-end justify-between gap-2 sm:gap-3">
                    <p className="text-[24px] sm:text-[28px] font-black leading-none text-[#121117]">{activeRequests.length}</p>
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: theme.primary }} />
                  </div>
                </div>
                <div className="rounded-[16px] sm:rounded-[22px] border border-slate-200/80 bg-white/85 p-3 sm:p-4 shadow-sm">
                  <p className="text-[11px] sm:text-[12px] font-[700] uppercase tracking-[0.16em] text-slate-400">Архів / оплата</p>
                  <div className="mt-2 sm:mt-3 flex items-end justify-between gap-2 sm:gap-3">
                    <p className="text-[24px] sm:text-[28px] font-black leading-none text-[#121117]">{completedRequests.length}</p>
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
                  </div>
                </div>
                <div className="rounded-[16px] sm:rounded-[22px] border border-slate-200/80 bg-white/85 p-3 sm:p-4 shadow-sm">
                  <p className="text-[11px] sm:text-[12px] font-[700] uppercase tracking-[0.16em] text-slate-400">Потенціал</p>
                  <div className="mt-2 sm:mt-3 flex items-end justify-between gap-2 sm:gap-3">
                    <p className="text-[24px] sm:text-[28px] font-black leading-none text-[#121117]">{totalPipelineValue} ₴</p>
                    <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: theme.primaryDark }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue={defaultTab} className="w-full">
            <div className="overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 sm:overflow-visible sm:pb-0 hide-scrollbar">
              <TabsList className="inline-flex sm:grid h-auto min-w-max sm:min-w-full sm:w-full grid-cols-4 gap-1.5 sm:gap-2 bg-slate-100/50 p-1 rounded-xl">
                <TabsTrigger 
                  value="pending" 
                  className="h-10 px-3 sm:px-4 whitespace-nowrap rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-500 text-[13px] sm:text-[14px] font-medium transition-all"
                >
                  Вхідні ({pendingRequests.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="exchange" 
                  className="h-10 px-3 sm:px-4 whitespace-nowrap rounded-lg data-[state=active]:bg-white data-[state=active]:text-[var(--theme-primary-dark)] data-[state=active]:shadow-sm text-slate-500 text-[13px] sm:text-[14px] font-medium transition-all"
                >
                  Біржа ({publicLeads.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="active" 
                  className="h-10 px-3 sm:px-4 whitespace-nowrap rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-500 text-[13px] sm:text-[14px] font-medium transition-all"
                >
                  В роботі ({activeRequests.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="completed" 
                  className="h-10 px-3 sm:px-4 whitespace-nowrap rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-500 text-[13px] sm:text-[14px] font-medium transition-all"
                >
                  Архів ({completedRequests.length})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="pending" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
              <div className="flex flex-col gap-3 rounded-[20px] sm:rounded-[24px] border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-[18px] sm:text-xl font-bold text-slate-900">Приватні запити</h2>
                  <p className="text-[13px] sm:text-sm text-slate-500 mt-1 sm:mt-0">Відповідайте протягом 3 годин для збереження рейтингу</p>
                </div>
                <div className="inline-flex self-start sm:self-auto items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-[13px] font-[600] text-amber-700">
                  Термінових відповідей: {urgentPendingCount}
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
                  <div className="flex flex-col items-center justify-center rounded-[20px] sm:rounded-[24px] border border-dashed border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-4 py-8 sm:px-6 sm:py-12 text-center shadow-sm">
                    <div className="mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-slate-100">
                      <Clock className="h-6 w-6 sm:h-7 sm:w-7 text-slate-400" />
                    </div>
                    <p className="text-[16px] sm:text-lg font-semibold text-slate-900">Нових приватних запитів поки немає</p>
                    <p className="mt-2 max-w-md text-[13px] sm:text-sm leading-relaxed text-slate-500">Коли клієнт надішле прямий запит саме вам, він одразу з’явиться тут із таймером відповіді.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="exchange" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
              <div
                className="rounded-[20px] sm:rounded-[24px] border border-slate-200/80 p-4 sm:p-5 md:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.08)] relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${theme.primaryLight} 0%, rgba(255,255,255,1) 100%)`,
                }}
              >
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 relative z-10">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/80 flex items-center justify-center shrink-0 shadow-sm">
                    <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: theme.primary }} />
                  </div>
                  <div>
                    <h3 className="text-[17px] sm:text-[19px] font-bold" style={{ color: theme.primaryDark }}>Як працює аукціон?</h3>
                    <p className="mt-1.5 sm:mt-2 text-[13px] sm:text-[14px] leading-relaxed" style={{ color: theme.primaryDark }}>
                      Перше зниження ціни відбувається через 2 години після публікації. Далі ціна знижується кожну годину
                      на 100 грн, поки не досягне мінімуму.
                    </p>
                  </div>
                </div>
              </div>

              {publicLeads.length > 0 ? (
                <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {publicLeads.map((lead) => {
                    const timeToDrop = getTimeToNextPriceDrop(lead)
                    const priceReduction = lead.basePrice && lead.currentPrice ? lead.basePrice - lead.currentPrice : 0

                    return (
                      <div
                        key={lead.id}
                        className="flex flex-col rounded-[20px] sm:rounded-[24px] border border-slate-200/80 bg-white p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 group"
                        style={{ borderTopWidth: '4px', borderTopColor: theme.primary }}
                      >
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <div>
                            <h3 className="font-[700] text-[17px] sm:text-[19px] text-[#121117]">{lead.subject}</h3>
                            <p className="text-[13px] sm:text-[14px] text-[#69686f] mt-0.5 sm:mt-1">{lead.clientName}</p>
                          </div>
                          <Badge variant="outline" className="text-[14px] sm:text-[15px] px-2.5 sm:px-3 py-1 font-bold border-0 bg-[#f0f3f3]" style={{ color: theme.primaryDark }}>
                            {lead.currentPrice} ₴
                          </Badge>
                        </div>

                        {priceReduction > 0 && (
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-5 sm:mb-6 bg-white border border-slate-200/80 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-[8px] inline-flex self-start">
                            <ArrowDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: theme.primary }} />
                            <span className="text-[12px] sm:text-[13px] font-[600]" style={{ color: theme.primaryDark }}>
                              Знижено на {priceReduction} ₴
                            </span>
                          </div>
                        )}
                        {!priceReduction && <div className="mb-5 sm:mb-6 h-[26px] sm:h-[30px]"></div>}

                        <div className="flex-1 space-y-3 sm:space-y-4">
                          <div className="space-y-2 sm:space-y-3">
                            <div className="flex items-center gap-2.5 sm:gap-3 text-[14px] sm:text-[15px] text-[#69686f]">
                              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-[#f0f3f3] flex items-center justify-center shrink-0">
                                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#121117]" />
                              </div>
                              <span className="font-[500] text-[#121117]">{lead.format === "online" ? "Онлайн" : "Офлайн"}</span>
                            </div>
                            <div className="flex items-center gap-2.5 sm:gap-3 text-[14px] sm:text-[15px] text-[#69686f]">
                              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-[#f0f3f3] flex items-center justify-center shrink-0">
                                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#121117]" />
                              </div>
                              <span className="font-[500] text-[#121117]">
                                {new Date(lead.date).toLocaleDateString("uk-UA")} о {lead.time}
                              </span>
                            </div>
                          </div>

                          {lead.message && (
                            <div className="rounded-[10px] sm:rounded-[12px] bg-[#f0f3f3] p-3 sm:p-4 mt-3 sm:mt-4">
                              <div className="flex items-start gap-2.5 sm:gap-3">
                                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-[#69686f] mt-0.5 shrink-0" />
                                <p className="text-[13px] sm:text-[14px] text-[#121117] leading-relaxed">{lead.message}</p>
                              </div>
                            </div>
                          )}

                          <div
                            className={`rounded-[10px] sm:rounded-[12px] p-3 sm:p-4 mt-3 sm:mt-4 ${
                              timeToDrop.hours < 1 ? "bg-red-50" : "bg-[#fff8e1]"
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 text-[13px] sm:text-[14px] font-[600]">
                              <div className="flex items-center gap-1.5">
                                <Clock className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${timeToDrop.hours < 1 ? "text-red-600" : "text-[#f57c00]"}`} />
                                <span className={timeToDrop.hours < 1 ? "text-red-600" : "text-[#f57c00]"}>
                                  {timeToDrop.isDue
                                    ? "Очікується оновлення ціни"
                                    : `Наступне зниження через ${timeToDrop.hours}г ${timeToDrop.minutes}хв`}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button 
                            onClick={() => setSelectedLead(lead.id)} 
                            className="w-full mt-4 sm:mt-6 h-[44px] sm:h-[48px] rounded-[10px] sm:rounded-[12px] border-2 border-transparent text-white font-[600] text-[15px] sm:text-[16px] transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-90 flex items-center justify-center shadow-sm"
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
                <div className="rounded-[20px] sm:rounded-[24px] border border-dashed border-slate-200 bg-white p-8 sm:p-12 shadow-[0_15px_35px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center text-center">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-[#f0f3f3] flex items-center justify-center mb-4 sm:mb-6">
                    <User className="h-8 w-8 sm:h-10 sm:w-10 text-[#69686f]" />
                  </div>
                  <h3 className="mb-2 text-[20px] sm:text-[24px] font-bold text-[#121117]">Немає доступних заявок</h3>
                  <p className="max-w-md text-center text-[14px] sm:text-[16px] text-[#69686f]">Нові публічні заявки з’являться тут автоматично. Поки що перевірте приватні запити або поверніться трохи пізніше.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="active" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
              <div className="rounded-[20px] sm:rounded-[24px] border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm">
                <h2 className="text-[18px] sm:text-xl font-bold text-slate-900">Запити в роботі</h2>
                <p className="text-[13px] sm:text-sm text-slate-500 mt-1 sm:mt-0">Заявки, які ви вже прийняли й ведете до пробного або оплати</p>
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
                  <div className="flex flex-col rounded-[20px] sm:rounded-[24px] border border-dashed border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 sm:p-8 text-center items-center justify-center shadow-sm">
                    <div className="h-14 w-14 sm:h-16 sm:w-16 bg-slate-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                      <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-slate-400" />
                    </div>
                    <p className="text-[16px] sm:text-lg font-medium text-slate-900">Поки немає активних заявок</p>
                    <p className="text-[13px] sm:text-[14px] text-[#69686f] mt-1.5 sm:mt-1 max-w-md">Щойно ви приймете заявку або заберете лід з біржі, тут з’являться контакти клієнта та наступні кроки.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
              <div className="rounded-[20px] sm:rounded-[24px] border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm">
                <h2 className="text-[18px] sm:text-xl font-bold text-slate-900">Архів запитів</h2>
                <p className="text-[13px] sm:text-sm text-slate-500 mt-1 sm:mt-0">Історія ваших завершених заявок та оплат</p>
              </div>
              
              <div className="space-y-4">
                {completedRequests.length > 0 ? (
                  completedRequests.map((request) => (
                    <RequestCard key={request.id} request={request} userType="specialist" />
                  ))
                ) : (
                  <div className="flex flex-col rounded-[20px] sm:rounded-[24px] border border-dashed border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 sm:p-8 text-center items-center justify-center shadow-sm">
                    <div className="h-14 w-14 sm:h-16 sm:w-16 bg-slate-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                      <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8 text-slate-400" />
                    </div>
                    <p className="text-[16px] sm:text-lg font-medium text-slate-900">Архів ще формується</p>
                    <p className="text-[13px] sm:text-[14px] text-[#69686f] mt-1.5 sm:mt-1 max-w-md">Після проведених пробних та оплат тут зберігатиметься зрозуміла історія по кожній заявці.</p>
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
