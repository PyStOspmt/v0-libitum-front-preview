"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { useRequestStore } from "@/lib/request-store"
import { useGamificationStore } from "@/lib/gamification-store"
import { useAuth } from "@/lib/auth-context"
import { RequestCard } from "@/components/request-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { BookOpen, Clock, TrendingUp, Award, Search, FileText, Calendar, Star, ArrowRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { TiltCard } from "@/components/home/tilt-card"
import { SquishyButton } from "@/components/home/squishy-button"

/* ── Brand palette ── */
const B = {
  pri: "#00c5a6",
  dark: "#00a389",
  light: "#e8fffb",
  mid: "#B2DFDB",
} as const

export function ClientDashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { getRequestsByClient, cancelRequest } = useRequestStore()
  const { getProgress } = useGamificationStore()
  const { user } = useAuth()

  const householdChildren = [
    { id: "child-1", name: "Марія Коваленко", label: "Марія, 12 років" },
    { id: "child-2", name: "Іван Коваленко", label: "Іван, 9 років" },
  ]

  const selectableChildren = user
    ? [{ id: user.id, name: user.name, label: user.name || "Я" }, ...householdChildren]
    : householdChildren

  const initialChild = searchParams.get("child") || selectableChildren[0]?.id
  const selectedChildId = selectableChildren.find((c) => c.id === initialChild)?.id || selectableChildren[0]?.id

  const clientRequests = getRequestsByClient(selectedChildId)
  const pendingRequests = clientRequests.filter((req) => req.status === "pending")
  const progress = getProgress(selectedChildId)
  const levelInfo = useGamificationStore.getState().getLevelInfo(progress.totalSessions)

  const stats = {
    activeSpecialists: 2,
    completedSessions: 15,
    upcomingSessions: 3,
    pendingRequests: pendingRequests.length,
    level: 2,
  }

  const handleCancelRequest = (requestId: string) => {
    cancelRequest(requestId)
    toast({
      title: "Запит скасовано",
      description: "Ви можете створити новий запит в будь-який час",
    })
  }

  return (
    <ProtectedRoute allowedRoles={["client"]}>
      <SidebarLayout userType="client">
        <div className="p-3 sm:p-6 lg:p-10 max-w-[1200px] mx-auto space-y-6 sm:space-y-8 font-sans">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[32px] lg:text-[40px] font-bold text-[#121117] tracking-tight">Головна</h1>
            <p className="text-[#69686f] mt-1 text-[16px]">Ваш особистий кабінет</p>

            <div className="mt-6 flex flex-wrap gap-3">
              {selectableChildren.map((child) => (
                <button
                  key={child.id}
                  onClick={() => router.push(`/client?child=${child.id}`)}
                  className={`px-6 py-2 rounded-[8px] transition-all duration-200 font-[600] text-[16px] border-2 ${child.id === selectedChildId
                      ? "bg-[#121117] text-white border-transparent"
                      : "bg-white text-[#121117] border-[#121117] hover:bg-gray-50"
                    }`}
                >
                  {child.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="cursor-pointer"
              onClick={() => router.push(`/client/specialists?child=${selectedChildId}`)}
            >
              <TiltCard className="bg-white rounded-[20px] sm:rounded-[24px] p-6 border border-slate-200/80 hover:border-[#00c5a6]/50 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-[#e8fffb] flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-[#00c5a6]" />
                  </div>
                  <div className="text-right">
                    <div className="text-[32px] font-bold text-[#121117] leading-none">{stats.activeSpecialists}</div>
                    <p className="text-[13px] text-[#69686f] mt-1">Активні спеціалісти</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-[600] text-[#00c5a6]">Мої спеціалісти</span>
                  <ArrowRight className="h-4 w-4 text-[#00c5a6]" />
                </div>
              </TiltCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="cursor-pointer"
              onClick={() => router.push(`/client/progress?child=${selectedChildId}`)}
            >
              <TiltCard className="bg-white rounded-[20px] sm:rounded-[24px] p-6 border border-slate-200/80 hover:border-[#ffc107]/50 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-[#fff8e1] flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-[#f57c00]" />
                  </div>
                  <div className="text-right">
                    <div className="text-[32px] font-bold text-[#121117] leading-none">{stats.completedSessions}</div>
                    <p className="text-[13px] text-[#69686f] mt-1">Завершено занять</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-[600] text-[#f57c00]">Мій прогрес</span>
                  <ArrowRight className="h-4 w-4 text-[#f57c00]" />
                </div>
              </TiltCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="cursor-pointer"
              onClick={() => router.push(`/client/schedule?child=${selectedChildId}`)}
            >
              <TiltCard className="bg-white rounded-[20px] sm:rounded-[24px] p-6 border border-slate-200/80 hover:border-emerald-200/80 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-[32px] font-bold text-[#121117] leading-none">{stats.upcomingSessions}</div>
                    <p className="text-[13px] text-[#69686f] mt-1">Найближчі заняття</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-[600] text-emerald-600">Розклад</span>
                  <ArrowRight className="h-4 w-4 text-emerald-600" />
                </div>
              </TiltCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="cursor-pointer"
              onClick={() => router.push(`/client/requests?child=${selectedChildId}`)}
            >
              <TiltCard className="bg-white rounded-[20px] sm:rounded-[24px] p-6 border border-slate-200/80 hover:border-blue-200/80 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-[32px] font-bold text-[#121117] leading-none">{stats.pendingRequests}</div>
                    <p className="text-[13px] text-[#69686f] mt-1">Очікують відповіді</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-[600] text-blue-600">Мої запити</span>
                  <ArrowRight className="h-4 w-4 text-blue-600" />
                </div>
              </TiltCard>
            </motion.div>
          </div>

          {/* Gamification Progress moved down, Quick Schedule moved up */}
          {/* Quick Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="col-span-1 sm:col-span-2 lg:col-span-3 bg-white rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-[24px] font-bold text-[#121117]">Розклад на сьогодні</h2>
                <p className="text-[#69686f] text-[16px] mt-1">Ваші найближчі заняття</p>
              </div>
              <button 
                onClick={() => router.push(`/client/schedule?child=${selectedChildId}`)}
                className="text-primary font-[600] text-[15px] hover:underline"
              >
                Весь розклад
              </button>
            </div>
            
            <div className="space-y-4">
              <div 
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-[16px] border border-slate-200/80 hover:border-primary/50 hover:bg-gray-50 transition-all gap-4 sm:gap-0 cursor-pointer"
                onClick={() => router.push(`/client/schedule?child=${selectedChildId}`)}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-[700] text-[16px]">16:00</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-[600] text-[16px] text-[#121117] truncate">Математика</div>
                    <div className="text-[14px] text-[#69686f] truncate mt-1">Ігор Петренко • Онлайн</div>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-gray-100 sm:border-0">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-0">Заплановано</Badge>
                  <Button 
                    size="sm" 
                    className="rounded-[12px] bg-primary text-[#121117] hover:bg-primary/90 font-[600]"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open('https://meet.google.com/xxx', '_blank');
                    }}
                  >
                    Приєднатися
                  </Button>
                </div>
              </div>
              
              <div 
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-[16px] border border-slate-200/80 hover:border-primary/50 hover:bg-gray-50 transition-all gap-4 sm:gap-0 cursor-pointer"
                onClick={() => router.push(`/client/schedule?child=${selectedChildId}`)}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 font-[700] text-[16px]">18:30</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-[600] text-[16px] text-[#121117] truncate">Психологія</div>
                    <div className="text-[14px] text-[#69686f] truncate mt-1">Олена Коваленко • Офлайн</div>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-gray-100 sm:border-0">
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-0">Заплановано</Badge>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="rounded-[12px] font-[600] border-slate-200/80 hover:bg-slate-50 hover:text-[#121117]"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/client/schedule?child=${selectedChildId}`)
                    }}
                  >
                    Деталі
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Gamification Progress */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="cursor-pointer group"
            onClick={() => router.push(`/client/progress?child=${selectedChildId}`)}
          >
            <div className="bg-white rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)] relative overflow-hidden transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none group-hover:bg-primary/10 transition-colors" />

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                  <div className="flex flex-col gap-4 sm:gap-0">
                    <h2 className="text-[24px] font-bold text-[#121117] flex items-start sm:items-center gap-3 leading-tight">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                        <Star className="h-5 w-5 text-primary fill-primary" />
                      </div>
                      <span>Наступна ціль: Рівень {levelInfo.level + 1}</span>
                    </h2>
                    <p className="text-[#69686f] sm:mt-2 text-[16px]">
                      {levelInfo.maxXP - progress.totalXP} XP до переходу на наступний рівень
                    </p>
                  </div>
                  <div className="text-left sm:text-right mt-2 sm:mt-0">
                    <span className="text-[32px] font-bold text-[#121117]">
                      {Math.round(((progress.totalXP - levelInfo.minXP) / (levelInfo.maxXP - levelInfo.minXP)) * 100)}%
                    </span>
                    <span className="text-[#69686f] text-sm ml-1">виконано</span>
                  </div>
                </div>

                <Progress
                  value={((progress.totalXP - levelInfo.minXP) / (levelInfo.maxXP - levelInfo.minXP)) * 100}
                  className="h-4 bg-gray-100 [&>div]:bg-primary rounded-full overflow-hidden"
                />

                {progress.achievements.length > 0 && (
                  <div className="mt-8">
                    <div className="text-[14px] font-[600] text-[#121117] mb-3 flex items-center gap-2">
                      <Star className="h-4 w-4 text-[#ffc800] fill-[#ffc800]" />
                      Останні досягнення
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {progress.achievements.slice(-3).map((achievement) => (
                        <Badge key={achievement.id} variant="outline" className="border-gray-200 text-[#121117] bg-white px-3 py-1 text-[13px] rounded-[6px]">
                          <span className="mr-1 text-[16px]">{achievement.icon}</span>
                          {achievement.title}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="text-[15px] font-[600] text-[#69686f] group-hover:text-primary transition-colors">
                    Натисніть для перегляду детальної статистики
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              onClick={() => router.push(`/client/specialists?child=${selectedChildId}`)}
              className="bg-white rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 border border-slate-200/80 text-left hover:border-primary/50 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full"
            >
              <div className="h-14 w-14 rounded-full bg-[#f0f3f3] flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <Search className="h-6 w-6 text-[#121117] group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-bold text-[20px] text-[#121117]">Знайти спеціаліста</h3>
              <p className="text-[#69686f] text-[15px] mt-2 flex-grow">Пошук серед 500+ спеціалістів</p>
              <div className="flex items-center gap-2 mt-6 text-[#121117] text-[15px] font-[600] group-hover:text-primary transition-colors">
                Переглянути
                <ArrowRight className="h-4 w-4" />
              </div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              onClick={() => router.push(`/client/schedule?child=${selectedChildId}`)}
              className="bg-white rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 border border-slate-200/80 text-left hover:border-primary/50 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full"
            >
              <div className="h-14 w-14 rounded-full bg-[#f0f3f3] flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <Calendar className="h-6 w-6 text-[#121117] group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-bold text-[20px] text-[#121117]">Переглянути розклад</h3>
              <p className="text-[#69686f] text-[15px] mt-2 flex-grow">Ваші заплановані заняття</p>
              <div className="flex items-center gap-2 mt-6 text-[#121117] text-[15px] font-[600] group-hover:text-primary transition-colors">
                Переглянути
                <ArrowRight className="h-4 w-4" />
              </div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              onClick={() => router.push(`/client/materials?child=${selectedChildId}`)}
              className="bg-white rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 border border-slate-200/80 text-left hover:border-primary/50 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full"
            >
              <div className="h-14 w-14 rounded-full bg-[#f0f3f3] flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <FileText className="h-6 w-6 text-[#121117] group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-bold text-[20px] text-[#121117]">Мої матеріали</h3>
              <p className="text-[#69686f] text-[15px] mt-2 flex-grow">Навчальні документи та файли</p>
              <div className="flex items-center gap-2 mt-6 text-[#121117] text-[15px] font-[600] group-hover:text-primary transition-colors">
                Переглянути
                <ArrowRight className="h-4 w-4" />
              </div>
            </motion.button>
          </div>

          {/* Pending Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <div className="bg-white rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all">
              <div className="mb-8">
                <h2 className="text-[24px] font-bold text-[#121117]">Мої запити</h2>
                <p className="text-[#69686f] text-[16px] mt-1">Очікують відповіді від спеціалістів</p>
              </div>
              <div className="space-y-6">
                {pendingRequests.length > 0 ? (
                  pendingRequests.map((request) => (
                    <RequestCard key={request.id} request={request} userType="client" onCancel={handleCancelRequest} />
                  ))
                ) : (
                  <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-[16px]">
                    <div className="h-16 w-16 rounded-full bg-[#f0f3f3] flex items-center justify-center mx-auto mb-6">
                      <Clock className="h-8 w-8 text-[#121117]" />
                    </div>
                    <p className="text-[#69686f] text-[16px] mb-6">Немає активних запитів</p>
                    <button
                      className="inline-flex items-center justify-center gap-2 bg-primary text-[#121117] border-2 border-transparent text-[16px] font-[600] h-[48px] px-8 rounded-[8px] hover:bg-primary/90 hover:border-[#121117] transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                      onClick={() => router.push(`/client/specialists?child=${selectedChildId}`)}
                    >
                      Знайти спеціаліста
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
