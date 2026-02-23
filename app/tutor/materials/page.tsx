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
import { useAuth } from "@/lib/auth-context"
import { BookOpen, Plus, Upload, CheckCircle, Clock, Star, Tag } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const lessonTags = [
  { id: "tag-1", text: "Мені пора на пенсію - ти краще вчителя!", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  { id: "tag-2", text: "Забуваємо цей урок як страшний сон. Чекаю на камбек.", color: "bg-rose-100 text-rose-800 border-rose-200" },
  { id: "tag-3", text: "Стабільно добре, але є куди рости.", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { id: "tag-4", text: "Сьогодні ти перевершив(ла) себе!", color: "bg-amber-100 text-amber-800 border-amber-200" },
]

export default function TutorMaterialsPage() {
  const { user } = useAuth()
  const { lessons, checkHomework } = useLessonStore()
  const { toast } = useToast()
  const [selectedHomework, setSelectedHomework] = useState<any>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [grade, setGrade] = useState("5")
  const [feedback, setFeedback] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [newHwTitle, setNewHwTitle] = useState("")
  const [newHwDesc, setNewHwDesc] = useState("")
  const [newHwDueDate, setNewHwDueDate] = useState("")
  const [newHwClient, setNewHwClient] = useState("")

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
  const pendingHomeworks = homeworks.filter((h) => h.status === "pending")

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

    // In a real app, this would add a homework object to a specific lesson
    toast({
      title: "Завдання створено",
      description: `Завдання "${newHwTitle}" відправлено учню`,
    })

    setIsCreateModalOpen(false)
    setNewHwTitle("")
    setNewHwDesc("")
    setNewHwDueDate("")
    setNewHwClient("")
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
    <ProtectedRoute allowedRoles={["specialist"]}>
      <SidebarLayout userType="tutor">
        <div className="container mx-auto max-w-[1200px] space-y-8 p-6 font-sans">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-[32px] font-bold text-[#121117] tracking-tight">Журнал та ДЗ</h1>
              <p className="text-[16px] text-[#69686f] mt-1">Управління домашніми завданнями та матеріалами</p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)} className="h-[48px] px-6 rounded-[8px] bg-[#00c5a6] hover:bg-[#00a389] text-white font-[600] text-[16px] transition-colors shadow-sm shrink-0">
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
                              {hw.clientName} • <span className="text-[#00c5a6]">{hw.subject}</span>
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
                    <div className="h-16 w-16 bg-[#e8fffb] rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-[#00c5a6]" />
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
                              {hw.clientName} • <span className="text-[#00a389]">{hw.subject}</span>
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
                        {hw.feedback && (
                          <div className="rounded-[12px] bg-[#f0f3f3] p-4 border border-slate-200/50">
                            <p className="text-[13px] font-[600] text-[#121117] mb-1.5">Ваш відгук та звіт:</p>
                            <p className="text-[14px] text-[#69686f] leading-relaxed">{hw.feedback}</p>
                          </div>
                        )}
                        <div className="flex items-center text-[13px] font-[500] text-[#69686f]">
                          <CheckCircle className="mr-1.5 h-4 w-4 text-[#00c5a6]" />
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
                    <Card key={hw.id} className="border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-[20px]">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1.5">
                            <CardTitle className="text-[18px] text-[#121117]">{hw.title}</CardTitle>
                            <CardDescription className="text-[14px] text-[#69686f] font-[500]">
                              {hw.clientName} • <span className="text-[#00c5a6]">{hw.subject}</span>
                            </CardDescription>
                          </div>
                          <Badge className="bg-[#fff3e0] text-[#f57c00] border-0 px-2.5 py-1 rounded-[6px] shrink-0 font-[600]">
                            Очікує виконання
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-[#f8f9fb] p-4 rounded-[12px]">
                          <p className="text-[14px] text-[#121117] leading-relaxed">{hw.description}</p>
                        </div>
                        <div className="flex items-center gap-2 text-[14px] font-[600] text-[#69686f] bg-white border border-slate-200 px-3 py-2 rounded-[8px] inline-flex">
                          <Clock className="h-4 w-4 text-[#00c5a6]" />
                          <span>Здати до: {new Date(hw.dueDate).toLocaleDateString("uk-UA")}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-[20px] border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <div className="h-16 w-16 bg-[#e8fffb] rounded-full flex items-center justify-center mb-4">
                      <Clock className="h-8 w-8 text-[#00c5a6]" />
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
          <DialogContent className="max-w-2xl rounded-[24px] p-8 font-sans">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-[24px] font-bold text-[#121117]">Звіт про заняття та ДЗ</DialogTitle>
              <DialogDescription className="text-[15px] text-[#69686f] mt-1">
                {selectedHomework?.clientName} • {selectedHomework?.title}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-2">
              <div className="bg-[#f0f3f3] p-5 rounded-[16px] space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[13px] font-[600] text-[#69686f] uppercase tracking-wider">Завдання</Label>
                  <p className="text-[15px] text-[#121117] leading-relaxed">{selectedHomework?.description}</p>
                </div>
                <div className="flex items-center gap-2 text-[14px] text-[#69686f] font-[500]">
                  <Clock className="h-4 w-4" />
                  Здано: {selectedHomework?.submittedAt ? new Date(selectedHomework.submittedAt).toLocaleString("uk-UA", { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' }) : "-"}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="grade" className="text-[15px] font-[600] text-[#121117]">Оцінка *</Label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((g) => (
                    <button
                      key={g}
                      type="button"
                      className={cn(
                        "flex-1 h-[48px] rounded-[12px] border-2 font-[600] text-[16px] flex items-center justify-center gap-1.5 transition-all",
                        grade === g.toString() 
                          ? "border-[#ffb74d] bg-[#fff8e1] text-[#f57c00]" 
                          : "border-slate-200 bg-white text-[#69686f] hover:border-slate-300"
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
                        "px-4 py-2 rounded-[12px] text-[14px] font-[500] transition-all border",
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
            
            <DialogFooter className="mt-6 gap-3 sm:gap-0">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedHomework(null)
                  setSelectedTag(null)
                }}
                className="h-[48px] px-8 rounded-[8px] border-2 border-[#121117] text-[#121117] font-[600] text-[16px] hover:bg-gray-50"
              >
                Скасувати
              </Button>
              <Button 
                onClick={handleCheckHomework} 
                disabled={!feedback}
                className="h-[48px] px-8 rounded-[8px] bg-[#00c5a6] hover:bg-[#00a389] text-white font-[600] text-[16px]"
              >
                <CheckCircle className="mr-2 h-5 w-5" />
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
                <Label className="text-[14px] font-[600] text-[#121117]">Додати матеріали (PDF, Audio, Image)</Label>
                <div className="flex items-center justify-center rounded-[12px] border-2 border-dashed border-slate-200 bg-[#f8f9fb] p-6 hover:bg-slate-50 cursor-pointer transition-colors">
                  <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm">
                      <Upload className="h-5 w-5 text-[#00c5a6]" />
                    </div>
                    <p className="text-[14px] font-[500] text-[#121117]">Натисніть для завантаження</p>
                    <p className="text-[12px] text-[#69686f] mt-1">До 25MB на файл</p>
                  </div>
                </div>
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
                className="flex-1 h-[48px] rounded-[8px] bg-[#00c5a6] hover:bg-[#00a389] text-white font-[600] text-[16px]"
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
