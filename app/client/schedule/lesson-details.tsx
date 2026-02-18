"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video, MapPin, User, DollarSign, FileText, Star, ExternalLink } from "lucide-react"
import type { Lesson } from "@/lib/lesson-store"
import { useToast } from "@/hooks/use-toast"

interface LessonDetailsDialogProps {
  lesson: Lesson | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LessonDetailsDialog({ lesson, open, onOpenChange }: LessonDetailsDialogProps) {
  const { toast } = useToast()
  
  if (!lesson) return null

  const format = lesson.format === "online" ? "Онлайн" : "Офлайн"
  const statusColors = {
    scheduled: "bg-blue-100 text-blue-700 border-blue-200",
    completed: "bg-green-100 text-green-700 border-green-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
    missed: "bg-orange-100 text-orange-700 border-orange-200"
  }

  const statusLabels = {
    scheduled: "Заплановано",
    completed: "Завершено",
    cancelled: "Скасовано",
    missed: "Пропущено"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Деталі заняття
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Основна інформація */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-slate-800">{lesson.subject}</h3>
              <p className="text-slate-600">{lesson.topic}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge className={statusColors[lesson.status]}>
                {statusLabels[lesson.status]}
              </Badge>
              <Badge 
                className={`rounded-full ${
                  lesson.subject === "Психологія" 
                    ? "bg-orange-100 text-orange-700 border-orange-200" 
                    : lesson.format === "online" 
                      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                      : "bg-blue-100 text-blue-700 border-blue-200"
                }`}
              >
                {lesson.format === "online" ? (
                  <><Video className="h-3 w-3 mr-1" /> {format}</>
                ) : (
                  <><MapPin className="h-3 w-3 mr-1" /> {format}</>
                )}
              </Badge>
            </div>
          </div>

          {/* Інформація про спеціаліста */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-600">
              <User className="h-4 w-4" />
              <span className="font-medium">Спеціаліст:</span>
            </div>
            <div className="ml-6">
              <p className="font-medium text-slate-800">{lesson.specialistName}</p>
            </div>
          </div>

          {/* Час та місце */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-slate-600" />
              <div>
                <p className="text-sm text-slate-600">Дата</p>
                <p className="font-medium">
                  {new Date(lesson.date).toLocaleDateString('uk-UA', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric',
                    weekday: 'long'
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-slate-600" />
              <div>
                <p className="text-sm text-slate-600">Час</p>
                <p className="font-medium">{lesson.time} ({lesson.duration} хв)</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {lesson.format === "online" ? (
                <Video className="h-4 w-4 text-emerald-600" />
              ) : (
                <MapPin className="h-4 w-4 text-blue-600" />
              )}
              <div>
                <p className="text-sm text-slate-600">Формат</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{format}</p>
                  {lesson.format === "online" && lesson.meetingUrl && (
                    <Button variant="outline" size="sm" onClick={() => window.open(lesson.meetingUrl, '_blank')}>
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Відкрити посилання
                    </Button>
                  )}
                </div>
                {lesson.format === "offline" && lesson.location && (
                  <p className="text-sm text-slate-600">{lesson.location}</p>
                )}
              </div>
            </div>
          </div>

          {/* Оплата */}
          <div className="flex items-center gap-3">
            <DollarSign className="h-4 w-4 text-slate-600" />
            <div>
              <p className="text-sm text-slate-600">Вартість</p>
              <p className="font-medium">{lesson.price} грн</p>
              <p className={`text-xs ${lesson.isPaid ? 'text-green-600' : 'text-orange-600'}`}>
                {lesson.isPaid ? 'Оплачено' : 'Очікує оплати'}
              </p>
            </div>
          </div>

          {/* Додатково */}
          {lesson.description && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-600">
                <FileText className="h-4 w-4" />
                <span className="font-medium">Опис:</span>
              </div>
              <p className="ml-6 text-sm text-slate-600">{lesson.description}</p>
            </div>
          )}

          {/* Оцінка (якщо є) */}
          {lesson.report && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4 text-emerald-600" />
                <span className="font-medium">{format}</span>
                {lesson.format === "online" && lesson.meetingUrl && (
                  <Button variant="outline" size="sm" onClick={() => window.open(lesson.meetingUrl, '_blank')}>
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Відкрити посилання
                  </Button>
                )}
              </div>
              <div className="ml-6 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-500 fill-current" />
                  <span className="font-medium">{lesson.report.performance}/5</span>
                </div>
                <div className="text-sm text-slate-600">
                  Поведінка: {lesson.report.behavior}/5
                </div>
              </div>
              {lesson.report.comment && (
                <p className="ml-6 text-sm text-slate-600 mt-2">{lesson.report.comment}</p>
              )}
            </div>
          )}

          {/* Кнопки дій */}
          <div className="flex gap-2 pt-4 border-t">
            {lesson.status === "scheduled" && (
              <>
                {lesson.format === "online" && lesson.meetingUrl && (
                  <Button className="flex-1" onClick={() => window.open(lesson.meetingUrl, '_blank')}>
                    <Video className="h-4 w-4 mr-2" />
                    Приєднатись
                  </Button>
                )}
                <Button variant="outline" className="flex-1">
                  Перенести
                </Button>
                <Button variant="destructive" className="flex-1">
                  Скасувати
                </Button>
              </>
            )}
            {lesson.status === "completed" && !lesson.isPaid && (
              <Button className="w-full" onClick={() => {
                toast({
                  title: "Функціонал оплати",
                  description: "Функціонал оплати буде реалізовано в найближчому оновленні",
                  variant: "destructive",
                })
              }}>
                Оплатити {lesson.price} грн
              </Button>
            )}
            {lesson.status === "completed" && (
              <Button variant="outline" className="w-full">
                Записатись ще
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
