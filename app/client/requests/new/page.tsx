"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useRequestStore } from "@/lib/request-store"
import { useDictionaryStore } from "@/lib/dictionary-store"

export default function ClientNewRequestPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { addRequest, getActiveTrialCount } = useRequestStore()
  const { subjects: dictionarySubjects } = useDictionaryStore()

  const children = [
    { id: "child-1", label: "Марія, 12 років" },
    { id: "child-2", label: "Іван, 9 років" },
  ]
  const subjects = dictionarySubjects.length
    ? dictionarySubjects.map((item) => item.name)
    : ["Англійська мова", "Математика", "Українська мова", "Психологія", "Логопедія"]

  const initialChild = searchParams.get("child") || children[0].id
  const selectedChildId = children.find((child) => child.id === initialChild)?.id || children[0].id
  const selectedSpecialist = searchParams.get("specialist")

  const [subject, setSubject] = useState(subjects[0])
  const [format, setFormat] = useState<"online" | "offline">("online")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [message, setMessage] = useState("")
  const [leadType, setLeadType] = useState<"private" | "public">(selectedSpecialist ? "private" : "public")
  const selectedSubject = dictionarySubjects.find((item) => item.name === subject)
  const subjectLevels = selectedSubject?.levels ?? []
  const [level, setLevel] = useState(subjectLevels[0]?.label || "")

  useEffect(() => {
    if (subjectLevels.length === 0) {
      setLevel("")
      return
    }
    if (!subjectLevels.some((item) => item.label === level)) {
      setLevel(subjectLevels[0]?.label || "")
    }
  }, [level, subjectLevels])

  const activeTrials = useMemo(() => getActiveTrialCount(selectedChildId), [getActiveTrialCount, selectedChildId])

  const handleSubmit = () => {
    if (!subject || !date || !time || (subjectLevels.length > 0 && !level)) {
      toast({
        title: "Заповніть обов'язкові поля",
        description: "Предмет, рівень, дата та час є обов'язковими",
        variant: "destructive",
      })
      return
    }

    addRequest({
      type: leadType,
      clientId: selectedChildId,
      clientName: children.find((child) => child.id === selectedChildId)?.label.split(",")[0] || "Клієнт",
      specialistId: leadType === "private" ? selectedSpecialist || "specialist-1" : null,
      specialistName: leadType === "private" ? "Обраний спеціаліст" : undefined,
      subject,
      level: level || undefined,
      date,
      time,
      format,
      message: message || undefined,
    })

    toast({
      title: "Запит створено",
      description: leadType === "public" ? "Запит відправлено на біржу" : "Запит відправлено спеціалісту",
    })

    router.push(`/client/requests?child=${selectedChildId}`)
  }

  return (
    <ProtectedRoute allowedRoles={["client"]}>
      <SidebarLayout userType="client">
        <div className="container mx-auto max-w-4xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">Новий запит</h1>
            <p className="text-muted-foreground">Заповніть деталі для створення запиту на заняття</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ключові умови</CardTitle>
              <CardDescription>Оберіть учня та формат заняття</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {children.map((child) => (
                  <Button
                    key={child.id}
                    variant={child.id === selectedChildId ? "default" : "outline"}
                    size="sm"
                    onClick={() => router.push(`/client/requests/new?child=${child.id}${selectedSpecialist ? `&specialist=${selectedSpecialist}` : ""}`)}
                  >
                    {child.label}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant={leadType === "public" ? "default" : "outline"}>Публічний запит</Badge>
                <Badge variant={leadType === "private" ? "default" : "outline"}>Приватний запит</Badge>
                {selectedSpecialist && <Badge variant="secondary">Спеціаліст: {selectedSpecialist}</Badge>}
              </div>
              <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                Активних пробних занять: <span className="font-semibold">{activeTrials}</span>. Рекомендуємо не більше 3
                одночасно.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Деталі запиту</CardTitle>
              <CardDescription>Інформація для спеціаліста</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Предмет *</Label>
                <Select value={subject} onValueChange={(value) => setSubject(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Оберіть предмет" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Дата *</Label>
                  <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Час *</Label>
                  <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
              </div>

              {subjectLevels.length > 0 && (
                <div className="space-y-2">
                  <Label>Рівень підготовки *</Label>
                  <Select value={level} onValueChange={(value) => setLevel(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Оберіть рівень" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjectLevels.map((item) => (
                        <SelectItem key={item.id} value={item.label}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label>Формат</Label>
                <Select value={format} onValueChange={(value) => setFormat(value as "online" | "offline")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Оберіть формат" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Онлайн</SelectItem>
                    <SelectItem value="offline">Офлайн</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Повідомлення</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Опишіть цілі, побажання або особливості дитини..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={() => router.back()} className="rounded-full">
              Скасувати
            </Button>
            <Button onClick={handleSubmit} className="rounded-full">
              Створити запит
            </Button>
          </div>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
