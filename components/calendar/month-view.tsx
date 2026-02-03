
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
    <div className="grid grid-cols-7 gap-px rounded-2xl border border-slate-200 bg-slate-100 overflow-hidden shadow-sm">
      {weekDaysShort.map((day, index) => (
        <div key={index} className="bg-slate-50 p-3 text-center text-sm font-semibold text-slate-500">
          {day}
        </div>
      ))}
      {dates.map((date, index) => {
        const daySessions = getLessonsForDate(date)
        const dayEvents = getEventsForDate(date)
        const isTodayDate = isToday(date)
        const isCurrentMonth = isSameMonth(date)

        return (
          <div
            key={index}
            className={cn(
              "group relative min-h-[120px] bg-white p-2 transition-colors hover:bg-slate-50",
              !isCurrentMonth && "bg-slate-50/50 text-slate-400",
              isTodayDate && "bg-blue-50/30",
            )}
            onClick={() => userType === "tutor" && onAddLesson(date)}
          >
            <div className="mb-2 flex items-center justify-between">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm transition-all",
                  isTodayDate
                    ? "bg-slate-900 text-white font-bold shadow-md shadow-slate-200"
                    : "text-slate-700 font-medium",
                )}
              >
                {date.getDate()}
              </div>
              {userType === "tutor" && (
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-slate-200 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      onAddLesson(date)
                    }}
                    title="Додати заняття"
                  >
                    <Plus className="h-3.5 w-3.5 text-slate-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-slate-200 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      onAddEvent(date)
                    }}
                    title="Додати подію"
                  >
                    <CalendarIcon className="h-3.5 w-3.5 text-slate-600" />
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              {daySessions.slice(0, 2).map((session) => (
                <div
                  key={session.id}
                  className="cursor-pointer rounded-md bg-emerald-50 px-2 py-1 text-xs text-emerald-700 border border-emerald-100 hover:bg-emerald-100 transition-colors shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onViewLesson(session)
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Clock className="h-3 w-3" />
                    <span className="font-semibold">{session.time}</span>
                  </div>
                  <div className="truncate font-medium">
                    {userType === "client" ? session.specialistName : session.clientName}
                  </div>
                </div>
              ))}
              {dayEvents.slice(0, 3 - daySessions.slice(0, 2).length).map((event) => (
                <div
                  key={event.id}
                  className={cn(
                    "cursor-pointer rounded-md px-2 py-1 text-xs border-l-2 shadow-sm transition-colors hover:opacity-90",
                    getEventColor(event.type),
                  )}
                  onClick={(e) => {
                    e.stopPropagation()
                    onViewEvent(event)
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <CalendarIcon className="h-3 w-3" />
                    <span className="font-semibold">{event.time}</span>
                  </div>
                  <div className="truncate font-medium">{event.title}</div>
                </div>
              ))}
              {daySessions.length + dayEvents.length > 3 && (
                <div className="text-xs font-medium text-slate-400 pl-1">
                  +{daySessions.length + dayEvents.length - 3} ще
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
