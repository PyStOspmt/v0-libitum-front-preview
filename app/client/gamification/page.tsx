"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { useGamificationStore } from "@/lib/gamification-store"
import { useAuth } from "@/lib/auth-context"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Star, TrendingUp, Clock, Target, Zap, Trophy, Medal } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"

export default function GamificationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { getProgress, getLevelInfo } = useGamificationStore()
  const { user } = useAuth()

  const children = [
    user ? { id: user.id, name: user.name || "Я", label: user.name ? `${user.name} (я)` : "Я" } : null,
    { id: "child-1", name: "Марія Коваленко", label: "Марія, 12 років" },
    { id: "child-2", name: "Іван Коваленко", label: "Іван, 9 років" },
  ].filter(Boolean) as { id: string; name: string; label: string }[]

  const initialChild = searchParams.get("child") || (user?.id ?? children[0].id)
  const selectedChildId = children.find((c) => c.id === initialChild)?.id || (user?.id ?? children[0].id)

  const progress = getProgress(selectedChildId || user?.id || "client-1")
  const levelInfo = getLevelInfo(progress.totalSessions)

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
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight">Гейміфікація</h1>
                <p className="text-slate-500 mt-1">Ваш прогрес та досягнення</p>
              </div>
              <Button
                variant="outline"
                onClick={() => router.push('/client')}
                className="rounded-full border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50"
              >
                Назад
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {children.map((child) => (
                <Button
                  key={child.id}
                  variant={child.id === selectedChildId ? "default" : "outline"}
                  size="sm"
                  onClick={() => router.push(`/client/gamification?child=${child.id}`)}
                  className={`rounded-full transition-all ${child.id === selectedChildId
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                >
                  {child.label}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Level Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Card className="border-slate-200 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-emerald-600 shadow-sm flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Рівень {progress.level} — {levelInfo.title}</h2>
                    <p className="text-slate-600">{progress.totalSessions} занять завершено</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex flex-wrap items-center justify-between text-sm text-slate-600 mb-2 gap-2">
                    <span>Прогрес до наступного рівня</span>
                    <span className="font-semibold text-emerald-700">
                      {Math.round(((progress.totalXP - levelInfo.minXP) / (levelInfo.maxXP - levelInfo.minXP)) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={((progress.totalXP - levelInfo.minXP) / (levelInfo.maxXP - levelInfo.minXP)) * 100}
                    className="h-2.5 bg-slate-200 [&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-emerald-600"
                  />
                  <p className="text-sm text-slate-500 mt-2">
                    {progress.totalXP < levelInfo.maxXP
                      ? `Ще ${levelInfo.maxXP - progress.totalXP} балів до рівня ${progress.level + 1}`
                      : "Ви досягли максимального рівня!"}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-xl border border-slate-100 p-4 text-center">
                    <div className="text-3xl font-bold text-emerald-600">{progress.totalXP}</div>
                    <div className="text-sm text-slate-600 mt-1">Досвід (XP)</div>
                  </div>
                  <div className="rounded-xl border border-slate-100 p-4 text-center">
                    <div className="text-3xl font-bold text-amber-600">{progress.currentStreak}</div>
                    <div className="text-sm text-slate-600 mt-1">Поточна серія</div>
                  </div>
                  <div className="rounded-xl border border-slate-100 p-4 text-center">
                    <div className="text-3xl font-bold text-purple-600">{progress.longestStreak}</div>
                    <div className="text-sm text-slate-600 mt-1">Найдовша серія</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Level Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-600" />
                  Переваги рівня {progress.level}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {levelInfo.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg">
                      <Star className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="h-5 w-5 text-purple-600" />
                  Досягнення ({progress.achievements.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {progress.achievements.map((achievement) => (
                    <div key={achievement.id} className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-2xl">{achievement.icon}</div>
                        <Badge variant="secondary" className="bg-purple-200 text-purple-700">
                          Отримано
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-slate-800">{achievement.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{achievement.description}</p>
                      {achievement.unlockedAt && (
                        <p className="text-xs text-slate-500 mt-2">
                          Отримано: {new Date(achievement.unlockedAt).toLocaleDateString('uk-UA')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-emerald-200 bg-emerald-50">
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-emerald-700">{progress.totalSessions}</div>
                  <div className="text-sm text-emerald-600">Всього занять</div>
                </CardContent>
              </Card>
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="p-6 text-center">
                  <Zap className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-amber-700">{progress.totalXP}</div>
                  <div className="text-sm text-amber-600">Досвід (XP)</div>
                </CardContent>
              </Card>
              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="p-6 text-center">
                  <Trophy className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-700">{progress.achievements.length}</div>
                  <div className="text-sm text-purple-600">Досягнень</div>
                </CardContent>
              </Card>
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-700">{progress.level}</div>
                  <div className="text-sm text-blue-600">Рівень</div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
