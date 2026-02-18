"use client"

import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, MapPin, Video } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Lesson, CalendarEvent } from "@/lib/lesson-store"

interface MobileWeekViewProps {
  currentDate: Date
  weekDays: string[]
  monthNames: string[]
  lessons: Lesson[]
  events: CalendarEvent[]
  isToday: (date: Date) => boolean
  userType: "client" | "tutor"
  onViewLesson: (lesson: Lesson) => void
  onViewEvent: (event: CalendarEvent) => void
}

export function MobileWeekView({
  currentDate,
  weekDays,
  monthNames,
  lessons,
  events,
  isToday,
  userType,
  onViewLesson,
  onViewEvent,
}: MobileWeekViewProps) {
  const weekDaysMobileShort = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
  const getWeekDates = () => {
    const dates = []
    const startOfWeek = new Date(currentDate)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1)
    startOfWeek.setDate(diff)

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const weekDates = getWeekDates()

  return (
    <div className="flex flex-col gap-3">
      {/* Week Header */}
      <div className="flex items-center justify-between px-2 py-3">
        <h3 className="text-lg font-semibold text-slate-800">
          {weekDates[0].getDate()} {monthNames[weekDates[0].getMonth()]} - {weekDates[6].getDate()} {monthNames[weekDates[6].getMonth()]}
        </h3>
        <div className="text-sm text-slate-500">
          {weekDates[0].getFullYear()}
        </div>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 px-1">
        {weekDates.map((date, index) => {
          const isTodayDate = isToday(date)
          const dateStr = date.toISOString().split("T")[0]
          const dayLessons = lessons.filter(
            (lesson) => lesson.date === dateStr
          )
          const dayEvents = events.filter(
            (event) => event.date === dateStr
          )
          const totalItems = dayLessons.length + dayEvents.length

          return (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center p-2 rounded-xl border min-h-[80px] cursor-pointer transition-all",
                isTodayDate
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-white border-slate-200 hover:bg-slate-50",
                totalItems > 0 && "ring-2 ring-emerald-100"
              )}
              onClick={() => {
                // Navigate to this day
                const event = new CustomEvent("navigateToDay", { detail: date })
                window.dispatchEvent(event)
              }}
            >
              {/* Day Name */}
              <div className="text-xs text-slate-500 mb-1 truncate text-center w-full">
                <span className="block sm:hidden uppercase tracking-wide">{weekDaysMobileShort[date.getDay()]}</span>
                <span className="hidden sm:block">{weekDays[index]}</span>
              </div>
              
              {/* Day Number */}
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg font-semibold text-sm",
                  isTodayDate
                    ? "bg-emerald-600 text-white"
                    : "text-slate-700"
                )}
              >
                {date.getDate()}
              </div>

              {/* Items Count */}
              {totalItems > 0 && (
                <div className="mt-2 flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1">
                    {dayLessons.length > 0 && (
                      <div className="h-3 w-3 rounded-full bg-emerald-500" />
                    )}
                    {dayEvents.length > 0 && (
                      <div className="h-3 w-3 rounded-full bg-purple-500" />
                    )}
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    {totalItems}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Upcoming Lessons List */}
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-slate-700 mb-3 px-2">
          Найближчі заняття на цьому тижні
        </h4>
        <div className="space-y-2">
          {weekDates.map((date) => {
            const dateStr = date.toISOString().split("T")[0]
            const dayLessons = lessons.filter(
              (lesson) => lesson.date === dateStr
            )
            const dayEvents = events.filter(
              (event) => event.date === dateStr
            )

            if (dayLessons.length === 0 && dayEvents.length === 0) return null

            const sortedItems = [
              ...dayLessons.map((l) => ({ ...l, itemType: "lesson" as const, sortTime: l.time })),
              ...dayEvents.map((e) => ({ ...e, itemType: "event" as const, sortTime: e.time })),
            ].sort((a, b) => a.sortTime.localeCompare(b.sortTime))

            return (
              <div key={dateStr} className="px-2">
                <div className="text-xs font-medium text-slate-500 mb-2">
                  {weekDays[date.getDay()]}, {date.getDate()} {monthNames[date.getMonth()]}
                </div>
                <div className="space-y-2">
                  {sortedItems.map((item, index) => {
                    if (item.itemType === "lesson") {
                      const lesson = item as Lesson
                      const isPsychology = lesson.subject === "Психологія"
                      return (
                        <div
                          key={`lesson-${index}`}
                          className={cn(
                            "p-3 rounded-xl border cursor-pointer transition-all active:bg-slate-50",
                            isPsychology
                              ? "bg-orange-50 border-orange-200"
                              : "bg-emerald-50 border-emerald-200"
                          )}
                          onClick={() => onViewLesson(lesson)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-sm font-bold text-slate-700 min-w-[45px]">
                              {lesson.time}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={cn(
                                "font-semibold text-sm truncate",
                                isPsychology ? "text-orange-800" : "text-emerald-800"
                              )}>
                                {lesson.subject}
                              </div>
                              <div className="text-xs text-slate-600">
                                {userType === "client" ? lesson.specialistName : lesson.clientName}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              {lesson.format === "online" ? (
                                <Video className="h-3 w-3 text-emerald-600" />
                              ) : (
                                <MapPin className="h-3 w-3 text-blue-600" />
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    } else {
                      const event = item as CalendarEvent
                      return (
                        <div
                          key={`event-${index}`}
                          className="p-3 rounded-xl border bg-purple-50 border-purple-200 cursor-pointer transition-all active:bg-slate-50"
                          onClick={() => onViewEvent(event)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-sm font-bold text-slate-700 min-w-[45px]">
                              {event.time}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm text-purple-800 truncate">
                                {event.title}
                              </div>
                              {event.description && (
                                <div className="text-xs text-slate-600 truncate">
                                  {event.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
