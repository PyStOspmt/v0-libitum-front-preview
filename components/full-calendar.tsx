"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useLessonStore, type Lesson, type CalendarEvent } from "@/lib/lesson-store"
import { useToast } from "@/hooks/use-toast"
import { CalendarHeader } from "./calendar/calendar-header"
import { MonthView } from "./calendar/month-view"
import { WeekView } from "./calendar/week-view"
import { DayView } from "./calendar/day-view"
import { MobileDayView } from "./calendar/mobile-day-view"
import { MobileWeekView } from "./calendar/mobile-week-view"
import { LessonDialogs, type LessonFormData } from "./calendar/lesson-dialogs"
import { EventDialogs, type EventFormData } from "./calendar/event-dialogs"

interface FullCalendarProps {
  userType: "client" | "tutor"
  userId: string
}

type ViewMode = "month" | "week" | "day"

export function FullCalendar({ userType, userId }: FullCalendarProps) {
  const { lessons, addLesson, updateLesson, deleteLesson, events, addEvent, updateEvent, deleteEvent } =
    useLessonStore()
  const { toast } = useToast()
  const calendarRef = useRef<HTMLDivElement>(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<ViewMode>("week")
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false)
  const [isEditEventDialogOpen, setIsEditEventDialogOpen] = useState(false)
  const [isViewEventDialogOpen, setIsViewEventDialogOpen] = useState(false)

  const [formData, setFormData] = useState<LessonFormData>({
    clientId: "",
    clientName: "",
    subject: "",
    date: "",
    time: "",
    duration: "60",
    format: "online" as "online" | "offline",
    topic: "",
    description: "",
    price: "400",
    isRecurring: false,
  })

  // Center view on the nearest lesson for this user (client or tutor)
  useEffect(() => {
    const userLessons = lessons.filter((lesson) =>
      userType === "client" ? lesson.clientId === userId : lesson.specialistId === userId
    )

    if (userLessons.length > 0) {
      const sortedLessons = userLessons
        .map((lesson) => new Date(`${lesson.date}T${lesson.time}`))
        .filter((date) => !isNaN(date.getTime()))
        .sort((a, b) => a.getTime() - b.getTime())

      const now = new Date()
      const upcomingLesson = sortedLessons.find((lesson) => lesson.getTime() > now.getTime())
      const targetDate = upcomingLesson || sortedLessons[sortedLessons.length - 1]

      if (targetDate) {
        const timer = setTimeout(() => setCurrentDate(targetDate), 0)
        return () => clearTimeout(timer)
      }
    }
  }, [lessons, userId, userType])

  // Mobile: start with Day view for better readability
  useEffect(() => {
    if (typeof window === "undefined") return
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      const timer = setTimeout(() => setViewMode("day"), 0)
      return () => clearTimeout(timer)
    }
  }, [])

  const [eventFormData, setEventFormData] = useState<EventFormData>({
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
    if (userType === "client") {
      return lessons.filter((lesson) => lesson.clientId === userId && lesson.date === dateStr)
    } else {
      return lessons.filter((lesson) => lesson.specialistId === userId && lesson.date === dateStr)
    }
  }

  const getLessonsForTimeSlot = (date: Date, timeSlot: string) => {
    const dateStr = date.toISOString().split("T")[0]
    return lessons.filter((lesson) => {
      if (lesson.date !== dateStr) return false
      const lessonHour = lesson.time.split(":")[0]
      const slotHour = timeSlot.split(":")[0]
      return lessonHour === slotHour && (
        userType === "client" ? lesson.clientId === userId : lesson.specialistId === userId
      )
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

  // Add event listener for day navigation from mobile views
  useEffect(() => {
    const handleNavigateToDay = (event: CustomEvent) => {
      setCurrentDate(event.detail)
      setViewMode("day")
    }

    window.addEventListener("navigateToDay", handleNavigateToDay as EventListener)
    return () => {
      window.removeEventListener("navigateToDay", handleNavigateToDay as EventListener)
    }
  }, [])

  // Add mobile swipe navigation only for Day view to avoid conflicts with horizontal scroll in Week/Month
  useEffect(() => {
    if (typeof window === "undefined") return
    const isMobile = window.innerWidth < 768
    if (!isMobile || viewMode !== "day") return

    let startX = 0
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
    }
    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX
      if (startX - endX > 50) {
        nextPeriod() // Swipe left for next period
      } else if (endX - startX > 50) {
        previousPeriod() // Swipe right for previous period
      }
    }
    const calendarEl = calendarRef.current
    if (calendarEl) {
      calendarEl.addEventListener("touchstart", handleTouchStart)
      calendarEl.addEventListener("touchend", handleTouchEnd)
    }
    return () => {
      if (calendarEl) {
        calendarEl.removeEventListener("touchstart", handleTouchStart)
        calendarEl.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [previousPeriod, nextPeriod, viewMode])

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
      clientId: `client-${crypto.randomUUID().split('-')[0]}`,
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
      clientId: lesson.clientId,
      clientName: lesson.clientName,
      subject: lesson.subject,
      date: lesson.date,
      time: lesson.time,
      duration: lesson.duration.toString(),
      format: lesson.format,
      topic: lesson.topic || "",
      description: lesson.description || "",
      price: lesson.price.toString(),
      isRecurring: false,
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
      clientId: "",
      clientName: "",
      subject: "",
      date: "",
      time: "",
      duration: "60",
      format: "online",
      topic: "",
      description: "",
      price: "400",
      isRecurring: false,
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

  return (
    <>
      <Card className="border-none shadow-none bg-transparent mt-4 lg:mt-6" ref={calendarRef}>
        <CalendarHeader
          viewMode={viewMode}
          setViewMode={setViewMode}
          currentDate={currentDate}
          formatDateRange={formatDateRange}
          goToToday={goToToday}
          previousPeriod={previousPeriod}
          nextPeriod={nextPeriod}
          userType={userType}
          onAddClick={() => openAddDialog(currentDate)}
        />
        <CardContent className="p-0 pt-4 lg:pt-6">
              <div className="w-full overflow-x-auto scrollbar-hide">
                <div className="min-h-[400px] lg:min-h-[600px] min-w-[320px] sm:min-w-[400px] md:min-w-[600px] lg:min-w-[800px]">
              {viewMode === "month" && (
                <MonthView
                  dates={getMonthDates()}
                  weekDaysShort={weekDaysShort}
                  getLessonsForDate={getLessonsForDate}
                  getEventsForDate={getEventsForDate}
                  isToday={isToday}
                  isSameMonth={isSameMonth}
                  userType={userType}
                  onAddLesson={openAddDialog}
                  onAddEvent={openAddEventDialog}
                  onViewLesson={openViewDialog}
                  onViewEvent={openViewEventDialog}
                  getEventColor={getEventColor}
                />
              )}
              {viewMode === "week" && (
                <>
                  {/* Mobile Week View */}
                  <div className="block md:hidden">
                    <MobileWeekView
                      currentDate={currentDate}
                      weekDays={weekDays}
                      monthNames={monthNames}
                      lessons={lessons.filter((lesson) =>
                        userType === "client" ? lesson.clientId === userId : lesson.specialistId === userId
                      )}
                      events={events.filter((event) => event.userId === userId)}
                      isToday={isToday}
                      userType={userType}
                      onViewLesson={openViewDialog}
                      onViewEvent={openViewEventDialog}
                    />
                  </div>
                  {/* Desktop Week View */}
                  <div className="hidden md:block">
                    <WeekView
                      weekDates={getWeekDates()}
                      weekDaysShort={weekDaysShort}
                      timeSlots={timeSlots}
                      currentDate={currentDate}
                      currentTime={currentTime}
                      isToday={isToday}
                      getLessonsForTimeSlot={getLessonsForTimeSlot}
                      getEventsForTimeSlot={getEventsForTimeSlot}
                      userType={userType}
                      onAddClick={openAddDialog}
                      onViewLesson={openViewDialog}
                      onViewEvent={openViewEventDialog}
                      getEventColor={getEventColor}
                      getEventTypeLabel={getEventTypeLabel}
                      getCurrentTimePosition={getCurrentTimePosition}
                    />
                  </div>
                </>
              )}
              {viewMode === "day" && (
                <>
                  {/* Mobile Day View */}
                  <div className="block md:hidden">
                    <MobileDayView
                      currentDate={currentDate}
                      weekDays={weekDays}
                      monthNames={monthNames}
                      lessons={lessons.filter((lesson) =>
                        userType === "client" ? lesson.clientId === userId : lesson.specialistId === userId
                      )}
                      events={events.filter((event) => event.userId === userId)}
                      isToday={isToday}
                      userType={userType}
                      onViewLesson={openViewDialog}
                      onViewEvent={openViewEventDialog}
                    />
                  </div>
                  {/* Desktop Day View */}
                  <div className="hidden md:block">
                    <DayView
                      currentDate={currentDate}
                      currentTime={currentTime}
                      weekDays={weekDays}
                      monthNames={monthNames}
                      timeSlots={timeSlots}
                      isToday={isToday}
                      getLessonsForTimeSlot={getLessonsForTimeSlot}
                      getEventsForTimeSlot={getEventsForTimeSlot}
                      userType={userType}
                      onAddClick={openAddDialog}
                      onViewLesson={openViewDialog}
                      onViewEvent={openViewEventDialog}
                      getEventColor={getEventColor}
                      getEventTypeLabel={getEventTypeLabel}
                      getCurrentTimePosition={getCurrentTimePosition}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <LessonDialogs
        userType={userType}
        isAddOpen={isAddDialogOpen}
        setIsAddOpen={setIsAddDialogOpen}
        isEditOpen={isEditDialogOpen}
        setIsEditOpen={setIsEditDialogOpen}
        isViewOpen={isViewDialogOpen}
        setIsViewOpen={setIsViewDialogOpen}
        selectedLesson={selectedLesson}
        formData={formData}
        setFormData={setFormData}
        onAdd={handleAddLesson}
        onEdit={handleEditLesson}
        onDelete={handleDeleteLesson}
        onMarkPaid={handleMarkPaid}
        onOpenEdit={openEditDialog}
      />

      <EventDialogs
        userType={userType}
        isAddOpen={isAddEventDialogOpen}
        setIsAddOpen={setIsAddEventDialogOpen}
        isEditOpen={isEditEventDialogOpen}
        setIsEditOpen={setIsEditEventDialogOpen}
        isViewOpen={isViewEventDialogOpen}
        setIsViewOpen={setIsViewEventDialogOpen}
        selectedEvent={selectedEvent}
        formData={eventFormData}
        setFormData={setEventFormData}
        onAdd={handleAddEvent}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
        onOpenEdit={openEditEventDialog}
        getEventTypeLabel={getEventTypeLabel}
      />
    </>
  )
}
