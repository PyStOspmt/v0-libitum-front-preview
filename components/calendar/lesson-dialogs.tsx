
import { useState } from "react"
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
import { CalendarIcon, Clock, Video, MapPin, DollarSign } from "lucide-react"
import { useGoalStore } from "@/lib/goal-store"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Target, Plus, Trash2, CheckCircle2, Circle } from "lucide-react"
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
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogHeader>
            <DialogTitle className="sr-only">Деталі заняття</DialogTitle>
            <DialogDescription className="sr-only">Інформація про заняття, оплата, формат і дії</DialogDescription>
          </DialogHeader>
          {selectedLesson && (
            <div className="grid grid-cols-1 md:grid-cols-[1.3fr_0.7fr] gap-0 md:gap-6">
              {/* Left: hero info */}
              <div className="p-6 pb-4 md:pb-6 space-y-5">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16 border border-slate-200 shadow-sm shrink-0">
                    {selectedLesson.photoUrl && <AvatarImage src={selectedLesson.photoUrl} alt={selectedLesson.specialistName || selectedLesson.clientName} />}
                    <AvatarFallback className="bg-emerald-50 text-emerald-700 font-semibold">
                      {userType === "client" ? selectedLesson.specialistName?.[0] : selectedLesson.clientName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={cn(selectedLesson.subject === "Психологія" ? "bg-orange-50 text-orange-700" : "bg-emerald-50 text-emerald-700")}>{selectedLesson.subject}</Badge>
                      <span className="text-xs text-muted-foreground">{selectedLesson.format === "online" ? "Онлайн" : "Офлайн"}</span>
                    </div>
                    <div className="text-xl font-semibold leading-tight whitespace-normal">
                      {userType === "client" ? selectedLesson.specialistName : selectedLesson.clientName}
                    </div>
                    <div className="text-sm text-slate-500 whitespace-normal">
                      {selectedLesson.topic || "Без теми"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-sm">
                  <div className="space-y-1">
                    <div className="text-muted-foreground flex items-center gap-1"><CalendarIcon className="h-4 w-4" /> Дата</div>
                    <div className="font-medium whitespace-normal">{new Date(selectedLesson.date).toLocaleDateString("uk-UA", { day: "2-digit", month: "long", weekday: "short" })}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground flex items-center gap-1"><Clock className="h-4 w-4" /> Час</div>
                    <div className="font-medium whitespace-normal">{selectedLesson.time} • {selectedLesson.duration} хв</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground flex items-center gap-1"><DollarSign className="h-4 w-4" /> Оплата</div>
                    <div className="font-medium whitespace-normal">
                      {selectedLesson.price} грн • {selectedLesson.isPaid ? "Оплачено" : "Не оплачено"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground flex items-center gap-1">
                      {selectedLesson.format === "online" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                      {selectedLesson.format === "online" ? "Посилання" : "Адреса"}
                    </div>
                    <div className="font-medium whitespace-normal">
                      {selectedLesson.format === "online"
                        ? selectedLesson.meetingUrl || "Посилання буде додано"
                        : selectedLesson.location || "Адреса уточнюється"}
                    </div>
                  </div>
                </div>

                {selectedLesson.description && (
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-slate-700">Опис</div>
                    <div className="text-sm text-slate-600 leading-relaxed">{selectedLesson.description}</div>
                  </div>
                )}

                {/* Goals Section - Only for tutor */}
                {userType === "tutor" && selectedLesson && (
                  <LessonGoalsSection lessonId={selectedLesson.id} />
                )}
              </div>

              {/* Right: actions */}
              <div className="bg-slate-50 border-l border-slate-100 p-6 space-y-3">
                <div className="text-sm font-semibold text-slate-700">Дії</div>
                <div className="flex flex-col gap-2">
                  {selectedLesson.format === "online" && selectedLesson.meetingUrl && (
                    <Button asChild className="justify-start gap-2 w-full whitespace-normal text-left text-sm">
                      <a href={selectedLesson.meetingUrl} target="_blank" rel="noopener noreferrer">
                        <Video className="h-4 w-4" /> Приєднатися
                      </a>
                    </Button>
                  )}
                  {selectedLesson.format === "offline" && selectedLesson.location && (
                    <Button asChild variant="outline" className="justify-start gap-2 w-full whitespace-normal text-left text-sm">
                      <a
                        href={`https://www.google.com/maps/search/${encodeURIComponent(selectedLesson.location)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MapPin className="h-4 w-4" /> Адреса
                      </a>
                    </Button>
                  )}

                  <Button
                    variant="secondary"
                    className="justify-start w-full whitespace-normal text-left text-sm"
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
                      className="justify-start w-full whitespace-normal text-left text-sm"
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
                    className="justify-start w-full text-left text-sm text-destructive hover:text-destructive"
                    onClick={() => selectedLesson && onDelete(selectedLesson.id)}
                  >
                    Скасувати
                  </Button>

                  <Button variant="outline" onClick={() => setIsViewOpen(false)} className="justify-start w-full text-left text-sm">
                    Закрити
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Lesson Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-5xl">
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

            {formData.format === "offline" && (
              <div className="space-y-2">
                <Label htmlFor="location">Адреса</Label>
                <Input
                  id="location"
                  value={formData.location || ""}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="вул. Хрещатик, 10, Київ"
                />
              </div>
            )}

            {formData.format === "online" && (
              <div className="space-y-2">
                <Label htmlFor="meetingUrl">Посилання на зустріч</Label>
                <Input
                  id="meetingUrl"
                  value={formData.meetingUrl || ""}
                  onChange={(e) => setFormData({ ...formData, meetingUrl: e.target.value })}
                  placeholder="https://zoom.us/j/..."
                />
              </div>
            )}

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
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              Скасувати
            </Button>
            <Button onClick={onAdd}>Додати заняття</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Lesson Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-5xl">
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

            {formData.format === "offline" && (
              <div className="space-y-2">
                <Label htmlFor="edit-location">Адреса</Label>
                <Input
                  id="edit-location"
                  value={formData.location || ""}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="вул. Хрещатик, 10, Київ"
                />
              </div>
            )}

            {formData.format === "online" && (
              <div className="space-y-2">
                <Label htmlFor="edit-meetingUrl">Посилання на зустріч</Label>
                <Input
                  id="edit-meetingUrl"
                  value={formData.meetingUrl || ""}
                  onChange={(e) => setFormData({ ...formData, meetingUrl: e.target.value })}
                  placeholder="https://zoom.us/j/..."
                />
              </div>
            )}

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
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Скасувати
            </Button>
            <Button onClick={onEdit}>Зберегти зміни</Button>
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
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-600">
            <Target className="h-4 w-4" />
            <span className="text-sm font-medium">Цілі заняття</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleCreateGoal} className="gap-1">
            <Plus className="h-3 w-3" />
            Додати
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-4">
      {/* Goal Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-semibold text-slate-700">Ціль заняття</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={handleClearGoal} className="h-7 px-2 text-slate-400 hover:text-red-500">
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Прогрес</span>
            <span>{progress.completed}/{progress.total}</span>
          </div>
          <Progress value={progress.percentage} className="h-1.5" />
        </div>
      </div>

      {/* SubGoals List */}
      <div className="space-y-2">
        {goal.subGoals.map((subGoal) => (
          <div
            key={subGoal.id}
            className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
              subGoal.completed ? "bg-emerald-50/50" : "bg-slate-50"
            }`}
          >
            <Checkbox
              checked={subGoal.completed}
              onCheckedChange={() => toggleSubGoal(lessonId, subGoal.id)}
              className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
            />
            <span className={`flex-1 text-sm ${subGoal.completed ? "line-through text-slate-400" : "text-slate-700"}`}>
              {subGoal.title}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteSubGoal(lessonId, subGoal.id)}
              className="h-6 w-6 p-0 text-slate-300 hover:text-red-400"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        ))}

        {/* Add SubGoal Input */}
        {goal.subGoals.length < 10 && (
          <div className="flex gap-2 pt-2">
            <Input
              placeholder="Додати субціль..."
              value={newSubGoalTitle}
              onChange={(e) => setNewSubGoalTitle(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddSubGoal()}
              className="h-8 text-sm"
            />
            <Button size="sm" onClick={handleAddSubGoal} disabled={!newSubGoalTitle.trim()} className="h-8 px-2">
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        )}

        {goal.subGoals.length >= 10 && (
          <p className="text-xs text-slate-400 text-center">Максимум 10 субцілей</p>
        )}
      </div>

      {/* Completion Animation placeholder */}
      {progress.percentage === 100 && progress.total > 0 && (
        <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium animate-pulse">
          <CheckCircle2 className="h-4 w-4" />
          Всі цілі досягнуті!
        </div>
      )}
    </div>
  )
}
