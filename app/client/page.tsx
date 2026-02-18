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
  pri: "#009688",
  dark: "#00796B", 
  light: "#E0F2F1",
  mid: "#B2DFDB",
} as const

export default function ClientPage() {
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
        <div className="p-6 lg:p-10 max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight">Головна</h1>
            <p className="text-slate-500 mt-1">Ваш особистий кабінет</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {selectableChildren.map((child) => (
                <Button
                  key={child.id}
                  variant={child.id === selectedChildId ? "default" : "outline"}
                  size="sm"
                  onClick={() => router.push(`/client?child=${child.id}`)}
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

          {/* Stats Grid */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <TiltCard className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-200/80 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-slate-500">Мої спеціалісти</span>
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-emerald-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-800">{stats.activeSpecialists}</div>
                <p className="text-sm text-slate-500 mt-1">Активні</p>
              </TiltCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <TiltCard className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-amber-200/80 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-slate-500">Очікують відповіді</span>
                  <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-800">{stats.pendingRequests}</div>
                <p className="text-sm text-slate-500 mt-1">Запити</p>
              </TiltCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <TiltCard className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-200/80 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-slate-500">Завершено занять</span>
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-800">{stats.completedSessions}</div>
                <p className="text-sm text-slate-500 mt-1">Всього</p>
              </TiltCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <TiltCard className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-amber-200/80 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-slate-500">Рівень</span>
                  <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
                    <Award className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-800">{stats.level}</div>
                <p className="text-sm text-slate-500 mt-1">Активний учень</p>
              </TiltCard>
            </motion.div>
          </div>

          {/* Gamification Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div 
              className="bg-white rounded-3xl p-8 border border-slate-200/80 relative overflow-hidden hover:shadow-xl transition-all cursor-pointer"
              onClick={() => router.push('/client/gamification')}
              style={{ zIndex: 1 }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/40 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Рівень {progress.level} - {levelInfo.title}</h3>
                      <p className="text-slate-500 mt-0.5">
                        {progress.totalSessions < levelInfo.maxSessions 
                          ? `Ще ${levelInfo.maxSessions - progress.totalSessions} занять до наступного рівня`
                          : "Максимальний рівень досягнуто!"
                        }
                      </p>
                    </div>
                  </div>
                  <Badge className="text-sm px-4 py-2 bg-emerald-50 text-emerald-700 font-medium border-emerald-200">
                    {progress.totalSessions} занять
                  </Badge>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-xs text-slate-500 mb-2">
                    <span>Прогрес рівня</span>
                    <span>{Math.round(((progress.totalSessions - levelInfo.minSessions) / (levelInfo.maxSessions - levelInfo.minSessions)) * 100)}%</span>
                  </div>
                  <Progress 
                    value={((progress.totalSessions - levelInfo.minSessions) / (levelInfo.maxSessions - levelInfo.minSessions)) * 100} 
                    className="h-2 bg-slate-100 [&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-emerald-600" 
                  />
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{progress.points}</div>
                    <div className="text-xs text-slate-500">Балів</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600">{progress.currentStreak}</div>
                    <div className="text-xs text-slate-500">Поточна серія</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{progress.achievements.length}</div>
                    <div className="text-xs text-slate-500">Досягнення</div>
                  </div>
                </div>

                {/* Recent Achievements */}
                {progress.achievements.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
                      <Star className="h-4 w-4 text-amber-500" />
                      Останні досягнення
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {progress.achievements.slice(-3).map((achievement) => (
                        <Badge key={achievement.id} variant="outline" className="border-amber-200 text-amber-700 bg-amber-50 px-3 py-1">
                          <span className="mr-1">{achievement.icon}</span>
                          {achievement.title}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Call to Action */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-slate-500">
                    Натисніть для перегляду детальної статистики
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid gap-5 md:grid-cols-3">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              onClick={() => router.push(`/client/specialists?child=${selectedChildId}`)}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 text-left hover:border-emerald-200/80 hover:shadow-lg transition-all group"
            >
              <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors">
                <Search className="h-6 w-6 text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-lg text-slate-800">Знайти спеціаліста</h3>
              <p className="text-slate-500 text-sm mt-1">Пошук серед 500+ спеціалістів</p>
              <div className="flex items-center gap-2 mt-4 text-emerald-600 text-sm font-medium group-hover:text-emerald-700">
                Переглянути
                <ArrowRight className="h-4 w-4" />
              </div>
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              onClick={() => router.push(`/client/schedule?child=${selectedChildId}`)}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 text-left hover:border-emerald-200/80 hover:shadow-lg transition-all group"
            >
              <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors">
                <Calendar className="h-6 w-6 text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-lg text-slate-800">Переглянути розклад</h3>
              <p className="text-slate-500 text-sm mt-1">Ваші заплановані заняття</p>
              <div className="flex items-center gap-2 mt-4 text-emerald-600 text-sm font-medium group-hover:text-emerald-700">
                Переглянути
                <ArrowRight className="h-4 w-4" />
              </div>
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              onClick={() => router.push(`/client/materials?child=${selectedChildId}`)}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 text-left hover:border-amber-200/80 hover:shadow-lg transition-all group"
            >
              <div className="h-14 w-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-4 group-hover:bg-amber-600 transition-colors">
                <FileText className="h-6 w-6 text-amber-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-lg text-slate-800">Мої матеріали</h3>
              <p className="text-slate-500 text-sm mt-1">Навчальні документи та файли</p>
              <div className="flex items-center gap-2 mt-4 text-amber-600 text-sm font-medium group-hover:text-amber-700">
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
            <TiltCard className="bg-white rounded-3xl p-8 border border-slate-200/80 hover:shadow-xl transition-all">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-800">Мої запити</h2>
                <p className="text-slate-500 text-sm mt-1">Очікують відповіді від спеціалістів</p>
              </div>
              <div className="space-y-4">
                {pendingRequests.length > 0 ? (
                  pendingRequests.map((request) => (
                    <RequestCard key={request.id} request={request} userType="client" onCancel={handleCancelRequest} />
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-8 w-8 text-slate-300" />
                    </div>
                    <p className="text-slate-500">Немає активних запитів</p>
                    <SquishyButton 
                      bgColor={B.pri}
                      className="mt-4 rounded-full px-6 py-2 text-sm inline-flex items-center gap-2"
                      onClick={() => router.push(`/client/specialists?child=${selectedChildId}`)}
                    >
                      Знайти спеціаліста
                      <ArrowRight className="h-4 w-4" />
                    </SquishyButton>
                  </div>
                )}
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
