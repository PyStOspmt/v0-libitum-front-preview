"use client"

import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, MapPin, Video, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Lesson, CalendarEvent } from "@/lib/lesson-store"

interface MobileDayViewProps {
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

export function MobileDayView({
  currentDate,
  weekDays,
  monthNames,
  lessons,
  events,
  isToday,
  userType,
  onViewLesson,
  onViewEvent,
}: MobileDayViewProps) {
  const isTodayDate = isToday(currentDate)
  const dayLessons = lessons.filter(
    (lesson) => lesson.date === currentDate.toISOString().split("T")[0]
  )
  const dayEvents = events.filter(
    (event) => event.date === currentDate.toISOString().split("T")[0]
  )

  const sortedItems = [
    ...dayLessons.map((l) => ({ ...l, itemType: "lesson" as const, sortTime: l.time })),
    ...dayEvents.map((e) => ({ ...e, itemType: "event" as const, sortTime: e.time })),
  ].sort((a, b) => a.sortTime.localeCompare(b.sortTime))

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50/50 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl font-bold text-lg",
              isTodayDate
                ? "bg-slate-900 text-white shadow-md"
                : "bg-white border border-slate-200 text-slate-700"
            )}
          >
            {currentDate.getDate()}
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">
              {weekDays[currentDate.getDay()]}
            </div>
            <div className="text-lg font-semibold text-slate-800">
              {monthNames[currentDate.getMonth()]}
            </div>
          </div>
        </div>
        {isTodayDate && (
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200">
            Сьогодні
          </Badge>
        )}
      </div>

      {/* Events & Lessons List */}
      <div className="flex-1 overflow-auto bg-white" style={{ maxHeight: "calc(100vh - 280px)" }}>
        {sortedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
              <CalendarIcon className="h-8 w-8 text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">Немає подій на цей день</p>
            <p className="text-slate-400 text-sm mt-1">
              {userType === "tutor" ? "Натисніть + щоб додати заняття" : "Найближчі заняття з'являться тут"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {sortedItems.map((item, index) => {
              if (item.itemType === "lesson") {
                const lesson = item as Lesson
                const isPsychology = lesson.subject === "Психологія"
                return (
                  <div
                    key={`lesson-${index}`}
                    className={cn(
                      "p-4 active:bg-slate-50 transition-colors cursor-pointer rounded-xl",
                      isPsychology ? "border-l-4 border-l-orange-500" : "border-l-4 border-l-emerald-500"
                    )}
                    onClick={() => onViewLesson(lesson)}
                  >
                    <div className="flex items-start gap-3">
                      {/* Time */}
                      <div className="flex flex-col items-center min-w-[60px]">
                        <span className="text-lg font-bold text-slate-800">{lesson.time}</span>
                        <span className="text-xs text-slate-500">{lesson.duration} хв</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={cn(
                            "font-semibold text-base truncate",
                            isPsychology ? "text-orange-800" : "text-emerald-800"
                          )}>
                            {lesson.subject}
                          </h3>
                          <Badge
                            variant={lesson.format === "online" ? "default" : "secondary"}
                            className={cn(
                              "text-xs flex-shrink-0",
                              lesson.format === "online"
                                ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                : "bg-blue-100 text-blue-700 border-blue-200"
                            )}
                          >
                            {lesson.format === "online" ? (
                              <Video className="h-3 w-3 mr-1" />
                            ) : (
                              <MapPin className="h-3 w-3 mr-1" />
                            )}
                            {lesson.format === "online" ? "Онлайн" : "Офлайн"}
                          </Badge>
                        </div>

                        <p className={cn(
                          "text-sm font-medium",
                          isPsychology ? "text-orange-700" : "text-emerald-700"
                        )}>
                          {userType === "client" ? lesson.specialistName : lesson.clientName}
                        </p>

                        {lesson.topic && (
                          <p className="text-sm text-slate-500 mt-1 truncate">{lesson.topic}</p>
                        )}

                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="h-4 w-4 text-slate-400" />
                          <span className="text-xs text-slate-500">
                            {lesson.time} - {new Date(
                              new Date(`2000-01-01T${lesson.time}`).getTime() + lesson.duration * 60000
                            ).toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="h-6 w-6 text-slate-300 flex-shrink-0 mt-1" />
                    </div>
                  </div>
                )
              } else {
                const event = item as CalendarEvent
                return (
                  <div
                    key={`event-${index}`}
                    className="p-4 active:bg-slate-50 transition-colors cursor-pointer border-l-4 border-l-purple-500 rounded-xl"
                    onClick={() => onViewEvent(event)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center min-w-[60px]">
                        <span className="text-lg font-bold text-slate-800">{event.time}</span>
                        <span className="text-xs text-slate-500">{event.duration} хв</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-800">{event.title}</h3>
                        {event.description && (
                          <p className="text-sm text-slate-500 mt-1 truncate">{event.description}</p>
                        )}
                      </div>
                      <ChevronRight className="h-6 w-6 text-slate-300 flex-shrink-0 mt-1" />
                    </div>
                  </div>
                )
              }
            })}
          </div>
        )}
      </div>
    </div>
  )
}
