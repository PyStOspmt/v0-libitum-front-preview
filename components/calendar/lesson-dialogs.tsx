import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Video, Clock, Calendar, DollarSign, Target, Plus, Trash2, CheckCircle2, Circle, Calendar as CalendarIcon, RepeatIcon, Edit2, FileText, Paperclip, UploadCloud } from "lucide-react"
import { useGoalStore } from "@/lib/goal-store"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import type { Lesson } from "@/lib/lesson-store"
import { useRequestStore } from "@/lib/request-store"
import { useAuthContext } from "@/features/auth/context/auth-context"

const isExternalUrl = (value: string) => /^https?:\/\//i.test(value)

export interface LessonFormData {
  clientId: string
  clientName: string
  subject: string
  date: string
  time: string
  duration: string
  format: "online" | "offline"
  location?: string
  meetingUrl?: string
  topic?: string
  description?: string
  price: string
  isRecurring: boolean
  recurrenceRule?: string
}

interface LessonDialogsProps {
  userType: "client" | "tutor"
  isAddOpen: boolean
  setIsAddOpen: (open: boolean) => void
  isEditOpen: boolean
  setIsEditOpen: (open: boolean) => void
  isViewOpen: boolean
  setIsViewOpen: (open: boolean) => void
  selectedLesson: Lesson | null
  formData: LessonFormData
  setFormData: (data: LessonFormData) => void
  onAdd: () => void
  onEdit: () => void
  onDelete: (id: string) => void
  onMarkPaid: (id: string) => void
  onOpenEdit: (lesson: Lesson) => void
}

export function LessonDialogs({
  userType,
  isAddOpen,
  setIsAddOpen,
  isEditOpen,
  setIsEditOpen,
  isViewOpen,
  setIsViewOpen,
  selectedLesson,
  formData,
  setFormData,
  onAdd,
  onEdit,
  onDelete,
  onMarkPaid,
  onOpenEdit,
}: LessonDialogsProps) {
  const { getStudentsByTutor } = useRequestStore()
  const { user } = useAuthContext()
  const tutorId = user?.id || "specialist-1"
  const tutorStudents = useMemo(() => getStudentsByTutor(tutorId).filter(s => s.status === "active"), [getStudentsByTutor, tutorId])
  const lessonHomeworks = selectedLesson?.homework?.attachments || []
  const lessonSubmittedFiles = selectedLesson?.homework?.submittedFiles || []
  const lessonMaterials = selectedLesson?.materials || []

  const handleStudentSelect = (studentId: string) => {
    const student = tutorStudents.find(s => s.id === studentId)
    if (student) {
      setFormData({
        ...formData,
        clientId: student.id,
        clientName: student.name,
        subject: student.subject,
      })
    }
  }

  return (
    <>
      {/* View Lesson Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-[800px] p-0 overflow-hidden rounded-[24px] font-sans border-slate-200/80 max-h-[90vh] flex flex-col bg-[#f8f9fb]">
          <DialogHeader className="sr-only">
            <DialogTitle>
              {selectedLesson
                ? `Деталі заняття: ${userType === "client" ? selectedLesson.specialistName : selectedLesson.clientName}`
                : "Деталі заняття"}
            </DialogTitle>
            <DialogDescription>
              Перегляд інформації про заняття, домашнє завдання, матеріали та оплату.
            </DialogDescription>
          </DialogHeader>
          {selectedLesson && (
            <>
              {/* Header Banner */}
              <div className="bg-white border-b border-slate-200/80 p-5 sm:p-6 flex-shrink-0 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Avatar className="h-16 w-16 sm:h-20 sm:w-20 rounded-[16px] border-4 border-white shadow-md shrink-0">
                      {selectedLesson.photoUrl && <AvatarImage src={selectedLesson.photoUrl} alt={selectedLesson.specialistName || selectedLesson.clientName} className="rounded-[12px] object-cover" />}
                      <AvatarFallback className="bg-slate-100 text-[#121117] font-[700] text-[24px] rounded-[12px]">
                        {userType === "client" ? selectedLesson.specialistName?.[0] : selectedLesson.clientName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className={cn("px-2.5 py-0.5 text-[12px] font-[600] border-0 rounded-full", selectedLesson.subject === "Психологія" ? "bg-orange-100 text-orange-700" : "bg-emerald-100 text-emerald-700")}>{selectedLesson.subject}</Badge>
                        <span className="text-[12px] font-[500] text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          {selectedLesson.format === "online" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                          {selectedLesson.format === "online" ? "Онлайн" : "Офлайн"}
                        </span>
                        <Badge variant="outline" className={`border-0 rounded-full px-2.5 py-0.5 text-[12px] font-[600] ${selectedLesson.isPaid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {selectedLesson.isPaid ? "Оплачено" : "Не оплачено"}
                        </Badge>
                      </div>
                      <div>
                        <h2 className="text-[20px] sm:text-[24px] font-bold text-[#121117] leading-tight truncate">
                          {userType === "client" ? selectedLesson.specialistName : selectedLesson.clientName}
                        </h2>
                        <p className="text-[14px] text-slate-500 mt-0.5 font-[500] truncate">
                          {selectedLesson.topic || "Тема не вказана"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge Top Right */}
                  <div className="hidden sm:block shrink-0">
                    <Badge variant="outline" className={`border-0 rounded-[10px] px-3 py-1.5 text-[13px] font-[600] shadow-sm ${selectedLesson.status === "completed" || selectedLesson.status === "trial_completed"
                      ? "bg-white text-emerald-600 border-emerald-100"
                      : selectedLesson.status === "scheduled"
                        ? "bg-white text-blue-600 border-blue-100"
                        : selectedLesson.status === "cancelled"
                          ? "bg-white text-red-600 border-red-100"
                          : "bg-white text-slate-600 border-slate-200"
                      }`}>
                      {selectedLesson.status === "completed" || selectedLesson.status === "trial_completed"
                        ? "Завершено"
                        : selectedLesson.status === "scheduled"
                          ? "Заплановано"
                          : selectedLesson.status === "cancelled"
                            ? "Скасовано"
                            : "Невідомо"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-white p-3 sm:p-4 rounded-[16px] border border-slate-200/60 shadow-sm flex flex-col items-center justify-center text-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center">
                      <CalendarIcon className="h-4 w-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-[12px] font-[600] text-slate-400 uppercase tracking-wider mb-0.5">Дата</p>
                      <p className="text-[14px] font-[700] text-[#121117] whitespace-nowrap">{new Date(selectedLesson.date).toLocaleDateString("uk-UA", { day: "2-digit", month: "short" })}</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 sm:p-4 rounded-[16px] border border-slate-200/60 shadow-sm flex flex-col items-center justify-center text-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-[12px] font-[600] text-slate-400 uppercase tracking-wider mb-0.5">Час</p>
                      <p className="text-[14px] font-[700] text-[#121117] whitespace-nowrap">{selectedLesson.time} <span className="text-slate-400 font-[500] text-[12px]">({selectedLesson.duration} хв)</span></p>
                    </div>
                  </div>

                  <div className="bg-white p-3 sm:p-4 rounded-[16px] border border-slate-200/60 shadow-sm flex flex-col items-center justify-center text-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-[12px] font-[600] text-slate-400 uppercase tracking-wider mb-0.5">Вартість</p>
                      <p className="text-[14px] font-[700] text-[#121117] whitespace-nowrap">{selectedLesson.price} ₴</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 sm:p-4 rounded-[16px] border border-slate-200/60 shadow-sm flex flex-col items-center justify-center text-center gap-2 overflow-hidden">
                    <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                      {selectedLesson.format === "online" ? <Video className="h-4 w-4 text-slate-500" /> : <MapPin className="h-4 w-4 text-slate-500" />}
                    </div>
                    <div className="w-full min-w-0">
                      <p className="text-[11px] sm:text-[12px] font-[600] text-slate-400 uppercase tracking-wider mb-0.5">Місце</p>
                      <p className="text-[13px] sm:text-[14px] font-[600] text-[#121117] truncate px-1" title={selectedLesson.format === "online" ? selectedLesson.meetingUrl : selectedLesson.location}>
                        {selectedLesson.format === "online" ? "Zoom / Meet" : (selectedLesson.location || "Адреса")}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedLesson.description && (
                  <div className="bg-white p-4 sm:p-5 rounded-[16px] border border-slate-200/60 shadow-sm">
                    <h3 className="text-[15px] font-[700] text-[#121117] mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-slate-400" />
                      Опис заняття
                    </h3>
                    <p className="text-[14px] text-slate-600 leading-relaxed break-words">{selectedLesson.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-200/60 shadow-sm rounded-[16px] p-4 sm:p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                          <FileText className="h-4 w-4 text-emerald-600" />
                        </div>
                        <h4 className="text-[15px] font-bold text-[#121117] truncate">Домашнє завдання</h4>
                      </div>
                      {selectedLesson.homework ? (
                        <Badge variant="outline" className="border-0 bg-slate-100 text-slate-700 shrink-0 text-[11px] px-2 py-0.5">
                          {selectedLesson.homework.status === "checked" ? "Перевірено" : selectedLesson.homework.status === "submitted" ? "На перевірці" : "Активне"}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-slate-50 text-slate-500 border-0 shrink-0 text-[11px] px-2 py-0.5">Немає</Badge>
                      )}
                    </div>

                    {selectedLesson.homework ? (
                      <>
                        <div className="rounded-[12px] bg-slate-50 p-3">
                          <p className="text-[14px] font-[600] text-[#121117]">{selectedLesson.homework.title}</p>
                          <p className="mt-1 text-[13px] text-slate-600 break-words">{selectedLesson.homework.description}</p>
                          <p className="mt-2 text-[12px] text-slate-500">Здати до {new Date(selectedLesson.homework.dueDate).toLocaleDateString("uk-UA")}</p>
                        </div>

                        {lessonHomeworks.length > 0 && (
                          <div>
                            <p className="mb-2 text-[12px] font-[700] uppercase tracking-[0.08em] text-slate-500">Матеріали до ДЗ</p>
                            <div className="flex flex-wrap gap-2">
                              {lessonHomeworks.map((file, idx) => {
                                const isLink = file.type === "link" && isExternalUrl(file.name)

                                return isLink ? (
                                  <a key={idx} href={file.name} target="_blank" rel="noopener noreferrer" className="inline-flex max-w-full items-center gap-2 rounded-[8px] border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-[500] text-[#121117] hover:border-[#00c5a6] hover:text-[#00c5a6]">
                                    <Paperclip className="h-4 w-4 shrink-0 text-blue-500" />
                                    <span className="truncate max-w-[220px]">{file.name}</span>
                                  </a>
                                ) : (
                                  <div key={idx} className="inline-flex max-w-full items-center gap-2 rounded-[8px] border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-[500] text-[#121117]">
                                    <Paperclip className="h-4 w-4 shrink-0 text-emerald-500" />
                                    <span className="truncate max-w-[220px]">{file.name}</span>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        {lessonSubmittedFiles.length > 0 && (
                          <div>
                            <p className="mb-2 text-[12px] font-[700] uppercase tracking-[0.08em] text-slate-500">
                              {userType === "tutor" ? "Файли учня" : "Мої завантаження"}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {lessonSubmittedFiles.map((file, idx) => {
                                const isLink = isExternalUrl(file)

                                return isLink ? (
                                  <a key={idx} href={file} target="_blank" rel="noopener noreferrer" className="inline-flex max-w-full items-center gap-2 rounded-[8px] border border-blue-200 bg-blue-50/50 px-3 py-1.5 text-[13px] font-[500] text-[#121117] hover:text-blue-600">
                                    <Paperclip className="h-4 w-4 shrink-0 text-blue-500" />
                                    <span className="truncate max-w-[220px]">{file}</span>
                                  </a>
                                ) : (
                                  <div key={idx} className="inline-flex max-w-full items-center gap-2 rounded-[8px] border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-[500] text-[#121117]">
                                    <Paperclip className="h-4 w-4 shrink-0 text-emerald-500" />
                                    <span className="truncate max-w-[220px]">{file}</span>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-[13px] text-slate-500">Домашнє завдання для цього уроку ще не додано.</p>
                    )}
                  </div>

                  <div className="bg-white border border-slate-200/60 shadow-sm rounded-[16px] p-4 sm:p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                          <Paperclip className="h-4 w-4 text-blue-600" />
                        </div>
                        <h4 className="text-[15px] font-bold text-[#121117] truncate">Матеріали до уроку</h4>
                      </div>
                      <Badge variant="outline" className="bg-slate-50 text-slate-500 border-0 shrink-0 text-[11px] px-2 py-0.5">
                        {lessonMaterials.length > 0 ? `${lessonMaterials.length} шт.` : "Немає"}
                      </Badge>
                    </div>

                    {lessonMaterials.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {lessonMaterials.map((material, idx) => {
                          const isLink = isExternalUrl(material)

                          return isLink ? (
                            <a key={idx} href={material} target="_blank" rel="noopener noreferrer" className="inline-flex max-w-full items-center gap-2 rounded-[8px] border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-[500] text-[#121117] hover:border-blue-300 hover:text-blue-600">
                              <Paperclip className="h-4 w-4 shrink-0 text-blue-500" />
                              <span className="truncate max-w-[220px]">{material}</span>
                            </a>
                          ) : (
                            <div key={idx} className="inline-flex max-w-full items-center gap-2 rounded-[8px] border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-[500] text-[#121117]">
                              <Paperclip className="h-4 w-4 shrink-0 text-blue-500" />
                              <span className="truncate max-w-[220px]">{material}</span>
                            </div>
                          )
                        })}
                      </div>
                    ) : userType === "tutor" ? (
                      <div className="flex-1 rounded-[12px] border border-dashed border-slate-300 p-4 flex flex-col items-center justify-center text-center min-h-[100px] bg-slate-50/50">
                        <div className="h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                          <UploadCloud className="h-4 w-4 text-slate-400" />
                        </div>
                        <p className="text-[13px] font-[600] text-[#121117]">Матеріали ще не додані</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Після додавання вони з’являться тут для швидкого перегляду.</p>
                      </div>
                    ) : (
                      <p className="text-[13px] text-slate-500">Викладач ще не додав матеріали до цього уроку.</p>
                    )}
                  </div>
                </div>

                {/* Goals Section - Only for tutor */}
                {userType === "tutor" && (
                  <div className="space-y-5">
                    <LessonGoalsSection lessonId={selectedLesson.id} />
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className="bg-white border-t border-slate-200/80 p-4 sm:p-5 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex w-full sm:w-auto flex-wrap gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 sm:flex-none h-[44px] px-5 rounded-[10px] border-slate-200 text-slate-700 hover:bg-slate-50 font-[600] text-[14px]"
                    onClick={() => {
                      setIsViewOpen(false)
                      if (selectedLesson) onOpenEdit(selectedLesson)
                    }}
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Редагувати
                  </Button>

                  {selectedLesson.status === "scheduled" && (
                    <Button
                      variant="ghost"
                      className="flex-1 sm:flex-none h-[44px] px-5 rounded-[10px] text-red-600 hover:bg-red-50 hover:text-red-700 font-[600] text-[14px]"
                      onClick={() => selectedLesson && onDelete(selectedLesson.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1.5" />
                      Скасувати
                    </Button>
                  )}
                </div>

                <div className="flex w-full sm:w-auto gap-2">
                  {selectedLesson.status === "scheduled" && (
                    <>
                      {selectedLesson.format === "online" && selectedLesson.meetingUrl && (
                        <Button asChild className="w-full sm:w-auto h-[44px] px-6 rounded-[10px] bg-[#121117] text-white hover:bg-[#121117]/90 font-[600] text-[14px] shadow-sm transition-all">
                          <a href={selectedLesson.meetingUrl} target="_blank" rel="noopener noreferrer">
                            <Video className="h-4 w-4 mr-2" /> Приєднатися
                          </a>
                        </Button>
                      )}
                      {selectedLesson.format === "offline" && selectedLesson.location && (
                        <Button asChild className="w-full sm:w-auto h-[44px] px-6 rounded-[10px] bg-[#121117] text-white hover:bg-[#121117]/90 font-[600] text-[14px] shadow-sm transition-all">
                          <a
                            href={`https://www.google.com/maps/search/${encodeURIComponent(selectedLesson.location)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MapPin className="h-4 w-4 mr-2" /> Маршрут
                          </a>
                        </Button>
                      )}
                    </>
                  )}

                  {(selectedLesson.status === "completed" || selectedLesson.status === "trial_completed") && !selectedLesson.isPaid && userType === "client" && (
                    <Button
                      onClick={() => {
                        window.open("https://api.monobank.ua/payment?amount=65000&ccy=UAH&merchantId=libitum&order_id=payment_001", '_blank')
                      }}
                      className="w-full sm:w-auto h-[44px] px-6 rounded-[10px] bg-emerald-600 text-white hover:bg-emerald-700 font-[600] text-[14px] shadow-sm transition-all"
                    >
                      <DollarSign className="h-4 w-4 mr-1" /> Оплатити це заняття
                    </Button>
                  )}

                  {userType === "tutor" && !selectedLesson.isPaid && (
                    <Button
                      className="w-full sm:w-auto h-[44px] px-6 rounded-[10px] bg-emerald-600 text-white hover:bg-emerald-700 font-[600] text-[14px] shadow-sm transition-all"
                      onClick={() => {
                        onMarkPaid(selectedLesson.id)
                        setIsViewOpen(false)
                      }}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1.5" />
                      Позначити оплаченим
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Lesson Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-[24px] font-sans border-slate-200/80 max-h-[90vh] flex flex-col">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-100">
            <DialogTitle className="text-[20px] font-bold text-[#121117]">Додати нове заняття</DialogTitle>
            <DialogDescription className="text-[14px] text-[#69686f] mt-1">Заповніть інформацію про нове заняття в розкладі</DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="grid gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="clientName" className="text-[13px] font-[600] text-[#121117]">Ім'я учня *</Label>
                  {userType === "tutor" ? (
                    <Select value={formData.clientId} onValueChange={handleStudentSelect}>
                      <SelectTrigger className="h-[44px] rounded-[8px] border-slate-200 focus:ring-0 focus:border-[#00c5a6]">
                        <SelectValue placeholder="Оберіть учня" />
                      </SelectTrigger>
                      <SelectContent>
                        {tutorStudents.length > 0 ? (
                          tutorStudents.map(student => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.name} ({student.subject})
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="empty" disabled>Немає активних учнів</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id="clientName"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="Іван Петренко"
                      className="h-[44px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
                    />
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="subject" className="text-[13px] font-[600] text-[#121117]">Предмет *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Англійська мова"
                    className="h-[44px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="date" className="text-[13px] font-[600] text-[#121117]">Дата *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="h-[44px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="time" className="text-[13px] font-[600] text-[#121117]">Час *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="h-[44px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="duration" className="text-[13px] font-[600] text-[#121117]">Тривалість (хв)</Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) => setFormData({ ...formData, duration: value })}
                  >
                    <SelectTrigger className="h-[44px] rounded-[8px] border-slate-200 focus:ring-0 focus:border-[#00c5a6]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-[12px] border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                      <SelectItem value="30" className="rounded-[8px] cursor-pointer">30 хв</SelectItem>
                      <SelectItem value="45" className="rounded-[8px] cursor-pointer">45 хв</SelectItem>
                      <SelectItem value="60" className="rounded-[8px] cursor-pointer">60 хв</SelectItem>
                      <SelectItem value="90" className="rounded-[8px] cursor-pointer">90 хв</SelectItem>
                      <SelectItem value="120" className="rounded-[8px] cursor-pointer">120 хв</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {userType === "tutor" && (
                <div className="flex items-center gap-3 p-3 bg-[#f0f3f3]/50 rounded-[12px] border border-slate-200/50">
                  <Checkbox
                    id="isRecurring"
                    checked={formData.isRecurring}
                    onCheckedChange={(c) => setFormData({ ...formData, isRecurring: c as boolean })}
                    className="data-[state=checked]:bg-[#00c5a6] data-[state=checked]:border-[#00c5a6]"
                  />
                  <div className="space-y-0.5 leading-none">
                    <Label htmlFor="isRecurring" className="text-[14px] font-[600] cursor-pointer">Зробити повторюваним</Label>
                    <p className="text-[12px] text-[#69686f]">Створити серію занять</p>
                  </div>
                </div>
              )}

              {formData.isRecurring && (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Label className="text-[13px] font-[600] text-[#121117]">Правило повторення</Label>
                  <Select
                    value={formData.recurrenceRule || "weekly"}
                    onValueChange={(value) => setFormData({ ...formData, recurrenceRule: value })}
                  >
                    <SelectTrigger className="h-[44px] rounded-[8px] border-slate-200 focus:ring-0 focus:border-[#00c5a6]">
                      <SelectValue placeholder="Оберіть періодичність" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[12px] border-slate-200">
                      <SelectItem value="weekly" className="rounded-[8px]">Кожного тижня (в цей день)</SelectItem>
                      <SelectItem value="biweekly" className="rounded-[8px]">Кожні 2 тижні</SelectItem>
                      <SelectItem value="monthly" className="rounded-[8px]">Кожного місяця</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="format" className="text-[13px] font-[600] text-[#121117]">Формат</Label>
                  <Select
                    value={formData.format}
                    onValueChange={(value: "online" | "offline") => setFormData({ ...formData, format: value })}
                  >
                    <SelectTrigger className="h-[44px] rounded-[8px] border-slate-200 focus:ring-0 focus:border-[#00c5a6]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-[12px] border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                      <SelectItem value="online" className="rounded-[8px] cursor-pointer">Онлайн</SelectItem>
                      <SelectItem value="offline" className="rounded-[8px] cursor-pointer">Офлайн</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="price" className="text-[13px] font-[600] text-[#121117]">Ціна (₴)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="h-[44px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
                  />
                </div>
              </div>

              {formData.format === "offline" && (
                <div className="space-y-1.5">
                  <Label htmlFor="location" className="text-[13px] font-[600] text-[#121117]">Адреса</Label>
                  <Input
                    id="location"
                    value={formData.location || ""}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="вул. Хрещатик, 10, Київ"
                    className="h-[44px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
                  />
                </div>
              )}

              {formData.format === "online" && (
                <div className="space-y-1.5">
                  <Label htmlFor="meetingUrl" className="text-[13px] font-[600] text-[#121117]">Посилання на зустріч</Label>
                  <Input
                    id="meetingUrl"
                    value={formData.meetingUrl || ""}
                    onChange={(e) => setFormData({ ...formData, meetingUrl: e.target.value })}
                    placeholder="https://zoom.us/j/..."
                    className="h-[44px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="topic" className="text-[13px] font-[600] text-[#121117]">Тема заняття</Label>
                <Input
                  id="topic"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="Present Perfect Tense"
                  className="h-[44px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description" className="text-[13px] font-[600] text-[#121117]">Опис (опціонально)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Детальний опис плану заняття..."
                  rows={3}
                  className="rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6] resize-none"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 mt-auto flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsAddOpen(false)} className="h-[44px] w-full sm:w-auto px-6 rounded-[8px] border-2 border-[#121117] text-[#121117] font-[600]">
              Скасувати
            </Button>
            <Button onClick={onAdd} className="h-[44px] w-full sm:w-auto px-6 rounded-[8px] bg-[#00c5a6] hover:bg-[#00a389] text-white font-[600]">
              Додати заняття
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Lesson Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-[24px] font-sans border-slate-200/80 max-h-[90vh] flex flex-col">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-100">
            <DialogTitle className="text-[20px] font-bold text-[#121117]">Редагувати заняття</DialogTitle>
            <DialogDescription className="text-[14px] text-[#69686f] mt-1">Оновіть інформацію про заняття</DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="grid gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="edit-time" className="text-[13px] font-[600] text-[#121117]">Час</Label>
                  <Input
                    id="edit-time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="h-[44px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="edit-duration" className="text-[13px] font-[600] text-[#121117]">Тривалість (хв)</Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) => setFormData({ ...formData, duration: value })}
                  >
                    <SelectTrigger className="h-[44px] rounded-[8px] border-slate-200 focus:ring-0 focus:border-[#00c5a6]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-[12px] border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                      <SelectItem value="30" className="rounded-[8px] cursor-pointer">30 хв</SelectItem>
                      <SelectItem value="45" className="rounded-[8px] cursor-pointer">45 хв</SelectItem>
                      <SelectItem value="60" className="rounded-[8px] cursor-pointer">60 хв</SelectItem>
                      <SelectItem value="90" className="rounded-[8px] cursor-pointer">90 хв</SelectItem>
                      <SelectItem value="120" className="rounded-[8px] cursor-pointer">120 хв</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="edit-format" className="text-[13px] font-[600] text-[#121117]">Формат</Label>
                  <Select
                    value={formData.format}
                    onValueChange={(value: "online" | "offline") => setFormData({ ...formData, format: value })}
                  >
                    <SelectTrigger className="h-[44px] rounded-[8px] border-slate-200 focus:ring-0 focus:border-[#00c5a6]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-[12px] border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                      <SelectItem value="online" className="rounded-[8px] cursor-pointer">Онлайн</SelectItem>
                      <SelectItem value="offline" className="rounded-[8px] cursor-pointer">Офлайн</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-price" className="text-[13px] font-[600] text-[#121117]">Ціна (₴)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="h-[44px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
                />
              </div>

              {formData.format === "offline" && (
                <div className="space-y-1.5">
                  <Label htmlFor="edit-location" className="text-[13px] font-[600] text-[#121117]">Адреса</Label>
                  <Input
                    id="edit-location"
                    value={formData.location || ""}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="вул. Хрещатик, 10, Київ"
                    className="h-[44px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
                  />
                </div>
              )}

              {formData.format === "online" && (
                <div className="space-y-1.5">
                  <Label htmlFor="edit-meetingUrl" className="text-[13px] font-[600] text-[#121117]">Посилання на зустріч</Label>
                  <Input
                    id="edit-meetingUrl"
                    value={formData.meetingUrl || ""}
                    onChange={(e) => setFormData({ ...formData, meetingUrl: e.target.value })}
                    placeholder="https://zoom.us/j/..."
                    className="h-[44px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="edit-topic" className="text-[13px] font-[600] text-[#121117]">Тема заняття</Label>
                <Input
                  id="edit-topic"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="Present Perfect Tense"
                  className="h-[44px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-description" className="text-[13px] font-[600] text-[#121117]">Опис</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Детальний опис плану заняття..."
                  rows={3}
                  className="rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6] resize-none"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 mt-auto flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsEditOpen(false)} className="h-[44px] w-full sm:w-auto px-6 rounded-[8px] border-2 border-[#121117] text-[#121117] font-[600]">
              Скасувати
            </Button>
            <Button onClick={onEdit} className="h-[44px] w-full sm:w-auto px-6 rounded-[8px] bg-[#00c5a6] hover:bg-[#00a389] text-white font-[600]">
              Зберегти зміни
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Goals Section Component for Lessons
function LessonGoalsSection({ lessonId }: { lessonId: string }) {
  const [newSubGoalTitle, setNewSubGoalTitle] = useState("")
  const [isAddingGoal, setIsAddingGoal] = useState(false)

  const {
    getGoalByLesson,
    createGoal,
    updateGoal,
    deleteGoal,
    addSubGoal,
    toggleSubGoal,
    deleteSubGoal,
    clearGoal,
    getProgress,
  } = useGoalStore()

  const goal = getGoalByLesson(lessonId)
  const progress = getProgress(lessonId)

  const handleCreateGoal = () => {
    if (!goal?.title && !isAddingGoal) {
      setIsAddingGoal(true)
      createGoal(lessonId, "Ціль заняття")
    }
  }

  const handleAddSubGoal = () => {
    if (newSubGoalTitle.trim()) {
      addSubGoal(lessonId, newSubGoalTitle.trim())
      setNewSubGoalTitle("")
    }
  }

  const handleClearGoal = () => {
    clearGoal(lessonId)
    setIsAddingGoal(false)
  }

  // If no goal exists yet, show create button
  if (!goal || (!goal.title && goal.subGoals.length === 0)) {
    return (
      <div className="rounded-[16px] border-2 border-dashed border-slate-200 bg-[#f0f3f3]/50 p-5 mt-4 transition-colors hover:border-slate-300">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#69686f]">
            <Target className="h-5 w-5 text-[#121117]" />
            <span className="text-[15px] font-[600] text-[#121117]">Цілі заняття</span>
          </div>
          <button
            onClick={handleCreateGoal}
            className="inline-flex items-center gap-1.5 h-[36px] px-4 rounded-[6px] border-2 border-[#121117] text-[#121117] bg-white hover:bg-gray-50 font-[600] text-[14px] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Додати
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-[16px] border border-slate-200/80 bg-white p-5 space-y-5 mt-4 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
      {/* Goal Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-[#00c5a6]" />
            <span className="text-[16px] font-bold text-[#121117]">Ціль заняття</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleClearGoal}
              className="inline-flex items-center justify-center h-8 w-8 rounded-[6px] text-[#69686f] hover:text-[#e53935] hover:bg-[#ffebee] transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-[13px] font-[600] text-[#69686f]">
            <span>Прогрес</span>
            <span className={progress.percentage === 100 ? "text-[#00a389]" : ""}>
              {progress.completed}/{progress.total}
            </span>
          </div>
          <Progress value={progress.percentage} className="h-2 bg-gray-100 [&>div]:bg-[#00c5a6]" />
        </div>
      </div>

      {/* SubGoals List */}
      <div className="space-y-2">
        {goal.subGoals.map((subGoal) => (
          <div
            key={subGoal.id}
            className={`flex items-center gap-3 p-3 rounded-[8px] transition-all border border-transparent hover:border-slate-200/50 ${subGoal.completed ? "bg-[#e8fffb] border-[#00c5a6]/20" : "bg-[#f0f3f3]"
              }`}
          >
            <Checkbox
              checked={subGoal.completed}
              onCheckedChange={() => toggleSubGoal(lessonId, subGoal.id)}
              className="h-5 w-5 rounded-[4px] data-[state=checked]:bg-[#00c5a6] data-[state=checked]:border-[#00c5a6] data-[state=checked]:text-white"
            />
            <span
              className={`flex-1 text-[14px] font-[500] leading-snug ${subGoal.completed ? "line-through text-[#69686f]" : "text-[#121117]"}`}
            >
              {subGoal.title}
            </span>
            <button
              onClick={() => deleteSubGoal(lessonId, subGoal.id)}
              className="inline-flex items-center justify-center h-7 w-7 rounded-[4px] text-[#69686f] hover:text-[#e53935] hover:bg-white transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}

        {/* Add SubGoal Input */}
        {goal.subGoals.length < 10 && (
          <div className="flex gap-2 pt-3 border-t border-gray-100 mt-3">
            <Input
              placeholder="Додати субціль..."
              value={newSubGoalTitle}
              onChange={(e) => setNewSubGoalTitle(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddSubGoal()}
              className="h-[40px] text-[14px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
            />
            <Button
              size="sm"
              onClick={handleAddSubGoal}
              disabled={!newSubGoalTitle.trim()}
              className="h-[40px] px-4 rounded-[8px] bg-[#121117] text-white hover:bg-[#121117]/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}

        {goal.subGoals.length >= 10 && (
          <p className="text-[13px] font-[500] text-[#69686f] text-center mt-4">Максимум 10 субцілей</p>
        )}
      </div>

      {/* Completion Animation placeholder */}
      {progress.percentage === 100 && progress.total > 0 && (
        <div className="flex items-center gap-2 text-[#00a389] text-[14px] font-[600] animate-pulse bg-[#e8fffb] px-4 py-3 rounded-[8px] justify-center mt-4">
          <CheckCircle2 className="h-5 w-5" />
          Всі цілі досягнуті!
        </div>
      )}
    </div>
  )
}
