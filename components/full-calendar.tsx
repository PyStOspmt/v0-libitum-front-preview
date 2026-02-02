"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, CalendarIcon, Clock, Video, MapPin, Plus, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLessonStore, type Lesson, type CalendarEvent } from "@/lib/lesson-store"
import { useToast } from "@/hooks/use-toast"

interface FullCalendarProps {
  userType: "client" | "tutor"
  userId: string
}

type ViewMode = "month" | "week" | "day"

export function FullCalendar({ userType, userId }: FullCalendarProps) {
  const { lessons, addLesson, updateLesson, deleteLesson, events, addEvent, updateEvent, deleteEvent } =
    useLessonStore()
  const { toast } = useToast()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<ViewMode>("week")
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")
  const timelineRef = useRef<HTMLDivElement>(null)

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false)
  const [isEditEventDialogOpen, setIsEditEventDialogOpen] = useState(false)
  const [isViewEventDialogOpen, setIsViewEventDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    clientName: "",
    subject: "",
    date: "",
    time: "",
    duration: "60",
    format: "online" as "online" | "offline",
    topic: "",
    description: "",
    price: "400",
  })

  const [eventFormData, setEventFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "60",
    type: "personal" as "personal" | "meeting" | "reminder" | "break",
  })

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

  const weekDays = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"]
  const weekDaysShort = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0")
    return `${hour}:00`
  })

  const [currentTime, setCurrentTime] = useState(new Date())
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  const getWeekDates = () => {
    const curr = new Date(currentDate)
    const first = curr.getDate() - curr.getDay()
    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(curr.setDate(first + i))
      dates.push(new Date(date))
    }
    return dates
  }

  const getMonthDates = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const dates = []

    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      dates.push(new Date(year, month - 1, prevMonthLastDay - i))
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(new Date(year, month, i))
    }

    // Next month days to fill the grid
    const remainingDays = 42 - dates.length
    for (let i = 1; i <= remainingDays; i++) {
      dates.push(new Date(year, month + 1, i))
    }

    return dates
  }

  const getLessonsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return lessons.filter((lesson) => lesson.date === dateStr)
  }

  const getLessonsForTimeSlot = (date: Date, timeSlot: string) => {
    const dateStr = date.toISOString().split("T")[0]
    return lessons.filter((lesson) => {
      if (lesson.date !== dateStr) return false
      const lessonHour = lesson.time.split(":")[0]
      const slotHour = timeSlot.split(":")[0]
      return lessonHour === slotHour
    })
  }

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return events.filter((event) => event.userId === userId && event.date === dateStr)
  }

  const getEventsForTimeSlot = (date: Date, timeSlot: string) => {
    const dateStr = date.toISOString().split("T")[0]
    return events.filter((event) => {
      if (event.userId !== userId || event.date !== dateStr) return false
      const eventHour = event.time.split(":")[0]
      const slotHour = timeSlot.split(":")[0]
      return eventHour === slotHour
    })
  }

  const previousPeriod = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "month") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() - 7)
    } else {
      newDate.setDate(newDate.getDate() - 1)
    }
    setCurrentDate(newDate)
  }

  const nextPeriod = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "month") {
      newDate.setMonth(newDate.getMonth() + 1)
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + 7)
    } else {
      newDate.setDate(newDate.getDate() + 1)
    }
    setCurrentDate(newDate)
  }

  const goToToday = () => {
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

  const isSameMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  const handleAddLesson = () => {
    if (!formData.clientName || !formData.subject || !formData.date || !formData.time) {
      toast({
        title: "Помилка",
        description: "Будь ласка, заповніть всі обов'язкові поля",
        variant: "destructive",
      })
      return
    }

    addLesson({
      clientId: `client-${Math.random().toString(36).substr(2, 9)}`,
      clientName: formData.clientName,
      specialistId: userId,
      specialistName: "Поточний спеціаліст",
      subject: formData.subject,
      date: formData.date,
      time: formData.time,
      duration: Number.parseInt(formData.duration),
      format: formData.format,
      status: "scheduled",
      topic: formData.topic,
      description: formData.description,
      isPaid: false,
      price: Number.parseInt(formData.price),
    })

    toast({
      title: "Заняття додано",
      description: "Нове заняття успішно додано до розкладу",
    })

    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleAddEvent = () => {
    if (!eventFormData.title || !eventFormData.date || !eventFormData.time) {
      toast({
        title: "Помилка",
        description: "Будь ласка, заповніть всі обов'язкові поля",
        variant: "destructive",
      })
      return
    }

    addEvent({
      userId,
      title: eventFormData.title,
      description: eventFormData.description,
      date: eventFormData.date,
      time: eventFormData.time,
      duration: Number.parseInt(eventFormData.duration),
      type: eventFormData.type,
    })

    toast({
      title: "Подію додано",
      description: "Нову подію успішно додано до розкладу",
    })

    setIsAddEventDialogOpen(false)
    resetEventForm()
  }

  const handleEditLesson = () => {
    if (!selectedLesson) return

    updateLesson(selectedLesson.id, {
      topic: formData.topic,
      description: formData.description,
      time: formData.time,
      duration: Number.parseInt(formData.duration),
      format: formData.format,
      price: Number.parseInt(formData.price),
    })

    toast({
      title: "Заняття оновлено",
      description: "Інформація про заняття успішно оновлена",
    })

    setIsEditDialogOpen(false)
    setSelectedLesson(null)
    resetForm()
  }

  const handleEditEvent = () => {
    if (!selectedEvent) return

    updateEvent(selectedEvent.id, {
      title: eventFormData.title,
      description: eventFormData.description,
      time: eventFormData.time,
      duration: Number.parseInt(eventFormData.duration),
      type: eventFormData.type,
    })

    toast({
      title: "Подію оновлено",
      description: "Інформацію про подію успішно оновлено",
    })

    setIsEditEventDialogOpen(false)
    setSelectedEvent(null)
    resetEventForm()
  }

  const handleDeleteLesson = (lessonId: string) => {
    deleteLesson(lessonId)
    toast({
      title: "Заняття видалено",
      description: "Заняття було видалено з розкладу",
    })
    setIsViewDialogOpen(false)
    setIsEditDialogOpen(false)
    setSelectedLesson(null)
  }

  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId)
    toast({
      title: "Подію видалено",
      description: "Подію було видалено з розкладу",
    })
    setIsViewEventDialogOpen(false)
    setIsEditEventDialogOpen(false)
    setSelectedEvent(null)
  }

  const handleMarkPaid = (lessonId: string) => {
    updateLesson(lessonId, { isPaid: true })
    toast({
      title: "Оплата підтверджена",
      description: "Заняття відмічено як оплачене",
    })
  }

  const openAddDialog = (date: Date, time?: string) => {
    setSelectedDate(date)
    setFormData({
      ...formData,
      date: date.toISOString().split("T")[0],
      time: time || "",
    })
    setIsAddDialogOpen(true)
  }

  const openAddEventDialog = (date: Date, time?: string) => {
    setEventFormData({
      ...eventFormData,
      date: date.toISOString().split("T")[0],
      time: time || "",
    })
    setIsAddEventDialogOpen(true)
  }

  const openEditDialog = (lesson: Lesson) => {
    setSelectedLesson(lesson)
    setFormData({
      clientName: lesson.clientName,
      subject: lesson.subject,
      date: lesson.date,
      time: lesson.time,
      duration: lesson.duration.toString(),
      format: lesson.format,
      topic: lesson.topic || "",
      description: lesson.description || "",
      price: lesson.price.toString(),
    })
    setIsEditDialogOpen(true)
  }

  const openEditEventDialog = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setEventFormData({
      title: event.title,
      description: event.description || "",
      date: event.date,
      time: event.time,
      duration: event.duration.toString(),
      type: event.type,
    })
    setIsEditEventDialogOpen(true)
  }

  const openViewDialog = (lesson: Lesson) => {
    setSelectedLesson(lesson)
    setIsViewDialogOpen(true)
  }

  const openViewEventDialog = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsViewEventDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      clientName: "",
      subject: "",
      date: "",
      time: "",
      duration: "60",
      format: "online",
      topic: "",
      description: "",
      price: "400",
    })
  }

  const resetEventForm = () => {
    setEventFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      duration: "60",
      type: "personal",
    })
  }

  const getEventColor = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "personal":
        return "bg-blue-500/20 border-blue-500"
      case "meeting":
        return "bg-purple-500/20 border-purple-500"
      case "reminder":
        return "bg-amber-500/20 border-amber-500"
      case "break":
        return "bg-green-500/20 border-green-500"
      default:
        return "bg-gray-500/20 border-gray-500"
    }
  }

  const getEventTypeLabel = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "personal":
        return "Особиста подія"
      case "meeting":
        return "Зустріч"
      case "reminder":
        return "Нагадування"
      case "break":
        return "Перерва"
      default:
        return "Подія"
    }
  }

  const getCurrentTimePosition = () => {
    const hours = currentTime.getHours()
    const minutes = currentTime.getMinutes()
    return ((hours * 60 + minutes) / (24 * 60)) * 100
  }

  const formatDateRange = () => {
    if (viewMode === "month") {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    } else if (viewMode === "week") {
      const weekDates = getWeekDates()
      const start = weekDates[0]
      const end = weekDates[6]
      if (start.getMonth() === end.getMonth()) {
        return `${start.getDate()}-${end.getDate()} ${monthNames[start.getMonth()]} ${start.getFullYear()}`
      }
      return `${start.getDate()} ${monthNames[start.getMonth()]} - ${end.getDate()} ${monthNames[end.getMonth()]} ${end.getFullYear()}`
    } else {
      return `${currentDate.getDate()} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    }
  }

  const renderMonthView = () => {
    const dates = getMonthDates()

    return (
      <div className="grid grid-cols-7 gap-px rounded-lg border bg-muted">
        {weekDaysShort.map((day, index) => (
          <div key={index} className="bg-background p-2 text-center text-sm font-medium text-muted-foreground">
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
                "group relative min-h-[100px] bg-background p-2 transition-colors hover:bg-accent/50",
                !isCurrentMonth && "text-muted-foreground",
                isTodayDate && "bg-primary/5",
              )}
              onClick={() => userType === "tutor" && openAddDialog(date)}
            >
              <div className="mb-2 flex items-center justify-between">
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full text-sm",
                    isTodayDate && "bg-primary text-primary-foreground font-semibold",
                  )}
                >
                  {date.getDate()}
                </div>
                {userType === "tutor" && (
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        openAddDialog(date)
                      }}
                      title="Додати заняття"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        openAddEventDialog(date)
                      }}
                      title="Додати подію"
                    >
                      <CalendarIcon className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                {daySessions.slice(0, 2).map((session) => (
                  <div
                    key={session.id}
                    className="cursor-pointer rounded-sm bg-primary/10 px-1.5 py-0.5 text-xs hover:bg-primary/20"
                    onClick={(e) => {
                      e.stopPropagation()
                      openViewDialog(session)
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" />
                      <span className="font-medium">{session.time}</span>
                    </div>
                    <div className="truncate text-[10px]">
                      {userType === "client" ? session.specialistName : session.clientName}
                    </div>
                  </div>
                ))}
                {dayEvents.slice(0, 3 - daySessions.slice(0, 2).length).map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      "cursor-pointer rounded-sm px-1.5 py-0.5 text-xs border-l-2",
                      getEventColor(event.type),
                    )}
                    onClick={(e) => {
                      e.stopPropagation()
                      openViewEventDialog(event)
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-2.5 w-2.5" />
                      <span className="font-medium">{event.time}</span>
                    </div>
                    <div className="truncate text-[10px]">{event.title}</div>
                  </div>
                ))}
                {daySessions.length + dayEvents.length > 3 && (
                  <div className="text-xs text-muted-foreground">+{daySessions.length + dayEvents.length - 3} ще</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderWeekView = () => {
    const weekDates = getWeekDates()
    const todayDate = isToday(currentDate) ? currentDate.getDay() : -1

    return (
      <div className="flex flex-col rounded-lg border">
        {/* Header with days */}
        <div className="grid grid-cols-8 border-b bg-muted/50">
          <div className="border-r p-2 text-xs text-muted-foreground">Час</div>
          {weekDates.map((date, index) => {
            const isTodayDate = isToday(date)
            return (
              <div
                key={index}
                className={cn("border-r p-2 text-center last:border-r-0", isTodayDate && "bg-primary/10")}
              >
                <div className="text-xs text-muted-foreground">{weekDays[date.getDay()]}</div>
                <div className={cn("mt-1 text-lg font-semibold", isTodayDate && "flex items-center justify-center")}>
                  {isTodayDate && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      {date.getDate()}
                    </span>
                  )}
                  {!isTodayDate && date.getDate()}
                </div>
              </div>
            )
          })}
        </div>

        {/* Time slots grid */}
        <div className="relative flex-1 overflow-auto" style={{ maxHeight: "calc(100vh - 300px)" }}>
          {/* Current time indicator */}
          {todayDate !== -1 && (
            <div
              className="pointer-events-none absolute left-0 right-0 z-10 border-t-2 border-red-500"
              style={{ top: `${getCurrentTimePosition()}%` }}
            >
              <div className="absolute -left-1 -top-1.5 h-3 w-3 rounded-full bg-red-500" />
            </div>
          )}

          <div className="grid grid-cols-8">
            {timeSlots.map((time, timeIndex) => (
              <div key={`row-${timeIndex}`} className="contents">
                <div
                  key={`time-${timeIndex}`}
                  className="border-b border-r p-2 text-xs text-muted-foreground"
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
                        "group relative border-b border-r p-1 transition-colors hover:bg-accent/30 last:border-r-0",
                        isTodayDate && "bg-primary/5",
                      )}
                      style={{ height: "60px" }}
                      onClick={() => userType === "tutor" && openAddDialog(date, time)}
                    >
                      {sessionsInSlot.map((session) => (
                        <div
                          key={session.id}
                          className="absolute inset-1 cursor-pointer overflow-hidden rounded-md border-l-4 border-primary bg-primary/20 p-1 hover:shadow-md"
                          style={{
                            height: `${(session.duration / 60) * 60 - 8}px`,
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            openViewDialog(session)
                          }}
                        >
                          <div className="text-xs font-medium">{session.time}</div>
                          <div className="truncate text-[10px]">
                            {userType === "client" ? session.specialistName : session.clientName}
                          </div>
                          <div className="truncate text-[9px] text-muted-foreground">{session.subject}</div>
                        </div>
                      ))}
                      {eventsInSlot.map((event, idx) => (
                        <div
                          key={event.id}
                          className={cn(
                            "absolute inset-1 cursor-pointer overflow-hidden rounded-md border-l-4 p-1 hover:shadow-md",
                            getEventColor(event.type),
                          )}
                          style={{
                            height: `${(event.duration / 60) * 60 - 8}px`,
                            left: sessionsInSlot.length > 0 ? "50%" : "4px",
                            right: "4px",
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            openViewEventDialog(event)
                          }}
                        >
                          <div className="text-xs font-medium">{event.time}</div>
                          <div className="truncate text-[10px]">{event.title}</div>
                          <div className="truncate text-[9px] text-muted-foreground">
                            {getEventTypeLabel(event.type)}
                          </div>
                        </div>
                      ))}
                      {userType === "tutor" && sessionsInSlot.length === 0 && eventsInSlot.length === 0 && (
                        <Plus className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
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

  const renderDayView = () => {
    const daySessions = getLessonsForDate(currentDate)
    const dayEvents = getEventsForDate(currentDate)
    const isTodayDate = isToday(currentDate)

    return (
      <div className="flex flex-col rounded-lg border">
        {/* Header */}
        <div className="border-b bg-muted/50 p-4">
          <div className="text-sm text-muted-foreground">{weekDays[currentDate.getDay()]}</div>
          <div className={cn("mt-1 text-2xl font-bold", isTodayDate && "text-primary")}>
            {currentDate.getDate()} {monthNames[currentDate.getMonth()]}
          </div>
        </div>

        {/* Time slots */}
        <div className="relative flex-1 overflow-auto" style={{ maxHeight: "calc(100vh - 300px)" }}>
          {/* Current time indicator */}
          {isTodayDate && (
            <div
              className="pointer-events-none absolute left-0 right-0 z-10 border-t-2 border-red-500"
              style={{ top: `${getCurrentTimePosition()}%` }}
            >
              <div className="absolute -left-1 -top-1.5 h-3 w-3 rounded-full bg-red-500" />
              <div className="ml-2 -mt-2.5 text-xs font-medium text-red-500">
                {currentTime.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          )}

          <div className="divide-y">
            {timeSlots.map((time, index) => {
              const sessionsInSlot = getLessonsForTimeSlot(currentDate, time)
              const eventsInSlot = getEventsForTimeSlot(currentDate, time)

              return (
                <div
                  key={index}
                  className="group relative flex transition-colors hover:bg-accent/30"
                  style={{ height: "80px" }}
                  onClick={() => userType === "tutor" && openAddDialog(currentDate, time)}
                >
                  <div className="w-20 border-r p-3 text-sm text-muted-foreground">{time}</div>
                  <div className="relative flex-1 p-2">
                    {sessionsInSlot.map((session) => (
                      <div
                        key={session.id}
                        className="mb-2 cursor-pointer rounded-lg border-l-4 border-primary bg-primary/10 p-3 hover:bg-primary/20 hover:shadow-md"
                        onClick={(e) => {
                          e.stopPropagation()
                          openViewDialog(session)
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">
                              {userType === "client" ? session.specialistName : session.clientName}
                            </div>
                            <div className="text-sm text-muted-foreground">{session.subject}</div>
                            {session.topic && <div className="mt-1 text-xs text-primary">{session.topic}</div>}
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-sm font-medium">
                              <Clock className="h-3 w-3" />
                              {session.time} ({session.duration} хв)
                            </div>
                            <Badge variant={session.format === "online" ? "default" : "secondary"} className="mt-1">
                              {session.format === "online" ? (
                                <>
                                  <Video className="mr-1 h-3 w-3" />
                                  Онлайн
                                </>
                              ) : (
                                <>
                                  <MapPin className="mr-1 h-3 w-3" />
                                  Офлайн
                                </>
                              )}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                    {eventsInSlot.map((event) => (
                      <div
                        key={event.id}
                        className={cn(
                          "mb-2 cursor-pointer rounded-lg border-l-4 p-3 hover:shadow-md",
                          getEventColor(event.type),
                        )}
                        onClick={(e) => {
                          e.stopPropagation()
                          openViewEventDialog(event)
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{event.title}</div>
                            <div className="text-sm text-muted-foreground">{getEventTypeLabel(event.type)}</div>
                            {event.description && <div className="mt-1 text-xs">{event.description}</div>}
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-sm font-medium">
                              <Clock className="h-3 w-3" />
                              {event.time} ({event.duration} хв)
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {userType === "tutor" && sessionsInSlot.length === 0 && eventsInSlot.length === 0 && (
                      <div className="flex h-full items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                        <Plus className="h-6 w-6 text-muted-foreground" />
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

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              {formatDateRange()}
            </CardTitle>

            <div className="flex flex-wrap items-center gap-2">
              {/* View mode tabs */}
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
                <TabsList>
                  <TabsTrigger value="day">День</TabsTrigger>
                  <TabsTrigger value="week">Тиждень</TabsTrigger>
                  <TabsTrigger value="month">Місяць</TabsTrigger>
                </TabsList>
              </Tabs>

              {userType === "tutor" && (
                <Button variant="outline" size="sm" onClick={() => openAddDialog(currentDate)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Додати
                </Button>
              )}

              <Button variant="outline" size="sm" onClick={goToToday}>
                Сьогодні
              </Button>

              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" onClick={previousPeriod}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextPeriod}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === "month" && renderMonthView()}
          {viewMode === "week" && renderWeekView()}
          {viewMode === "day" && renderDayView()}
        </CardContent>
      </Card>

      {/* View Lesson Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Деталі заняття</DialogTitle>
          </DialogHeader>
          {selectedLesson && (
            <div className="space-y-4 py-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-lg font-semibold">
                    {userType === "client" ? selectedLesson.specialistName : selectedLesson.clientName}
                  </div>
                  <div className="text-sm text-muted-foreground">{selectedLesson.subject}</div>
                </div>
                <Avatar className="h-12 w-12">
                  <AvatarFallback>
                    {userType === "client" ? selectedLesson.specialistName?.[0] : selectedLesson.clientName?.[0]}
                  </AvatarFallback>
                </Avatar>
              </div>

              {selectedLesson.topic && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Тема</div>
                  <div className="mt-1">{selectedLesson.topic}</div>
                </div>
              )}

              {selectedLesson.description && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Опис</div>
                  <div className="mt-1 text-sm">{selectedLesson.description}</div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Дата</div>
                  <div className="mt-1 flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    {new Date(selectedLesson.date).toLocaleDateString("uk-UA")}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Час</div>
                  <div className="mt-1 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {selectedLesson.time} ({selectedLesson.duration} хв)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={selectedLesson.format === "online" ? "default" : "secondary"}>
                  {selectedLesson.format === "online" ? (
                    <>
                      <Video className="mr-1 h-3 w-3" />
                      Онлайн
                    </>
                  ) : (
                    <>
                      <MapPin className="mr-1 h-3 w-3" />
                      Офлайн
                    </>
                  )}
                </Badge>
                <Badge
                  variant={selectedLesson.isPaid ? "outline" : "secondary"}
                  className={cn(selectedLesson.isPaid ? "text-green-600" : "text-yellow-600")}
                >
                  {selectedLesson.isPaid ? "Оплачено" : "Не оплачено"} • {selectedLesson.price} грн
                </Badge>
              </div>
            </div>
          )}
          <DialogFooter>
            {userType === "tutor" && (
              <>
                {selectedLesson && !selectedLesson.isPaid && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleMarkPaid(selectedLesson.id)
                      setIsViewDialogOpen(false)
                    }}
                  >
                    <DollarSign className="mr-2 h-4 w-4" />
                    Позначити оплаченим
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsViewDialogOpen(false)
                    openEditDialog(selectedLesson!)
                  }}
                >
                  Редагувати
                </Button>
                <Button variant="destructive" onClick={() => selectedLesson && handleDeleteLesson(selectedLesson.id)}>
                  Видалити
                </Button>
              </>
            )}
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Закрити
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Lesson Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Додати нове заняття</DialogTitle>
            <DialogDescription>Заповніть інформацію про нове заняття в розкладі</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Ім'я учня *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="Іван Петренко"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Предмет *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Англійська мова"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Дата *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Час *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Тривалість (хв)</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData({ ...formData, duration: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 хвилин</SelectItem>
                    <SelectItem value="45">45 хвилин</SelectItem>
                    <SelectItem value="60">60 хвилин</SelectItem>
                    <SelectItem value="90">90 хвилин</SelectItem>
                    <SelectItem value="120">120 хвилин</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="format">Формат</Label>
                <Select
                  value={formData.format}
                  onValueChange={(value: "online" | "offline") => setFormData({ ...formData, format: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Онлайн</SelectItem>
                    <SelectItem value="offline">Офлайн</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Ціна (грн)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Тема заняття</Label>
              <Input
                id="topic"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="Present Perfect Tense"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Опис</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Детальний опис плану заняття..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Скасувати
            </Button>
            <Button onClick={handleAddLesson}>Додати заняття</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Lesson Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Редагувати заняття</DialogTitle>
            <DialogDescription>Оновіть інформацію про заняття</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-time">Час</Label>
                <Input
                  id="edit-time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-duration">Тривалість (хв)</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData({ ...formData, duration: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 хвилин</SelectItem>
                    <SelectItem value="45">45 хвилин</SelectItem>
                    <SelectItem value="60">60 хвилин</SelectItem>
                    <SelectItem value="90">90 хвилин</SelectItem>
                    <SelectItem value="120">120 хвилин</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-format">Формат</Label>
                <Select
                  value={formData.format}
                  onValueChange={(value: "online" | "offline") => setFormData({ ...formData, format: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Онлайн</SelectItem>
                    <SelectItem value="offline">Офлайн</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-price">Ціна (грн)</Label>
              <Input
                id="edit-price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-topic">Тема заняття</Label>
              <Input
                id="edit-topic"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="Present Perfect Tense"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Опис</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Детальний опис плану заняття..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Скасувати
            </Button>
            <Button onClick={handleEditLesson}>Зберегти зміни</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Додати подію</DialogTitle>
            <DialogDescription>Створіть нову подію в розкладі</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="event-title">Назва події *</Label>
              <Input
                id="event-title"
                value={eventFormData.title}
                onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
                placeholder="Наприклад: Перерва на обід"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-type">Тип події *</Label>
              <Select
                value={eventFormData.type}
                onValueChange={(value: any) => setEventFormData({ ...eventFormData, type: value })}
              >
                <SelectTrigger id="event-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Особиста подія</SelectItem>
                  <SelectItem value="meeting">Зустріч</SelectItem>
                  <SelectItem value="reminder">Нагадування</SelectItem>
                  <SelectItem value="break">Перерва</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-description">Опис</Label>
              <Textarea
                id="event-description"
                value={eventFormData.description}
                onChange={(e) => setEventFormData({ ...eventFormData, description: e.target.value })}
                placeholder="Додаткова інформація..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event-date">Дата *</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={eventFormData.date}
                  onChange={(e) => setEventFormData({ ...eventFormData, date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-time">Час *</Label>
                <Input
                  id="event-time"
                  type="time"
                  value={eventFormData.time}
                  onChange={(e) => setEventFormData({ ...eventFormData, time: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-duration">Тривалість (хв)</Label>
              <Select
                value={eventFormData.duration}
                onValueChange={(value) => setEventFormData({ ...eventFormData, duration: value })}
              >
                <SelectTrigger id="event-duration">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 хв</SelectItem>
                  <SelectItem value="30">30 хв</SelectItem>
                  <SelectItem value="45">45 хв</SelectItem>
                  <SelectItem value="60">1 година</SelectItem>
                  <SelectItem value="90">1.5 години</SelectItem>
                  <SelectItem value="120">2 години</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEventDialogOpen(false)}>
              Скасувати
            </Button>
            <Button onClick={handleAddEvent}>Додати подію</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditEventDialogOpen} onOpenChange={setIsEditEventDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Редагувати подію</DialogTitle>
            <DialogDescription>Оновіть інформацію про подію</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-event-title">Назва події *</Label>
              <Input
                id="edit-event-title"
                value={eventFormData.title}
                onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-event-type">Тип події *</Label>
              <Select
                value={eventFormData.type}
                onValueChange={(value: any) => setEventFormData({ ...eventFormData, type: value })}
              >
                <SelectTrigger id="edit-event-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Особиста подія</SelectItem>
                  <SelectItem value="meeting">Зустріч</SelectItem>
                  <SelectItem value="reminder">Нагадування</SelectItem>
                  <SelectItem value="break">Перерва</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-event-description">Опис</Label>
              <Textarea
                id="edit-event-description"
                value={eventFormData.description}
                onChange={(e) => setEventFormData({ ...eventFormData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-event-time">Час *</Label>
                <Input
                  id="edit-event-time"
                  type="time"
                  value={eventFormData.time}
                  onChange={(e) => setEventFormData({ ...eventFormData, time: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-event-duration">Тривалість (хв)</Label>
                <Select
                  value={eventFormData.duration}
                  onValueChange={(value) => setEventFormData({ ...eventFormData, duration: value })}
                >
                  <SelectTrigger id="edit-event-duration">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 хв</SelectItem>
                    <SelectItem value="30">30 хв</SelectItem>
                    <SelectItem value="45">45 хв</SelectItem>
                    <SelectItem value="60">1 година</SelectItem>
                    <SelectItem value="90">1.5 години</SelectItem>
                    <SelectItem value="120">2 години</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditEventDialogOpen(false)}>
              Скасувати
            </Button>
            <Button variant="destructive" onClick={() => selectedEvent && handleDeleteEvent(selectedEvent.id)}>
              Видалити
            </Button>
            <Button onClick={handleEditEvent}>Зберегти</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewEventDialogOpen} onOpenChange={setIsViewEventDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>{selectedEvent && getEventTypeLabel(selectedEvent.type)}</DialogDescription>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-4">
              {selectedEvent.description && (
                <div>
                  <Label className="text-muted-foreground">Опис</Label>
                  <p className="mt-1 text-sm">{selectedEvent.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Дата</Label>
                  <p className="mt-1 text-sm font-medium">
                    {new Date(selectedEvent.date).toLocaleDateString("uk-UA", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Час</Label>
                  <p className="mt-1 text-sm font-medium">
                    {selectedEvent.time} ({selectedEvent.duration} хв)
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewEventDialogOpen(false)}>
              Закрити
            </Button>
            {userType === "tutor" && (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsViewEventDialogOpen(false)
                    selectedEvent && openEditEventDialog(selectedEvent)
                  }}
                >
                  Редагувати
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
