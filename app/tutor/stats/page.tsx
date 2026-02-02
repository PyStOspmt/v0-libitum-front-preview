"use client"

import { useAuth } from "@/lib/auth-context"
import { useGamificationStore, levels, availableAchievements } from "@/lib/gamification-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Award, TrendingUp, Star, Clock, CheckCircle2, Target, Zap } from "lucide-react"
import { SidebarLayout } from "@/components/sidebar-layout"

export default function TutorStatsPage() {
  const { user } = useAuth()
  const { getProgress, getLevelInfo } = useGamificationStore()

  const progress = getProgress("specialist-1")
  const currentLevel = getLevelInfo(progress.totalSessions)
  const nextLevel = levels.find((l) => l.level === currentLevel.level + 1)

  const progressToNextLevel = nextLevel
    ? ((progress.totalSessions - currentLevel.minSessions) / (nextLevel.minSessions - currentLevel.minSessions)) * 100
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
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Статистика та досягнення</h1>
          <p className="text-muted-foreground">Відстежуйте свій прогрес та розблоковуйте нагороди</p>
        </div>

        <div className="space-y-6">
          {/* Level Progress */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                    <Award className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">
                      Рівень {currentLevel.level} - {currentLevel.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {nextLevel
                        ? `Ще ${nextLevel.minSessions - progress.totalSessions} занять до рівня ${nextLevel.level}`
                        : "Максимальний рівень досягнуто!"}
                    </CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{progress.points}</div>
                  <div className="text-sm text-muted-foreground">балів</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Прогрес до наступного рівня</span>
                  <span className="font-medium">{Math.round(progressToNextLevel)}%</span>
                </div>
                <Progress value={progressToNextLevel} className="h-3" />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">Переваги поточного рівня:</p>
                <div className="flex flex-wrap gap-2">
                  {currentLevel.benefits.map((benefit) => (
                    <Badge key={benefit} variant="secondary">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Рейтинг</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.rating}</div>
                <p className="text-xs text-muted-foreground">З {stats.totalReviews} відгуків</p>
                <Progress value={(stats.rating / 5) * 100} className="mt-2 h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Час відповіді</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.responseTime}</div>
                <p className="text-xs text-muted-foreground">Середній час</p>
                <Progress value={90} className="mt-2 h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Прийняття запитів</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.acceptanceRate}%</div>
                <p className="text-xs text-muted-foreground">Прийнято</p>
                <Progress value={stats.acceptanceRate} className="mt-2 h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Завершення занять</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completionRate}%</div>
                <p className="text-xs text-muted-foreground">Успішно завершено</p>
                <Progress value={stats.completionRate} className="mt-2 h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Повторні клієнти</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.repeatClients}%</div>
                <p className="text-xs text-muted-foreground">Повертаються</p>
                <Progress value={stats.repeatClients} className="mt-2 h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Поточна серія</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{progress.currentStreak}</div>
                <p className="text-xs text-muted-foreground">Днів поспіль</p>
                <p className="mt-1 text-xs text-muted-foreground">Рекорд: {progress.longestStreak} днів</p>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Досягнення</CardTitle>
              <CardDescription>
                Розблоковано {progress.achievements.length} з {availableAchievements.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {availableAchievements.map((achievement) => {
                  const unlocked = progress.achievements.find((a) => a.id === achievement.id)
                  return (
                    <Card key={achievement.id} className={unlocked ? "border-primary/50 bg-primary/5" : "opacity-50"}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="text-3xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <p className="font-medium">{achievement.title}</p>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            {unlocked && (
                              <p className="mt-1 text-xs text-muted-foreground">
                                Розблоковано {new Date(unlocked.unlockedAt!).toLocaleDateString("uk-UA")}
                              </p>
                            )}
                          </div>
                          {unlocked && <CheckCircle2 className="h-5 w-5 text-primary" />}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* All Levels */}
          <Card>
            <CardHeader>
              <CardTitle>Всі рівні</CardTitle>
              <CardDescription>Прогресуйте та отримуйте більше переваг</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {levels.map((level) => (
                  <div
                    key={level.level}
                    className={`rounded-lg border p-4 ${
                      level.level === currentLevel.level ? "border-primary bg-primary/5" : ""
                    } ${level.level > currentLevel.level ? "opacity-50" : ""}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <h3 className="font-semibold">
                            Рівень {level.level}: {level.title}
                          </h3>
                          {level.level === currentLevel.level && <Badge>Поточний</Badge>}
                          {level.level < currentLevel.level && (
                            <Badge variant="secondary">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Досягнуто
                            </Badge>
                          )}
                        </div>
                        <p className="mb-2 text-sm text-muted-foreground">
                          {level.minSessions === 0
                            ? `0-${level.maxSessions} занять`
                            : level.maxSessions === Number.POSITIVE_INFINITY
                              ? `${level.minSessions}+ занять`
                              : `${level.minSessions}-${level.maxSessions} занять`}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {level.benefits.map((benefit) => (
                            <Badge key={benefit} variant="outline">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  )
}
