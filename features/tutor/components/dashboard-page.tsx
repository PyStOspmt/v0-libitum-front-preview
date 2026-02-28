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
import { Users, Clock, Star, DollarSign, Award, BarChart3, ArrowRight, Flame, Target, Coins, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { format } from "date-fns"
import { uk } from "date-fns/locale"

export function TutorDashboardPage() {
  const { toast } = useToast()
  const { getRequestsBySpecialist, acceptRequest, rejectRequest } = useRequestStore()
  const { getProgress, getLevelInfo } = useGamificationStore()
  const { user } = useAuth()

  const specialistId = user?.id || "specialist-1"

  const specialistRequests = getRequestsBySpecialist(specialistId)
  const pendingRequests = specialistRequests.filter((req) => req.status === "pending")
  const progress = getProgress(specialistId)
  const currentLevel = getLevelInfo(progress.totalXP)
  const levelProgress = currentLevel.maxXP === Number.POSITIVE_INFINITY
    ? 100
    : Math.max(0, Math.min(100, ((progress.totalXP - currentLevel.minXP) / (currentLevel.maxXP - currentLevel.minXP)) * 100))

  const stats = {
    activeClients: 12,
    pendingRequests: pendingRequests.length,
    completedSessions: progress.totalSessions,
    earnings: 15600,
    rating: 4.8,
    level: progress.level,
    streak: 5,
    lcBalance: 1250,
  }

  const [goals, setGoals] = useState([
    { id: 1, title: "Заповнити звіт по уроку", completed: false, xp: 10, lc: 0 },
    { id: 2, title: "Перевірити ДЗ", completed: true, xp: 15, lc: 0 },
    { id: 3, title: "Додати матеріал", completed: false, xp: 5, lc: 0 },
    { id: 4, title: "Додати власного учня", completed: false, xp: 50, lc: 0 },
  ])

  // Mock next lessons
  const nextLessons = [
    { id: "1", studentName: "Марія Коваленко", subject: "Англійська мова", time: "14:00", date: new Date(), url: "https://zoom.us/j/123456789" },
    { id: "2", studentName: "Олександр Петренко", subject: "Математика", time: "16:00", date: new Date(), url: "https://meet.google.com/abc-defg-hij" },
  ]

  const handleToggleGoal = (id: number) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g))
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
        <div className="p-3 sm:p-6 lg:p-10 max-w-[1200px] mx-auto space-y-6 sm:space-y-8 font-sans">
          {/* Header */}
          <div>
            <h1 className="text-[32px] lg:text-[40px] font-bold text-[#121117] tracking-tight">Головна</h1>
            <p className="text-[#69686f] mt-1 text-[16px]">Кабінет спеціаліста</p>
          </div>

          {/* Next Lessons */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
            {nextLessons.map((lesson) => (
              <div key={lesson.id} className="bg-white rounded-[20px] sm:rounded-[24px] p-5 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-[18px] font-bold text-[#121117]">{lesson.studentName}</h3>
                      <p className="text-[14px] text-[#69686f]">{lesson.subject}</p>
                    </div>
                    <Badge variant="outline" className="bg-[#f8f9fb] border-slate-200">
                      Сьогодні, {lesson.time}
                    </Badge>
                  </div>
                </div>
                <div className="mt-4">
                  <a href={lesson.url} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 bg-[var(--theme-primary)] text-white text-[15px] font-[600] h-[44px] rounded-[8px] hover:bg-[var(--theme-primary-hover)] transition-colors">
                    Приєднатися до уроку
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[14px] font-[600] text-[#69686f]">Активні клієнти</span>
                <div className="h-10 w-10 rounded-full bg-[#f0f3f3] flex items-center justify-center shrink-0">
                  <Users className="h-5 w-5 text-[#121117]" />
                </div>
              </div>
              <div className="text-[32px] font-bold text-[#121117] leading-none">{stats.activeClients}</div>
              <p className="text-[13px] text-[#69686f] mt-2">+2 цього місяця</p>
            </div>

            <div className="bg-white rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[14px] font-[600] text-[#69686f]">Нові запити</span>
                <div className="h-10 w-10 rounded-full bg-[#fff8e1] flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-[#ffb74d]" />
                </div>
              </div>
              <div className="text-[32px] font-bold text-[#121117] leading-none">{stats.pendingRequests}</div>
              <p className="text-[13px] text-[#69686f] mt-2">Потребують відповіді</p>
            </div>

            <div className="bg-white rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[14px] font-[600] text-[#69686f]">Рейтинг</span>
                <div className="h-10 w-10 rounded-full bg-[#fff8e1] flex items-center justify-center shrink-0">
                  <Star className="h-5 w-5 text-[#ffc107]" />
                </div>
              </div>
              <div className="text-[32px] font-bold text-[#121117] leading-none">{stats.rating}</div>
              <p className="text-[13px] text-[#69686f] mt-2">З 48 відгуків</p>
            </div>

            <div className="bg-white rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[14px] font-[600] text-[#69686f]">Заробіток</span>
                <div className="h-10 w-10 rounded-full bg-[var(--theme-primary-light)] flex items-center justify-center shrink-0">
                  <DollarSign className="h-5 w-5 text-[var(--theme-primary)]" />
                </div>
              </div>
              <div className="text-[32px] font-bold text-[#121117] leading-none">{stats.earnings} ₴</div>
              <p className="text-[13px] text-[#69686f] mt-2">За цей місяць</p>
            </div>
          </div>

          {/* Level Card & Gamification */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
            {/* Level Card */}
            <div className="md:col-span-2">
              <Link href="/tutor/stats" className="block h-full">
                <div className="bg-white rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)] relative overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300 group h-full">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--theme-primary-light)] rounded-full -translate-y-1/2 translate-x-1/2 transition-colors opacity-70 group-hover:opacity-100" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-5">
                        <div className="flex h-16 w-16 items-center justify-center rounded-[12px] bg-[var(--theme-primary)]">
                          <Award className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-[24px] font-bold text-[#121117]">
                            Рівень {stats.level} - {currentLevel.title}
                          </h3>
                          <p className="text-[#69686f] mt-1 text-[15px]">Натисніть для детальної статистики</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="text-[14px] px-4 py-2 bg-[var(--theme-primary-light)] text-[var(--theme-primary-dark)] font-[600] rounded-[8px] border-0">
                          {stats.completedSessions} занять
                        </Badge>
                        <BarChart3 className="h-5 w-5 text-[var(--theme-primary)] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    <Progress value={levelProgress} className="h-3 mt-8 bg-gray-100 [&>div]:bg-[var(--theme-primary)] rounded-full overflow-hidden" />
                    <div className="mt-6 flex gap-2 flex-wrap">
                      {progress.achievements.slice(0, 3).map((achievement) => (
                        <Badge key={achievement.id} variant="outline" className="border-gray-200 text-[#121117] bg-white px-3 py-1 text-[13px] rounded-[6px]">
                          <span className="mr-1 text-[16px]">{achievement.icon}</span> {achievement.title}
                        </Badge>
                      ))}
                      {progress.achievements.length > 3 && (
                        <Badge variant="outline" className="border-gray-200 text-[#121117] bg-white px-3 py-1 text-[13px] rounded-[6px]">
                          +{progress.achievements.length - 3} ще
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Streak & LC */}
            <div className="space-y-6">
              <div className="bg-white rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-[12px] bg-[#fff8e1] flex items-center justify-center shrink-0">
                    <Flame className="h-6 w-6 text-[#ff9800]" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#121117]">{stats.streak} днів поспіль</h3>
                    <p className="text-[13px] text-[#69686f]">Зайдіть завтра, щоб не втратити серію</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[13px] font-[600] text-[#ff9800] bg-[#fff8e1]/50 px-3 py-2 rounded-[8px]">
                  <span>Бонус завтра:</span>
                  <span>+50 XP</span>
                </div>
              </div>

              <div className="bg-white rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-[12px] bg-[#f0f3f3] flex items-center justify-center shrink-0">
                    <Coins className="h-6 w-6 text-[#121117]" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#121117]">{stats.lcBalance} LC</h3>
                    <p className="text-[13px] text-[#69686f]">Баланс Libitum Coins</p>
                  </div>
                </div>
                <Link href="/tutor/rewards">
                  <Button className="w-full bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-hover)] text-[#121117] font-[600] rounded-[8px] h-10">
                    Магазин винагород
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Goals & Tasks */}
          <div className="bg-white rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-[var(--theme-primary)]" />
                <h2 className="text-[20px] font-bold text-[#121117]">Цілі на сьогодні</h2>
              </div>
              <span className="text-[14px] font-[600] text-[var(--theme-primary-dark)] bg-[var(--theme-primary-light)] px-3 py-1 rounded-[8px]">
                {goals.filter(g => g.completed).length} / {goals.length} виконано
              </span>
            </div>
            <div className="space-y-3">
              {goals.map(goal => (
                <div
                  key={goal.id}
                  onClick={() => handleToggleGoal(goal.id)}
                  className={`flex items-center gap-4 p-4 rounded-[12px] border cursor-pointer transition-colors ${goal.completed
                    ? 'bg-[#f8f9fb] border-transparent'
                    : 'bg-white border-slate-200/80 hover:border-[var(--theme-primary)]'
                    }`}
                >
                  <div className={`flex items-center justify-center h-6 w-6 rounded-full border-2 shrink-0 transition-colors ${goal.completed
                    ? 'bg-[var(--theme-primary)] border-[var(--theme-primary)]'
                    : 'border-slate-300'
                    }`}>
                    {goal.completed && <CheckCircle2 className="h-4 w-4 text-white" />}
                  </div>
                  <span className={`text-[15px] font-[500] ${goal.completed ? 'text-[#69686f] line-through' : 'text-[#121117]'
                    }`}>
                    {goal.title}
                  </span>
                  {!goal.completed && (
                    <Badge variant="outline" className="ml-auto text-[12px] text-[#ff9800] border-[#ff9800]/30 bg-[#fff8e1]/50">
                      +10 XP
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pending Requests */}
          <div className="bg-white rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div>
                <h2 className="text-[24px] font-bold text-[#121117]">Нові запити на заняття</h2>
                <p className="text-[#69686f] text-[16px] mt-1">Відповідайте протягом 3 годин для збереження рейтингу</p>
              </div>
              <Link href="/tutor/requests">
                <Button variant="ghost" className="text-[16px] font-[600] text-[#121117] hover:text-[var(--theme-primary)] hover:bg-transparent h-auto p-0">
                  Всі запити
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="space-y-6">
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
                <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-[16px]">
                  <div className="h-16 w-16 rounded-full bg-[#f0f3f3] flex items-center justify-center mx-auto mb-6">
                    <Clock className="h-8 w-8 text-[#121117]" />
                  </div>
                  <p className="text-[#69686f] text-[16px] mb-6">Немає нових запитів</p>
                  <Link href="/tutor/exchange">
                    <button className="inline-flex items-center justify-center gap-2 bg-[var(--theme-primary)] text-[#121117] border-2 border-transparent text-[16px] font-[600] h-[48px] px-8 rounded-[8px] hover:bg-[var(--theme-primary-hover)] hover:border-[#121117] transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                      Переглянути біржу
                    </button>
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
