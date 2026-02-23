
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
    <div className="flex flex-col rounded-[24px] border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden min-w-[600px] font-sans">
      {/* Header with days */}
      <div className="grid grid-cols-8 border-b border-slate-200/80 bg-[#f0f3f3]">
        <div className="border-r border-slate-200/80 p-2 lg:p-3 text-[14px] font-[600] text-[#69686f] flex items-center justify-center min-w-[60px]">
          Час
        </div>
        {weekDates.map((date, index) => {
          const isTodayDate = isToday(date)
          return (
            <div
              key={index}
              className={cn(
                "border-r border-slate-200/80 p-2 lg:p-3 text-center last:border-r-0",
                isTodayDate && "bg-[#e8fffb]/30",
              )}
            >
              <div className="text-[12px] font-[600] text-[#69686f] uppercase tracking-wide hidden sm:block">
                {weekDaysShort[date.getDay()]}
              </div>
              <div className="text-[12px] font-[600] text-[#69686f] uppercase tracking-wide sm:hidden">
                {weekDaysShort[date.getDay()].charAt(0)}
              </div>
              <div className={cn("mt-1.5 flex justify-center")}>
                <div
                  className={cn(
                    "flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full text-sm sm:text-[18px] transition-all",
                    isTodayDate
                      ? "bg-[#121117] text-white font-[600] shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
                      : "text-[#121117] font-[500]",
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
        className="relative flex-1 overflow-auto bg-white scrollbar-thin scrollbar-thumb-slate-200 scrollbar-hide"
        style={{ maxHeight: "calc(100vh - 300px)" }}
      >
        {/* Current time indicator */}
        {todayDate !== -1 && (
          <div
            className="pointer-events-none absolute left-0 right-0 border-t-2 border-red-500 shadow-sm"
            style={{ top: `${getCurrentTimePosition()}%`, zIndex: 1 }}
          >
            <div className="absolute -left-1.5 -top-2 h-4 w-4 rounded-full bg-red-500 border-2 border-white shadow-sm" />
          </div>
        )}

        <div className="grid grid-cols-8 min-w-[600px]">
          {timeSlots.map((time, timeIndex) => (
            <div key={`row-${timeIndex}`} className="contents">
              <div
                key={`time-${timeIndex}`}
                className="border-b border-r border-slate-100 p-1 lg:p-2 text-[12px] font-[500] text-[#69686f] flex items-start justify-center pt-2"
                style={{ height: "60px" }}
              >
                <span className="hidden sm:block">{time}</span>
                <span className="sm:hidden">{time.split(':')[0]}</span>
              </div>
              {weekDates.map((date, dateIndex) => {
                const sessionsInSlot = getLessonsForTimeSlot(date, time)
                const eventsInSlot = getEventsForTimeSlot(date, time)
                const isTodayDate = isToday(date)

                return (
                  <div
                    key={`slot-${timeIndex}-${dateIndex}`}
                    className={cn(
                      "group relative border-b border-r border-slate-100 p-1 transition-colors hover:bg-slate-50/50 last:border-r-0",
                      isTodayDate && "bg-[#e8fffb]/10",
                    )}
                    style={{ height: "60px" }}
                    onClick={() => userType === "tutor" && onAddClick(date, time)}
                  >
                    {sessionsInSlot.map((session) => {
                      const isPsychology = session.subject === "Психологія"
                      const borderColor = isPsychology ? "border-orange-500" : "border-[#00c5a6]"
                      const bgColor = isPsychology ? "bg-orange-50" : "bg-[#e8fffb]"
                      const hoverBg = isPsychology ? "hover:bg-orange-100" : "hover:bg-[#00c5a6]/10"
                      const textColor = isPsychology ? "text-orange-900" : "text-[#00a389]"
                      const subtitleColor = isPsychology ? "text-orange-600/80" : "text-[#00a389]/80"
                      
                      return (
                      <div
                        key={session.id}
                        className={`absolute inset-x-1 cursor-pointer overflow-hidden rounded-[8px] border-l-4 ${borderColor} ${bgColor} p-1.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] ${hoverBg} transition-all z-[1]`}
                        style={{
                          height: `${(session.duration / 60) * 60 - 8}px`,
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          onViewLesson(session)
                        }}
                      >
                        <div className={`text-[12px] font-[700] ${textColor} hidden sm:block mb-0.5`}>{session.time}</div>
                        <div className={`truncate text-[11px] sm:text-[12px] font-[600] ${textColor}`}>
                          {userType === "client" ? session.specialistName : session.clientName}
                        </div>
                        <div className={`truncate text-[11px] sm:text-[11px] font-[500] ${subtitleColor}`}>{session.subject}</div>
                        <div className="mt-1 flex items-center justify-between gap-1 text-[11px] sm:text-[11px] text-[#69686f]">
                          <div className="flex items-center gap-1 truncate">
                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 border text-[10px] font-[600] ${session.format === "online" ? "bg-[#e8fffb] border-[#00c5a6]/20 text-[#00a389]" : "bg-blue-50 border-blue-200 text-blue-700"}`}>
                              {session.format === "online" ? "Онлайн" : "Офлайн"}
                            </span>
                            <span className="truncate font-[500]">{session.price ? `${session.price} грн` : ""}</span>
                          </div>
                          <span className="font-[600] text-[11px] text-[#121117] hover:text-[#00c5a6] transition-colors">Деталі</span>
                        </div>
                      </div>
                      )
                    })}
                    {eventsInSlot.map((event, idx) => (
                      <div
                        key={event.id}
                        className={cn(
                          "absolute inset-x-1 cursor-pointer overflow-hidden rounded-[8px] border-l-4 p-1.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all z-[1]",
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
                        <div className="text-[12px] font-[700] hidden sm:block mb-0.5">{event.time}</div>
                        <div className="truncate text-[11px] sm:text-[12px] font-[600]">{event.title}</div>
                        <div className="truncate text-[10px] sm:text-[11px] font-[500] opacity-80">{getEventTypeLabel(event.type)}</div>
                      </div>
                    ))}
                    {userType === "tutor" && sessionsInSlot.length === 0 && eventsInSlot.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                        <Plus className="h-5 w-5 text-slate-400" />
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
