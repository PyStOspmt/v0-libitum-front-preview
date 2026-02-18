"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { useLessonStore } from "@/lib/lesson-store"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, CheckCircle2, Clock, FileText, Star, TrendingUp, Download } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export default function ClientProgressPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { getLessonsByClient } = useLessonStore()
  const searchParams = useSearchParams()
  const children = [
    user ? { id: user.id, label: user.name ? `${user.name} (я)` : "Я" } : null,
    { id: "child-1", label: "Марія, 12 років" },
    { id: "child-2", label: "Іван, 9 років" },
  ].filter(Boolean) as { id: string; label: string }[]

  const initialChild = searchParams.get("child") || (user?.id ?? children[0].id)
  const selectedChildId = children.find((child) => child.id === initialChild)?.id || (user?.id ?? children[0].id)
  const clientId = selectedChildId || user?.id || "client-1"

  const allLessons = getLessonsByClient(clientId)
  const completedLessons = allLessons.filter((l) => l.status === "completed")
  const scheduledLessons = allLessons.filter((l) => l.status === "scheduled")

  // Stats
  const totalLessons = completedLessons.length
  const totalHours = completedLessons.reduce((acc, l) => acc + l.duration, 0) / 60
  const averageGrade =
    completedLessons.filter((l) => l.homework?.grade).reduce((acc, l) => acc + (l.homework?.grade || 0), 0) /
      completedLessons.filter((l) => l.homework?.grade).length || 0
  const completedHomework = completedLessons.filter((l) => l.homework?.status === "checked").length
  const totalHomework = completedLessons.filter((l) => l.homework).length

  // Group by subject
  const lessonsBySubject = completedLessons.reduce<Record<string, typeof completedLessons[number][]>>((acc, lesson) => {
    if (!acc[lesson.subject]) {
      acc[lesson.subject] = []
    }
    acc[lesson.subject].push(lesson)
    return acc
  }, {})

  return (
    <ProtectedRoute allowedRoles={["client"]}>
      <SidebarLayout userType="client">
        <div className="container mx-auto max-w-7xl space-y-8 p-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">Мій прогрес</h1>
            <p className="text-muted-foreground">Відстежуйте свої досягнення та прогрес у навчанні</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {children.map((child) => (
                <Button
                  key={child.id}
                  variant={child.id === selectedChildId ? "default" : "outline"}
                  size="sm"
                  onClick={() => router.push(`/client/progress?child=${child.id}`)}
                  className="rounded-full"
                >
                  {child.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-slate-200/70 bg-white/80 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Всього занять</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalLessons}</div>
                <p className="text-xs text-muted-foreground">{totalHours.toFixed(1)} годин</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200/70 bg-white/80 shadow-sm rounded-2xl p-4">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Середня оцінка</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageGrade.toFixed(1)}</div>
                <p className="text-xs text-muted-foreground">Чудовий результат!</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200/70 bg-white/80 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Домашні завдання</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {completedHomework}/{totalHomework}
                </div>
                <p className="text-xs text-muted-foreground">Виконано</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200/70 bg-white/80 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Наступне заняття</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{scheduledLessons.length}</div>
                <p className="text-xs text-muted-foreground">Заплановано</p>
              </CardContent>
            </Card>
          </div>

          {/* Progress by Subject */}
          <Card className="border-slate-200/70 bg-white/80 shadow-sm">
            <CardHeader>
              <CardTitle>Прогрес по предметах</CardTitle>
              <CardDescription>Ваші досягнення в різних напрямках</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(lessonsBySubject).map(([subject, lessons]) => {
                const subjectHours = lessons.reduce((acc, l) => acc + l.duration, 0) / 60
                const subjectGrade =
                  lessons.filter((l) => l.homework?.grade).reduce((acc, l) => acc + (l.homework?.grade || 0), 0) /
                    lessons.filter((l) => l.homework?.grade).length || 0

                return (
                  <div key={subject} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{subject}</h4>
                        <p className="text-sm text-muted-foreground">
                          {lessons.length} занять • {subjectHours.toFixed(1)} годин
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold">{subjectGrade.toFixed(1)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Середня оцінка</p>
                      </div>
                    </div>
                    <Progress
                      value={totalLessons > 0 ? (lessons.length / totalLessons) * 100 : 0}
                      className="h-2"
                    />
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Detailed Lessons */}
          <Card className="border-slate-200/70 bg-white/80 shadow-sm">
            <CardHeader>
              <CardTitle>Журнал занять</CardTitle>
              <CardDescription>Детальна історія всіх ваших занять</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-3 rounded-full bg-slate-100/70 p-1">
                  <TabsTrigger value="all">Всі ({allLessons.length})</TabsTrigger>
                  <TabsTrigger value="completed">Завершені ({completedLessons.length})</TabsTrigger>
                  <TabsTrigger value="scheduled">Заплановані ({scheduledLessons.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {allLessons.length > 0 ? (
                    allLessons
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((lesson) => <LessonCard key={lesson.id} lesson={lesson} />)
                  ) : (
                    <LessonPlaceholder variant="all" />
                  )}
                </TabsContent>

                <TabsContent value="completed" className="space-y-4">
                  {completedLessons.length > 0 ? (
                    completedLessons.map((lesson) => <LessonCard key={lesson.id} lesson={lesson} />)
                  ) : (
                    <LessonPlaceholder variant="completed" />
                  )}
                </TabsContent>

                <TabsContent value="scheduled" className="space-y-4">
                  {scheduledLessons.length > 0 ? (
                    scheduledLessons.map((lesson) => <LessonCard key={lesson.id} lesson={lesson} />)
                  ) : (
                    <LessonPlaceholder variant="scheduled" />
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}

function LessonPlaceholder({ variant }: { variant: "all" | "completed" | "scheduled" }) {
  const samples: Record<string, { subject: string; date: string; time: string; status: "completed" | "scheduled"; duration: number; note: string }[]> = {
    all: [
      { subject: "Англійська мова", date: "2026-02-10", time: "17:00", status: "scheduled", duration: 60, note: "Підготовка до ЗНО" },
      { subject: "Математика", date: "2026-02-05", time: "15:00", status: "completed", duration: 60, note: "Тригонометрія, домашнє виконано" },
    ],
    completed: [
      { subject: "Логопед", date: "2026-02-03", time: "16:00", status: "completed", duration: 45, note: "Вправи на дикцію" },
    ],
    scheduled: [
      { subject: "Психолог", date: "2026-02-12", time: "18:30", status: "scheduled", duration: 50, note: "Підтримка мотивації" },
    ],
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Поки що немає занять у цій вкладці. Ось приклад, як виглядатиме журнал:</p>
      {samples[variant].map((item, idx) => (
        <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-800">{item.subject}</p>
              <p className="text-sm text-slate-500">
                {new Date(item.date).toLocaleDateString("uk-UA", { day: "numeric", month: "long" })} • {item.time}
              </p>
            </div>
            <Badge variant="outline" className="rounded-full">
              {item.status === "completed" ? "Завершено" : "Заплановано"}
            </Badge>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
            <Clock className="h-4 w-4 text-slate-400" /> {item.duration} хв
          </div>
          <p className="mt-2 text-sm text-slate-600">{item.note}</p>
        </div>
      ))}
    </div>
  )
}

function LessonCard({ lesson }: { lesson: any }) {
  const statusColors = {
    completed: "bg-green-500/10 text-green-700 border-green-200",
    scheduled: "bg-blue-500/10 text-blue-700 border-blue-200",
    cancelled: "bg-red-500/10 text-red-700 border-red-200",
    missed: "bg-gray-500/10 text-gray-700 border-gray-200",
  }

  const statusLabels = {
    completed: "Завершено",
    scheduled: "Заплановано",
    cancelled: "Скасовано",
    missed: "Пропущено",
  }

  return (
    <Card className={`${statusColors[lesson.status as keyof typeof statusColors]} shadow-sm`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{lesson.topic || lesson.subject}</CardTitle>
            <CardDescription className="flex items-center gap-2 text-sm">
              <Calendar className="h-3 w-3" />
              {new Date(lesson.date).toLocaleDateString("uk-UA", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              • {lesson.time}
              <Badge variant="outline" className="ml-2 rounded-full">
                {lesson.duration} хв
              </Badge>
            </CardDescription>
          </div>
          <Badge variant="outline" className="rounded-full">
            {statusLabels[lesson.status as keyof typeof statusLabels]}
          </Badge>
        </div>
      </CardHeader>

      {lesson.status === "completed" && (
        <CardContent className="space-y-4">
          {lesson.description && (
            <div>
              <h5 className="mb-1 text-sm font-medium">Опис заняття</h5>
              <p className="text-sm text-muted-foreground">{lesson.description}</p>
            </div>
          )}

          {lesson.report && (
            <div className="rounded-2xl border border-slate-200/70 bg-white/60 p-4">
              <h5 className="mb-2 font-medium">Звіт викладача</h5>
              <div className="mb-3 flex gap-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">
                    Успішність: <strong>{lesson.report.performance}/5</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm">
                    Поведінка: <strong>{lesson.report.behavior}/5</strong>
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{lesson.report.comment}</p>

              {lesson.report.strengths && lesson.report.strengths.length > 0 && (
                <div className="mt-3">
                  <p className="mb-1 text-sm font-medium text-green-700">Сильні сторони:</p>
                  <ul className="list-inside list-disc text-sm text-muted-foreground">
                    {lesson.report.strengths.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {lesson.report.improvements && lesson.report.improvements.length > 0 && (
                <div className="mt-2">
                  <p className="mb-1 text-sm font-medium text-blue-700">Що покращити:</p>
                  <ul className="list-inside list-disc text-sm text-muted-foreground">
                    {lesson.report.improvements.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {lesson.homework && (
            <div className="rounded-2xl border border-slate-200/70 bg-white/60 p-4">
              <div className="mb-2 flex items-center justify-between">
                <h5 className="font-medium">Домашнє завдання</h5>
                <Badge
                  variant={
                    lesson.homework.status === "checked"
                      ? "default"
                      : lesson.homework.status === "submitted"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {lesson.homework.status === "checked"
                    ? "Перевірено"
                    : lesson.homework.status === "submitted"
                      ? "Відправлено"
                      : "Очікує"}
                </Badge>
              </div>
              <p className="mb-2 text-sm font-medium">{lesson.homework.title}</p>
              <p className="mb-2 text-sm text-muted-foreground">{lesson.homework.description}</p>
              <p className="text-xs text-muted-foreground">
                Здати до:{" "}
                {new Date(lesson.homework.dueDate).toLocaleDateString("uk-UA", {
                  day: "numeric",
                  month: "long",
                })}
              </p>

              {lesson.homework.grade && (
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-500/10 p-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <div>
                    <p className="text-sm font-bold">Оцінка: {lesson.homework.grade}/5</p>
                    {lesson.homework.feedback && (
                      <p className="text-xs text-muted-foreground">{lesson.homework.feedback}</p>
                    )}
                  </div>
                </div>
              )}

              {lesson.homework.status === "pending" && (
                <Button size="sm" className="mt-3 rounded-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Здати завдання
                </Button>
              )}
            </div>
          )}

          {lesson.materials && lesson.materials.length > 0 && (
            <div>
              <h5 className="mb-2 text-sm font-medium">Матеріали до заняття</h5>
              <div className="space-y-2">
                {lesson.materials.map((material: string, i: number) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent rounded-full"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {material}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
