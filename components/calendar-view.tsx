"use client"

import { CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Video } from "lucide-react"
import { useState } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { cn } from "@/lib/utils"

interface Session {
    id: string
    title: string
    clientName?: string
    specialistName?: string
    subject: string
    date: string
    time: string
    type: "online" | "offline"
    status?: "upcoming" | "completed" | "cancelled"
}

interface CalendarViewProps {
    sessions: Session[]
    userType: "client" | "tutor"
}

export function CalendarView({ sessions, userType }: CalendarViewProps) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [view, setView] = useState<"month" | "week">("week")

    const monthNames = [
        "Січень",
        "Лютий",
        "Березень",
        "Квітень",
        "Травень",
        "Червень",
        "Липень",
        "Серпень",
        "Вересень",
        "Жовтень",
        "Листопад",
        "Грудень",
    ]

    const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"]

    const getWeekDates = () => {
        const curr = new Date(currentDate)
        const first = curr.getDate() - curr.getDay() + 1
        const dates = []
        for (let i = 0; i < 7; i++) {
            const date = new Date(curr.setDate(first + i))
            dates.push(date)
        }
        return dates
    }

    const weekDates = getWeekDates()

    const getSessionsForDate = (date: Date) => {
        const dateStr = date.toISOString().split("T")[0]
        return sessions.filter((session) => session.date === dateStr)
    }

    const previousWeek = () => {
        const newDate = new Date(currentDate)
        newDate.setDate(newDate.getDate() - 7)
        setCurrentDate(newDate)
    }

    const nextWeek = () => {
        const newDate = new Date(currentDate)
        newDate.setDate(newDate.getDate() + 7)
        setCurrentDate(newDate)
    }

    const today = () => {
        setCurrentDate(new Date())
    }

    const isToday = (date: Date) => {
        const today = new Date()
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        )
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" />
                        Календар занять
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={today}>
                            Сьогодні
                        </Button>
                        <div className="flex items-center gap-1">
                            <Button variant="outline" size="icon" onClick={previousWeek}>
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <div className="min-w-[200px] text-center text-sm font-medium">
                                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                            </div>
                            <Button variant="outline" size="icon" onClick={nextWeek}>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Week View */}
                    <div className="grid grid-cols-7 gap-2">
                        {weekDates.map((date, index) => {
                            const daySessions = getSessionsForDate(date)
                            const isTodayDate = isToday(date)

                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        "min-h-[200px] rounded-lg border p-2",
                                        isTodayDate && "border-primary bg-primary/5",
                                    )}
                                >
                                    <div className="mb-2 text-center">
                                        <div className="text-xs text-muted-foreground">{weekDays[index]}</div>
                                        <div
                                            className={cn(
                                                "mx-auto mt-1 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                                                isTodayDate && "bg-primary text-primary-foreground",
                                            )}
                                        >
                                            {date.getDate()}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {daySessions.map((session) => (
                                            <div
                                                key={session.id}
                                                className="group cursor-pointer rounded-md border bg-card p-2 text-xs transition-shadow hover:shadow-md"
                                            >
                                                <div className="mb-1 flex items-center gap-1">
                                                    <Clock className="h-3 w-3 text-muted-foreground" />
                                                    <span className="font-medium">{session.time}</span>
                                                </div>
                                                <div className="mb-1 flex items-center gap-1">
                                                    <Avatar className="h-4 w-4">
                                                        <AvatarFallback className="text-[8px]">
                                                            {userType === "client"
                                                                ? session.specialistName?.[0]
                                                                : session.clientName?.[0]}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="truncate text-[10px]">
                                                        {userType === "client" ? session.specialistName : session.clientName}
                                                    </span>
                                                </div>
                                                <p className="mb-1 truncate text-[10px] text-muted-foreground">
                                                    {session.subject}
                                                </p>
                                                <Badge
                                                    variant={session.type === "online" ? "default" : "secondary"}
                                                    className="h-4 text-[9px]"
                                                >
                                                    {session.type === "online" ? (
                                                        <>
                                                            <Video className="mr-0.5 h-2 w-2" />
                                                            Онлайн
                                                        </>
                                                    ) : (
                                                        <>
                                                            <MapPin className="mr-0.5 h-2 w-2" />
                                                            Офлайн
                                                        </>
                                                    )}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <div className="h-3 w-3 rounded-full bg-primary" />
                            <span>Сьогодні</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Video className="h-3 w-3" />
                            <span>Онлайн</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>Офлайн</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
