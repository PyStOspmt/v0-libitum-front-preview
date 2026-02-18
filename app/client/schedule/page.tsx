"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { FullCalendar } from "@/components/full-calendar"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, Clock, Users, ChevronRight, Video, MapPin, Star } from "lucide-react"
import { useRef, useState } from "react"
import { useLessonStore } from "@/lib/lesson-store"
import { LessonDetailsDialog } from "./lesson-details"

export default function ClientSchedulePage() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const calendarRef = useRef<HTMLDivElement>(null)
  const { getLessonsByClient, getEventsByUser } = useLessonStore()
  const [selectedLesson, setSelectedLesson] = useState<any>(null)
  const [isLessonDetailsOpen, setIsLessonDetailsOpen] = useState(false)
  
  const children = [
    user ? { id: user.id, label: user.name ? `${user.name} (я)` : "Я" } : null,
    { id: "child-1", label: "Марія, 12 років" },
    { id: "child-2", label: "Іван, 9 років" },
  ].filter(Boolean) as { id: string; label: string }[]

  const initialChild = searchParams.get("child") || (user?.id ?? children[0].id)
  const selectedChildId = children.find((child) => child.id === initialChild)?.id || (user?.id ?? children[0].id)

  const scrollToCalendar = () => {
    calendarRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  // Get lessons and events for selected child
  const lessons = getLessonsByClient(selectedChildId || user?.id || "client-1")
  const events = getEventsByUser(selectedChildId || user?.id || "client-1")
  
  // Calculate stats
  const thisWeekLessons = lessons.filter(lesson => {
    const lessonDate = new Date(lesson.date)
    const today = new Date()
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()))
    const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6))
    return lessonDate >= weekStart && lessonDate <= weekEnd && lesson.status === "scheduled"
  })
  
  const completedLessons = lessons.filter(lesson => lesson.status === "completed")
  const activeSpecialists = [...new Set(lessons.map(lesson => lesson.specialistId))].length

  return (
    <ProtectedRoute allowedRoles={["client"]}>
      <SidebarLayout userType="client">
        <div className="container mx-auto max-w-7xl space-y-8 p-4 lg:p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">Розклад</h1>
              <p className="text-slate-500 text-lg">Ваші заплановані заняття</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {children.map((child) => (
                <Button
                  key={child.id}
                  variant={child.id === selectedChildId ? "default" : "outline"}
                  size="sm"
                  onClick={() => router.push(`/client/schedule?child=${child.id}`)}
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

          {/* Calendar near top for better access */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            ref={calendarRef}
          >
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <FullCalendar userType="client" userId={selectedChildId || user?.id || "client-1"} />
            </div>
          </motion.div>

          {/* Stats Cards (now clickable) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid gap-4 md:grid-cols-3"
          >
            <button
              type="button"
              onClick={scrollToCalendar}
              className="text-left bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-200/80 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Заплановано</h3>
                  <p className="text-sm text-slate-500">На цьому тижні</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-emerald-600">{thisWeekLessons.length}</div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <ChevronRight className="h-4 w-4" />
                <span>Перейти до календаря</span>
              </div>
            </button>

            <button
              type="button"
              onClick={scrollToCalendar}
              className="text-left bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-amber-200/80 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Завершено</h3>
                  <p className="text-sm text-slate-500">Всього занять</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-amber-600">{completedLessons.length}</div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <ChevronRight className="h-4 w-4" />
                <span>Переглянути розклад</span>
              </div>
            </button>

            <button
              type="button"
              onClick={scrollToCalendar}
              className="text-left bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-slate-300/80 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center">
                  <Users className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Активні</h3>
                  <p className="text-sm text-slate-500">Спеціалісти</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-600">{activeSpecialists}</div>
              <div className="flex flex-wrap gap-2 mt-3">
                {[...new Set(lessons.map(lesson => lesson.subject))].slice(0, 3).map((subject, index) => (
                  <Badge key={index} variant="secondary" className="rounded-full">
                    {subject}
                  </Badge>
                ))}
              </div>
            </button>
          </motion.div>

          {/* Upcoming Lessons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="border-slate-200/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-slate-600" />
                  Найближчі заняття
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lessons
                    .filter(lesson => lesson.status === "scheduled")
                    .slice(0, 3)
                    .map((lesson) => (
                      (() => {
                        const isPsychology = lesson.subject === "Психологія"
                        const cardBorder = isPsychology ? "border-orange-200/80 hover:border-orange-300/80" : "border-slate-200/80 hover:border-emerald-200/80"
                        const cardBg = isPsychology ? "hover:bg-orange-50/60" : "hover:bg-emerald-50/30"
                        const iconBg = isPsychology ? "bg-orange-50" : "bg-emerald-50"
                        const iconColor = isPsychology ? "text-orange-600" : "text-emerald-600"
                        return (
                      <div
                        key={lesson.id}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border ${cardBorder} ${cardBg} transition-all cursor-pointer gap-3 sm:gap-0`}
                        onClick={() => {
                          setSelectedLesson(lesson)
                          setIsLessonDetailsOpen(true)
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`h-12 w-12 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
                            <Calendar className={`h-6 w-6 ${iconColor}`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-slate-800 truncate">{lesson.subject}</div>
                            <div className="text-sm text-slate-600 truncate">{lesson.specialistName}</div>
                            <div className="text-xs text-slate-500 mt-1">
                              {new Date(lesson.date).toLocaleDateString('uk-UA', { 
                                day: 'numeric', 
                                month: 'long', 
                                weekday: 'short' 
                              })} о {lesson.time}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                          <Badge
                            variant={lesson.format === "online" ? "default" : "secondary"}
                            className={`rounded-full flex-shrink-0 ${
                              isPsychology
                                ? "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200"
                                : lesson.format === "online" 
                                  ? "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200"
                                  : "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200"
                            }`}
                          >
                            {lesson.format === "online" ? (
                              <><Video className="h-3 w-3 mr-1" /> Онлайн</>
                            ) : (
                              <><MapPin className="h-3 w-3 mr-1" /> Офлайн</>
                            )}
                          </Badge>
                          <ChevronRight className="h-4 w-4 text-slate-400 flex-shrink-0 hidden sm:block" />
                        </div>
                      </div>
                        )
                      })()
                    ))}
                  {lessons.filter(lesson => lesson.status === "scheduled").length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                      <Calendar className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                      <p>Запланованих занять немає</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => router.push('/client/requests/new')}
                      >
                        Створити заявку
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card className="border-slate-200/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-slate-600" />
                  Остання активність
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lessons
                    .filter((lesson) => lesson.status === "completed")
                    .slice(0, 3)
                    .map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-start justify-between gap-3 p-4 rounded-xl bg-slate-50/70 border border-slate-100"
                      >
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                            <Star className="h-5 w-5 text-amber-600" />
                          </div>
                          <div className="space-y-1">
                            <div className="font-semibold text-slate-800 leading-tight">{lesson.subject}</div>
                            <div className="text-sm text-slate-600">{lesson.specialistName}</div>
                            <div className="text-xs text-slate-500">
                              {new Date(lesson.date).toLocaleDateString("uk-UA", {
                                day: "numeric",
                                month: "long",
                              })}
                              {lesson.topic ? ` • ${lesson.topic}` : ""}
                            </div>
                            {lesson.report?.comment && (
                              <p className="text-xs text-slate-500 line-clamp-2">{lesson.report.comment}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          {lesson.report && (
                            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                              <Star className="h-3.5 w-3.5 fill-current" />
                              {lesson.report.performance}/5
                            </div>
                          )}
                          <div className="text-xs text-slate-500">Завершено</div>
                        </div>
                      </div>
                    ))}

                  {lessons.filter((lesson) => lesson.status === "completed").length === 0 && (
                    <div className="text-center py-8 text-slate-500 space-y-3">
                      <Star className="h-12 w-12 mx-auto text-slate-300" />
                      <p className="text-sm">Завершених занять ще немає</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        onClick={() => router.push("/client/requests/new")}
                      >
                        Створити заявку
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Lesson Details Dialog */}
          <LessonDetailsDialog
            lesson={selectedLesson}
            open={isLessonDetailsOpen}
            onOpenChange={setIsLessonDetailsOpen}
          />
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
