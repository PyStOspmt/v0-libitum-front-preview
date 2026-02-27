"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, Video, MapPin, User, DollarSign, FileText, Star, ExternalLink, Target, CheckCircle2 } from "lucide-react"
import type { Lesson } from "@/lib/lesson-store"
import { useGoalStore } from "@/lib/goal-store"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface LessonDetailsDialogProps {
  lesson: Lesson | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LessonDetailsDialog({ lesson, open, onOpenChange }: LessonDetailsDialogProps) {
  const { toast } = useToast()
  const { getGoalByLesson, getProgress } = useGoalStore()
  
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

  const goal = getGoalByLesson(lesson.id)
  const progress = getProgress(lesson.id)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
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

          {/* Цілі та субцілі */}
          {goal && goal.title && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-800">
                  <Target className="h-5 w-5 text-[#00c5a6]" />
                  <h3 className="font-semibold text-lg">{goal.title}</h3>
                </div>
                <span className="text-sm font-medium text-[#00c5a6] bg-[#e8fffb] px-2 py-1 rounded-md">
                  {progress.percentage}%
                </span>
              </div>
              
              <Progress value={progress.percentage} className="h-2 bg-slate-100 [&>div]:bg-[#00c5a6]" />
              
              {goal.subGoals.length > 0 && (
                <div className="space-y-2 mt-4">
                  {goal.subGoals.map((subGoal) => (
                    <div 
                      key={subGoal.id} 
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                        subGoal.completed 
                          ? 'bg-slate-50 border-transparent' 
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className={`flex items-center justify-center h-5 w-5 rounded-full border-2 shrink-0 ${
                        subGoal.completed 
                          ? 'bg-[#00c5a6] border-[#00c5a6]' 
                          : 'border-slate-300'
                      }`}>
                        {subGoal.completed && <CheckCircle2 className="h-3 w-3 text-white" />}
                      </div>
                      <span className={`text-sm font-medium ${
                        subGoal.completed ? 'text-slate-500 line-through' : 'text-slate-700'
                      }`}>
                        {subGoal.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Оплата */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
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
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-slate-800">
                <Star className="h-5 w-5 text-amber-500 fill-current" />
                <h3 className="font-semibold text-lg">Звіт та оцінка</h3>
              </div>
              
              <div className="space-y-3 bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Загальна оцінка</span>
                  <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-md shadow-sm border border-amber-200">
                    <Star className="h-4 w-4 text-amber-500 fill-current" />
                    <span className="font-bold text-slate-800">{lesson.report.performance}</span>
                    <span className="text-slate-400 text-xs">/5</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Поведінка та активність</span>
                  <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-md shadow-sm border border-slate-200">
                    <span className="font-bold text-slate-800">{lesson.report.behavior}</span>
                    <span className="text-slate-400 text-xs">/5</span>
                  </div>
                </div>

                {lesson.report.tag && (
                  <div className="pt-2">
                    <span className="text-xs font-medium text-slate-500 block mb-1.5">Тег заняття</span>
                    <Badge variant="outline" className={cn(
                      "px-3 py-1 font-medium border", 
                      lesson.report.tag.color || "bg-blue-50 text-blue-700 border-blue-200"
                    )}>
                      {lesson.report.tag.text}
                    </Badge>
                  </div>
                )}
                
                {lesson.report.comment && (
                  <div className="pt-2 border-t border-amber-200/50 mt-2">
                    <span className="text-xs font-medium text-slate-500 block mb-1">Коментар репетитора</span>
                    <p className="text-sm text-slate-700 leading-relaxed italic">"{lesson.report.comment}"</p>
                  </div>
                )}
              </div>
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
