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
import { BookOpen, Plus, Upload, CheckCircle, Clock, Star } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function TutorMaterialsPage() {
  const { user } = useAuth()
  const { lessons, checkHomework } = useLessonStore()
  const { toast } = useToast()
  const [selectedHomework, setSelectedHomework] = useState<any>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [grade, setGrade] = useState("5")
  const [feedback, setFeedback] = useState("")
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

    checkHomework(selectedHomework.lessonId, Number.parseInt(grade), feedback)

    toast({
      title: "Роботу перевірено",
      description: "Оцінка та відгук відправлені учню",
    })

    setSelectedHomework(null)
    setGrade("5")
    setFeedback("")
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
        <div className="container mx-auto max-w-7xl space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Матеріали та завдання</h1>
              <p className="text-muted-foreground">Управління домашніми завданнями та матеріалами</p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Створити завдання
            </Button>
          </div>

          <Tabs defaultValue="submitted" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="submitted">На перевірці ({submittedHomeworks.length})</TabsTrigger>
              <TabsTrigger value="checked">Перевірені ({checkedHomeworks.length})</TabsTrigger>
              <TabsTrigger value="pending">Очікують здачі ({pendingHomeworks.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="submitted" className="space-y-4">
              {submittedHomeworks.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {submittedHomeworks.map((hw) => (
                    <Card key={hw.id} className="border-blue-200">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">{hw.title}</CardTitle>
                            <CardDescription>
                              {hw.clientName} • {hw.subject}
                            </CardDescription>
                          </div>
                          {getStatusBadge(hw.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{hw.description}</p>
                        <div className="text-sm text-muted-foreground">
                          Здано: {hw.submittedAt ? new Date(hw.submittedAt).toLocaleDateString("uk-UA") : "-"}
                        </div>
                        <Button className="w-full" onClick={() => setSelectedHomework(hw)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Перевірити роботу
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <CheckCircle className="h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-center text-muted-foreground">Немає робіт на перевірці</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="checked" className="space-y-4">
              {checkedHomeworks.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {checkedHomeworks.map((hw) => (
                    <Card key={hw.id} className="border-green-200">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">{hw.title}</CardTitle>
                            <CardDescription>
                              {hw.clientName} • {hw.subject}
                            </CardDescription>
                          </div>
                          <Badge className="bg-green-600 text-lg">{hw.grade}/5</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-sm text-muted-foreground">{hw.description}</p>
                        {hw.feedback && (
                          <div className="rounded-lg bg-muted p-3">
                            <p className="text-sm font-medium">Ваш відгук:</p>
                            <p className="text-sm text-muted-foreground">{hw.feedback}</p>
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground">
                          Перевірено: {hw.checkedAt ? new Date(hw.checkedAt).toLocaleDateString("uk-UA") : "-"}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <BookOpen className="h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-center text-muted-foreground">Поки що немає перевірених робіт</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              {pendingHomeworks.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {pendingHomeworks.map((hw) => (
                    <Card key={hw.id} className="border-yellow-200">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">{hw.title}</CardTitle>
                            <CardDescription>
                              {hw.clientName} • {hw.subject}
                            </CardDescription>
                          </div>
                          {getStatusBadge(hw.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-sm text-muted-foreground">{hw.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Здати до: {new Date(hw.dueDate).toLocaleDateString("uk-UA")}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Clock className="h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-center text-muted-foreground">Всі завдання здані</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Check Homework Dialog */}
        <Dialog open={!!selectedHomework} onOpenChange={() => setSelectedHomework(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Перевірити домашнє завдання</DialogTitle>
              <DialogDescription>
                {selectedHomework?.clientName} • {selectedHomework?.title}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Завдання</Label>
                <p className="text-sm text-muted-foreground">{selectedHomework?.description}</p>
              </div>
              <div className="space-y-2">
                <Label>Здано</Label>
                <p className="text-sm">
                  {selectedHomework?.submittedAt ? new Date(selectedHomework.submittedAt).toLocaleString("uk-UA") : "-"}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Оцінка *</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((g) => (
                    <Button
                      key={g}
                      type="button"
                      variant={grade === g.toString() ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setGrade(g.toString())}
                    >
                      <Star className="mr-1 h-4 w-4" />
                      {g}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback">Відгук та коментарі *</Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Напишіть детальний відгук про виконану роботу..."
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedHomework(null)}>
                Скасувати
              </Button>
              <Button onClick={handleCheckHomework} disabled={!feedback}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Зберегти оцінку
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Homework Modal */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Створити нове завдання</DialogTitle>
              <DialogDescription>
                Завдання буде відображено в кабінеті учня
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="hw-client">Учень *</Label>
                <Select value={newHwClient} onValueChange={setNewHwClient}>
                  <SelectTrigger id="hw-client">
                    <SelectValue placeholder="Оберіть учня" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeClients.map(client => (
                      <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hw-title">Назва завдання *</Label>
                <Input
                  id="hw-title"
                  value={newHwTitle}
                  onChange={(e) => setNewHwTitle(e.target.value)}
                  placeholder="Наприклад: Grammar Practice Unit 5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hw-desc">Опис та інструкції</Label>
                <Textarea
                  id="hw-desc"
                  value={newHwDesc}
                  onChange={(e) => setNewHwDesc(e.target.value)}
                  placeholder="Що саме потрібно зробити..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hw-due">Термін здачі *</Label>
                <Input
                  id="hw-due"
                  type="date"
                  value={newHwDueDate}
                  onChange={(e) => setNewHwDueDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Додати матеріали (PDF, Audio, Image)</Label>
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="text-center">
                    <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                    <p className="mt-1 text-xs text-muted-foreground">Натисніть для завантаження</p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Скасувати
              </Button>
              <Button onClick={handleCreateHomework}>
                Відправити учню
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
