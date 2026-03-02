import { CalendarIcon, Clock, MapPin, Plus, Video } from "lucide-react"

import { Badge } from "@/components/ui/badge"

import type { CalendarEvent, Lesson } from "@/lib/lesson-store"
import { cn } from "@/lib/utils"

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
        <div className="flex flex-col rounded-[24px] border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden min-w-[350px] font-sans">
            {/* Header */}
            <div className="border-b border-slate-200/80 bg-[#f0f3f3] p-4 lg:p-6 flex flex-col items-center">
                <div className="text-[12px] font-[600] text-[#69686f] uppercase tracking-wide">
                    {weekDays[currentDate.getDay()]}
                </div>
                <div
                    className={cn(
                        "mt-2 text-2xl lg:text-[28px] font-[700]",
                        isTodayDate ? "text-[#121117]" : "text-[#121117]/80",
                    )}
                >
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
                        className="pointer-events-none absolute left-0 right-0 border-t-2 border-red-500 shadow-sm"
                        style={{ top: `${getCurrentTimePosition()}%`, zIndex: 1 }}
                    >
                        <div className="absolute -left-1.5 -top-2 h-4 w-4 rounded-full bg-red-500 border-2 border-white shadow-sm" />
                        <div className="ml-3 -mt-3.5 inline-block rounded-md bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-sm">
                            {currentTime.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                    </div>
                )}

                <div className="divide-y divide-slate-100 min-w-[350px]">
                    {timeSlots.map((time, index) => {
                        const sessionsInSlot = getLessonsForTimeSlot(currentDate, time)
                        const eventsInSlot = getEventsForTimeSlot(currentDate, time)

                        return (
                            <div
                                key={index}
                                className="group relative flex transition-colors hover:bg-slate-50/50 border-b border-slate-100 last:border-b-0"
                                style={{ height: "80px sm:h-[100px]" }}
                                onClick={() => userType === "tutor" && onAddClick(currentDate, time)}
                            >
                                <div className="w-16 sm:w-24 border-r border-slate-100 p-2 sm:p-4 text-[12px] font-[500] text-[#69686f] flex justify-center pt-2 sm:pt-3">
                                    <span className="hidden sm:block">{time}</span>
                                    <span className="sm:hidden">{time.split(":")[0]}</span>
                                </div>
                                <div className="relative flex-1 p-1.5 sm:p-2 gap-1.5 sm:gap-2 flex">
                                    {sessionsInSlot.map((session) => {
                                        const isPsychology = session.subject === "Психологія"
                                        const borderColor = isPsychology ? "border-orange-500" : "border-[#00c5a6]"
                                        const bgColor = isPsychology ? "bg-orange-50" : "bg-[#e8fffb]"
                                        const hoverBg = isPsychology ? "hover:bg-orange-100" : "hover:bg-[#00c5a6]/10"
                                        const textColor = isPsychology ? "text-orange-900" : "text-[#00a389]"
                                        const subtitleColor = isPsychology ? "text-orange-600" : "text-[#00a389]"

                                        return (
                                            <div
                                                key={session.id}
                                                className={`flex-1 cursor-pointer rounded-[12px] border-l-4 ${borderColor} ${bgColor} p-2 sm:p-3 ${hoverBg} hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all`}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onViewLesson(session)
                                                }}
                                            >
                                                <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                                                    <div className={`font-[700] ${textColor} text-[13px] sm:text-[15px]`}>
                                                        {userType === "client" ? session.specialistName : session.clientName}
                                                    </div>
                                                    <Badge
                                                        variant={session.format === "online" ? "default" : "secondary"}
                                                        className={cn(
                                                            "text-[10px] sm:text-[11px] h-5 sm:h-6 font-[600] border-0",
                                                            session.format === "online"
                                                                ? "bg-[#00c5a6] hover:bg-[#00a389] text-white"
                                                                : "bg-[#f0f3f3] text-[#121117]",
                                                        )}
                                                    >
                                                        {session.format === "online" ? (
                                                            <div className="flex items-center gap-1">
                                                                <Video className="h-3 w-3 sm:h-3 sm:w-3" />
                                                                <span className="hidden sm:inline">Онлайн</span>
                                                                <span className="sm:hidden">Онл</span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-1">
                                                                <MapPin className="h-3 w-3 sm:h-3 sm:w-3" />
                                                                <span className="hidden sm:inline">Офлайн</span>
                                                                <span className="sm:hidden">Офл</span>
                                                            </div>
                                                        )}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div
                                                            className={`text-[12px] sm:text-[13px] font-[600] ${subtitleColor}`}
                                                        >
                                                            {session.subject}
                                                        </div>
                                                        {session.topic && (
                                                            <div
                                                                className={`mt-0.5 text-[11px] sm:text-[12px] font-[500] ${subtitleColor}/80`}
                                                            >
                                                                {session.topic}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div
                                                        className={`flex items-center gap-1 sm:gap-1.5 text-[12px] sm:text-[13px] font-[600] ${subtitleColor}`}
                                                    >
                                                        <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                                        <span className="hidden sm:inline">
                                                            {session.time} ({session.duration} хв)
                                                        </span>
                                                        <span className="sm:hidden">{session.time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    {eventsInSlot.map((event) => (
                                        <div
                                            key={event.id}
                                            className={cn(
                                                "flex-1 cursor-pointer rounded-[12px] border-l-4 p-2 sm:p-3 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all",
                                                getEventColor(event.type),
                                            )}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onViewEvent(event)
                                            }}
                                        >
                                            <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                                                <div className="font-[700] text-[13px] sm:text-[15px]">{event.title}</div>
                                                <div className="flex items-center gap-1 sm:gap-1.5 text-[12px] sm:text-[13px] font-[600]">
                                                    <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                                    <span className="hidden sm:inline">
                                                        {event.time} ({event.duration} хв)
                                                    </span>
                                                    <span className="sm:hidden">{event.time}</span>
                                                </div>
                                            </div>
                                            <div className="text-[11px] sm:text-[12px] font-[500] opacity-80">
                                                {getEventTypeLabel(event.type)}
                                            </div>
                                        </div>
                                    ))}
                                    {userType === "tutor" && sessionsInSlot.length === 0 && eventsInSlot.length === 0 && (
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                                            <Plus className="h-5 w-5 text-slate-400" />
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
