"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { useLessonStore } from "@/lib/lesson-store"
import { useGamificationStore } from "@/lib/gamification-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Calendar, Clock, CheckCircle2, TrendingUp, Star, Award } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function StudentDashboardPage() {
  const { user } = useAuth()
  const { getLessonsByClient } = useLessonStore()
  const { getProgress, getLevelInfo } = useGamificationStore()

  // For students, we use the client role but a simplified interface
  const studentId = user?.id || "student-child-1"
  const allLessons = getLessonsByClient(studentId)
  const scheduledLessons = allLessons.filter((l) => l.status === "scheduled")
  const completedLessons = allLessons.filter((l) => l.status === "completed")
  
  const progress = getProgress(studentId)
  const currentLevel = getLevelInfo(progress.totalSessions)

  const nextLesson = scheduledLessons[0]

  return (
    <ProtectedRoute allowedRoles={["client"]}>
      <SidebarLayout userType="client">
        <div className="container mx-auto max-w-7xl space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Вітаємо, {user?.name.split(" ")[0]}! 👋</h1>
              <p className="text-muted-foreground">Твій прогрес та розклад занять</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
              <Star className="h-5 w-5 fill-current" />
              <span className="font-bold">Рівень {progress.level} - {currentLevel.title}</span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Next Lesson Card */}
            <Card className="md:col-span-2 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Наступне заняття
                </CardTitle>
              </CardHeader>
              <CardContent>
                {nextLesson ? (
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{nextLesson.topic || nextLesson.subject}</h3>
                      <div className="mt-1 flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {new Date(nextLesson.date).toLocaleDateString("uk-UA")} о {nextLesson.time}
                        </span>
                        <Badge variant="secondary">{nextLesson.specialistName}</Badge>
                      </div>
                    </div>
                    <Button className="w-full sm:w-auto">Перейти до уроку</Button>
                  </div>
                ) : (
                  <p className="py-4 text-muted-foreground">На найближчий час занять не заплановано</p>
                )}
              </CardContent>
            </Card>

            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Твій прогрес
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>До {progress.level + 1} рівня</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="flex justify-around pt-2">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{completedLessons.length}</p>
                    <p className="text-xs text-muted-foreground">Пройдено</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{progress.points}</p>
                    <p className="text-xs text-muted-foreground">Балів XP</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Materials */}
            <Card>
              <CardHeader>
                <CardTitle>Матеріали та ДЗ</CardTitle>
                <CardDescription>Останні завдання від вчителів</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {completedLessons.length > 0 ? (
                  completedLessons.slice(0, 3).map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{lesson.homework?.title || lesson.subject}</p>
                          <p className="text-xs text-muted-foreground">
                            {lesson.homework?.dueDate 
                              ? `Здати до ${new Date(lesson.homework.dueDate).toLocaleDateString("uk-UA")}` 
                              : "Матеріали до уроку"}
                          </p>
                        </div>
                      </div>
                      {lesson.homework?.status === "checked" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <Badge variant="outline">В процесі</Badge>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="py-4 text-center text-sm text-muted-foreground italic">Завдань поки немає</p>
                )}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Твої досягнення</CardTitle>
                <CardDescription>Отримуй нагороди за навчання!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {progress.achievements.length > 0 ? (
                    progress.achievements.slice(0, 3).map((achievement) => (
                      <div key={achievement.id} className="space-y-2">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 text-xl">
                          {achievement.icon}
                        </div>
                        <p className="text-xs font-medium">{achievement.title}</p>
                      </div>
                    ))
                  ) : (
                    <p className="col-span-3 py-4 text-center text-sm text-muted-foreground italic">
                      Досягнення з'являться тут
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
