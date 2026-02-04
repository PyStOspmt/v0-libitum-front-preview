
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Lesson, CalendarEvent } from "@/lib/lesson-store"

interface WeekViewProps {
  weekDates: Date[]
  weekDaysShort: string[]
  timeSlots: string[]
  currentDate: Date
  currentTime: Date
  isToday: (date: Date) => boolean
  getLessonsForTimeSlot: (date: Date, timeSlot: string) => Lesson[]
  getEventsForTimeSlot: (date: Date, timeSlot: string) => CalendarEvent[]
  userType: "client" | "tutor"
  onAddClick: (date: Date, time: string) => void
  onViewLesson: (lesson: Lesson) => void
  onViewEvent: (event: CalendarEvent) => void
  getEventColor: (type: CalendarEvent["type"]) => string
  getEventTypeLabel: (type: CalendarEvent["type"]) => string
  getCurrentTimePosition: () => number
}

export function WeekView({
  weekDates,
  weekDaysShort,
  timeSlots,
  currentDate,
  currentTime,
  isToday,
  getLessonsForTimeSlot,
  getEventsForTimeSlot,
  userType,
  onAddClick,
  onViewLesson,
  onViewEvent,
  getEventColor,
  getEventTypeLabel,
  getCurrentTimePosition,
}: WeekViewProps) {
  const todayDate = isToday(currentDate) ? currentDate.getDay() : -1

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header with days */}
      <div className="grid grid-cols-8 border-b border-slate-200 bg-slate-50/50">
        <div className="border-r border-slate-200 p-3 text-xs font-medium text-slate-400 flex items-center justify-center">
          Час
        </div>
        {weekDates.map((date, index) => {
          const isTodayDate = isToday(date)
          return (
            <div
              key={index}
              className={cn(
                "border-r border-slate-200 p-3 text-center last:border-r-0",
                isTodayDate && "bg-blue-50/30",
              )}
            >
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                {weekDaysShort[date.getDay()]}
              </div>
              <div className={cn("mt-1.5 flex justify-center")}>
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full text-lg font-semibold transition-all",
                    isTodayDate
                      ? "bg-slate-900 text-white shadow-md shadow-slate-200"
                      : "text-slate-900",
                  )}
                >
                  {date.getDate()}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Time slots grid */}
      <div
        className="relative flex-1 overflow-auto bg-white scrollbar-thin scrollbar-thumb-slate-200"
        style={{ maxHeight: "calc(100vh - 300px)" }}
      >
        {/* Current time indicator */}
        {todayDate !== -1 && (
          <div
            className="pointer-events-none absolute left-0 right-0 z-10 border-t-2 border-red-500 shadow-sm"
            style={{ top: `${getCurrentTimePosition()}%` }}
          >
            <div className="absolute -left-1.5 -top-2 h-4 w-4 rounded-full bg-red-500 border-2 border-white shadow-sm" />
          </div>
        )}

        <div className="grid grid-cols-8">
          {timeSlots.map((time, timeIndex) => (
            <div key={`row-${timeIndex}`} className="contents">
              <div
                key={`time-${timeIndex}`}
                className="border-b border-r border-slate-100 p-2 text-xs font-medium text-slate-400 flex items-start justify-center pt-2"
                style={{ height: "60px" }}
              >
                {time}
              </div>
              {weekDates.map((date, dateIndex) => {
                const sessionsInSlot = getLessonsForTimeSlot(date, time)
                const eventsInSlot = getEventsForTimeSlot(date, time)
                const isTodayDate = isToday(date)

                return (
                  <div
                    key={`slot-${timeIndex}-${dateIndex}`}
                    className={cn(
                      "group relative border-b border-r border-slate-100 p-1 transition-colors hover:bg-slate-50 last:border-r-0",
                      isTodayDate && "bg-blue-50/10",
                    )}
                    style={{ height: "60px" }}
                    onClick={() => userType === "tutor" && onAddClick(date, time)}
                  >
                    {sessionsInSlot.map((session) => (
                      <div
                        key={session.id}
                        className="absolute inset-1 cursor-pointer overflow-hidden rounded-lg border-l-4 border-emerald-500 bg-emerald-50 p-1.5 hover:shadow-md hover:bg-emerald-100 transition-all z-10"
                        style={{
                          height: `${(session.duration / 60) * 60 - 8}px`,
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          onViewLesson(session)
                        }}
                      >
                        <div className="text-xs font-bold text-emerald-900">{session.time}</div>
                        <div className="truncate text-[11px] font-medium text-emerald-800">
                          {userType === "client" ? session.specialistName : session.clientName}
                        </div>
                        <div className="truncate text-[10px] text-emerald-600/80">{session.subject}</div>
                      </div>
                    ))}
                    {eventsInSlot.map((event, idx) => (
                      <div
                        key={event.id}
                        className={cn(
                          "absolute inset-1 cursor-pointer overflow-hidden rounded-lg border-l-4 p-1.5 hover:shadow-md transition-all z-10",
                          getEventColor(event.type),
                        )}
                        style={{
                          height: `${(event.duration / 60) * 60 - 8}px`,
                          left: sessionsInSlot.length > 0 ? "50%" : "4px",
                          right: "4px",
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          onViewEvent(event)
                        }}
                      >
                        <div className="text-xs font-bold">{event.time}</div>
                        <div className="truncate text-[11px] font-medium">{event.title}</div>
                        <div className="truncate text-[10px] opacity-80">{getEventTypeLabel(event.type)}</div>
                      </div>
                    ))}
                    {userType === "tutor" && sessionsInSlot.length === 0 && eventsInSlot.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                        <Plus className="h-4 w-4 text-slate-400" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
