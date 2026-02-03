
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, MapPin, Video, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Lesson, CalendarEvent } from "@/lib/lesson-store"

interface DayViewProps {
  currentDate: Date
  currentTime: Date
  weekDays: string[]
  monthNames: string[]
  timeSlots: string[]
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

export function DayView({
  currentDate,
  currentTime,
  weekDays,
  monthNames,
  timeSlots,
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
}: DayViewProps) {
  const isTodayDate = isToday(currentDate)

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50/50 p-6 flex flex-col items-center">
        <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">
          {weekDays[currentDate.getDay()]}
        </div>
        <div className={cn("mt-2 text-3xl font-bold", isTodayDate ? "text-slate-900" : "text-slate-700")}>
          {currentDate.getDate()} {monthNames[currentDate.getMonth()]}
        </div>
      </div>

      {/* Time slots */}
      <div
        className="relative flex-1 overflow-auto bg-white scrollbar-thin scrollbar-thumb-slate-200"
        style={{ maxHeight: "calc(100vh - 300px)" }}
      >
        {/* Current time indicator */}
        {isTodayDate && (
          <div
            className="pointer-events-none absolute left-0 right-0 z-10 border-t-2 border-red-500 shadow-sm"
            style={{ top: `${getCurrentTimePosition()}%` }}
          >
            <div className="absolute -left-1.5 -top-2 h-4 w-4 rounded-full bg-red-500 border-2 border-white shadow-sm" />
            <div className="ml-3 -mt-3.5 inline-block rounded-md bg-red-500 px-1.5 py-0.5 text-xs font-bold text-white shadow-sm">
              {currentTime.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
        )}

        <div className="divide-y divide-slate-100">
          {timeSlots.map((time, index) => {
            const sessionsInSlot = getLessonsForTimeSlot(currentDate, time)
            const eventsInSlot = getEventsForTimeSlot(currentDate, time)

            return (
              <div
                key={index}
                className="group relative flex transition-colors hover:bg-slate-50"
                style={{ height: "100px" }}
                onClick={() => userType === "tutor" && onAddClick(currentDate, time)}
              >
                <div className="w-24 border-r border-slate-100 p-4 text-sm font-medium text-slate-400 flex justify-center pt-3">
                  {time}
                </div>
                <div className="relative flex-1 p-2 gap-2 flex">
                  {sessionsInSlot.map((session) => (
                    <div
                      key={session.id}
                      className="flex-1 cursor-pointer rounded-xl border-l-4 border-emerald-500 bg-emerald-50 p-3 hover:bg-emerald-100 hover:shadow-md transition-all"
                      onClick={(e) => {
                        e.stopPropagation()
                        onViewLesson(session)
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-bold text-emerald-900">
                          {userType === "client" ? session.specialistName : session.clientName}
                        </div>
                        <Badge
                          variant={session.format === "online" ? "default" : "secondary"}
                          className={cn(
                            "text-[10px] h-5",
                            session.format === "online"
                              ? "bg-emerald-600 hover:bg-emerald-700"
                              : "bg-white text-slate-600 border-slate-200",
                          )}
                        >
                          {session.format === "online" ? (
                            <div className="flex items-center gap-1">
                              <Video className="h-3 w-3" /> Онлайн
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> Офлайн
                            </div>
                          )}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-emerald-800 font-medium">{session.subject}</div>
                          {session.topic && <div className="mt-1 text-xs text-emerald-600">{session.topic}</div>}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-700">
                          <Clock className="h-4 w-4" />
                          {session.time} ({session.duration} хв)
                        </div>
                      </div>
                    </div>
                  ))}
                  {eventsInSlot.map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        "flex-1 cursor-pointer rounded-xl border-l-4 p-3 hover:shadow-md transition-all",
                        getEventColor(event.type),
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        onViewEvent(event)
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-bold">{event.title}</div>
                        <div className="text-xs opacity-70 px-2 py-0.5 rounded-full bg-white/50">
                          {getEventTypeLabel(event.type)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm opacity-80">{event.description || "Без опису"}</div>
                        <div className="flex items-center gap-1.5 text-sm font-medium opacity-90">
                          <Clock className="h-4 w-4" />
                          {event.time} ({event.duration} хв)
                        </div>
                      </div>
                    </div>
                  ))}
                  {userType === "tutor" && sessionsInSlot.length === 0 && eventsInSlot.length === 0 && (
                    <div className="flex h-full w-full items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <Plus className="h-6 w-6 text-slate-300" />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
