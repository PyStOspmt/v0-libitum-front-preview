
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CalendarIcon, Clock, Video, MapPin, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Lesson } from "@/lib/lesson-store"

export interface LessonFormData {
  clientName: string
  subject: string
  date: string
  time: string
  duration: string
  format: "online" | "offline"
  topic: string
  description: string
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
                      onMarkPaid(selectedLesson.id)
                      setIsViewOpen(false)
                    }}
                  >
                    <DollarSign className="mr-2 h-4 w-4" />
                    Позначити оплаченим
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsViewOpen(false)
                    if (selectedLesson) onOpenEdit(selectedLesson)
                  }}
                >
                  Редагувати
                </Button>
                <Button variant="destructive" onClick={() => selectedLesson && onDelete(selectedLesson.id)}>
                  Видалити
                </Button>
              </>
            )}
            <Button variant="outline" onClick={() => setIsViewOpen(false)}>
              Закрити
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Lesson Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
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
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              Скасувати
            </Button>
            <Button onClick={onAdd}>Додати заняття</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Lesson Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
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
