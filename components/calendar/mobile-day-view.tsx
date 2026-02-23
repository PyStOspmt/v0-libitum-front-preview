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
    <div className="flex flex-col rounded-[24px] border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden font-sans">
      {/* Header */}
      <div className="border-b border-slate-200/80 bg-[#f0f3f3] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-[12px] font-[600] text-[18px]",
              isTodayDate
                ? "bg-[#121117] text-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
                : "bg-white border border-slate-200/80 text-[#121117]"
            )}
          >
            {currentDate.getDate()}
          </div>
          <div>
            <div className="text-[12px] font-[600] text-[#69686f] uppercase tracking-wide">
              {weekDays[currentDate.getDay()]}
            </div>
            <div className="text-[16px] font-[700] text-[#121117]">
              {monthNames[currentDate.getMonth()]}
            </div>
          </div>
        </div>
        {isTodayDate && (
          <Badge variant="secondary" className="bg-[#e8fffb] text-[#00a389] border-0 font-[600]">
            Сьогодні
          </Badge>
        )}
      </div>

      {/* Events & Lessons List */}
      <div className="flex-1 overflow-auto bg-white" style={{ maxHeight: "calc(100vh - 280px)" }}>
        {sortedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="h-16 w-16 rounded-full bg-[#f0f3f3] flex items-center justify-center mb-4">
              <CalendarIcon className="h-8 w-8 text-[#69686f]/50" />
            </div>
            <p className="text-[#121117] font-[600]">Немає подій на цей день</p>
            <p className="text-[#69686f] text-[13px] mt-1 font-[500]">
              {userType === "tutor" ? "Натисніть + щоб додати заняття" : "Найближчі заняття з'являться тут"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {sortedItems.map((item, index) => {
              if (item.itemType === "lesson") {
                const lesson = item as Lesson
                const isPsychology = lesson.subject === "Психологія"
                const borderColor = isPsychology ? "border-orange-500" : "border-[#00c5a6]"
                const textColor = isPsychology ? "text-orange-900" : "text-[#00a389]"
                const subtitleColor = isPsychology ? "text-orange-600" : "text-[#00a389]"

                return (
                  <div
                    key={`lesson-${index}`}
                    className={cn(
                      "p-4 active:bg-slate-50 transition-colors cursor-pointer border-l-4",
                      borderColor
                    )}
                    onClick={() => onViewLesson(lesson)}
                  >
                    <div className="flex items-start gap-3">
                      {/* Time */}
                      <div className="flex flex-col items-center min-w-[60px]">
                        <span className="text-[16px] font-[700] text-[#121117]">{lesson.time}</span>
                        <span className="text-[12px] font-[500] text-[#69686f]">{lesson.duration} хв</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={cn(
                            "font-[600] text-[15px] truncate",
                            textColor
                          )}>
                            {lesson.subject}
                          </h3>
                          <Badge
                            variant={lesson.format === "online" ? "default" : "secondary"}
                            className={cn(
                              "text-[10px] font-[600] flex-shrink-0 border-0 h-5",
                              lesson.format === "online"
                                ? "bg-[#e8fffb] text-[#00a389]"
                                : "bg-blue-50 text-blue-700"
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
                          "text-[14px] font-[600]",
                          subtitleColor
                        )}>
                          {userType === "client" ? lesson.specialistName : lesson.clientName}
                        </p>

                        {lesson.topic && (
                          <p className="text-[12px] font-[500] text-[#69686f] mt-1 truncate">{lesson.topic}</p>
                        )}

                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="h-3.5 w-3.5 text-[#69686f]" />
                          <span className="text-[12px] font-[500] text-[#69686f]">
                            {lesson.time} - {new Date(
                              new Date(`2000-01-01T${lesson.time}`).getTime() + lesson.duration * 60000
                            ).toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="h-5 w-5 text-[#69686f]/50 flex-shrink-0 mt-1" />
                    </div>
                  </div>
                )
              } else {
                const event = item as CalendarEvent
                return (
                  <div
                    key={`event-${index}`}
                    className="p-4 active:bg-slate-50 transition-colors cursor-pointer border-l-4 border-l-purple-500"
                    onClick={() => onViewEvent(event)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center min-w-[60px]">
                        <span className="text-[16px] font-[700] text-[#121117]">{event.time}</span>
                        <span className="text-[12px] font-[500] text-[#69686f]">{event.duration} хв</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-[600] text-[15px] text-[#121117]">{event.title}</h3>
                        {event.description && (
                          <p className="text-[13px] font-[500] text-[#69686f] mt-1 truncate">{event.description}</p>
                        )}
                      </div>
                      <ChevronRight className="h-5 w-5 text-[#69686f]/50 flex-shrink-0 mt-1" />
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
