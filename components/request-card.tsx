"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, CheckCircle2, XCircle, Video, Home, Phone, MessageCircle, DollarSign } from "lucide-react"
import { useRequestStore, type CommunicationStatus, type TrialResult, type BookingRequest } from "@/lib/request-store"
import { CountdownTimer } from "./countdown-timer"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface RequestCardProps {
  request: BookingRequest
  userType: "specialist" | "client"
  onAccept?: (requestId: string) => void
  onReject?: (requestId: string) => void
  onCancel?: (requestId: string) => void
}

export function RequestCard({ request, userType, onAccept, onReject, onCancel }: RequestCardProps) {
  const displayName = (userType === "specialist" ? request.clientName : request.specialistName) ?? "—"
  const [showCommunicationDialog, setShowCommunicationDialog] = useState(false)
  const [showTrialResultDialog, setShowTrialResultDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [communicationStatus, setCommunicationStatus] = useState<CommunicationStatus>("agreed_on_trial")
  const [trialResult, setTrialResult] = useState<TrialResult>("client_continues")
  const [trialDate, setTrialDate] = useState("")
  const [trialTime, setTrialTime] = useState("")
  const [rejectReason, setRejectReason] = useState("schedule")
  const [rejectReasonOther, setRejectReasonOther] = useState("")

  const { updateCommunicationStatus, updateTrialResult, markAsPaid, expireRequest, rejectRequest } = useRequestStore()

  const paymentAmount = request.currentPrice ?? request.basePrice

  const [canMarkClientNotResponding] = useState(() => {
    if (!request.acceptedAt) return false
    const acceptedAt = new Date(request.acceptedAt).getTime()
    return Date.now() - acceptedAt >= 60 * 60 * 1000
  })

  const [isPastTrialDateTime] = useState(() => {
    if (!request.date || !request.time) return false
    const dt = new Date(`${request.date}T${request.time}`)
    return !Number.isNaN(dt.getTime()) && Date.now() >= dt.getTime()
  })

  const getStatusBadge = () => {
    // Determine subject category for color coding
    const isPsychology = request.subject === "Психологія"
    const isTutoring = ["Англійська мова", "Математика", "Фізика", "Хімія", "Історія", "Географія"].includes(request.subject)
    
    switch (request.status) {
      case "pending":
        return (
          <Badge variant="outline" className={`${isPsychology ? "text-orange-600 border-orange-600" : isTutoring ? "text-emerald-600 border-emerald-600" : "text-blue-600 border-blue-600"}`}>
            <Clock className="mr-1 h-3 w-3" />
            Очікує відповіді
          </Badge>
        )
      case "accepted":
      case "communicating":
        return (
          <Badge variant="outline" className={`${isPsychology ? "text-orange-600 border-orange-600" : isTutoring ? "text-emerald-600 border-emerald-600" : "text-blue-600 border-blue-600"}`}>
            <MessageCircle className="mr-1 h-3 w-3" />
            Комунікація
          </Badge>
        )
      case "trial_scheduled":
        return (
          <Badge variant="outline" className={`${isPsychology ? "text-orange-600 border-orange-600" : isTutoring ? "text-emerald-600 border-emerald-600" : "text-blue-600 border-blue-600"}`}>
            <Calendar className="mr-1 h-3 w-3" />
            Пробне заплановано
          </Badge>
        )
      case "trial_completed":
        return (
          <Badge variant="outline" className={`${isPsychology ? "text-orange-600 border-orange-600" : isTutoring ? "text-emerald-600 border-emerald-600" : "text-blue-600 border-blue-600"}`}>
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Пробне завершено
          </Badge>
        )
      case "awaiting_payment":
        return (
          <Badge variant="outline" className={`${isPsychology ? "text-orange-600 border-orange-600" : isTutoring ? "text-emerald-600 border-emerald-600" : "text-blue-600 border-blue-600"}`}>
            <DollarSign className="mr-1 h-3 w-3" />
            Очікує оплати
          </Badge>
        )
      case "paid":
        return (
          <Badge variant="outline" className={`${isPsychology ? "text-orange-700 border-orange-700" : isTutoring ? "text-emerald-700 border-emerald-700" : "text-blue-700 border-blue-700"}`}>
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Оплачено
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            <XCircle className="mr-1 h-3 w-3" />
            Відхилено
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="text-gray-600 border-gray-600">
            <Clock className="mr-1 h-3 w-3" />
            Прострочено
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="text-gray-600 border-gray-600">
            <XCircle className="mr-1 h-3 w-3" />
            Скасовано
          </Badge>
        )
      default:
        return null
    }
  }

  const handleCommunicationUpdate = () => {
    if (communicationStatus === "client_not_responding" && !canMarkClientNotResponding) {
      return
    }
    updateCommunicationStatus(request.id, communicationStatus, trialDate, trialTime)
    setShowCommunicationDialog(false)
  }

  const handleTrialResultUpdate = () => {
    updateTrialResult(request.id, trialResult)
    setShowTrialResultDialog(false)
  }

  const handleRejectSubmit = () => {
    const reasonText =
      rejectReason === "other"
        ? rejectReasonOther.trim()
        : rejectReason === "schedule"
          ? "Не підійшов графік"
          : rejectReason === "full"
            ? "Заповнений розклад"
            : "Інше"

    if (!reasonText) return

    rejectRequest(request.id, reasonText)
    setShowRejectDialog(false)
    setRejectReason("schedule")
    setRejectReasonOther("")
    onReject?.(request.id)
  }

  return (
    <>
      <Card className="rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md cursor-pointer hover:border-slate-300">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 rounded-xl border border-slate-100">
                <AvatarFallback className="bg-slate-100 text-slate-700 font-bold">{displayName[0] ?? "?"}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-bold text-slate-800 text-lg">{displayName}</p>
                <p className="text-sm font-medium text-slate-500 mb-2">{request.subject}</p>

                {userType === "specialist" && request.status !== "pending" && (
                  <div className="mt-2 flex flex-wrap gap-2 text-xs mb-3">
                    {request.clientPhone && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 text-slate-600 font-medium">
                        <Phone className="h-3.5 w-3.5" />
                        {request.clientPhone}
                      </div>
                    )}
                    {request.clientTelegram && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 font-medium">
                        <MessageCircle className="h-3.5 w-3.5" />
                        {request.clientTelegram}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span className="font-medium text-slate-700">{request.date}</span> <span className="text-slate-400">о</span> <span className="font-medium text-slate-700">{request.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {request.format === "online" ? <Video className="h-4 w-4 text-slate-400" /> : <Home className="h-4 w-4 text-slate-400" />}
                    <span className="font-medium text-slate-700">{request.format === "online" ? "Онлайн" : "Офлайн"}</span>
                  </div>
                </div>
                {request.message && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-sm text-slate-600 italic">"{request.message}"</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              {getStatusBadge()}

              {request.status === "pending" && (
                <CountdownTimer expiresAt={request.responseDeadline} onExpire={() => expireRequest(request.id)} />
              )}

              {(request.status === "accepted" || request.status === "communicating") &&
                request.communicationDeadline && (
                  <CountdownTimer expiresAt={request.communicationDeadline} variant="warning" />
                )}

              {request.status === "trial_completed" && request.trialResultDeadline && (
                <CountdownTimer expiresAt={request.trialResultDeadline} variant="warning" />
              )}

              {request.status === "awaiting_payment" && request.paymentDeadline && (
                <CountdownTimer expiresAt={request.paymentDeadline} variant="danger" />
              )}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            {request.status === "pending" && userType === "specialist" && onAccept && onReject && (
              <>
                <Button size="sm" variant="outline" onClick={() => setShowRejectDialog(true)} className="flex-1 rounded-xl border-slate-200 hover:bg-slate-50 hover:text-red-600 hover:border-red-200">
                  <XCircle className="mr-2 h-4 w-4" />
                  Відхилити
                </Button>
                <Button size="sm" onClick={() => onAccept(request.id)} className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-100">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Прийняти
                </Button>
              </>
            )}

            {(request.status === "accepted" || request.status === "communicating") && userType === "specialist" && (
              <Button size="sm" onClick={() => setShowCommunicationDialog(true)} className="w-full rounded-xl bg-slate-800 text-white hover:bg-slate-700">
                <MessageCircle className="mr-2 h-4 w-4" />
                Оновити статус комунікації
              </Button>
            )}

            {request.status === "trial_scheduled" && userType === "specialist" && isPastTrialDateTime && (
              <Button size="sm" onClick={() => setShowTrialResultDialog(true)} className="w-full rounded-xl bg-slate-800 text-white hover:bg-slate-700">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Чи відбувся урок?
              </Button>
            )}

            {request.status === "trial_completed" && userType === "specialist" && !request.trialResult && (
              <Button size="sm" onClick={() => setShowTrialResultDialog(true)} className="w-full rounded-xl bg-slate-800 text-white hover:bg-slate-700">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Вказати результат пробного
              </Button>
            )}

            {request.status === "awaiting_payment" && userType === "specialist" && (
              <Button
                size="sm"
                onClick={() => markAsPaid(request.id)}
                className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-100"
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Оплатити заявку{typeof paymentAmount === "number" ? ` (${paymentAmount} грн)` : ""}
              </Button>
            )}

            {request.status === "pending" && userType === "client" && onCancel && (
              <Button size="sm" variant="outline" onClick={() => onCancel(request.id)} className="w-full rounded-xl border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900">
                <XCircle className="mr-2 h-4 w-4" />
                Скасувати запит
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showCommunicationDialog} onOpenChange={setShowCommunicationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Оновити статус комунікації</DialogTitle>
            <DialogDescription>Вкажіть результат спілкування з клієнтом</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <RadioGroup
              value={communicationStatus}
              onValueChange={(v) => setCommunicationStatus(v as CommunicationStatus)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="agreed_on_trial" id="agreed" />
                <Label htmlFor="agreed">Домовились на пробне</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="negotiating" id="negotiating" />
                <Label htmlFor="negotiating">Узгоджуємо час</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="client_not_responding" id="not_responding" disabled={!canMarkClientNotResponding} />
                <Label htmlFor="not_responding">Клієнт не відповідає</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="client_cancelled" id="client_cancelled" />
                <Label htmlFor="client_cancelled">Клієнт скасував</Label>
              </div>
            </RadioGroup>

            {communicationStatus === "agreed_on_trial" && (
              <div className="space-y-2">
                <Label>Дата та час пробного</Label>
                <div className="flex gap-2">
                  <Input type="date" value={trialDate} onChange={(e) => setTrialDate(e.target.value)} />
                  <Input type="time" value={trialTime} onChange={(e) => setTrialTime(e.target.value)} />
                </div>
              </div>
            )}

            {!canMarkClientNotResponding && (
              <p className="text-xs text-muted-foreground">
                Опція “Клієнт не відповідає” доступна через 1 годину після прийняття заявки.
              </p>
            )}

            <Button
              onClick={handleCommunicationUpdate}
              className="w-full"
              disabled={communicationStatus === "client_not_responding" && !canMarkClientNotResponding}
            >
              Зберегти
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Причина відхилення</DialogTitle>
            <DialogDescription>Оберіть причину, це важливо для аналітики</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <RadioGroup value={rejectReason} onValueChange={setRejectReason}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="schedule" id="reject_schedule" />
                <Label htmlFor="reject_schedule">Не підійшов графік</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full" id="reject_full" />
                <Label htmlFor="reject_full">Заповнений розклад</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="reject_other" />
                <Label htmlFor="reject_other">Інше</Label>
              </div>
            </RadioGroup>

            {rejectReason === "other" && (
              <div className="space-y-2">
                <Label htmlFor="reject_other_text">Опишіть причину</Label>
                <Input
                  id="reject_other_text"
                  value={rejectReasonOther}
                  onChange={(e) => setRejectReasonOther(e.target.value)}
                />
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowRejectDialog(false)}>
                Скасувати
              </Button>
              <Button
                className="flex-1"
                onClick={handleRejectSubmit}
                disabled={rejectReason === "other" ? rejectReasonOther.trim().length === 0 : false}
              >
                Відхилити
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showTrialResultDialog} onOpenChange={setShowTrialResultDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Результат пробного заняття</DialogTitle>
            <DialogDescription>Вкажіть результат пробного заняття з клієнтом</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <RadioGroup value={trialResult} onValueChange={(v) => setTrialResult(v as TrialResult)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="client_continues" id="continues" />
                <Label htmlFor="continues">Клієнт продовжує (потрібна оплата)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="client_declined" id="declined" />
                <Label htmlFor="declined">Клієнт не підходить / відмова</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="client_thinking" id="thinking" />
                <Label htmlFor="thinking">Думає / ще пробні</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="client_not_responding" id="no_response" />
                <Label htmlFor="no_response">Не відповідає</Label>
              </div>
            </RadioGroup>

            <Button onClick={handleTrialResultUpdate} className="w-full">
              Зберегти
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
