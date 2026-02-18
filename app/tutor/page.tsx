"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { useRequestStore } from "@/lib/request-store"
import { useGamificationStore } from "@/lib/gamification-store"
import { useAuth } from "@/lib/auth-context"
import { RequestCard } from "@/components/request-card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Users, Clock, Star, DollarSign, Award, BarChart3, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function TutorPage() {
  const { toast } = useToast()
  const { getRequestsBySpecialist, acceptRequest, rejectRequest } = useRequestStore()
  const { getProgress, getLevelInfo } = useGamificationStore()
  const { user } = useAuth()

  const specialistId = user?.id || "specialist-1"

  const specialistRequests = getRequestsBySpecialist(specialistId)
  const pendingRequests = specialistRequests.filter((req) => req.status === "pending")
  const progress = getProgress(specialistId)
  const currentLevel = getLevelInfo(progress.totalSessions)
  const levelProgress = currentLevel.maxSessions === Number.POSITIVE_INFINITY
    ? 100
    : Math.max(0, Math.min(100, ((progress.totalSessions - currentLevel.minSessions) / (currentLevel.maxSessions - currentLevel.minSessions)) * 100))

  const stats = {
    activeClients: 12,
    pendingRequests: pendingRequests.length,
    completedSessions: progress.totalSessions,
    earnings: 15600,
    rating: 4.8,
    level: progress.level,
  }

  const handleAcceptRequest = (requestId: string) => {
    acceptRequest(requestId)
    toast({
      title: "Запит прийнято",
      description: "Заняття додано до вашого розкладу",
    })
  }

  const handleRejectRequest = (requestId: string) => {
    rejectRequest(requestId)
    toast({
      title: "Запит відхилено",
      description: "Клієнт отримає повідомлення",
      variant: "destructive",
    })
  }

  return (
    <ProtectedRoute allowedRoles={["specialist"]}>
      <SidebarLayout userType="tutor">
        <div className="p-6 lg:p-10 max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight">Головна</h1>
            <p className="text-slate-500 mt-1">Кабінет спеціаліста</p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-500">Активні клієнти</span>
                <div className="h-10 w-10 rounded-xl bg-[var(--theme-primary-light)] flex items-center justify-center">
                  <Users className="h-5 w-5 text-[var(--theme-primary)]" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-800">{stats.activeClients}</div>
              <p className="text-sm text-slate-500 mt-1">+2 цього місяця</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-500">Нові запити</span>
                <div className="h-10 w-10 rounded-xl bg-[#fff8e1] flex items-center justify-center">
                  <Clock className="h-5 w-5 text-[#ffb74d]" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-800">{stats.pendingRequests}</div>
              <p className="text-sm text-slate-500 mt-1">Потребують відповіді</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-500">Рейтинг</span>
                <div className="h-10 w-10 rounded-xl bg-[#fff8e1] flex items-center justify-center">
                  <Star className="h-5 w-5 text-[#ffc107]" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-800">{stats.rating}</div>
              <p className="text-sm text-slate-500 mt-1">З 48 відгуків</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-500">Заробіток</span>
                <div className="h-10 w-10 rounded-xl bg-[var(--theme-primary-light)] flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-[var(--theme-primary)]" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-800">{stats.earnings} ₴</div>
              <p className="text-sm text-slate-500 mt-1">За цей місяць</p>
            </div>
          </div>

          {/* Level Card */}
          <Link href="/tutor/stats">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 relative overflow-hidden cursor-pointer hover:border-[var(--theme-primary)]/30 hover:shadow-sm transition-all group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--theme-primary-light)] rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--theme-primary)]">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">
                        Рівень {stats.level} - {currentLevel.title}
                      </h3>
                      <p className="text-slate-500 mt-0.5">Натисніть для детальної статистики</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="text-sm px-4 py-2 bg-[var(--theme-primary-light)] text-[var(--theme-primary-dark)] font-medium border-0">
                      {stats.completedSessions} занять
                    </Badge>
                    <BarChart3 className="h-5 w-5 text-[var(--theme-primary)] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <Progress value={levelProgress} className="h-2 mt-6 bg-slate-100 [&>div]:bg-[var(--theme-primary)]" />
                <div className="mt-5 flex gap-2 flex-wrap">
                  {progress.achievements.slice(0, 3).map((achievement) => (
                    <Badge key={achievement.id} variant="outline" className="border-slate-200 text-slate-600 bg-white px-3 py-1">
                      {achievement.icon} {achievement.title}
                    </Badge>
                  ))}
                  {progress.achievements.length > 3 && (
                    <Badge variant="outline" className="border-slate-200 text-slate-600 bg-white px-3 py-1">
                      +{progress.achievements.length - 3} ще
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Link>

          {/* Pending Requests */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Нові запити на заняття</h2>
                <p className="text-slate-500 text-sm mt-1">Відповідайте протягом 3 годин для збереження рейтингу</p>
              </div>
              <Link href="/tutor/requests">
                <Button variant="ghost" className="text-[var(--theme-primary)] hover:text-[var(--theme-primary-dark)] hover:bg-[var(--theme-primary-light)]">
                  Всі запити
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
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
                <div className="py-12 text-center">
                  <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-slate-300" />
                  </div>
                  <p className="text-slate-500">Немає нових запитів</p>
                  <Link href="/tutor/exchange">
                    <Button className="mt-4 rounded-full bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)]">
                      Переглянути біржу
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
