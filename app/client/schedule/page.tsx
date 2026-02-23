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
        <div className="container mx-auto max-w-[1200px] space-y-4 sm:space-y-8 px-1 py-4 sm:p-6 font-sans">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 px-1 sm:px-0"
          >
            <div>
              <h1 className="text-[32px] font-bold text-[#121117] tracking-tight">Розклад</h1>
              <p className="text-[#69686f] text-[16px] mt-1">Ваші заплановані заняття</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              {children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => router.push(`/client/schedule?child=${child.id}`)}
                  className={`px-6 py-2 rounded-[8px] transition-all duration-200 font-[600] text-[16px] border-2 ${child.id === selectedChildId
                      ? "bg-[#121117] text-white border-transparent"
                      : "bg-white text-[#121117] border-[#121117] hover:bg-gray-50"
                    }`}
                >
                  {child.label}
                </button>
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
            <div className="bg-white rounded-[20px] sm:rounded-[24px] border border-slate-200/80 p-2 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.08)] overflow-hidden">
              <FullCalendar userType="client" userId={selectedChildId || user?.id || "client-1"} />
            </div>
          </motion.div>

          {/* Stats Cards (now clickable) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3"
          >
            <button
              type="button"
              onClick={scrollToCalendar}
              className="text-left flex flex-col gap-4 sm:gap-6 bg-white rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 border border-slate-200/80 hover:border-[#00c5a6]/50 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#00c5a6] group"
            >
              <div className="flex items-center gap-4 mb-2 sm:mb-6">
                <div className="h-12 w-12 rounded-full bg-[#e8fffb] flex items-center justify-center group-hover:bg-[#00c5a6]/20 transition-colors">
                  <Calendar className="h-6 w-6 text-[#00c5a6]" />
                </div>
                <div>
                  <h3 className="font-bold text-[20px] text-[#121117]">Заплановано</h3>
                  <p className="text-[14px] text-[#69686f] mt-0.5">На цьому тижні</p>
                </div>
              </div>
              <div className="text-[32px] font-bold text-[#121117] leading-none mb-2 sm:mb-6">{thisWeekLessons.length}</div>
              <div className="flex items-center gap-2 text-[15px] font-[600] text-[#00c5a6]">
                Перейти до календаря
                <ChevronRight className="h-4 w-4" />
              </div>
            </button>

            <button
              type="button"
              onClick={() => router.push(`/client/progress?child=${selectedChildId}`)}
              className="text-left flex flex-col gap-4 sm:gap-6 bg-white rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 border border-slate-200/80 hover:border-[#ffc107]/50 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#ffc107] group"
            >
              <div className="flex items-center gap-4 mb-2 sm:mb-6">
                <div className="h-12 w-12 rounded-full bg-[#fff8e1] flex items-center justify-center group-hover:bg-[#ffc107]/20 transition-colors">
                  <Clock className="h-6 w-6 text-[#ffb74d]" />
                </div>
                <div>
                  <h3 className="font-bold text-[20px] text-[#121117]">Завершено</h3>
                  <p className="text-[14px] text-[#69686f] mt-0.5">Всього занять</p>
                </div>
              </div>
              <div className="text-[32px] font-bold text-[#121117] leading-none mb-2 sm:mb-6">{completedLessons.length}</div>
              <div className="flex items-center gap-2 text-[15px] font-[600] text-[#f57c00]">
                Переглянути розклад
                <ChevronRight className="h-4 w-4" />
              </div>
            </button>

            <button
              type="button"
              onClick={() => router.push(`/client/specialists?child=${selectedChildId}`)}
              className="text-left flex flex-col gap-4 sm:gap-6 bg-white rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 border border-slate-200/80 hover:border-[#3b82f6]/50 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] group"
            >
              <div className="flex items-center gap-4 mb-2 sm:mb-6">
                <div className="h-12 w-12 rounded-full bg-[#eff6ff] flex items-center justify-center group-hover:bg-[#3b82f6]/20 transition-colors">
                  <Users className="h-6 w-6 text-[#3b82f6]" />
                </div>
                <div>
                  <h3 className="font-bold text-[20px] text-[#121117]">Спеціалісти</h3>
                  <p className="text-[14px] text-[#69686f] mt-0.5">Активні</p>
                </div>
              </div>
              <div className="text-[32px] font-bold text-[#121117] leading-none mb-2 sm:mb-6">{activeSpecialists}</div>
              <div className="flex items-center gap-2 text-[15px] font-[600] text-[#2563eb]">
                Мої спеціалісти
                <ChevronRight className="h-4 w-4" />
              </div>
            </button>
          </motion.div>

          {/* Upcoming Lessons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="bg-white rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
              <div className="mb-6">
                <h2 className="text-[24px] font-bold text-[#121117] flex items-center gap-3">
                  <Clock className="h-6 w-6 text-[#69686f]" />
                  Найближчі заняття
                </h2>
              </div>
              <div className="space-y-4">
                {lessons
                  .filter(lesson => lesson.status === "scheduled")
                  .slice(0, 3)
                  .map((lesson) => (
                    (() => {
                      const isPsychology = lesson.subject === "Психологія"
                      const cardBorder = isPsychology ? "border-orange-200/80 hover:border-orange-300/80" : "border-slate-200/80 hover:border-[#00c5a6]/50"
                      const cardBg = isPsychology ? "hover:bg-orange-50/60" : "hover:bg-gray-50"
                      const iconBg = isPsychology ? "bg-orange-50" : "bg-[#f0f3f3]"
                      const iconColor = isPsychology ? "text-orange-600" : "text-[#121117]"

                      return (
                        <div
                          key={lesson.id}
                          className={`flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-[16px] border ${cardBorder} ${cardBg} transition-all cursor-pointer gap-4 sm:gap-0`}
                          onClick={() => {
                            setSelectedLesson(lesson)
                            setIsLessonDetailsOpen(true)
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`h-14 w-14 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}>
                              <Calendar className={`h-6 w-6 ${iconColor}`} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-[600] text-[18px] text-[#121117] truncate">{lesson.subject}</div>
                              <div className="text-[14px] text-[#69686f] truncate mt-1">{lesson.specialistName}</div>
                              <div className="text-[13px] text-[#69686f] mt-2 flex items-center gap-2">
                                <span className="bg-[#f0f3f3] px-2 py-1 rounded-[6px]">
                                  {new Date(lesson.date).toLocaleDateString('uk-UA', {
                                    day: 'numeric',
                                    month: 'long',
                                    weekday: 'short'
                                  })}
                                </span>
                                <span className="bg-[#f0f3f3] px-2 py-1 rounded-[6px]">
                                  {lesson.time}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-gray-100 sm:border-0">
                            <Badge
                              variant="outline"
                              className={`rounded-[6px] px-3 py-1.5 font-[600] border-0 flex-shrink-0 ${isPsychology
                                  ? "bg-orange-100 text-orange-700"
                                  : lesson.format === "online"
                                    ? "bg-[#e8fffb] text-[#00a389]"
                                    : "bg-blue-50 text-blue-700"
                                }`}
                            >
                              {lesson.format === "online" ? (
                                <><Video className="h-4 w-4 mr-1.5 inline" /> Онлайн</>
                              ) : (
                                <><MapPin className="h-4 w-4 mr-1.5 inline" /> Офлайн</>
                              )}
                            </Badge>
                            <ChevronRight className="h-5 w-5 text-[#69686f] flex-shrink-0 hidden sm:block" />
                          </div>
                        </div>
                      )
                    })()
                  ))}
                {lessons.filter(lesson => lesson.status === "scheduled").length === 0 && (
                  <div className="text-center py-12 rounded-[16px] border-2 border-dashed border-gray-200">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-[16px] text-[#69686f] mb-6">Запланованих занять немає</p>
                    <button
                      className="inline-flex items-center justify-center h-[48px] px-6 rounded-[8px] border-2 border-[#121117] text-[#121117] font-[600] text-[16px] hover:bg-gray-50 transition-colors"
                      onClick={() => router.push('/client/requests/new')}
                    >
                      Створити заявку
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="bg-white rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
              <div className="mb-6">
                <h2 className="text-[24px] font-bold text-[#121117] flex items-center gap-3">
                  <Star className="h-6 w-6 text-[#ffc800]" />
                  Остання активність
                </h2>
              </div>
              <div className="space-y-4">
                {lessons
                  .filter((lesson) => lesson.status === "completed")
                  .slice(0, 3)
                  .map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-6 rounded-[16px] bg-gray-50/50 border border-slate-200/80 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-[#fff8e1] flex items-center justify-center flex-shrink-0">
                          <Star className="h-6 w-6 text-[#ffc107]" />
                        </div>
                        <div className="space-y-2">
                          <div className="font-[600] text-[18px] text-[#121117] leading-tight">{lesson.subject}</div>
                          <div className="text-[14px] text-[#69686f]">{lesson.specialistName}</div>
                          <div className="text-[13px] text-[#69686f] flex items-center gap-2 flex-wrap">
                            <span className="bg-white px-2 py-1 rounded-[6px] border border-gray-200">
                              {new Date(lesson.date).toLocaleDateString("uk-UA", {
                                day: "numeric",
                                month: "long",
                              })}
                            </span>
                            {lesson.topic && <span className="bg-white px-2 py-1 rounded-[6px] border border-gray-200 truncate max-w-[200px]">{lesson.topic}</span>}
                          </div>
                          {lesson.report?.comment && (
                            <p className="text-[14px] text-[#69686f] line-clamp-2 mt-2 bg-white p-3 rounded-[8px] border border-gray-200/50">{lesson.report.comment}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-left sm:text-right space-y-2 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-gray-100 sm:border-0 w-full sm:w-auto">
                        {lesson.report && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#fff8e1] text-[#f57c00] text-[14px] font-[600]">
                            <Star className="h-4 w-4 fill-current" />
                            {lesson.report.performance}/5
                          </div>
                        )}
                        <div className="text-[13px] font-[500] text-[#69686f] mt-2 sm:mt-0">Завершено</div>
                      </div>
                    </div>
                  ))}

                {lessons.filter((lesson) => lesson.status === "completed").length === 0 && (
                  <div className="text-center py-12 rounded-[16px] border-2 border-dashed border-gray-200">
                    <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-[16px] text-[#69686f] mb-6">Завершених занять ще немає</p>
                    <button
                      className="inline-flex items-center justify-center h-[48px] px-6 rounded-[8px] border-2 border-[#121117] text-[#121117] font-[600] text-[16px] hover:bg-gray-50 transition-colors"
                      onClick={() => router.push("/client/requests/new")}
                    >
                      Створити заявку
                    </button>
                  </div>
                )}
              </div>
            </div>
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
