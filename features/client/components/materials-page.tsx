"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { FileText, Download, Upload, Clock, CheckCircle, AlertCircle, DollarSign, Calendar, Star, ExternalLink, BookOpen, Link as LinkIcon, X } from "lucide-react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useLessonStore } from "@/lib/lesson-store"

const isExternalUrl = (value: string) => /^https?:\/\//i.test(value)

export function ClientMaterialsPage() {
  const { user } = useAuth()
  const { lessons, submitHomework } = useLessonStore()
  const { toast } = useToast()
  const [selectedHomework, setSelectedHomework] = useState<any>(null)
  const [submissionText, setSubmissionText] = useState("")
  const [submissionFiles, setSubmissionFiles] = useState<string[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()

  const children = [
    user ? { id: user.id, label: user.name ? `${user.name} (я)` : "Я" } : null,
    { id: "child-1", label: "Марія, 12 років" },
    { id: "child-2", label: "Іван, 9 років" },
  ].filter(Boolean) as { id: string; label: string }[]

  const initialChild = searchParams.get("child") || (user?.id ?? children[0].id)
  const selectedChildId = children.find((child) => child.id === initialChild)?.id || (user?.id ?? children[0].id)

  const clientLessons = lessons.filter((l) => l.clientId === (selectedChildId || user?.id || "client-1"))
  const homeworks = clientLessons
    .filter((l) => l.homework)
    .map((l) => {
      const homework = l.homework

      return {
        ...homework,
        status: homework?.status ?? "pending",
        dueDate: homework?.dueDate ?? l.date,
        submittedAt: homework?.submittedAt ?? null,
        checkedAt: homework?.checkedAt ?? null,
        grade: homework?.grade ?? null,
        feedback: homework?.feedback ?? null,
        lessonId: l.id,
        lessonDate: l.date,
        subject: l.subject,
        specialistName: l.specialistName,
      }
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()) // Sort by deadline

  const materials = clientLessons
    .filter((l) => l.materials && l.materials.length > 0)
    .flatMap(
      (l) =>
        l.materials?.map((m) => ({
          fileName: m,
          lessonId: l.id,
          subject: l.subject,
          date: l.date ?? new Date().toISOString(),
        })) || [],
    )

  // Demo content for empty states
  const demoHomeworks = [
    {
      id: "demo-hw-1",
      title: "Есе про подорожі",
      description: "Написати 150 слів про улюблене місце. Звернути увагу на використання Present Perfect.",
      subject: "Англійська мова",
      specialistName: "Олена Іваненко",
      status: "pending" as const,
      dueDate: "2026-03-14T12:00:00.000Z",
      attachments: [{ name: "Topic_Vocabulary.pdf", type: "file" }],
      submittedFiles: [],
    },
    {
      id: "demo-hw-4",
      title: "Тригонометричні рівняння",
      description: "Розв'язати рівняння 1-10 з підручника, сторінка 45.",
      subject: "Математика",
      specialistName: "Ігор Петренко",
      status: "pending" as const,
      dueDate: "2026-03-09T12:00:00.000Z",
      attachments: [],
      submittedFiles: [],
    },
    {
      id: "demo-hw-2",
      title: "Графіки руху",
      description: "Побудувати графік V(t) для трьох сценаріїв",
      subject: "Фізика",
      specialistName: "Олександр Сидоренко",
      status: "submitted" as const,
      dueDate: "2026-03-05T12:00:00.000Z",
      submittedAt: "2026-03-04T15:30:00.000Z",
      attachments: [{ name: "Physics_Tasks.pdf", type: "file" }],
      submittedFiles: ["Відповідь_Фізика.pdf", "https://docs.google.com/document/d/demo-physics"],
    },
    {
      id: "demo-hw-3",
      title: "Вправи на дроби",
      description: "Задачі 4-8, перевірено викладачем",
      subject: "Математика",
      specialistName: "Ігор Петренко",
      status: "checked" as const,
      grade: 11, // 1-12 scale
      feedback: "Лише одна невелика помилка в знаку в задачі №6, в цілому чудово! Продовжуй в тому ж дусі.",
      checkedAt: "2026-03-03T10:00:00.000Z",
      dueDate: "2026-03-02T12:00:00.000Z",
      attachments: [],
      submittedFiles: ["Дроби_готово.jpg"],
    },
  ]

  const homeworksToRender = homeworks.length > 0 ? homeworks : demoHomeworks
  const activeHomeworks = homeworksToRender.filter(h => h.status === "pending" || h.status === "submitted")
  const checkedHomeworksList = homeworksToRender.filter(h => h.status === "checked")

  const demoMaterials = [
    { fileName: "Present_Perfect_Guide.pdf", subject: "Англійська мова", date: "2026-03-02T12:00:00.000Z" },
    { fileName: "Fractions_Practice.xlsx", subject: "Математика", date: "2026-03-01T12:00:00.000Z" },
    { fileName: "Stress_Management_Techniques.pdf", subject: "Психологія", date: "2026-02-27T12:00:00.000Z" },
  ]

  const materialsToRender = materials.length > 0 ? materials : demoMaterials
  const submittedMaterials = homeworksToRender.flatMap((hw) =>
    (hw.submittedFiles || []).map((file) => ({
      fileName: file,
      subject: hw.subject,
      title: hw.title,
      submittedAt: hw.submittedAt || hw.checkedAt || hw.dueDate,
      status: hw.status,
    })),
  )

  const handleSubmitHomework = () => {
    if (!selectedHomework) return

    submitHomework(selectedHomework.id, {
      description: submissionText,
      attachments: submissionFiles,
    })

    toast({
      title: "Завдання успішно здано!",
      description: "Ваша робота відправлена на перевірку викладачу.",
    })

    setSelectedHomework(null)
    setSubmissionText("")
    setSubmissionFiles([])
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map(file => file.name)
      setSubmissionFiles([...submissionFiles, ...newFiles])
    }
  }

  const removeSubmissionFile = (index: number) => {
    setSubmissionFiles(submissionFiles.filter((_, i) => i !== index))
  }

  const getStatusBadge = (hw: any) => {
    const isOverdue = hw.status === "pending" && new Date(hw.dueDate).getTime() < Date.now();
    
    if (isOverdue) {
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <AlertCircle className="mr-1 h-3 w-3" />
          Прострочено
        </Badge>
      )
    }

    switch (hw.status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="mr-1 h-3 w-3" />
            Очікує виконання
          </Badge>
        )
      case "submitted":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Upload className="mr-1 h-3 w-3" />
            На перевірці
          </Badge>
        )
      case "checked":
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Перевірено
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <ProtectedRoute allowedRoles={["client"]}>
      <SidebarLayout userType="client">
        <div className="container mx-auto max-w-5xl space-y-6 p-6 font-sans">
          <div>
            <h1 className="text-3xl font-bold text-[#121117]">Завдання та матеріали</h1>
            <p className="text-[#69686f] mt-1">Домашні завдання, оцінки та корисні файли від викладачів</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {children.map((child) => (
                <Button
                  key={child.id}
                  variant={child.id === selectedChildId ? "default" : "outline"}
                  size="sm"
                  onClick={() => router.push(`/client/materials?child=${child.id}`)}
                  className={`rounded-full transition-all ${
                    child.id === selectedChildId
                      ? "bg-[#00c5a6] hover:bg-[#00a389] text-white shadow-md border-0"
                      : "border-slate-200 text-[#69686f] hover:bg-slate-50"
                  }`}
                >
                  {child.label}
                </Button>
              ))}
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-[16px] border border-slate-200/80 bg-white p-4 shadow-sm">
                <p className="text-[12px] font-[700] uppercase tracking-[0.08em] text-[#69686f]">Активні завдання</p>
                <p className="mt-2 text-[24px] font-bold text-[#121117]">{activeHomeworks.length}</p>
                <p className="mt-1 text-[13px] text-[#69686f]">Тут ви бачите нові ДЗ та роботи, які вже відправлені на перевірку.</p>
              </div>
              <div className="rounded-[16px] border border-slate-200/80 bg-white p-4 shadow-sm">
                <p className="text-[12px] font-[700] uppercase tracking-[0.08em] text-[#69686f]">Матеріали від викладача</p>
                <p className="mt-2 text-[24px] font-bold text-[#121117]">{materialsToRender.length}</p>
                <p className="mt-1 text-[13px] text-[#69686f]">Конспекти, PDF, таблиці та корисні посилання для занять.</p>
              </div>
              <div className="rounded-[16px] border border-[#00c5a6]/20 bg-[#e8fffb] p-4 shadow-sm">
                <p className="text-[12px] font-[700] uppercase tracking-[0.08em] text-[#00a389]">Мої файли</p>
                <p className="mt-2 text-[24px] font-bold text-[#121117]">{submittedMaterials.length}</p>
                <p className="mt-1 text-[13px] text-[#4b5563]">Ваші завантаження дивіться у вкладці "Матеріали курсу" в блоці "Мої завантаження".</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList className="bg-[#f0f3f3] rounded-[12px] p-1 border-0 h-auto sm:h-[48px] flex-wrap sm:flex-nowrap w-full sm:w-fit">
              <TabsTrigger value="active" className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f] px-6 py-2">
                Активні завдання ({activeHomeworks.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f] px-6 py-2">
                Перевірені ({checkedHomeworksList.length})
              </TabsTrigger>
              <TabsTrigger value="materials" className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f] px-6 py-2">
                Матеріали курсу
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4 mt-6">
              {activeHomeworks.length > 0 ? (
                <div className="space-y-4">
                  {activeHomeworks.map((hw) => {
                    const isOverdue = hw.status === "pending" && new Date(hw.dueDate).getTime() < Date.now();
                    return (
                      <Card key={hw.id} className={`rounded-[20px] border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)] overflow-hidden transition-all ${isOverdue ? 'border-red-200 bg-red-50/10' : ''}`}>
                        <div className="p-5 sm:p-6">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary" className="bg-[#f0f3f3] text-[#121117] hover:bg-[#e2e8f0] border-0 font-[600]">
                                  {hw.subject}
                                </Badge>
                                <span className="text-[14px] text-[#69686f] font-[500]">{hw.specialistName}</span>
                              </div>
                              <h3 className="text-[20px] font-bold text-[#121117]">{hw.title}</h3>
                            </div>
                            <div className="flex flex-col items-start sm:items-end gap-2">
                              {getStatusBadge(hw)}
                              <div className={`flex items-center gap-1.5 text-[14px] font-[600] ${isOverdue ? 'text-red-600' : 'text-[#69686f]'}`}>
                                <Clock className="h-4 w-4" />
                                Термін: {new Date(hw.dueDate).toLocaleDateString("uk-UA")}
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-[#f8f9fb] p-4 rounded-[12px] mb-5">
                            <p className="text-[15px] text-[#121117] leading-relaxed">{hw.description}</p>
                            
                            {hw.attachments && hw.attachments.length > 0 && (
                              <div className="mt-4 pt-4 border-t border-slate-200/60 flex flex-wrap gap-2">
                                {hw.attachments.map((file, idx) => {
                                  const isLink = file.type === 'link' && isExternalUrl(file.name)
                                  const content = (
                                    <>
                                      {file.type === 'link' ? <LinkIcon className="h-4 w-4 text-blue-500" /> : <FileText className="h-4 w-4 text-[#00c5a6]" />}
                                      <span className="max-w-[220px] truncate">{file.name}</span>
                                    </>
                                  )

                                  return isLink ? (
                                    <a key={idx} href={file.name} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-[8px] text-[13px] font-[500] text-[#121117] hover:border-[#00c5a6] hover:text-[#00c5a6] transition-colors">
                                      {content}
                                    </a>
                                  ) : (
                                    <div key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-[8px] text-[13px] font-[500] text-[#121117]">
                                      {content}
                                    </div>
                                  )
                                })}
                              </div>
                            )}

                            {hw.submittedFiles && hw.submittedFiles.length > 0 && (
                              <div className="mt-4 pt-4 border-t border-slate-200/60">
                                <p className="mb-2 text-[12px] font-[700] uppercase tracking-[0.08em] text-[#69686f]">Мої завантаження</p>
                                <div className="flex flex-wrap gap-2">
                                  {hw.submittedFiles.map((file, idx) => {
                                    const isLink = isExternalUrl(file)

                                    return isLink ? (
                                      <a key={idx} href={file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-blue-200 rounded-[8px] text-[13px] font-[500] text-[#121117] hover:text-blue-600 transition-colors">
                                        <ExternalLink className="h-4 w-4 text-blue-500" />
                                        <span className="max-w-[220px] truncate">{file}</span>
                                      </a>
                                    ) : (
                                      <div key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-[8px] text-[13px] font-[500] text-[#121117]">
                                        <FileText className="h-4 w-4 text-[#00c5a6]" />
                                        <span className="max-w-[220px] truncate">{file}</span>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex justify-end">
                            {hw.status === "pending" ? (
                              <Button 
                                onClick={() => setSelectedHomework(hw)}
                                className="h-[44px] px-6 rounded-[8px] bg-[#121117] hover:bg-[#121117]/90 text-white font-[600] w-full sm:w-auto"
                              >
                                <Upload className="mr-2 h-4 w-4" />
                                Здати роботу
                              </Button>
                            ) : (
                              <div className="text-[14px] font-[500] text-[#69686f] bg-white border border-slate-200 px-4 py-2 rounded-[8px]">
                                Завдання відправлено на перевірку
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-[24px] border border-slate-200/80 shadow-sm">
                  <div className="h-16 w-16 bg-[#f0f3f3] rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-[#00c5a6]" />
                  </div>
                  <h3 className="text-[20px] font-bold text-[#121117] mb-2">Усі завдання виконано!</h3>
                  <p className="text-[#69686f]">У вас немає активних домашніх завдань на даний момент.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4 mt-6">
              {checkedHomeworksList.length > 0 ? (
                <div className="space-y-4">
                  {checkedHomeworksList.map((hw) => (
                    <Card key={hw.id} className="rounded-[20px] border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)] overflow-hidden">
                      <div className="p-5 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary" className="bg-[#f0f3f3] text-[#121117] border-0 font-[600]">
                                {hw.subject}
                              </Badge>
                              <span className="text-[14px] text-[#69686f] font-[500]">{hw.specialistName}</span>
                            </div>
                            <h3 className="text-[20px] font-bold text-[#121117]">{hw.title}</h3>
                          </div>
                          <div className="flex items-center gap-2 bg-[#fff8e1] px-4 py-2 rounded-[12px] border border-yellow-100 shrink-0">
                            <Star className="h-5 w-5 fill-[#f57c00] text-[#f57c00]" />
                            <div className="font-bold text-[#121117]">
                              <span className="text-[20px]">{hw.grade}</span>
                              <span className="text-[14px] text-[#69686f]">/12</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-[#f8f9fb] p-4 rounded-[12px] mb-4">
                          <p className="text-[14px] text-[#69686f] line-clamp-2">{hw.description}</p>
                        </div>

                        {hw.submittedFiles && hw.submittedFiles.length > 0 && (
                          <div className="mb-4 rounded-[12px] border border-slate-200/60 bg-white p-4">
                            <p className="mb-2 text-[13px] font-[600] text-[#121117]">Що ви здавали</p>
                            <div className="flex flex-wrap gap-2">
                              {hw.submittedFiles.map((file, idx) => {
                                const isLink = isExternalUrl(file)

                                return isLink ? (
                                  <a key={idx} href={file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-blue-200 rounded-[8px] text-[13px] font-[500] text-[#121117] hover:text-blue-600 transition-colors">
                                    <ExternalLink className="h-4 w-4 text-blue-500" />
                                    <span className="max-w-[220px] truncate">{file}</span>
                                  </a>
                                ) : (
                                  <div key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-[8px] text-[13px] font-[500] text-[#121117]">
                                    <FileText className="h-4 w-4 text-[#00c5a6]" />
                                    <span className="max-w-[220px] truncate">{file}</span>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        {hw.feedback && (
                          <div className="bg-[#e8fffb] p-4 rounded-[12px] border border-[#00c5a6]/20">
                            <h4 className="text-[13px] font-[700] text-[#00a389] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                              <CheckCircle className="h-4 w-4" />
                              Коментар викладача
                            </h4>
                            <p className="text-[15px] text-[#121117] leading-relaxed">{hw.feedback}</p>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-[24px] border border-slate-200/80 shadow-sm">
                  <div className="h-16 w-16 bg-[#f0f3f3] rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-[#69686f]" />
                  </div>
                  <h3 className="text-[20px] font-bold text-[#121117] mb-2">Історія порожня</h3>
                  <p className="text-[#69686f]">Тут будуть відображатись перевірені завдання та оцінки.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="materials" className="space-y-6 mt-6">
              <div className="rounded-[20px] border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-[18px] font-bold text-[#121117]">Матеріали від викладача</h3>
                    <p className="text-[14px] text-[#69686f]">Конспекти, PDF, посилання та додаткові файли до занять.</p>
                  </div>
                  <p className="text-[13px] font-[600] text-[#69686f]">{materialsToRender.length} матеріалів</p>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {materialsToRender.map((material, index) => (
                    <Card key={index} className="rounded-[14px] border-slate-200/80 shadow-sm hover:shadow-md transition-shadow group cursor-pointer" onClick={() => window.open(`/materials/${material.fileName}`, '_blank')}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-[10px] bg-[#f0f3f3] group-hover:bg-[#00c5a6] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                            <FileText className="h-5 w-5 text-[#69686f] group-hover:text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="truncate text-[14px] font-bold text-[#121117]" title={material.fileName}>{material.fileName}</h4>
                            <p className="mt-1 text-[12px] font-[600] text-[#121117]">{material.subject}</p>
                            <div className="mt-2 flex items-center justify-between gap-2 text-[12px] text-[#69686f]">
                              <span>{new Date(material.date).toLocaleDateString("uk-UA")}</span>
                              <span className="inline-flex items-center gap-1 text-[#00a389] font-[600]">
                                <ExternalLink className="h-3.5 w-3.5" />
                                Відкрити
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="rounded-[20px] border border-[#00c5a6]/20 bg-[#f8fffd] p-4 sm:p-5 shadow-sm">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-[18px] font-bold text-[#121117]">Мої завантаження</h3>
                    <p className="text-[14px] text-[#69686f]">Усі файли та посилання, які ви вже відправляли викладачам.</p>
                  </div>
                  <p className="text-[13px] font-[600] text-[#69686f]">{submittedMaterials.length} файлів</p>
                </div>

                {submittedMaterials.length > 0 ? (
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {submittedMaterials.map((file, index) => {
                      const isLink = isExternalUrl(file.fileName)

                      return (
                        <div key={`${file.fileName}-${index}`} className="rounded-[14px] border border-slate-200/70 bg-white p-4 shadow-sm">
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#e8fffb]">
                              {isLink ? <ExternalLink className="h-4.5 w-4.5 text-blue-500" /> : <Upload className="h-4.5 w-4.5 text-[#00a389]" />}
                            </div>
                            <div className="min-w-0 flex-1">
                              {isLink ? (
                                <a href={file.fileName} target="_blank" rel="noopener noreferrer" className="block truncate text-[14px] font-bold text-[#121117] hover:text-blue-600" title={file.fileName}>
                                  {file.fileName}
                                </a>
                              ) : (
                                <p className="truncate text-[14px] font-bold text-[#121117]" title={file.fileName}>{file.fileName}</p>
                              )}
                              <p className="mt-1 text-[12px] text-[#69686f]">{file.subject} • {file.title}</p>
                              <p className="mt-2 text-[12px] text-[#69686f]">
                                {file.status === "checked" ? "Перевірено" : "На перевірці"} • {new Date(file.submittedAt).toLocaleDateString("uk-UA")}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="mt-4 rounded-[16px] border border-dashed border-slate-300 bg-white p-6 text-center">
                    <p className="text-[15px] font-[600] text-[#121117]">Поки що ви ще не завантажували власні файли</p>
                    <p className="mt-1 text-[13px] text-[#69686f]">Коли здасте домашню роботу з файлами або посиланням, вони з’являться тут автоматично.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Submit Homework Dialog */}
        <Dialog open={!!selectedHomework} onOpenChange={() => {
          setSelectedHomework(null)
          setSubmissionText("")
          setSubmissionFiles([])
        }}>
          <DialogContent className="max-w-2xl rounded-[24px] p-6 sm:p-8 font-sans border-0 shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-[24px] font-bold text-[#121117]">Здача домашнього завдання</DialogTitle>
              <DialogDescription className="text-[15px] text-[#69686f]">
                {selectedHomework?.subject} • {selectedHomework?.title}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-2">
              <div className="bg-[#f0f3f3] p-4 sm:p-5 rounded-[16px] border border-slate-200/50">
                <Label className="text-[13px] font-[600] text-[#69686f] uppercase tracking-wider mb-1.5 block">Завдання</Label>
                <p className="text-[15px] text-[#121117] leading-relaxed">{selectedHomework?.description}</p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="submission" className="text-[15px] font-[600] text-[#121117]">Ваша відповідь (текст або посилання)</Label>
                <Textarea
                  id="submission"
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  placeholder="Опишіть виконану роботу або додайте посилання на Google Docs, Miro тощо..."
                  rows={4}
                  className="rounded-[12px] border-slate-200 focus-visible:ring-[#00c5a6] resize-none text-[15px] p-4"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-[15px] font-[600] text-[#121117]">Прикріпити файли (фото зошита, PDF)</Label>
                
                {submissionFiles.length > 0 && (
                  <div className="flex flex-col gap-2 mb-3">
                    {submissionFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-[12px] bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileText className="h-5 w-5 text-[#00c5a6] shrink-0" />
                          <span className="text-[14px] font-[500] text-slate-700 truncate">{file}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full h-8 w-8 p-0"
                          onClick={() => removeSubmissionFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="relative">
                  <input 
                    type="file" 
                    id="hw-upload" 
                    className="hidden" 
                    multiple 
                    onChange={handleFileUpload}
                  />
                  <label 
                    htmlFor="hw-upload"
                    className="flex flex-col items-center justify-center gap-3 py-8 rounded-[16px] border-2 border-dashed border-slate-300 bg-[#f8f9fb] hover:bg-slate-50 hover:border-[#00c5a6] cursor-pointer transition-colors w-full"
                  >
                    <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                      <Upload className="h-6 w-6 text-[#00c5a6]" />
                    </div>
                    <div className="text-center">
                      <p className="text-[15px] font-[600] text-[#121117]">Натисніть для завантаження файлів</p>
                      <p className="text-[13px] text-[#69686f] mt-1">PNG, JPG, PDF до 10 MB</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6 sm:gap-3 flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedHomework(null)
                  setSubmissionText("")
                  setSubmissionFiles([])
                }}
                className="w-full sm:w-auto h-[48px] px-8 rounded-[12px] border-2 border-[#121117] text-[#121117] font-[600] hover:bg-gray-50 text-[16px]"
              >
                Скасувати
              </Button>
              <Button 
                onClick={handleSubmitHomework}
                disabled={!submissionText.trim() && submissionFiles.length === 0}
                className="w-full sm:w-auto h-[48px] px-8 rounded-[12px] bg-[#121117] hover:bg-[#121117]/90 text-white font-[600] text-[16px]"
              >
                Відправити на перевірку
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
