
import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Lesson, CalendarEvent } from "@/lib/lesson-store"

interface MonthViewProps {
  dates: Date[]
  weekDaysShort: string[]
  getLessonsForDate: (date: Date) => Lesson[]
  getEventsForDate: (date: Date) => CalendarEvent[]
  isToday: (date: Date) => boolean
  isSameMonth: (date: Date) => boolean
  userType: "client" | "tutor"
  onAddLesson: (date: Date) => void
  onAddEvent: (date: Date) => void
  onViewLesson: (lesson: Lesson) => void
  onViewEvent: (event: CalendarEvent) => void
  getEventColor: (type: CalendarEvent["type"]) => string
}

export function MonthView({
  dates,
  weekDaysShort,
  getLessonsForDate,
  getEventsForDate,
  isToday,
  isSameMonth,
  userType,
  onAddLesson,
  onAddEvent,
  onViewLesson,
  onViewEvent,
  getEventColor,
}: MonthViewProps) {
  return (
    <div className="grid grid-cols-7 gap-px rounded-[24px] border border-slate-200/80 bg-slate-200/80 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] min-w-[320px] font-sans">
      <div className="hidden sm:block sm:col-span-7">
        <div className="grid grid-cols-7">
          {weekDaysShort.map((day, index) => (
            <div key={index} className="bg-[#f0f3f3] p-2 lg:p-3 text-center text-xs sm:text-[14px] font-[600] text-[#69686f]">
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="sm:hidden col-span-7">
        <div className="grid grid-cols-7">
          {weekDaysShort.map((day, index) => (
            <div key={index} className="bg-[#f0f3f3] p-2 text-center text-[13px] font-[600] text-[#69686f]">
              {day.charAt(0)}
            </div>
          ))}
        </div>
      </div>
      {dates.map((date, index) => {
        const daySessions = getLessonsForDate(date)
        const dayEvents = getEventsForDate(date)
        const isTodayDate = isToday(date)
        const isCurrentMonth = isSameMonth(date)

        return (
          <div
            key={index}
            className={cn(
              "group relative min-h-[140px] sm:min-h-[160px] bg-white p-1.5 sm:p-2 transition-colors hover:bg-slate-50/50",
              !isCurrentMonth && "bg-[#f0f3f3]/50 text-[#69686f] opacity-60",
              isTodayDate && "bg-[#e8fffb]/30",
            )}
            onClick={() => userType === "tutor" && onAddLesson(date)}
          >
            <div className="mb-1 sm:mb-2 flex items-center justify-between">
              <div
                className={cn(
                  "flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full text-xs sm:text-[14px] transition-all",
                  isTodayDate
                    ? "bg-[#121117] text-white font-[600] shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
                    : "text-[#121117] font-[500]",
                )}
              >
                {date.getDate()}
              </div>
              {userType === "tutor" && (
                <div className="hidden sm:flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 sm:h-6 sm:w-6 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-100 rounded-[6px]"
                    onClick={(e) => {
                      e.stopPropagation()
                      onAddLesson(date)
                    }}
                    title="Додати заняття"
                  >
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-[#121117]" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 sm:h-6 sm:w-6 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-100 rounded-[6px]"
                    onClick={(e) => {
                      e.stopPropagation()
                      onAddEvent(date)
                    }}
                    title="Додати подію"
                  >
                    <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-[#121117]" />
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-1 sm:space-y-1.5">
              {daySessions.slice(0, 1).map((session) => {
                const isPsychology = session.subject === "Психологія"
                const bgColor = isPsychology ? "bg-orange-50" : "bg-[#e8fffb]"
                const textColor = isPsychology ? "text-orange-700" : "text-[#00a389]"
                const borderColor = isPsychology ? "border-orange-100" : "border-[#00c5a6]/20"
                const hoverBg = isPsychology ? "hover:bg-orange-100" : "hover:bg-[#00c5a6]/10"

                return (
                  <div
                    key={session.id}
                    className={`cursor-pointer rounded-[8px] ${bgColor} px-2 sm:px-3 py-2 text-xs ${textColor} border ${borderColor} ${hoverBg} transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]`}
                    onClick={(e) => {
                      e.stopPropagation()
                      onViewLesson(session)
                    }}
                  >
                    <div className="flex items-center justify-between mb-1 gap-1">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Clock className="h-3 w-3" />
                        <span className="font-[600] text-[11px]">{session.time}</span>
                        <span className="text-[10px] opacity-75">{session.duration}хв</span>
                      </div>
                      <div className={`px-1 py-0.5 rounded-[4px] text-[9px] font-[500] truncate max-w-[50px] text-center ${
                        session.format === "online" 
                          ? "bg-blue-100 text-blue-700" 
                          : "bg-purple-100 text-purple-700"
                      }`}>
                        {session.format === "online" ? "Онлайн" : "Офлайн"}
                      </div>
                    </div>
                    <div className="truncate font-[600] text-[11px] mb-1">
                      {userType === "client" ? session.specialistName : session.clientName}
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      <div className="truncate text-[10px] opacity-75 flex-1 min-w-0">
                        {session.subject}
                      </div>
                      <div className={`px-1 py-0.5 rounded-[4px] text-[9px] font-[500] shrink-0 ${
                        session.status === "completed" 
                          ? "bg-green-100 text-green-700"
                          : session.status === "scheduled"
                          ? "bg-blue-100 text-blue-700"
                          : session.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {session.status === "completed" 
                          ? "Завершено"
                          : session.status === "scheduled"
                          ? "Заплановано"
                          : session.status === "cancelled"
                          ? "Скасовано"
                          : "Пропущено"
                        }
                      </div>
                    </div>
                    {session.isPaid !== undefined && (
                      <div className="mt-1 flex items-center gap-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          session.isPaid ? "bg-green-500" : "bg-orange-500"
                        }`} />
                        <span className="text-[9px] opacity-75">
                          {session.isPaid ? "Оплачено" : "Очікує оплати"}
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
              {dayEvents.slice(0, 2 - daySessions.slice(0, 1).length).map((event) => (
                <div
                  key={event.id}
                  className={cn(
                    "cursor-pointer rounded-[6px] px-2 sm:px-2 py-1 text-[12px] border-l-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-colors hover:opacity-90 font-[500]",
                    getEventColor(event.type).replace("border-", "border-l-"),
                  )}
                  onClick={(e) => {
                    e.stopPropagation()
                    onViewEvent(event)
                  }}
                >
                  <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5">
                    <CalendarIcon className="h-3 w-3 sm:h-3 sm:w-3" />
                    <span className="font-[600] text-[11px] sm:text-[12px]">{event.time}</span>
                  </div>
                  <div className="truncate">{event.title}</div>
                </div>
              ))}
              {daySessions.length + dayEvents.length > 2 && (
                <div className="text-[12px] font-[600] text-[#69686f] pl-1 pt-0.5">
                  +{daySessions.length + dayEvents.length - 2} ще
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
