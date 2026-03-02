"use client"

import { useToast } from "@/hooks/use-toast"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, DollarSign, Download, MapPin, Plus, Video } from "lucide-react"
import { useState } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { type Lesson, useLessonStore } from "@/lib/lesson-store"
import { cn } from "@/lib/utils"

interface AdvancedCalendarProps {
    userType: "client" | "tutor"
    userId: string
}

export function AdvancedCalendar({ userType, userId }: AdvancedCalendarProps) {
    const { lessons, addLesson, updateLesson } = useLessonStore()
    const { toast } = useToast()
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

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
        return lessons.filter((lesson) => lesson.date === dateStr)
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
            clientId: `client-${crypto.randomUUID().split("-")[0]}`,
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

    const handleMarkPaid = (lessonId: string) => {
        updateLesson(lessonId, { isPaid: true })
        toast({
            title: "Оплата підтверджена",
            description: "Заняття відмічено як оплачене",
        })
    }

    const openAddDialog = (date: Date) => {
        setSelectedDate(date)
        setFormData({
            ...formData,
            date: date.toISOString().split("T")[0],
        })
        setIsAddDialogOpen(true)
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

    const exportToGoogleCalendar = () => {
        toast({
            title: "Експорт розкладу",
            description: "Функція експорту буде доступна найближчим часом",
        })
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <CalendarIcon className="h-5 w-5" />
                            Календар занять
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            {userType === "tutor" && (
                                <>
                                    <Button variant="outline" size="sm" onClick={exportToGoogleCalendar}>
                                        <Download className="mr-2 h-4 w-4" />
                                        Експорт
                                    </Button>
                                </>
                            )}
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
                                            "min-h-[250px] rounded-lg border p-2",
                                            isTodayDate && "border-primary bg-primary/5",
                                        )}
                                    >
                                        <div className="mb-2 flex items-center justify-between">
                                            <div className="text-center">
                                                <div className="text-xs text-muted-foreground">{weekDays[index]}</div>
                                                <div
                                                    className={cn(
                                                        "mt-1 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                                                        isTodayDate && "bg-primary text-primary-foreground",
                                                    )}
                                                >
                                                    {date.getDate()}
                                                </div>
                                            </div>
                                            {userType === "tutor" && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6"
                                                    onClick={() => openAddDialog(date)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            {daySessions.map((session) => (
                                                <div
                                                    key={session.id}
                                                    className="group cursor-pointer rounded-md border bg-card p-2 text-xs transition-shadow hover:shadow-md"
                                                    onClick={() => userType === "tutor" && openEditDialog(session)}
                                                >
                                                    <div className="mb-1 flex items-center justify-between">
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-3 w-3 text-muted-foreground" />
                                                            <span className="font-medium">{session.time}</span>
                                                        </div>
                                                        {!session.isPaid && userType === "tutor" && (
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100"
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    handleMarkPaid(session.id)
                                                                }}
                                                            >
                                                                <DollarSign className="h-3 w-3 text-yellow-500" />
                                                            </Button>
                                                        )}
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
                                                            {userType === "client"
                                                                ? session.specialistName
                                                                : session.clientName}
                                                        </span>
                                                    </div>
                                                    <p className="mb-1 truncate text-[10px] text-muted-foreground">
                                                        {session.subject}
                                                    </p>
                                                    {session.topic && (
                                                        <p className="mb-1 truncate text-[9px] font-medium text-primary">
                                                            {session.topic}
                                                        </p>
                                                    )}
                                                    <div className="flex items-center justify-between">
                                                        <Badge
                                                            variant={session.format === "online" ? "default" : "secondary"}
                                                            className="h-4 text-[9px]"
                                                        >
                                                            {session.format === "online" ? (
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
                                                        {session.isPaid ? (
                                                            <Badge variant="outline" className="h-4 text-[9px] text-green-600">
                                                                Оплачено
                                                            </Badge>
                                                        ) : (
                                                            <Badge variant="outline" className="h-4 text-[9px] text-yellow-600">
                                                                Не оплачено
                                                            </Badge>
                                                        )}
                                                    </div>
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
                            <div className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3 text-green-600" />
                                <span>Оплачено</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

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

                        <div className="space-y-2">
                            <Label htmlFor="edit-price">Ціна (грн)</Label>
                            <Input
                                id="edit-price"
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
        </>
    )
}
