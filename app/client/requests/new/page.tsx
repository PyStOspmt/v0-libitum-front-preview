"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useRequestStore } from "@/lib/request-store"
import { useDictionaryStore } from "@/lib/dictionary-store"
import { useAuth } from "@/lib/auth-context"
import { DatePicker } from "@/components/ui/date-picker"
import { TimePicker } from "@/components/ui/time-picker"
import { motion } from "framer-motion"
import { TiltCard } from "@/components/home/tilt-card"
import { SquishyButton } from "@/components/home/squishy-button"
import { Calendar, Clock, ArrowRight } from "lucide-react"

/* ── Brand palette ── */
const B = {
  pri: "#009688",
  dark: "#00796B", 
  light: "#E0F2F1",
  mid: "#B2DFDB",
} as const

export default function ClientNewRequestPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { addRequest, getActiveTrialCount } = useRequestStore()
  const { subjects: dictionarySubjects } = useDictionaryStore()
  const { user } = useAuth()

  const children = [
    user ? { id: user.id, label: user.name || "Я" } : null,
    { id: "child-1", label: "Марія, 12 років" },
    { id: "child-2", label: "Іван, 9 років" },
  ].filter(Boolean) as { id: string; label: string }[]

  const subjects = dictionarySubjects.length
    ? dictionarySubjects.map((item) => item.name)
    : ["Англійська мова", "Математика", "Українська мова", "Психологія", "Логопедія"]

  const initialChild = searchParams.get("child") || (user?.id ?? children[0]?.id)
  const selectedChildId = children.find((child) => child.id === initialChild)?.id || (user?.id ?? children[0]?.id)
  const selectedSpecialist = searchParams.get("specialist")

  const [subject, setSubject] = useState(subjects[0])
  const [format, setFormat] = useState<"online" | "offline" | "in-person">("online")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [message, setMessage] = useState("")
  const [location, setLocation] = useState("")
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
    if (!subject || !date || !time || (subjectLevels.length > 0 && !level) || (format === "in-person" && !location)) {
      toast({
        title: "Заповніть обов'язкові поля",
        description: "Предмет, рівень, дата, час та місце (для виїзду) є обов'язковими",
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
      location: format === "in-person" ? location : undefined,
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
        <div className="container mx-auto max-w-4xl space-y-8 p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-2"
          >
            <h1 className="text-3xl font-bold text-slate-800">Новий запит</h1>
            <p className="text-slate-500">Заповніть деталі для створення запиту на заняття</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {children.map((child) => (
                <Button
                  key={child.id}
                  variant={child.id === selectedChildId ? "default" : "outline"}
                  size="sm"
                  onClick={() => router.push(`/client/requests/new?child=${child.id}${selectedSpecialist ? `&specialist=${selectedSpecialist}` : ""}`)}
                  className={`rounded-full transition-all ${
                    child.id === selectedChildId 
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md" 
                      : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  {child.label}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Key Conditions Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-200/80 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Ключові умови</h3>
                  <p className="text-sm text-slate-500">Оберіть учня та формат заняття</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant={leadType === "public" ? "default" : "outline"} 
                    className="rounded-full cursor-pointer hover:bg-opacity-80 transition-colors"
                    onClick={() => setLeadType("public")}
                  >
                    Публічний запит
                  </Badge>
                  <Badge 
                    variant={leadType === "private" ? "default" : "outline"} 
                    className="rounded-full cursor-pointer hover:bg-opacity-80 transition-colors"
                    onClick={() => setLeadType("private")}
                  >
                    Приватний запит
                  </Badge>
                  {selectedSpecialist && (
                    <Badge variant="secondary" className="rounded-full">
                      Спеціаліст: {selectedSpecialist}
                    </Badge>
                  )}
                </div>
                <div className="rounded-xl border border-dashed border-slate-300 p-4 bg-slate-50">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="h-4 w-4" />
                    <span>Активних пробних занять: <span className="font-semibold text-emerald-600">{activeTrials}</span></span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Рекомендуємо не більше 3 одночасно</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Request Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-amber-200/80 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Деталі запиту</h3>
                  <p className="text-sm text-slate-500">Інформація для спеціаліста</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">Предмет *</Label>
                  <Select value={subject} onValueChange={(value) => setSubject(value)}>
                    <SelectTrigger className="h-10 rounded-lg border-slate-200 hover:border-slate-300 transition-colors">
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
                    <Label className="text-sm font-medium text-slate-700">Дата *</Label>
                    <DatePicker 
                      value={date} 
                      onChange={setDate}
                      placeholder="Оберіть дату"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">Час *</Label>
                    <TimePicker 
                      value={time} 
                      onChange={setTime}
                      placeholder="Оберіть час"
                      className="h-10"
                    />
                  </div>
                </div>

                {subjectLevels.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">Рівень підготовки *</Label>
                    <Select value={level} onValueChange={(value) => setLevel(value)}>
                      <SelectTrigger className="h-10 rounded-lg border-slate-200 hover:border-slate-300 transition-colors">
                        <SelectValue placeholder="Оберіть рівень" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjectLevels.map((item) => (
                          <SelectItem key={item.id} value={item.label}>
                            {item.label}
                          </SelectItem>
                        ))}
                        <SelectItem value="custom">Інший рівень</SelectItem>
                      </SelectContent>
                    </Select>
                    {level === "custom" && (
                      <input
                        type="text"
                        value={level === "custom" ? "" : level}
                        onChange={(e) => setLevel(e.target.value)}
                        placeholder="Вкажіть ваш рівень підготовки..."
                        className="w-full h-10 px-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 outline-none text-slate-900 placeholder-slate-400 transition-colors"
                      />
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">Формат</Label>
                  <Select value={format} onValueChange={(value) => setFormat(value as "online" | "offline" | "in-person")}>
                    <SelectTrigger className="h-10 rounded-lg border-slate-200 hover:border-slate-300 transition-colors">
                      <SelectValue placeholder="Оберіть формат" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Онлайн</SelectItem>
                      <SelectItem value="offline">Офлайн</SelectItem>
                      <SelectItem value="in-person">Виїзд</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {format === "in-person" && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">Місце проведення *</Label>
                    <Textarea
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Вкажіть адресу або місце проведення заняття..."
                      rows={2}
                      className="rounded-lg border-slate-200 hover:border-slate-300 transition-colors resize-none"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">Повідомлення</Label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Опишіть цілі, побажання або особливості дитини..."
                    rows={4}
                    className="rounded-lg border-slate-200 hover:border-slate-300 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col gap-3 sm:flex-row sm:justify-end"
          >
            <Button 
              variant="outline" 
              onClick={() => router.back()} 
              className="rounded-full border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              Скасувати
            </Button>
            <SquishyButton 
              bgColor={B.pri}
              className="rounded-full px-6 py-2 inline-flex items-center gap-2"
              onClick={handleSubmit}
            >
              Створити запит
              <ArrowRight className="h-4 w-4" />
            </SquishyButton>
          </motion.div>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
