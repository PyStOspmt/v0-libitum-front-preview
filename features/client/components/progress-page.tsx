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
import { BookOpen, Calendar, CheckCircle2, Clock, FileText, Star, TrendingUp, Download, ChevronDown, ChevronUp } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export function ClientProgressPage() {
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
        <div className="container mx-auto max-w-[1200px] space-y-6 sm:space-y-8 px-3 py-6 sm:p-6 font-sans">
          <div className="space-y-2 px-1 sm:px-0">
            <h1 className="text-[32px] font-bold text-[#121117] tracking-tight">Мій прогрес</h1>
            <p className="text-[16px] text-[#69686f]">Відстежуйте свої досягнення та прогрес у навчанні</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => router.push(`/client/progress?child=${child.id}`)}
                  className={`px-6 py-2 rounded-[8px] transition-all duration-200 font-[600] text-[16px] border-2 ${
                    child.id === selectedChildId
                      ? "bg-[#121117] text-white border-transparent"
                      : "bg-white text-[#121117] border-[#121117] hover:bg-gray-50"
                  }`}
                >
                  {child.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-[20px] sm:rounded-[24px] p-6 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[14px] font-[600] text-[#69686f]">Всього занять</span>
                <div className="h-10 w-10 rounded-full bg-[#f0f3f3] flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-[#121117]" />
                </div>
              </div>
              <div className="text-[32px] font-bold text-[#121117] leading-none">{totalLessons}</div>
              <p className="text-[13px] text-[#69686f] mt-2">{totalHours.toFixed(1)} годин</p>
            </div>

            <div className="bg-white rounded-[20px] sm:rounded-[24px] p-6 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[14px] font-[600] text-[#69686f]">Середня оцінка</span>
                <div className="h-10 w-10 rounded-full bg-[#fff8e1] flex items-center justify-center">
                  <Star className="h-5 w-5 text-[#ffc107]" />
                </div>
              </div>
              <div className="text-[32px] font-bold text-[#121117] leading-none">{averageGrade.toFixed(1)}</div>
              <p className="text-[13px] text-[#69686f] mt-2">Чудовий результат!</p>
            </div>

            <div className="bg-white rounded-[20px] sm:rounded-[24px] p-6 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[14px] font-[600] text-[#69686f]">Домашні завдання</span>
                <div className="h-10 w-10 rounded-full bg-[#e8fffb] flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-[#00c5a6]" />
                </div>
              </div>
              <div className="text-[32px] font-bold text-[#121117] leading-none">
                {completedHomework}/{totalHomework}
              </div>
              <p className="text-[13px] text-[#69686f] mt-2">Виконано</p>
            </div>

            <div className="bg-white rounded-[20px] sm:rounded-[24px] p-6 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[14px] font-[600] text-[#69686f]">Наступне заняття</span>
                <div className="h-10 w-10 rounded-full bg-[#f0f3f3] flex items-center justify-center">
                  <Clock className="h-5 w-5 text-[#121117]" />
                </div>
              </div>
              <div className="text-[32px] font-bold text-[#121117] leading-none">{scheduledLessons.length}</div>
              <p className="text-[13px] text-[#69686f] mt-2">Заплановано</p>
            </div>
          </div>

          {/* Progress by Subject */}
          <div className="bg-white rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
            <div className="mb-6">
              <h2 className="text-[24px] font-bold text-[#121117]">Прогрес по предметах</h2>
              <p className="text-[#69686f] text-[16px] mt-1">Ваші досягнення в різних напрямках</p>
            </div>
            <div className="space-y-8">
              {Object.entries(lessonsBySubject).map(([subject, lessons]) => {
                const subjectHours = lessons.reduce((acc, l) => acc + l.duration, 0) / 60
                const subjectGrade =
                  lessons.filter((l) => l.homework?.grade).reduce((acc, l) => acc + (l.homework?.grade || 0), 0) /
                    lessons.filter((l) => l.homework?.grade).length || 0

                return (
                  <div key={subject} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-[600] text-[18px] text-[#121117]">{subject}</h4>
                        <p className="text-[14px] text-[#69686f]">
                          {lessons.length} занять • {subjectHours.toFixed(1)} годин
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <Star className="h-4 w-4 fill-[#ffc800] text-[#ffc800]" />
                          <span className="font-bold text-[18px] text-[#121117]">{subjectGrade.toFixed(1)}</span>
                        </div>
                        <p className="text-[13px] text-[#69686f]">Середня оцінка</p>
                      </div>
                    </div>
                    <Progress
                      value={totalLessons > 0 ? (lessons.length / totalLessons) * 100 : 0}
                      className="h-3 bg-gray-100 [&>div]:bg-[#00c5a6]"
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Detailed Lessons */}
          <div className="bg-white rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
            <div className="mb-6">
              <h2 className="text-[24px] font-bold text-[#121117]">Журнал занять</h2>
              <p className="text-[#69686f] text-[16px] mt-1">Детальна історія всіх ваших занять</p>
            </div>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full max-w-[500px] grid-cols-1 sm:grid-cols-3 rounded-[8px] sm:bg-[#f0f3f3] bg-transparent p-0 sm:p-1 h-auto sm:h-[48px] mb-8 gap-2 sm:gap-0">
                <TabsTrigger value="all" className="rounded-[6px] data-[state=active]:bg-white sm:data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm bg-[#f0f3f3] sm:bg-transparent py-2.5 sm:py-1.5 text-[15px] font-[600]">
                  Всі ({allLessons.length})
                </TabsTrigger>
                <TabsTrigger value="completed" className="rounded-[6px] data-[state=active]:bg-white sm:data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm bg-[#f0f3f3] sm:bg-transparent py-2.5 sm:py-1.5 text-[15px] font-[600]">
                  Завершені ({completedLessons.length})
                </TabsTrigger>
                <TabsTrigger value="scheduled" className="rounded-[6px] data-[state=active]:bg-white sm:data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm bg-[#f0f3f3] sm:bg-transparent py-2.5 sm:py-1.5 text-[15px] font-[600]">
                  Заплановані ({scheduledLessons.length})
                </TabsTrigger>
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
          </div>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}

function LessonPlaceholder({ variant }: { variant: "all" | "completed" | "scheduled" }) {
  const samples: Record<string, any[]> = {
    all: [
      { 
        id: "demo-all-1",
        subject: "Англійська мова", 
        topic: "Підготовка до ЗНО",
        date: "2026-02-10", 
        time: "17:00", 
        status: "scheduled", 
        duration: 60, 
        format: "online",
        description: "Розглядаємо граматичні конструкції для підготовки до ЗНО з англійської мови. Фокус на умовних реченнях та модальних дієсловах.",
        homework: {
          title: "Граматичні вправи",
          description: "Виконати вправи 1-15 на сторінках 45-47 підручника",
          status: "pending",
          dueDate: "2026-02-12",
          grade: null,
          feedback: null
        },
        materials: ["Grammar_Exercises.pdf", "Conditionals_Cheatsheet.pdf"]
      },
      { 
        id: "demo-all-2",
        subject: "Математика", 
        topic: "Тригонометричні рівняння",
        date: "2026-02-05", 
        time: "15:00", 
        status: "completed", 
        duration: 60, 
        format: "online",
        description: "Вивчення тригонометричних функцій та їх графіків. Практичне застосування в задачах.",
        report: {
          performance: 4,
          behavior: 5,
          comment: "Чудово засвоїв матеріал. Активно працював на уроці, ставив запитання. Рекомендую додатково попрактикувати розв'язання тригонометричних рівнянь.",
          strengths: ["Швидке засвоєння нових тем", "Активна участь в обговоренні", "Систематичне виконання домашніх завдань"],
          improvements: ["Потребує більше практики з розв'язання складних рівнянь", "Уважніше перевіряти обчислення"]
        },
        homework: {
          title: "Тригонометричні рівняння",
          description: "Розв'язати рівняння №1-10 з робочого зошита",
          status: "checked",
          dueDate: "2026-02-07",
          grade: 4.5,
          feedback: "Добре виконано, є кілька незначних помилок в обчисленнях. Рекомендую перевіряти результати.",
          submittedFiles: ["Зошит_ДЗ_1.jpg", "Зошит_ДЗ_2.jpg"]
        },
        materials: ["Trigonometry_Formulas.pdf", "Practice_Problems.xlsx"]
      },
    ],
    completed: [
      { 
        id: "demo-comp-1",
        subject: "Логопед", 
        topic: "Вправи на дикцію",
        date: "2026-02-03", 
        time: "16:00", 
        status: "completed", 
        duration: 45, 
        format: "offline",
        description: "Комплекс вправ для покращення дикції та артикуляції. Робота з скоромовками.",
        report: {
          performance: 5,
          behavior: 5,
          comment: "Відмінна робота! Помітний прогрес у вимові складних звуків. Рекомендую продовжувати щоденні вправи.",
          strengths: ["Чітка вимова звуків", "Послідовність у виконанні вправ", "Висока мотивація"],
          improvements: []
        },
        homework: {
          title: "Щоденні вправи",
          description: "Виконувати комплекс вправ 15 хв щодня",
          status: "checked",
          dueDate: "2026-02-05",
          grade: 5,
          feedback: "Ідеально! Всі вправи виконані регулярно."
        }
      },
    ],
    scheduled: [
      { 
        id: "demo-sched-1",
        subject: "Психолог", 
        topic: "Підтримка мотивації",
        date: "2026-02-12", 
        time: "18:30", 
        status: "scheduled", 
        duration: 50, 
        format: "online",
        description: "Індивідуальна консультація щодо підвищення навчальної мотивації та подолання стресу.",
        homework: {
          title: "Щоденник емоцій",
          description: "Вести щоденник емоцій протягом тижня",
          status: "pending",
          dueDate: "2026-02-19",
          grade: null,
          feedback: null
        }
      },
    ]
  }

  const items = samples[variant] || []

  return (
    <div className="space-y-4">
      <div className="rounded-[16px] border-2 border-dashed border-slate-200 bg-[#f8f9fb] p-6 text-center">
        <h3 className="text-[18px] font-bold text-[#121117] mb-2">Це демо-режим</h3>
        <p className="text-[15px] text-[#69686f] mb-6">
          Зараз у вас немає реальних занять. Ось як вони будуть виглядати:
        </p>
        
        <div className="space-y-4 text-left">
          {items.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  )
}

function LessonCard({ lesson }: { lesson: any }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const statusColors = {
    completed: "bg-white border-l-4 border-l-[#00c5a6]",
    scheduled: "bg-white border-l-4 border-l-blue-500",
    cancelled: "bg-white border-l-4 border-l-red-500",
    missed: "bg-white border-l-4 border-l-gray-400",
  }

  const statusLabels = {
    completed: "Завершено",
    scheduled: "Заплановано",
    cancelled: "Скасовано",
    missed: "Пропущено",
  }
  
  const statusBadgeColors = {
    completed: "bg-[#e8fffb] text-[#00a389]",
    scheduled: "bg-blue-50 text-blue-700",
    cancelled: "bg-red-50 text-red-700",
    missed: "bg-gray-100 text-gray-700",
  }

  const hasDetails = lesson.status === "completed" && (lesson.description || lesson.report || lesson.homework || lesson.materials)
  const hasAnyInfo = lesson.description || lesson.report || lesson.homework || lesson.materials || lesson.topic

  return (
    <div 
      className={`rounded-[16px] border border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)] ${statusColors[lesson.status as keyof typeof statusColors]} ${
        hasAnyInfo ? "cursor-pointer hover:shadow-md transition-shadow" : ""
      }`}
      onClick={() => hasAnyInfo && setIsExpanded(!isExpanded)}
    >
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="font-[600] text-[18px] text-[#121117]">{lesson.topic || lesson.subject}</h3>
              {hasAnyInfo && (
                <div className="flex items-center text-[#69686f] hover:text-[#121117] transition-colors">
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              )}
            </div>
            <p className="text-[14px] text-[#69686f] mt-1 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(lesson.date).toLocaleDateString("uk-UA", {
                  day: "numeric",
                  month: "long"
                })}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {lesson.time}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span>{lesson.duration} хв</span>
            </p>
          </div>
          <Badge variant="outline" className={`rounded-[6px] px-3 py-1 font-[600] border-0 ${statusBadgeColors[lesson.status as keyof typeof statusBadgeColors]}`}>
            {statusLabels[lesson.status as keyof typeof statusLabels]}
          </Badge>
        </div>

        {hasAnyInfo && isExpanded && (
          <div className="space-y-6 mt-6 pt-6 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
            {lesson.description && (
              <div>
                <h5 className="mb-2 text-[16px] font-[600] text-[#121117]">Опис заняття</h5>
                <p className="text-[15px] text-[#69686f] leading-relaxed">{lesson.description}</p>
              </div>
            )}

            {lesson.topic && (
              <div>
                <h5 className="mb-2 text-[16px] font-[600] text-[#121117]">Тема заняття</h5>
                <p className="text-[15px] text-[#69686f] leading-relaxed">{lesson.topic}</p>
              </div>
            )}

            {lesson.status === "completed" && lesson.report && (
              <div className="rounded-[12px] bg-[#f0f3f3] p-5">
                <h5 className="mb-3 font-[600] text-[16px] text-[#121117]">Звіт викладача</h5>
                <div className="mb-4 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-[8px] shadow-sm">
                    <Star className="h-4 w-4 fill-[#ffc800] text-[#ffc800]" />
                    <span className="text-[14px] text-[#121117]">
                      Успішність: <strong className="font-[600]">{lesson.report.performance}/5</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-[8px] shadow-sm">
                    <TrendingUp className="h-4 w-4 text-[#00c5a6]" />
                    <span className="text-[14px] text-[#121117]">
                      Поведінка: <strong className="font-[600]">{lesson.report.behavior}/5</strong>
                    </span>
                  </div>
                </div>
                <p className="text-[15px] text-[#69686f] leading-relaxed mb-4 bg-white p-4 rounded-[8px] border border-slate-200/50">{lesson.report.comment}</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {lesson.report.strengths && lesson.report.strengths.length > 0 && (
                    <div className="bg-white p-4 rounded-[8px] border border-slate-200/50">
                      <p className="mb-2 text-[14px] font-[600] text-[#00a389] flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" /> Сильні сторони
                      </p>
                          <ul className="space-y-1">
                            {lesson.report.strengths.map((s: string, i: number) => (
                              <li key={i} className="text-[14px] text-[#69686f] flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00c5a6] mt-1.5 shrink-0"></span>
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {lesson.homework && (
                  <div className="rounded-[12px] border border-slate-200/80 p-5">
                    <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
                      <h5 className="font-[600] text-[16px] text-[#121117] flex items-center gap-2">
                        <FileText className="h-5 w-5 text-[#69686f]" /> Домашнє завдання
                      </h5>
                      <Badge
                        variant="outline"
                        className={`rounded-[6px] px-3 py-1 font-[600] border-0 ${
                          lesson.homework.status === "checked"
                            ? "bg-[#e8fffb] text-[#00a389]"
                            : lesson.homework.status === "submitted"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-[#f0f3f3] text-[#69686f]"
                        }`}
                      >
                        {lesson.homework.status === "checked"
                          ? "Перевірено"
                          : lesson.homework.status === "submitted"
                            ? "Відправлено"
                            : "Очікує"}
                      </Badge>
                    </div>
                    <p className="mb-1 text-[15px] font-[600] text-[#121117]">{lesson.homework.title}</p>
                    <p className="mb-4 text-[14px] text-[#69686f]">{lesson.homework.description}</p>
                    <div className="flex items-center gap-2 text-[13px] text-[#69686f] bg-[#f0f3f3] inline-flex px-3 py-1.5 rounded-[6px]">
                      <Clock className="h-3.5 w-3.5" />
                      Здати до:{" "}
                      {new Date(lesson.homework.dueDate).toLocaleDateString("uk-UA", {
                        day: "numeric",
                        month: "long",
                      })}
                    </div>

                    {lesson.homework.grade && (
                      <div className="mt-4 flex items-start gap-3 rounded-[8px] bg-[#fff8e1] p-4 border border-yellow-100">
                        <Star className="h-5 w-5 fill-[#ffc800] text-[#ffc800] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[15px] font-[600] text-[#121117]">Оцінка: {lesson.homework.grade}/5</p>
                          {lesson.homework.feedback && (
                            <p className="text-[14px] text-[#69686f] mt-1">{lesson.homework.feedback}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {lesson.homework.status === "pending" ? (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = '/client/materials';
                        }}
                        className="mt-4 h-[40px] px-6 rounded-[8px] border-2 border-[#121117] text-[#121117] font-[600] text-[14px] hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Здати завдання
                      </button>
                    ) : lesson.homework.submittedFiles && lesson.homework.submittedFiles.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-[14px] font-[600] text-[#121117] mb-2">Ваша здана робота:</p>
                        <div className="flex flex-wrap gap-2">
                          {lesson.homework.submittedFiles.map((file: string, i: number) => (
                            <div key={i} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[6px] bg-[#f0f3f3] text-[13px] font-[500] text-[#121117]">
                              <FileText className="h-3.5 w-3.5 text-[#69686f]" />
                              {file}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {lesson.materials && lesson.materials.length > 0 && (
                  <div>
                    <h5 className="mb-3 text-[16px] font-[600] text-[#121117]">Матеріали до заняття</h5>
                    <div className="flex flex-wrap gap-2">
                      {lesson.materials.map((material: string, i: number) => (
                        <button
                          key={i}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-[8px] border border-slate-200 hover:border-[#121117] hover:bg-gray-50 transition-colors text-[14px] font-[500] text-[#121117]"
                        >
                          <Download className="h-4 w-4 text-[#69686f]" />
                          {material}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
          </div>
        )}
      </div>
    </div>
  )
}
