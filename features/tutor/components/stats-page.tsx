"use client"

import { useAuth } from "@/lib/auth-context"
import { useTheme } from "@/lib/theme-context"
import { useGamificationStore, levels, availableAchievements } from "@/lib/gamification-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Award, TrendingUp, Star, Clock, CheckCircle2, Target, Zap } from "lucide-react"
import { SidebarLayout } from "@/components/sidebar-layout"

export function TutorStatsPage() {
  const { user } = useAuth()
  const { theme } = useTheme()
  const { getProgress, getLevelInfo, getCategoryProgress } = useGamificationStore()

  const progress = getProgress(user?.id || "specialist-1")
  const currentLevel = getLevelInfo(progress.totalXP)
  const categoryProgress = getCategoryProgress(user?.id || "specialist-1")
  const nextLevel = levels.find((l) => l.level === currentLevel.level + 1)

  const progressToNextLevel = nextLevel
    ? ((progress.totalXP - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100
    : 100

  const stats = {
    rating: 4.8,
    totalReviews: 48,
    responseTime: "2 години",
    acceptanceRate: 95,
    completionRate: 98,
    repeatClients: 75,
  }

  return (
    <SidebarLayout userType="tutor">
      <div className="container mx-auto max-w-[1200px] px-6 py-8 font-sans">
        <div className="mb-8">
          <h1 className="text-[32px] font-bold text-[#121117] tracking-tight">Статистика та досягнення</h1>
          <p className="text-[16px] text-[#69686f] mt-1">Відстежуйте свій прогрес та розблоковуйте нагороди</p>
        </div>

        <div className="space-y-8">
          {/* Level Progress */}
          <div className="bg-white rounded-[24px] p-8 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--theme-primary-light)] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[12px] bg-[var(--theme-primary)] shadow-sm">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-[24px] font-bold text-[#121117]">
                      Рівень {currentLevel.level} - {currentLevel.title}
                    </h2>
                    <p className="text-[15px] text-[#69686f] mt-1">
                      {nextLevel
                        ? `Ще ${nextLevel.minXP - progress.totalXP} XP до рівня ${nextLevel.level}`
                        : "Максимальний рівень досягнуто!"}
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right bg-[#f0f3f3] px-6 py-3 rounded-[16px]">
                  <div className="text-[32px] font-bold text-[#121117] leading-none">{progress.totalXP}</div>
                  <div className="text-[14px] font-[600] text-[#69686f] mt-1">Загальний XP</div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[14px] font-[600] text-[#121117]">Прогрес до наступного рівня</span>
                    <span className="font-[600] text-[var(--theme-primary)]">{Math.round(categoryProgress.percentage)}%</span>
                  </div>
                  <Progress value={categoryProgress.percentage} className="h-3 bg-gray-100 [&>div]:bg-[var(--theme-primary)]" />
                </div>
                <div className="pt-6 border-t border-gray-100">
                  <p className="mb-4 text-[15px] font-[600] text-[#121117]">Переваги поточного рівня:</p>
                  <div className="flex flex-wrap gap-2">
                    {currentLevel.benefits.map((benefit) => (
                      <Badge key={benefit} variant="outline" className="bg-[var(--theme-primary-light)] text-[var(--theme-primary-dark)] border-0 px-3 py-1.5 text-[14px] font-[500] rounded-[8px]">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[14px] font-[600] text-[#69686f]">Рейтинг</span>
                <div className="h-10 w-10 rounded-full bg-[#fff8e1] flex items-center justify-center">
                  <Star className="h-5 w-5 text-[#ffc107]" />
                </div>
              </div>
              <div className="text-[32px] font-bold text-[#121117] leading-none">{stats.rating}</div>
              <p className="text-[13px] text-[#69686f] mt-2">З {stats.totalReviews} відгуків</p>
              <Progress value={(stats.rating / 5) * 100} className="mt-4 h-2 bg-gray-100 [&>div]:bg-[#ffc107]" />
            </div>

            <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[14px] font-[600] text-[#69686f]">Час відповіді</span>
                <div className="h-10 w-10 rounded-full bg-[#f0f3f3] flex items-center justify-center">
                  <Clock className="h-5 w-5 text-[#121117]" />
                </div>
              </div>
              <div className="text-[32px] font-bold text-[#121117] leading-none">{stats.responseTime}</div>
              <p className="text-[13px] text-[#69686f] mt-2">Середній час</p>
              <Progress value={90} className="mt-4 h-2 bg-gray-100 [&>div]:bg-[var(--theme-primary)]" />
            </div>

            <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[14px] font-[600] text-[#69686f]">Прийняття запитів</span>
                <div className="h-10 w-10 rounded-full bg-[var(--theme-primary-light)] flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-[var(--theme-primary)]" />
                </div>
              </div>
              <div className="text-[32px] font-bold text-[#121117] leading-none">{stats.acceptanceRate}%</div>
              <p className="text-[13px] text-[#69686f] mt-2">Прийнято</p>
              <Progress value={stats.acceptanceRate} className="mt-4 h-2 bg-gray-100 [&>div]:bg-[var(--theme-primary)]" />
            </div>

            <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[14px] font-[600] text-[#69686f]">Завершення занять</span>
                <div className="h-10 w-10 rounded-full bg-[#e8f5e9] flex items-center justify-center">
                  <Target className="h-5 w-5 text-[#43a047]" />
                </div>
              </div>
              <div className="text-[32px] font-bold text-[#121117] leading-none">{stats.completionRate}%</div>
              <p className="text-[13px] text-[#69686f] mt-2">Успішно завершено</p>
              <Progress value={stats.completionRate} className="mt-4 h-2 bg-gray-100 [&>div]:bg-[#43a047]" />
            </div>

            <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[14px] font-[600] text-[#69686f]">Повторні клієнти</span>
                <div className="h-10 w-10 rounded-full bg-[#e8eaf6] flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-[#5c6bc0]" />
                </div>
              </div>
              <div className="text-[32px] font-bold text-[#121117] leading-none">{stats.repeatClients}%</div>
              <p className="text-[13px] text-[#69686f] mt-2">Повертаються</p>
              <Progress value={stats.repeatClients} className="mt-4 h-2 bg-gray-100 [&>div]:bg-[#5c6bc0]" />
            </div>

            <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[14px] font-[600] text-[#69686f]">Поточна серія</span>
                <div className="h-10 w-10 rounded-full bg-[#ffebee] flex items-center justify-center">
                  <Zap className="h-5 w-5 text-[#e53935]" />
                </div>
              </div>
              <div className="text-[32px] font-bold text-[#121117] leading-none">{progress.currentStreak}</div>
              <p className="text-[13px] text-[#69686f] mt-2">Днів поспіль</p>
              <p className="mt-1 text-[13px] font-[600] text-[#121117]">Рекорд: {progress.longestStreak} днів</p>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-[24px] p-8 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
            <div className="mb-6">
              <h2 className="text-[24px] font-bold text-[#121117]">Досягнення</h2>
              <p className="text-[#69686f] text-[16px] mt-1">
                Розблоковано {progress.achievements.length} з {availableAchievements.length}
              </p>
            </div>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {availableAchievements.map((achievement) => {
                const unlocked = progress.achievements.find((a) => a.id === achievement.id)
                return (
                  <div key={achievement.id} className={`rounded-[16px] border p-5 transition-all ${unlocked ? "border-[var(--theme-primary)]/30 bg-[var(--theme-primary-light)]" : "border-slate-200/80 bg-white opacity-60 grayscale-[0.5]"}`}>
                    <div className="flex items-start gap-4">
                      <div className="text-[32px] shrink-0 leading-none">{achievement.icon}</div>
                      <div className="flex-1">
                        <p className={`font-[600] text-[16px] ${unlocked ? "text-[#121117]" : "text-[#69686f]"}`}>{achievement.title}</p>
                        <p className={`text-[14px] mt-1 ${unlocked ? "text-[#121117]/80" : "text-[#69686f]"}`}>{achievement.description}</p>
                        {unlocked && (
                          <p className="mt-2 text-[12px] font-[600] text-[var(--theme-primary-dark)]">
                            Розблоковано {new Date(unlocked.unlockedAt!).toLocaleDateString("uk-UA")}
                          </p>
                        )}
                      </div>
                      {unlocked && <CheckCircle2 className="h-5 w-5 text-[var(--theme-primary)] shrink-0" />}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* All Levels */}
          <div className="bg-white rounded-[24px] p-8 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
            <div className="mb-6">
              <h2 className="text-[24px] font-bold text-[#121117]">Всі рівні</h2>
              <p className="text-[#69686f] text-[16px] mt-1">Прогресуйте та отримуйте більше переваг</p>
            </div>
            <div className="space-y-4">
              {levels.map((level) => (
                <div
                  key={level.level}
                  className={`rounded-[16px] border p-6 transition-all ${level.level === currentLevel.level ? "border-[var(--theme-primary)] bg-[var(--theme-primary-light)] shadow-sm" : "border-slate-200/80 bg-white hover:border-slate-300"
                    } ${level.level > currentLevel.level ? "opacity-60" : ""}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center flex-wrap gap-3">
                        <h3 className={`font-bold text-[18px] ${level.level === currentLevel.level ? "text-[#121117]" : "text-[#121117]"}`}>
                          Рівень {level.level}: {level.title}
                        </h3>
                        {level.level === currentLevel.level && <Badge className="bg-[#121117] text-white border-0 hover:bg-[#121117]">Поточний</Badge>}
                        {level.level < currentLevel.level && (
                          <Badge variant="outline" className="bg-[#f0f3f3] text-[#69686f] border-0 px-3 py-1 rounded-[6px]">
                            <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                            Досягнуто
                          </Badge>
                        )}
                      </div>
                      <p className={`mb-4 text-[15px] font-[500] ${level.level === currentLevel.level ? "text-[var(--theme-primary-dark)]" : "text-[#69686f]"}`}>
                        {level.minXP === 0
                          ? `0 - ${level.maxXP} XP`
                          : level.maxXP === Number.POSITIVE_INFINITY
                            ? `${level.minXP}+ XP`
                            : `${level.minXP} - ${level.maxXP} XP`}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {level.benefits.map((benefit) => (
                          <Badge key={benefit} variant="outline" className={`border-slate-200/80 px-3 py-1.5 text-[14px] font-[500] rounded-[8px] ${level.level === currentLevel.level ? "bg-white text-[#121117]" : "bg-[#f0f3f3] text-[#69686f]"}`}>
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}
