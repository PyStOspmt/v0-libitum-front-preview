"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { useRequestStore } from "@/lib/request-store"
import { useAuth } from "@/lib/auth-context"
import { RequestCard } from "@/components/request-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { TiltCard } from "@/components/home/tilt-card"
import { SquishyButton } from "@/components/home/squishy-button"
import { Clock, Users, CheckCircle, ArrowRight } from "lucide-react"
import { useState } from "react"

/* ── Brand palette ── */
const B = {
  pri: "#009688",
  dark: "#00796B", 
  light: "#E0F2F1",
  mid: "#B2DFDB",
} as const

export function ClientRequestsPage() {
  const { toast } = useToast()
  const { getRequestsByClient, cancelRequest } = useRequestStore()
  const { user } = useAuth()

  const router = useRouter()
  const searchParams = useSearchParams()
  const children = [
    user ? { id: user.id, label: user.name ? `${user.name} (я)` : "Я" } : null,
    { id: "client-1", label: "Марія, 12 років" },
    { id: "client-3", label: "Іван, 9 років" },
  ].filter(Boolean) as { id: string; label: string }[]

  const initialChild = searchParams.get("child") || (user?.id ?? children[0].id)
  const selectedChildId = children.find((c) => c.id === initialChild)?.id || (user?.id ?? children[0].id)

  const clientRequests = getRequestsByClient(selectedChildId || user?.id || "client-1")
  const pendingRequests = clientRequests.filter((req) => req.status === "pending")
  const activeRequests = clientRequests.filter((req) =>
    ["accepted", "communicating", "trial_scheduled"].includes(req.status),
  )
  const completedRequests = clientRequests.filter((req) => ["trial_completed", "awaiting_payment", "paid"].includes(req.status))

  const [activeTab, setActiveTab] = useState("pending")

  const handleCancelRequest = (requestId: string) => {
    cancelRequest(requestId)
    toast({
      title: "Запит скасовано",
      description: "Ви можете створити новий запит в будь-який час",
    })
  }

  const tabs = [
    { id: "pending", label: "Очікують", count: pendingRequests.length, icon: Clock, color: "amber" },
    { id: "active", label: "Активні", count: activeRequests.length, icon: Users, color: "emerald" },
    { id: "completed", label: "Завершені", count: completedRequests.length, icon: CheckCircle, color: "slate" },
  ]

  // Debug logging for tabs
  console.log("Tabs counts:", tabs.map(t => ({ id: t.id, count: t.count })))

  return (
    <ProtectedRoute allowedRoles={["client"]}>
      <SidebarLayout userType="client">
        <div className="container mx-auto max-w-7xl space-y-8 p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-2"
          >
            <h1 className="text-3xl font-bold text-slate-800">Мої запити</h1>
            <p className="text-slate-500">Управління запитами на заняття</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {children.map((child) => (
                <Button
                  key={child.id}
                  variant={child.id === selectedChildId ? "default" : "outline"}
                  size="sm"
                  onClick={() => router.push(`/client/requests?child=${child.id}`)}
                  className={`rounded-full transition-all ${
                    child.id === selectedChildId 
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md" 
                      : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  {child.label}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Custom Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-6"
          >
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-xl w-full sm:w-fit overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? tab.color === "amber"
                          ? "bg-amber-500 text-white shadow-md"
                          : tab.color === "emerald"
                          ? "bg-emerald-500 text-white shadow-md"
                          : "bg-slate-600 text-white shadow-md"
                        : "text-slate-600 hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                    <Badge variant="secondary" className={`ml-1 px-1.5 py-0.5 text-[11px] ${
                      activeTab === tab.id
                        ? tab.color === "amber"
                          ? "bg-amber-100 text-amber-700"
                          : tab.color === "emerald"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-700"
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      {tab.count}
                    </Badge>
                  </button>
                )
              })}
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              {activeTab === "pending" && (
                <TiltCard className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-amber-200/80 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">Очікують відповіді</h3>
                      <p className="text-sm text-slate-500">Спеціалісти мають 3 години для відповіді</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {pendingRequests.length > 0 ? (
                      pendingRequests.map((request) => (
                        <RequestCard
                          key={request.id}
                          request={request}
                          userType="client"
                          onCancel={handleCancelRequest}
                        />
                      ))
                    ) : (
                      <div className="py-8 text-center">
                        <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
                          <Clock className="h-8 w-8 text-slate-300" />
                        </div>
                        <p className="text-slate-500">Немає запитів, що очікують</p>
                        <SquishyButton 
                          bgColor={B.pri}
                          className="mt-4 rounded-full px-6 py-2 text-sm inline-flex items-center gap-2"
                          onClick={() => router.push(`/client/specialists?child=${selectedChildId}`)}
                        >
                          Знайти спеціаліста
                          <ArrowRight className="h-4 w-4" />
                        </SquishyButton>

                        {/* Приклад для перегляду */}
                        <div className="mt-6 grid gap-3 text-left">
                          <div className="rounded-xl border border-slate-200 p-3 bg-white text-sm text-slate-700">
                            <div className="flex justify-between mb-1">
                              <span className="font-semibold">Англійська, 7 клас</span>
                              <Badge variant="outline" className="text-emerald-600 border-emerald-200">Очікує</Badge>
                            </div>
                            <div className="text-slate-500">10 лютого, 17:00 • Онлайн</div>
                          </div>
                          <div className="rounded-xl border border-slate-200 p-3 bg-white text-sm text-slate-700">
                            <div className="flex justify-between mb-1">
                              <span className="font-semibold">Психологія, 8 клас</span>
                              <Badge variant="outline" className="text-orange-600 border-orange-200">Очікує</Badge>
                            </div>
                            <div className="text-slate-500">12 лютого, 15:00 • Онлайн</div>
                          </div>
                          <div className="rounded-xl border border-slate-200 p-3 bg-white text-sm text-slate-700">
                            <div className="flex justify-between mb-1">
                              <span className="font-semibold">Математика, 6 клас</span>
                              <Badge variant="outline" className="text-blue-600 border-blue-200">Очікує</Badge>
                            </div>
                            <div className="text-slate-500">14 лютого, 16:30 • Онлайн</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </TiltCard>
              )}

              {activeTab === "active" && (
                <TiltCard className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-200/80 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Users className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">Активні запити</h3>
                      <p className="text-sm text-slate-500">Запити в процесі обробки</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {activeRequests.length > 0 ? (
                      activeRequests.map((request) => (
                        <RequestCard
                          key={request.id}
                          request={request}
                          userType="client"
                          onCancel={handleCancelRequest}
                        />
                      ))
                    ) : (
                      <div className="py-8 text-center">
                        <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
                          <Users className="h-8 w-8 text-slate-300" />
                        </div>
                        <p className="text-slate-500">Немає активних запитів</p>
                        <div className="mt-6 grid gap-3 text-left">
                          <div className="rounded-xl border border-slate-200 p-3 bg-white text-sm text-slate-700">
                            <div className="flex justify-between mb-1">
                              <span className="font-semibold">Психолог</span>
                              <Badge variant="outline" className="text-emerald-600 border-emerald-200">В процесі</Badge>
                            </div>
                            <div className="text-slate-500">13 лютого, 18:30 • Онлайн • Узгодження деталей</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </TiltCard>
              )}

              {activeTab === "completed" && (
                <TiltCard className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-slate-300/80 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">Завершені запити</h3>
                      <p className="text-sm text-slate-500">Історія ваших запитів</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {completedRequests.length > 0 ? (
                      completedRequests.map((request) => (
                        <RequestCard key={request.id} request={request} userType="client" />
                      ))
                    ) : (
                      <div className="py-8 text-center">
                        <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="h-8 w-8 text-slate-300" />
                        </div>
                        <p className="text-slate-500">Немає завершених запитів</p>
                        <div className="mt-6 grid gap-3 text-left">
                          <div className="rounded-xl border border-slate-200 p-3 bg-white text-sm text-slate-700">
                            <div className="flex justify-between mb-1">
                              <span className="font-semibold">Логопед</span>
                              <Badge variant="outline" className="text-slate-600 border-slate-200">Завершено</Badge>
                            </div>
                            <div className="text-slate-500">5 лютого, 16:00 • Офлайн • Оцінка результатів</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </TiltCard>
              )}
            </div>
          </motion.div>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
