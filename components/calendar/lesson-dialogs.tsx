import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Video, Clock, Calendar, DollarSign, Target, Plus, Trash2, CheckCircle2, Circle, Calendar as CalendarIcon } from "lucide-react"
import { useGoalStore } from "@/lib/goal-store"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import type { Lesson } from "@/lib/lesson-store"

export interface LessonFormData {
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
  return (
    <>
      {/* View Lesson Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-[24px] font-sans border-slate-200/80 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">Деталі заняття</DialogTitle>
            <DialogDescription className="sr-only">Інформація про заняття, оплата, формат і дії</DialogDescription>
          </DialogHeader>
          {selectedLesson && (
            <div className="grid grid-cols-1 md:grid-cols-[1.3fr_0.7fr] gap-0 md:gap-6">
              {/* Left: hero info */}
              <div className="p-4 md:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-5">
                  <Avatar className="h-16 w-16 md:h-20 md:w-20 rounded-[12px] border border-slate-200/80 shadow-sm shrink-0">
                    {selectedLesson.photoUrl && <AvatarImage src={selectedLesson.photoUrl} alt={selectedLesson.specialistName || selectedLesson.clientName} className="rounded-[12px] object-cover" />}
                    <AvatarFallback className="bg-[#f0f3f3] text-[#121117] font-[600] text-[24px] rounded-[12px]">
                      {userType === "client" ? selectedLesson.specialistName?.[0] : selectedLesson.clientName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 space-y-2.5 mt-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className={cn("px-3 py-1 text-[13px] font-[600] border-0 rounded-[6px]", selectedLesson.subject === "Психологія" ? "bg-orange-50 text-orange-700" : "bg-[#e8fffb] text-[#00a389]")}>{selectedLesson.subject}</Badge>
                      <span className="text-[13px] font-[500] text-[#69686f] bg-[#f0f3f3] px-2 py-1 rounded-[6px]">{selectedLesson.format === "online" ? "Онлайн" : "Офлайн"}</span>
                    </div>
                    <div className="text-[20px] md:text-[24px] font-bold text-[#121117] leading-tight whitespace-normal">
                      {userType === "client" ? selectedLesson.specialistName : selectedLesson.clientName}
                    </div>
                    <div className="text-[14px] md:text-[15px] text-[#69686f] whitespace-normal">
                      {selectedLesson.topic || "Без теми"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-[16px] border border-slate-200/80 bg-white p-4 md:p-5 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
                  <div className="space-y-1.5">
                    <div className="text-[13px] font-[600] text-[#69686f] flex items-center gap-1.5"><CalendarIcon className="h-4 w-4" /> Дата</div>
                    <div className="text-[14px] md:text-[15px] font-[600] text-[#121117] whitespace-normal">{new Date(selectedLesson.date).toLocaleDateString("uk-UA", { day: "2-digit", month: "long", weekday: "short" })}</div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-[13px] font-[600] text-[#69686f] flex items-center gap-1.5"><Clock className="h-4 w-4" /> Час</div>
                    <div className="text-[14px] md:text-[15px] font-[600] text-[#121117] whitespace-normal">{selectedLesson.time} • {selectedLesson.duration} хв</div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-[13px] font-[600] text-[#69686f] flex items-center gap-1.5"><DollarSign className="h-4 w-4" /> Оплата</div>
                    <div className="text-[14px] md:text-[15px] font-[600] text-[#121117] whitespace-normal flex items-center gap-2">
                      {selectedLesson.price} ₴ 
                      <Badge variant="outline" className={`border-0 rounded-[6px] px-2 py-0.5 text-[11px] ${selectedLesson.isPaid ? 'bg-[#e8f5e9] text-[#2e7d32]' : 'bg-[#fff8e1] text-[#f57c00]'}`}>
                        {selectedLesson.isPaid ? "Оплачено" : "Не оплачено"}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-[13px] font-[600] text-[#69686f] flex items-center gap-1.5">
                      {selectedLesson.format === "online" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                      {selectedLesson.format === "online" ? "Посилання" : "Адреса"}
                    </div>
                    <div className="text-[14px] md:text-[15px] font-[600] text-[#121117] whitespace-normal">
                      {selectedLesson.format === "online"
                        ? selectedLesson.meetingUrl || "Посилання буде додано"
                        : selectedLesson.location || "Адреса уточнюється"}
                    </div>
                  </div>
                </div>

                {selectedLesson.description && (
                  <div className="space-y-2 bg-[#f0f3f3] rounded-[16px] p-4 md:p-5">
                    <div className="text-[15px] md:text-[16px] font-bold text-[#121117]">Опис</div>
                    <div className="text-[14px] md:text-[15px] text-[#69686f] leading-relaxed">{selectedLesson.description}</div>
                  </div>
                )}

                {/* Goals Section - Only for tutor */}
                {userType === "tutor" && selectedLesson && (
                  <LessonGoalsSection lessonId={selectedLesson.id} />
                )}
              </div>

              {/* Right: actions */}
              <div className="bg-[#f0f3f3] border-t md:border-t-0 md:border-l border-slate-200/80 p-4 md:p-8 space-y-4">
                <div className="text-[18px] font-bold text-[#121117] mb-2">Дії</div>
                <div className="flex flex-col gap-3">
                  {selectedLesson.format === "online" && selectedLesson.meetingUrl && (
                    <Button asChild className="justify-center gap-2 w-full whitespace-normal text-center h-[48px] rounded-[8px] bg-[#121117] text-white hover:bg-[#121117]/90 font-[600] text-[16px] transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                      <a href={selectedLesson.meetingUrl} target="_blank" rel="noopener noreferrer">
                        <Video className="h-5 w-5" /> Приєднатися
                      </a>
                    </Button>
                  )}
                  {selectedLesson.format === "offline" && selectedLesson.location && (
                    <Button asChild variant="outline" className="justify-center gap-2 w-full whitespace-normal text-center h-[48px] rounded-[8px] border-2 border-[#121117] text-[#121117] bg-white hover:bg-gray-50 font-[600] text-[16px] transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                      <a
                        href={`https://www.google.com/maps/search/${encodeURIComponent(selectedLesson.location)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MapPin className="h-5 w-5" /> Адреса
                      </a>
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    className="justify-center w-full whitespace-normal text-center h-[48px] rounded-[8px] border-2 border-[#121117] text-[#121117] bg-white hover:bg-gray-50 font-[600] text-[16px] transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    onClick={() => {
                      setIsViewOpen(false)
                      if (selectedLesson) onOpenEdit(selectedLesson)
                    }}
                  >
                    Редагувати
                  </Button>

                  {userType === "tutor" && !selectedLesson.isPaid && (
                    <Button
                      variant="outline"
                      className="justify-center w-full whitespace-normal text-center h-[48px] rounded-[8px] border-2 border-[#00c5a6] text-[#00c5a6] bg-white hover:bg-[#e8fffb] font-[600] text-[16px] transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                      onClick={() => {
                        onMarkPaid(selectedLesson.id)
                        setIsViewOpen(false)
                      }}
                    >
                      Позначити оплаченим
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    className="justify-center w-full text-center h-[48px] rounded-[8px] text-[#e53935] hover:bg-[#ffebee] hover:text-[#c62828] font-[600] text-[16px] transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] mt-2"
                    onClick={() => selectedLesson && onDelete(selectedLesson.id)}
                  >
                    Скасувати заняття
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Lesson Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-3xl p-8 rounded-[24px] font-sans">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-[24px] font-bold text-[#121117]">Додати нове заняття</DialogTitle>
            <DialogDescription className="text-[15px] text-[#69686f] mt-1">Заповніть інформацію про нове заняття в розкладі</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="clientName" className="text-[14px] font-[600] text-[#121117]">Ім'я учня *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="Іван Петренко"
                  className="h-[48px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-[14px] font-[600] text-[#121117]">Предмет *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Англійська мова"
                  className="h-[48px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-[14px] font-[600] text-[#121117]">Дата *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="h-[48px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="text-[14px] font-[600] text-[#121117]">Час *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="h-[48px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-[14px] font-[600] text-[#121117]">Тривалість (хв)</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData({ ...formData, duration: value })}
                >
                  <SelectTrigger className="h-[48px] rounded-[8px] border-slate-200 focus:ring-0 focus:border-[#00c5a6]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-[12px] border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                    <SelectItem value="30" className="rounded-[8px] focus:bg-gray-50 focus:text-[#121117] cursor-pointer">30 хвилин</SelectItem>
                    <SelectItem value="45" className="rounded-[8px] focus:bg-gray-50 focus:text-[#121117] cursor-pointer">45 хвилин</SelectItem>
                    <SelectItem value="60" className="rounded-[8px] focus:bg-gray-50 focus:text-[#121117] cursor-pointer">60 хвилин</SelectItem>
                    <SelectItem value="90" className="rounded-[8px] focus:bg-gray-50 focus:text-[#121117] cursor-pointer">90 хвилин</SelectItem>
                    <SelectItem value="120" className="rounded-[8px] focus:bg-gray-50 focus:text-[#121117] cursor-pointer">120 хвилин</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="format" className="text-[14px] font-[600] text-[#121117]">Формат</Label>
                <Select
                  value={formData.format}
                  onValueChange={(value: "online" | "offline") => setFormData({ ...formData, format: value })}
                >
                  <SelectTrigger className="h-[48px] rounded-[8px] border-slate-200 focus:ring-0 focus:border-[#00c5a6]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-[12px] border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                    <SelectItem value="online" className="rounded-[8px] focus:bg-gray-50 focus:text-[#121117] cursor-pointer">Онлайн</SelectItem>
                    <SelectItem value="offline" className="rounded-[8px] focus:bg-gray-50 focus:text-[#121117] cursor-pointer">Офлайн</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price" className="text-[14px] font-[600] text-[#121117]">Ціна (₴)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="h-[48px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
                />
              </div>
            </div>

            {formData.format === "offline" && (
              <div className="space-y-2">
                <Label htmlFor="location" className="text-[14px] font-[600] text-[#121117]">Адреса</Label>
                <Input
                  id="location"
                  value={formData.location || ""}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="вул. Хрещатик, 10, Київ"
                  className="h-[48px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
                />
              </div>
            )}

            {formData.format === "online" && (
              <div className="space-y-2">
                <Label htmlFor="meetingUrl" className="text-[14px] font-[600] text-[#121117]">Посилання на зустріч</Label>
                <Input
                  id="meetingUrl"
                  value={formData.meetingUrl || ""}
                  onChange={(e) => setFormData({ ...formData, meetingUrl: e.target.value })}
                  placeholder="https://zoom.us/j/..."
                  className="h-[48px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="topic" className="text-[14px] font-[600] text-[#121117]">Тема заняття</Label>
              <Input
                id="topic"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="Present Perfect Tense"
                className="h-[48px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-[14px] font-[600] text-[#121117]">Опис</Label>
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
          <DialogFooter className="mt-8 gap-3 sm:gap-0">
            <Button variant="outline" onClick={() => setIsAddOpen(false)} className="h-[48px] px-8 rounded-[8px] border-2 border-[#121117] text-[#121117] font-[600] text-[16px] hover:bg-gray-50 transition-colors">
              Скасувати
            </Button>
            <Button onClick={onAdd} className="h-[48px] px-8 rounded-[8px] border-2 border-transparent bg-[#00c5a6] text-white hover:bg-[#00c5a6]/90 font-[600] text-[16px] transition-colors">
              Додати заняття
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Lesson Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-3xl p-8 rounded-[24px] font-sans">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-[24px] font-bold text-[#121117]">Редагувати заняття</DialogTitle>
            <DialogDescription className="text-[15px] text-[#69686f] mt-1">Оновіть інформацію про заняття</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="edit-time" className="text-[14px] font-[600] text-[#121117]">Час</Label>
                <Input
                  id="edit-time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="h-[48px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-duration" className="text-[14px] font-[600] text-[#121117]">Тривалість (хв)</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData({ ...formData, duration: value })}
                >
                  <SelectTrigger className="h-[48px] rounded-[8px] border-slate-200 focus:ring-0 focus:border-[#00c5a6]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-[12px] border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                    <SelectItem value="30" className="rounded-[8px] focus:bg-gray-50 focus:text-[#121117] cursor-pointer">30 хвилин</SelectItem>
                    <SelectItem value="45" className="rounded-[8px] focus:bg-gray-50 focus:text-[#121117] cursor-pointer">45 хвилин</SelectItem>
                    <SelectItem value="60" className="rounded-[8px] focus:bg-gray-50 focus:text-[#121117] cursor-pointer">60 хвилин</SelectItem>
                    <SelectItem value="90" className="rounded-[8px] focus:bg-gray-50 focus:text-[#121117] cursor-pointer">90 хвилин</SelectItem>
                    <SelectItem value="120" className="rounded-[8px] focus:bg-gray-50 focus:text-[#121117] cursor-pointer">120 хвилин</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-format" className="text-[14px] font-[600] text-[#121117]">Формат</Label>
                <Select
                  value={formData.format}
                  onValueChange={(value: "online" | "offline") => setFormData({ ...formData, format: value })}
                >
                  <SelectTrigger className="h-[48px] rounded-[8px] border-slate-200 focus:ring-0 focus:border-[#00c5a6]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-[12px] border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                    <SelectItem value="online" className="rounded-[8px] focus:bg-gray-50 focus:text-[#121117] cursor-pointer">Онлайн</SelectItem>
                    <SelectItem value="offline" className="rounded-[8px] focus:bg-gray-50 focus:text-[#121117] cursor-pointer">Офлайн</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-price" className="text-[14px] font-[600] text-[#121117]">Ціна (₴)</Label>
              <Input
                id="edit-price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="h-[48px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
              />
            </div>

            {formData.format === "offline" && (
              <div className="space-y-2">
                <Label htmlFor="edit-location" className="text-[14px] font-[600] text-[#121117]">Адреса</Label>
                <Input
                  id="edit-location"
                  value={formData.location || ""}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="вул. Хрещатик, 10, Київ"
                  className="h-[48px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
                />
              </div>
            )}

            {formData.format === "online" && (
              <div className="space-y-2">
                <Label htmlFor="edit-meetingUrl" className="text-[14px] font-[600] text-[#121117]">Посилання на зустріч</Label>
                <Input
                  id="edit-meetingUrl"
                  value={formData.meetingUrl || ""}
                  onChange={(e) => setFormData({ ...formData, meetingUrl: e.target.value })}
                  placeholder="https://zoom.us/j/..."
                  className="h-[48px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="edit-topic" className="text-[14px] font-[600] text-[#121117]">Тема заняття</Label>
              <Input
                id="edit-topic"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="Present Perfect Tense"
                className="h-[48px] rounded-[8px] border-slate-200 focus-visible:ring-0 focus-visible:border-[#00c5a6]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description" className="text-[14px] font-[600] text-[#121117]">Опис</Label>
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
          <DialogFooter className="mt-8 gap-3 sm:gap-0">
            <Button variant="outline" onClick={() => setIsEditOpen(false)} className="h-[48px] px-8 rounded-[8px] border-2 border-[#121117] text-[#121117] font-[600] text-[16px] hover:bg-gray-50 transition-colors">
              Скасувати
            </Button>
            <Button onClick={onEdit} className="h-[48px] px-8 rounded-[8px] border-2 border-transparent bg-[#00c5a6] text-white hover:bg-[#00c5a6]/90 font-[600] text-[16px] transition-colors">
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
            <span className={progress.percentage === 100 ? "text-[#00a389]" : ""}>{progress.completed}/{progress.total}</span>
          </div>
          <Progress value={progress.percentage} className="h-2 bg-gray-100 [&>div]:bg-[#00c5a6]" />
        </div>
      </div>

      {/* SubGoals List */}
      <div className="space-y-2">
        {goal.subGoals.map((subGoal) => (
          <div
            key={subGoal.id}
            className={`flex items-center gap-3 p-3 rounded-[8px] transition-all border border-transparent hover:border-slate-200/50 ${
              subGoal.completed ? "bg-[#e8fffb] border-[#00c5a6]/20" : "bg-[#f0f3f3]"
            }`}
          >
            <Checkbox
              checked={subGoal.completed}
              onCheckedChange={() => toggleSubGoal(lessonId, subGoal.id)}
              className="h-5 w-5 rounded-[4px] data-[state=checked]:bg-[#00c5a6] data-[state=checked]:border-[#00c5a6] data-[state=checked]:text-white"
            />
            <span className={`flex-1 text-[14px] font-[500] leading-snug ${subGoal.completed ? "line-through text-[#69686f]" : "text-[#121117]"}`}>
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
