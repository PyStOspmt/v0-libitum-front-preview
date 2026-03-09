"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLessonStore } from "@/lib/lesson-store"
import { BookOpen, Plus, Upload, CheckCircle, Clock, Star, Tag, X, Link as LinkIcon, FileText, FileText as FileIcon } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { UserRoles } from "@/graphql/generated/graphql"
import { useTheme } from "@/providers/theme-provider"
import { useAuthContext } from "@/features/auth/context/auth-context"

const lessonTags = [
  { id: "tag-1", text: "Мені пора на пенсію - ти краще вчителя!", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  { id: "tag-2", text: "Забуваємо цей урок як страшний сон. Чекаю на камбек.", color: "bg-rose-100 text-rose-800 border-rose-200" },
  { id: "tag-3", text: "Стабільно добре, але є куди рости.", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { id: "tag-4", text: "Сьогодні ти перевершив(ла) себе!", color: "bg-amber-100 text-amber-800 border-amber-200" },
]

const isExternalUrl = (value: string) => /^https?:\/\//i.test(value)

export function TutorJournalPage() {
  const { user } = useAuthContext()
  const { theme } = useTheme()
  const { lessons, checkHomework } = useLessonStore()
  const { toast } = useToast()
  const [selectedHomework, setSelectedHomework] = useState<any>(null)
  const [grade, setGrade] = useState("5")
  const [feedback, setFeedback] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Create / Edit modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingHomeworkId, setEditingHomeworkId] = useState<string | null>(null)
  const [newHwTitle, setNewHwTitle] = useState("")
  const [newHwDesc, setNewHwDesc] = useState("")
  const [newHwDueDate, setNewHwDueDate] = useState("")
  const [newHwClient, setNewHwClient] = useState("")
  const [attachments, setAttachments] = useState<{ name: string, type: "file" | "link" }[]>([])
  const [newLink, setNewLink] = useState("")
  const [showLinkInput, setShowLinkInput] = useState(false)

  const tutorId = user?.id || "specialist-1"
  const tutorLessons = lessons.filter((l) => l.specialistId === tutorId)

  // Get active clients for the dropdown (deduped by id)
  const activeClients = Object.values(
    tutorLessons.reduce<Record<string, { id: string; name: string }>>((acc, lesson) => {
      if (!acc[lesson.clientId]) {
        acc[lesson.clientId] = { id: lesson.clientId, name: lesson.clientName }
      }
      return acc
    }, {}),
  )

  const homeworks = tutorLessons
    .filter((l) => l.homework)
    .map((l) => ({ ...l.homework, lessonId: l.id, lessonDate: l.date, subject: l.subject, clientName: l.clientName }))

  const submittedHomeworks = homeworks.filter((h) => h.status === "submitted")
  const checkedHomeworks = homeworks.filter((h) => h.status === "checked")
  const actualPendingHomeworks = homeworks.filter((h) => h.status === "pending")

  // Demo data for empty states
  const demoPendingHomeworks = [
    {
      id: "demo-pend-1",
      lessonId: "demo-lesson-1",
      title: "Презентація 'Моє хобі'",
      description: "Підготувати коротку презентацію на 5 слайдів про своє захоплення англійською.",
      subject: "Англійська мова",
      clientName: "Марія Коваленко",
      status: "pending",
      dueDate: "2026-03-12T12:00:00.000Z",
      attachments: [] as { name: string, type: "file" | "link" }[],
    },
    {
      id: "demo-pend-2",
      lessonId: "demo-lesson-2",
      title: "Рівняння з дробами",
      description: "Розв'язати 10 рівнянь з робочого зошита (стор. 45).",
      subject: "Математика",
      clientName: "Іван Петренко",
      status: "pending",
      dueDate: "2026-03-01T12:00:00.000Z",
      attachments: [{ name: "Основи_дробів.pdf", type: "file" }] as { name: string, type: "file" | "link" }[],
    }
  ]

  const pendingHomeworks = actualPendingHomeworks.length > 0 ? actualPendingHomeworks : demoPendingHomeworks

  const handleCheckHomework = () => {
    if (!selectedHomework) return

    // В реальному додатку тег також зберігатиметься, тут додаємо його до тексту відгуку для демонстрації
    const finalFeedback = selectedTag
      ? `${feedback}\n\nТег заняття: ${lessonTags.find(t => t.id === selectedTag)?.text}`
      : feedback

    checkHomework(selectedHomework.lessonId, Number.parseInt(grade), finalFeedback)

    toast({
      title: "Роботу перевірено",
      description: "Оцінка, відгук та звіт відправлені учню/батькам",
    })

    setSelectedHomework(null)
    setGrade("5")
    setFeedback("")
    setSelectedTag(null)
  }

  const handleCreateHomework = () => {
    if (!newHwTitle || !newHwClient || !newHwDueDate) {
      toast({
        title: "Помилка",
        description: "Заповніть обов'язкові поля",
        variant: "destructive",
      })
      return
    }

    const clientExists = activeClients.some((c) => c.id === newHwClient)
    if (!clientExists) {
      toast({
        title: "Учня не знайдено",
        description: "Оберіть учня зі списку активних",
        variant: "destructive",
      })
      return
    }

    if (editingHomeworkId) {
      toast({
        title: "Завдання оновлено",
        description: `Завдання "${newHwTitle}" успішно оновлено`,
      })
    } else {
      toast({
        title: "Завдання створено",
        description: `Завдання "${newHwTitle}" відправлено учню`,
      })
    }

    setIsCreateModalOpen(false)
    setEditingHomeworkId(null)
    setNewHwTitle("")
    setNewHwDesc("")
    setNewHwDueDate("")
    setNewHwClient("")
    setAttachments([])
    setNewLink("")
    setShowLinkInput(false)
  }

  const handleEditHomework = (hw: any) => {
    setEditingHomeworkId(hw.id)
    setNewHwTitle(hw.title)
    setNewHwDesc(hw.description)

    // Format date properly if it exists
    if (hw.dueDate) {
      try {
        const dateObj = new Date(hw.dueDate)
        setNewHwDueDate(dateObj.toISOString().split('T')[0])
      } catch {
        setNewHwDueDate("")
      }
    } else {
      setNewHwDueDate("")
    }

    // Find client ID by name for the select dropdown (fallback to first client if not found)
    const client = activeClients.find(c => c.name === hw.clientName)
    setNewHwClient(client ? client.id : (activeClients[0]?.id || ""))

    setAttachments(hw.attachments || [])
    setIsCreateModalOpen(true)
  }

  const handleAddLink = () => {
    if (newLink.trim()) {
      setAttachments([...attachments, { name: newLink, type: "link" }])
      setNewLink("")
      setShowLinkInput(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map(file => ({ name: file.name, type: "file" as const }))
      setAttachments([...attachments, ...newFiles])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600">
            <Clock className="mr-1 h-3 w-3" />
            Очікує здачі
          </Badge>
        )
      case "submitted":
        return (
          <Badge variant="outline" className="text-blue-600">
            <Upload className="mr-1 h-3 w-3" />
            Потрібно перевірити
          </Badge>
        )
      case "checked":
        return (
          <Badge variant="outline" className="text-green-600">
            <CheckCircle className="mr-1 h-3 w-3" />
            Перевірено
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <ProtectedRoute allowedRoles={[UserRoles.Specialist]}>
      <SidebarLayout userType="tutor">
        <div className="container mx-auto max-w-[1200px] space-y-8 p-6 font-sans">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-[32px] font-bold text-[#121117] tracking-tight">Журнал та ДЗ</h1>
              <p className="text-[16px] text-[#69686f] mt-1">Управління домашніми завданнями та матеріалами</p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)} className="h-[48px] px-6 rounded-[8px] bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-hover)] text-white font-[600] text-[16px] transition-colors shadow-sm shrink-0">
              <Plus className="mr-2 h-5 w-5" />
              Створити завдання
            </Button>
          </div>

          <Tabs defaultValue="submitted" className="w-full">
            <TabsList className="flex w-full flex-col sm:flex-row h-auto sm:h-[48px] bg-[#f0f3f3] rounded-[12px] p-1 gap-1">
              <TabsTrigger value="submitted" className="w-full rounded-[8px] text-[15px] font-[600] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm text-[#69686f] py-2 sm:py-0">На перевірці ({submittedHomeworks.length})</TabsTrigger>
              <TabsTrigger value="checked" className="w-full rounded-[8px] text-[15px] font-[600] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm text-[#69686f] py-2 sm:py-0">Перевірені ({checkedHomeworks.length})</TabsTrigger>
              <TabsTrigger value="pending" className="w-full rounded-[8px] text-[15px] font-[600] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm text-[#69686f] py-2 sm:py-0">Очікують ({pendingHomeworks.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="submitted" className="space-y-4 mt-6">
              {submittedHomeworks.length > 0 ? (
                <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                  {submittedHomeworks.map((hw) => (
                    <Card key={hw.id} className="border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-[20px] transition-all hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1.5">
                            <CardTitle className="text-[18px] text-[#121117]">{hw.title}</CardTitle>
                            <CardDescription className="text-[14px] text-[#69686f] font-[500]">
                              {hw.clientName} • <span className="text-[var(--theme-primary)]">{hw.subject}</span>
                            </CardDescription>
                          </div>
                          <Badge className="bg-[#e3f2fd] text-[#1976d2] border-0 px-2.5 py-1 rounded-[6px] shrink-0 font-[600]">
                            Потребує уваги
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        <div className="bg-[#f8f9fb] p-4 rounded-[12px]">
                          <p className="text-[14px] text-[#121117] leading-relaxed">{hw.description}</p>
                          {hw.attachments && hw.attachments.length > 0 && (
                            <div className="mt-3 space-y-2 pt-3 border-t border-slate-200/60">
                              <p className="text-[12px] font-[700] uppercase tracking-[0.08em] text-[#69686f]">Матеріали до ДЗ</p>
                              <div className="flex flex-wrap gap-2">
                                {hw.attachments.map((file: any, idx: number) => {
                                  const isLink = file.type === "link" && isExternalUrl(file.name)
                                  const content = (
                                    <>
                                      {file.type === "link" ? <LinkIcon className="h-3 w-3 text-blue-500" /> : <FileText className="h-3 w-3 text-[#00c5a6]" />}
                                      <span className="max-w-[220px] truncate">{file.name}</span>
                                    </>
                                  )

                                  return isLink ? (
                                    <a key={idx} href={file.name} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-[6px] text-[12px] font-[500] text-[#121117] hover:border-[#00c5a6] hover:text-[#00c5a6] transition-colors">
                                      {content}
                                    </a>
                                  ) : (
                                    <div key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-[6px] text-[12px] font-[500] text-[#121117]">
                                      {content}
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center text-[13px] font-[500] text-[#69686f]">
                          <Clock className="mr-1.5 h-4 w-4" />
                          Здано: {hw.submittedAt ? new Date(hw.submittedAt).toLocaleDateString("uk-UA") : "-"}
                        </div>
                        <Button className="w-full h-[44px] rounded-[8px] bg-[#121117] hover:bg-[#121117]/90 text-white font-[600] transition-colors" onClick={() => setSelectedHomework(hw)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Перевірити роботу
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-[20px] border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <div className="h-16 w-16 bg-[var(--theme-primary-light)] rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-[var(--theme-primary)]" />
                    </div>
                    <p className="text-[18px] font-bold text-[#121117]">Немає робіт на перевірці</p>
                    <p className="text-[14px] text-[#69686f] mt-1">Ви перевірили всі здані завдання</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="checked" className="space-y-4 mt-6">
              {checkedHomeworks.length > 0 ? (
                <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                  {checkedHomeworks.map((hw) => (
                    <Card key={hw.id} className="border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-[20px]">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1.5">
                            <CardTitle className="text-[18px] text-[#121117]">{hw.title}</CardTitle>
                            <CardDescription className="text-[14px] text-[#69686f] font-[500]">
                              {hw.clientName} • <span className="text-[var(--theme-primary-dark)]">{hw.subject}</span>
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-1 bg-[#fff8e1] px-3 py-1.5 rounded-[8px] text-[#f57c00] font-bold">
                            <Star className="h-4 w-4 fill-[#f57c00]" />
                            <span className="text-[16px]">{hw.grade}</span><span className="text-[12px] opacity-70">/5</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        <p className="text-[14px] text-[#69686f] leading-relaxed line-clamp-2">{hw.description}</p>
                        {hw.attachments && hw.attachments.length > 0 && (
                          <div className="rounded-[12px] bg-[#f8f9fb] p-4 border border-slate-200/50">
                            <p className="text-[13px] font-[600] text-[#121117] mb-2">Матеріали до завдання:</p>
                            <div className="flex flex-wrap gap-2">
                              {hw.attachments.map((file: any, idx: number) => {
                                const isLink = file.type === "link" && isExternalUrl(file.name)
                                const content = (
                                  <>
                                    {file.type === "link" ? <LinkIcon className="h-3.5 w-3.5 text-blue-500" /> : <FileText className="h-3.5 w-3.5 text-[#00c5a6]" />}
                                    <span className="max-w-[220px] truncate">{file.name}</span>
                                  </>
                                )

                                return isLink ? (
                                  <a key={idx} href={file.name} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-[6px] text-[12px] font-[500] text-[#121117] hover:border-[#00c5a6] hover:text-[#00c5a6] transition-colors">
                                    {content}
                                  </a>
                                ) : (
                                  <div key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-[6px] text-[12px] font-[500] text-[#121117]">
                                    {content}
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}
                        {hw.feedback && (
                          <div className="rounded-[12px] bg-[#f0f3f3] p-4 border border-slate-200/50">
                            <p className="text-[13px] font-[600] text-[#121117] mb-1.5">Ваш відгук та звіт:</p>
                            <p className="text-[14px] text-[#69686f] leading-relaxed">{hw.feedback}</p>
                          </div>
                        )}
                        <div className="flex items-center text-[13px] font-[500] text-[#69686f]">
                          <CheckCircle className="mr-1.5 h-4 w-4 text-[var(--theme-primary)]" />
                          Перевірено: {hw.checkedAt ? new Date(hw.checkedAt).toLocaleDateString("uk-UA") : "-"}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-[20px] border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <div className="h-16 w-16 bg-[#f0f3f3] rounded-full flex items-center justify-center mb-4">
                      <BookOpen className="h-8 w-8 text-[#69686f]" />
                    </div>
                    <p className="text-[18px] font-bold text-[#121117]">Поки що немає перевірених робіт</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4 mt-6">
              {pendingHomeworks.length > 0 ? (
                <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                  {pendingHomeworks.map((hw) => (
                    <Card key={hw.id} className="border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-[20px] transition-all hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] group">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1.5 flex-1 min-w-0">
                            <CardTitle className="text-[18px] text-[#121117] truncate" title={hw.title}>{hw.title}</CardTitle>
                            <CardDescription className="text-[14px] text-[#69686f] font-[500] truncate">
                              {hw.clientName} • <span className="text-[var(--theme-primary)]">{hw.subject}</span>
                            </CardDescription>
                          </div>
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <Badge className="bg-[#fff3e0] text-[#f57c00] border-0 px-2.5 py-1 rounded-[6px] font-[600]">
                              Очікує виконання
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditHomework(hw)}
                              className="h-7 text-xs text-slate-400 hover:text-blue-600 hover:bg-blue-50 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              Редагувати
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-[#f8f9fb] p-4 rounded-[12px]">
                          <p className="text-[14px] text-[#121117] leading-relaxed line-clamp-3" title={hw.description}>{hw.description}</p>
                          {hw.attachments && hw.attachments.length > 0 && (
                            <div className="mt-3 space-y-2 pt-3 border-t border-slate-200/60">
                              <p className="text-[12px] font-[700] uppercase tracking-[0.08em] text-[#69686f]">Матеріали до ДЗ</p>
                              <div className="flex flex-wrap gap-2">
                                {hw.attachments.map((file: any, idx: number) => {
                                  const isLink = file.type === "link" && isExternalUrl(file.name)
                                  const content = (
                                    <>
                                      {file.type === "link" ? <LinkIcon className="h-3 w-3 text-blue-500" /> : <FileText className="h-3 w-3 text-[#00c5a6]" />}
                                      <span className="max-w-[220px] truncate">{file.name}</span>
                                    </>
                                  )

                                  return isLink ? (
                                    <a key={idx} href={file.name} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-[6px] text-[12px] font-[500] text-[#121117] hover:border-[#00c5a6] hover:text-[#00c5a6] transition-colors">
                                      {content}
                                    </a>
                                  ) : (
                                    <div key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-[6px] text-[12px] font-[500] text-[#121117]">
                                      {content}
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[13px] font-[600] text-[#69686f] bg-white border border-slate-200 px-3 py-2 rounded-[8px] inline-flex">
                          <Clock className="h-4 w-4 text-[var(--theme-primary)]" />
                          <span>Здати до: {hw.dueDate ? new Date(hw.dueDate).toLocaleDateString("uk-UA") : "-"}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-[20px] border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <div className="h-16 w-16 bg-[var(--theme-primary-light)] rounded-full flex items-center justify-center mb-4">
                      <Clock className="h-8 w-8 text-[var(--theme-primary)]" />
                    </div>
                    <p className="text-[18px] font-bold text-[#121117]">Всі завдання здані</p>
                    <p className="text-[14px] text-[#69686f] mt-1">Ваші учні успішно виконали всі завдання</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Check Homework Dialog */}
        <Dialog open={!!selectedHomework} onOpenChange={() => {
          setSelectedHomework(null)
          setSelectedTag(null)
        }}>
          <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-[24px] font-sans border-slate-200/80 max-h-[90vh] flex flex-col">
            <DialogHeader className="px-6 py-5 border-b border-slate-100 flex-shrink-0">
              <DialogTitle className="text-[20px] font-bold text-[#121117]">Звіт про заняття та ДЗ</DialogTitle>
              <DialogDescription className="text-[14px] text-[#69686f] mt-1">
                {selectedHomework?.clientName} • {selectedHomework?.title}
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="space-y-6">
                <div className="bg-[#f0f3f3] p-5 rounded-[16px] space-y-4 border border-slate-200/50">
                  <div className="space-y-1.5">
                    <Label className="text-[13px] font-[600] text-[#69686f] uppercase tracking-wider">Завдання</Label>
                    <p className="text-[15px] text-[#121117] leading-relaxed">{selectedHomework?.description}</p>
                  </div>

                  {selectedHomework?.attachments && selectedHomework.attachments.length > 0 && (
                    <div className="pt-3 border-t border-slate-200">
                      <Label className="text-[13px] font-[600] text-[#69686f] uppercase tracking-wider mb-2 block">Матеріали від викладача</Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedHomework.attachments.map((file: any, idx: number) => {
                          const isLink = file.type === "link" && isExternalUrl(file.name)
                          const content = (
                            <>
                              {file.type === "link" ? <LinkIcon className="h-4 w-4 text-blue-500" /> : <FileText className="h-4 w-4 text-[#00c5a6]" />}
                              <span className="max-w-[240px] truncate">{file.name}</span>
                            </>
                          )

                          return isLink ? (
                            <a key={idx} href={file.name} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-[8px] text-[13px] font-[500] text-[#121117] hover:border-[#00c5a6] hover:text-[#00c5a6] transition-colors shadow-sm">
                              {content}
                            </a>
                          ) : (
                            <div key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-[8px] text-[13px] font-[500] text-[#121117] shadow-sm">
                              {content}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {selectedHomework?.submittedFiles && selectedHomework.submittedFiles.length > 0 && (
                    <div className="pt-3 border-t border-slate-200">
                      <Label className="text-[13px] font-[600] text-[#69686f] uppercase tracking-wider mb-2 block">Здані матеріали</Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedHomework.submittedFiles.map((file: string, idx: number) => {
                          const isLink = isExternalUrl(file)

                          return isLink ? (
                            <a key={idx} href={file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-[8px] text-[13px] font-[500] text-[#121117] hover:border-[#00c5a6] hover:text-[#00c5a6] transition-colors shadow-sm">
                              <LinkIcon className="h-4 w-4 text-blue-500" />
                              <span className="max-w-[240px] truncate">{file}</span>
                            </a>
                          ) : (
                            <div key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-[8px] text-[13px] font-[500] text-[#121117] shadow-sm">
                              <FileText className="h-4 w-4 text-[#00c5a6]" />
                              <span className="max-w-[240px] truncate">{file}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-[14px] text-[#69686f] font-[500] pt-2">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      Здано: {selectedHomework?.submittedAt ? new Date(selectedHomework.submittedAt).toLocaleString("uk-UA", { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' }) : "-"}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="grade" className="text-[15px] font-[600] text-[#121117]">Оцінка *</Label>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {[1, 2, 3, 4, 5].map((g) => (
                      <button
                        key={g}
                        type="button"
                        className={cn(
                          "flex-1 min-w-[50px] h-[48px] rounded-[12px] border-2 font-[600] text-[16px] flex items-center justify-center gap-1.5 transition-all",
                          grade === g.toString()
                            ? "border-[#ffb74d] bg-[#fff8e1] text-[#f57c00]"
                            : "border-slate-200 bg-white text-[#69686f] hover:border-slate-300 hover:bg-slate-50"
                        )}
                        onClick={() => setGrade(g.toString())}
                      >
                        {grade === g.toString() ? (
                          <Star className="h-5 w-5 fill-current" />
                        ) : (
                          <Star className="h-5 w-5" />
                        )}
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-[15px] font-[600] text-[#121117]">Оцінка заняття одним тегом</Label>
                  <div className="flex flex-wrap gap-2">
                    {lessonTags.map((tag) => (
                      <button
                        key={tag.id}
                        onClick={() => setSelectedTag(tag.id === selectedTag ? null : tag.id)}
                        className={cn(
                          "px-4 py-2 rounded-[12px] text-[13px] font-[500] transition-all border",
                          tag.id === selectedTag
                            ? tag.color
                            : "bg-white border-slate-200 text-[#69686f] hover:bg-slate-50"
                        )}
                      >
                        {tag.text}
                      </button>
                    ))}
                  </div>
                  <p className="text-[13px] text-[#69686f]">Цей тег буде видно учню та батькам у їхньому кабінеті</p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="feedback" className="text-[15px] font-[600] text-[#121117]">Коментар до ДЗ та звіт для батьків *</Label>
                  <Textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Опишіть як пройшло заняття, що вдалося добре, над чим треба попрацювати. Цей звіт буде автоматично відправлено батькам в Telegram..."
                    rows={5}
                    className="rounded-[12px] border-slate-200 focus-visible:ring-[#00c5a6] resize-none text-[15px] p-4"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 mt-auto flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedHomework(null)
                  setSelectedTag(null)
                }}
                className="h-[44px] w-full sm:w-auto px-6 rounded-[8px] border-2 border-[#121117] text-[#121117] font-[600]"
              >
                Скасувати
              </Button>
              <Button
                onClick={handleCheckHomework}
                disabled={!grade || !feedback}
                className="h-[44px] w-full sm:w-auto px-6 rounded-[8px] bg-[#121117] hover:bg-[#121117]/90 text-white font-[600]"
              >
                Зберегти звіт
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Homework Modal */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="max-w-md rounded-[24px] p-8 font-sans">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-[24px] font-bold text-[#121117]">Нове завдання</DialogTitle>
              <DialogDescription className="text-[15px] text-[#69686f]">
                Завдання буде відображено в кабінеті учня
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-2">
              <div className="space-y-2">
                <Label htmlFor="hw-client" className="text-[14px] font-[600] text-[#121117]">Учень *</Label>
                <Select value={newHwClient} onValueChange={setNewHwClient}>
                  <SelectTrigger id="hw-client" className="h-[48px] rounded-[8px] border-slate-200">
                    <SelectValue placeholder="Оберіть учня" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[12px]">
                    {activeClients.map(client => (
                      <SelectItem key={client.id} value={client.id} className="rounded-[8px]">{client.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hw-title" className="text-[14px] font-[600] text-[#121117]">Назва завдання *</Label>
                <Input
                  id="hw-title"
                  value={newHwTitle}
                  onChange={(e) => setNewHwTitle(e.target.value)}
                  placeholder="Наприклад: Grammar Practice Unit 5"
                  className="h-[48px] rounded-[8px] border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hw-desc" className="text-[14px] font-[600] text-[#121117]">Опис та інструкції</Label>
                <Textarea
                  id="hw-desc"
                  value={newHwDesc}
                  onChange={(e) => setNewHwDesc(e.target.value)}
                  placeholder="Що саме потрібно зробити..."
                  rows={4}
                  className="rounded-[12px] border-slate-200 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hw-due" className="text-[14px] font-[600] text-[#121117]">Термін здачі *</Label>
                <Input
                  id="hw-due"
                  type="date"
                  value={newHwDueDate}
                  onChange={(e) => setNewHwDueDate(e.target.value)}
                  className="h-[48px] rounded-[8px] border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[14px] font-[600] text-[#121117]">Додати матеріали (PDF, Audio, Image, Посилання)</Label>

                {attachments.length > 0 && (
                  <div className="flex flex-col gap-2 mb-3">
                    {attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-2.5 rounded-[8px] bg-slate-50 border border-slate-200/60">
                        <div className="flex items-center gap-2 overflow-hidden">
                          {attachment.type === 'link' ? <LinkIcon className="h-4 w-4 text-blue-500 shrink-0" /> : <FileIcon className="h-4 w-4 text-emerald-500 shrink-0" />}
                          <span className="text-[13px] font-[500] text-slate-700 truncate">{attachment.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                          onClick={() => removeAttachment(index)}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      multiple
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.webp,.mp3,.wav"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-center gap-2 h-[48px] rounded-[8px] border-2 border-dashed border-slate-200 bg-[#f8f9fb] hover:bg-slate-50 cursor-pointer transition-colors w-full text-[14px] font-[500] text-[#69686f]"
                    >
                      <Upload className="h-4 w-4 text-[var(--theme-primary)]" />
                      Завантажити файл
                    </label>
                  </div>

                  <Button
                    variant="outline"
                    className="h-[48px] px-4 rounded-[8px] border-slate-200"
                    onClick={() => setShowLinkInput(!showLinkInput)}
                  >
                    <LinkIcon className="h-4 w-4 text-[#69686f]" />
                  </Button>
                </div>

                {showLinkInput && (
                  <div className="flex gap-2 mt-2 animate-in fade-in slide-in-from-top-2">
                    <Input
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                      placeholder="Вставте посилання..."
                      className="h-[40px] rounded-[8px] border-slate-200"
                      onKeyDown={(e) => e.key === 'Enter' && handleAddLink()}
                    />
                    <Button
                      onClick={handleAddLink}
                      disabled={!newLink.trim()}
                      className="h-[40px] rounded-[8px] bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-hover)] text-white"
                    >
                      Додати
                    </Button>
                  </div>
                )}
                <p className="text-[12px] text-[#69686f] mt-1">Файли до 25MB. Підтримуються: pdf, doc, jpg, png</p>
              </div>
            </div>

            <DialogFooter className="mt-6 gap-3 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
                className="flex-1 h-[48px] rounded-[8px] border-2 border-[#121117] text-[#121117] font-[600] text-[16px] hover:bg-gray-50"
              >
                Скасувати
              </Button>
              <Button
                onClick={handleCreateHomework}
                className="flex-1 h-[48px] rounded-[8px] bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-hover)] text-white font-[600] text-[16px]"
              >
                Відправити учню
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
