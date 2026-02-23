"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRequestStore } from "@/lib/request-store"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Clock, Video, Home, AlertTriangle } from "lucide-react"

interface BookingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  specialist: {
    id?: string
    name: string
    priceOnline: number
    priceOffline: number
  }
  clientId?: string
}

export function BookingModal({ open, onOpenChange, specialist }: BookingModalProps) {
  const { user } = useAuth()
  const clientId = user?.id || "client-1"
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [format, setFormat] = useState<"online" | "offline">("online")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const { addRequest, getActiveTrialCount } = useRequestStore()
  const { toast } = useToast()

  const activeTrialCount = getActiveTrialCount(clientId)
  const hasReachedLimit = activeTrialCount >= 3

  // Mock available time slots
  const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

  const handleSubmit = () => {
    if (hasReachedLimit) {
      toast({
        title: "Досягнуто ліміт",
        description: "Ви можете мати максимум 3 активні пробні заняття одночасно",
        variant: "destructive",
      })
      return
    }

    if (!date || !selectedTime) return

    addRequest({
      type: "private",
      clientId,
      clientName: user?.name || "Гість",
      specialistId: specialist.id || "specialist-1",
      specialistName: specialist.name,
      subject: "Англійська мова",
      date: date.toISOString().split("T")[0],
      time: selectedTime,
      format,
      clientPhone: phone,
      message,
    })

    toast({
      title: "Запит відправлено",
      description: "Спеціаліст отримає ваш запит та відповість протягом 3 годин",
    })

    onOpenChange(false)
    setSelectedTime("")
    setMessage("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Записатися до {specialist.name}</DialogTitle>
          <DialogDescription>Оберіть зручний час та формат заняття</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {hasReachedLimit && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Досягнуто ліміт активних пробних</AlertTitle>
              <AlertDescription>
                Ви вже маєте {activeTrialCount} активні пробні заняття. Щоб записатися до нового спеціаліста, скасуйте
                одну з попередніх заявок у вашому кабінеті.
              </AlertDescription>
            </Alert>
          )}

          {activeTrialCount > 0 && activeTrialCount < 3 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Активні пробні: {activeTrialCount} з 3</AlertTitle>
              <AlertDescription>Ви можете мати максимум 3 активні пробні заняття одночасно.</AlertDescription>
            </Alert>
          )}

          {/* Format Selection */}
          <div className="space-y-3">
            <Label>Формат заняття</Label>
            <RadioGroup
              value={format}
              onValueChange={(value) => setFormat(value as "online" | "offline")}
              disabled={hasReachedLimit}
            >
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="online" id="online" disabled={hasReachedLimit} />
                  <Label htmlFor="online" className="flex items-center gap-2 font-normal">
                    <Video className="h-4 w-4" />
                    Онлайн заняття
                  </Label>
                </div>
                <span className="font-bold">{specialist.priceOnline} ₴/год</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="offline" id="offline" disabled={hasReachedLimit} />
                  <Label htmlFor="offline" className="flex items-center gap-2 font-normal">
                    <Home className="h-4 w-4" />
                    Офлайн заняття
                  </Label>
                </div>
                <span className="font-bold">{specialist.priceOffline} ₴/год</span>
              </div>
            </RadioGroup>
          </div>

          {/* Date Selection */}
          <div className="space-y-3">
            <Label>Оберіть дату</Label>
            <div className="flex justify-center rounded-lg border p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
                disabled={hasReachedLimit}
              />
            </div>
          </div>

          {/* Time Selection */}
          <div className="space-y-3">
            <Label>Оберіть час</Label>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setSelectedTime(time)}
                  disabled={hasReachedLimit}
                >
                  <Clock className="mr-1 h-3 w-3" />
                  {time}
                </Button>
              ))}
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-3">
            <Label htmlFor="phone">Контактний телефон (обов'язково)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+380..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={hasReachedLimit}
              required
            />
          </div>

          {/* Message */}
          <div className="space-y-3">
            <Label htmlFor="message">Повідомлення спеціалісту (необов'язково)</Label>
            <Textarea
              id="message"
              placeholder="Розкажіть про свої цілі та очікування від занять..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              disabled={hasReachedLimit}
            />
          </div>

          {/* Summary */}
          {date && selectedTime && !hasReachedLimit && (
            <div className="rounded-lg border bg-muted/50 p-4">
              <h4 className="mb-3 font-medium">Деталі запису</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Дата:</span>
                  <span className="font-medium">{date.toLocaleDateString("uk-UA")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Час:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Формат:</span>
                  <Badge variant={format === "online" ? "default" : "secondary"}>
                    {format === "online" ? "Онлайн" : "Офлайн"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between border-t pt-2">
                  <span className="text-muted-foreground">Вартість:</span>
                  <span className="text-lg font-bold">
                    {format === "online" ? specialist.priceOnline : specialist.priceOffline} ₴
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => onOpenChange(false)}>
              {hasReachedLimit ? "Закрити" : "Скасувати"}
            </Button>
            <Button className="flex-1 bg-[#00c5a6] hover:bg-[#00a389] text-white" onClick={handleSubmit} disabled={!date || !selectedTime || !phone || hasReachedLimit}>
              Відправити заявку
            </Button>
          </div>

          {!hasReachedLimit && (
            <p className="text-center text-xs text-muted-foreground">
              Спеціаліст має 3 години для відповіді на ваш запит
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
