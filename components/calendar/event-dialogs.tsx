import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { type CalendarEvent } from "@/lib/lesson-store"

export interface EventFormData {
    title: string
    description: string
    date: string
    time: string
    duration: string
    type: "personal" | "meeting" | "reminder" | "break"
}

interface EventDialogsProps {
    userType: "client" | "tutor"
    isAddOpen: boolean
    setIsAddOpen: (open: boolean) => void
    isEditOpen: boolean
    setIsEditOpen: (open: boolean) => void
    isViewOpen: boolean
    setIsViewOpen: (open: boolean) => void
    selectedEvent: CalendarEvent | null
    formData: EventFormData
    setFormData: (data: EventFormData) => void
    onAdd: () => void
    onEdit: () => void
    onDelete: (id: string) => void
    onOpenEdit: (event: CalendarEvent) => void
    getEventTypeLabel: (type: CalendarEvent["type"]) => string
}

export function EventDialogs({
    userType,
    isAddOpen,
    setIsAddOpen,
    isEditOpen,
    setIsEditOpen,
    isViewOpen,
    setIsViewOpen,
    selectedEvent,
    formData,
    setFormData,
    onAdd,
    onEdit,
    onDelete,
    onOpenEdit,
    getEventTypeLabel,
}: EventDialogsProps) {
    return (
        <>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
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
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Наприклад: Перерва на обід"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="event-type">Тип події *</Label>
                            <Select
                                value={formData.type}
                                onValueChange={(value: any) => setFormData({ ...formData, type: value })}
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
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="event-time">Час *</Label>
                                <Input
                                    id="event-time"
                                    type="time"
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="event-duration">Тривалість (хв)</Label>
                            <Select
                                value={formData.duration}
                                onValueChange={(value) => setFormData({ ...formData, duration: value })}
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
                        <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                            Скасувати
                        </Button>
                        <Button onClick={onAdd}>Додати подію</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
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
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="edit-event-type">Тип події *</Label>
                            <Select
                                value={formData.type}
                                onValueChange={(value: any) => setFormData({ ...formData, type: value })}
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
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-event-time">Час *</Label>
                                <Input
                                    id="edit-event-time"
                                    type="time"
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-event-duration">Тривалість (хв)</Label>
                                <Select
                                    value={formData.duration}
                                    onValueChange={(value) => setFormData({ ...formData, duration: value })}
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
                        <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                            Скасувати
                        </Button>
                        <Button variant="destructive" onClick={() => selectedEvent && onDelete(selectedEvent.id)}>
                            Видалити
                        </Button>
                        <Button onClick={onEdit}>Зберегти</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
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
                        <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                            Закрити
                        </Button>
                        {userType === "tutor" && (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setIsViewOpen(false)
                                        selectedEvent && onOpenEdit(selectedEvent)
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
