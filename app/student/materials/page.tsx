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
import { Label } from "@/components/ui/label"
import { useLessonStore } from "@/lib/lesson-store"
import { useAuth } from "@/lib/auth-context"
import { BookOpen, FileText, Upload, Download, CheckCircle, Clock } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function StudentMaterialsPage() {
  const { user } = useAuth()
  const { lessons, submitHomework } = useLessonStore()
  const { toast } = useToast()
  const [selectedHomework, setSelectedHomework] = useState<any>(null)
  const [submissionText, setSubmissionText] = useState("")

  const studentId = user?.id || "student-child-1"
  const studentLessons = lessons.filter((l) => l.clientId === studentId)

  const homeworks = studentLessons
    .filter((l) => l.homework)
    .map((l) => ({
      ...l.homework,
      lessonId: l.id,
      lessonDate: l.date,
      subject: l.subject,
      specialistName: l.specialistName,
    }))

  const materials = studentLessons
    .filter((l) => l.materials && l.materials.length > 0)
    .flatMap((l) => l.materials?.map((m) => ({ fileName: m, lessonId: l.id, subject: l.subject, date: l.date })) || [])

  const handleSubmitHomework = () => {
    if (!selectedHomework) return

    submitHomework(selectedHomework.lessonId, {
      description: submissionText,
      attachments: [],
    })

    toast({
      title: "Завдання відправлено",
      description: "Твоя робота успішно відправлена вчителю на перевірку",
    })

    setSelectedHomework(null)
    setSubmissionText("")
  }

  return (
    <ProtectedRoute allowedRoles={["client"]}>
      <SidebarLayout userType="client">
        <div className="container mx-auto max-w-7xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">Мої завдання та матеріали</h1>
            <p className="text-muted-foreground">Тут ти знайдеш все необхідне для навчання</p>
          </div>

          <Tabs defaultValue="homework" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="homework">Домашні завдання</TabsTrigger>
              <TabsTrigger value="materials">Матеріали</TabsTrigger>
            </TabsList>

            <TabsContent value="homework" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                {homeworks.map((hw) => (
                  <Card key={hw.lessonId} className={hw.status === "pending" ? "border-primary/50" : ""}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{hw.title}</CardTitle>
                          <CardDescription>{hw.subject} • {hw.specialistName}</CardDescription>
                        </div>
                        <Badge variant={hw.status === "checked" ? "default" : "outline"}>
                          {hw.status === "checked" ? "Перевірено" : hw.status === "submitted" ? "На перевірці" : "Треба зробити"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{hw.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Здати до: {hw.dueDate ? new Date(hw.dueDate).toLocaleDateString("uk-UA") : ""}
                      </div>
                      {hw.status === "pending" && (
                        <Button className="w-full" onClick={() => setSelectedHomework(hw)}>
                          <Upload className="mr-2 h-4 w-4" />
                          Здати роботу
                        </Button>
                      )}
                      {hw.status === "checked" && hw.grade && (
                        <div className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
                          Твоя оцінка: <strong>{hw.grade}/5</strong>
                          {hw.feedback && <p className="mt-1 text-xs opacity-80">{hw.feedback}</p>}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                {homeworks.length === 0 && (
                  <p className="col-span-full py-12 text-center text-muted-foreground italic">Завдань поки немає</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="materials" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                {materials.map((m, idx) => (
                  <Card key={idx}>
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        {m.fileName}
                      </CardTitle>
                      <CardDescription>{m.subject} • {new Date(m.date).toLocaleDateString("uk-UA")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Download className="mr-2 h-4 w-4" />
                        Завантажити
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                {materials.length === 0 && (
                  <p className="col-span-full py-12 text-center text-muted-foreground italic">Матеріалів поки немає</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Dialog open={!!selectedHomework} onOpenChange={() => setSelectedHomework(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Здати домашнє завдання</DialogTitle>
              <DialogDescription>{selectedHomework?.title}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="answer">Твоя відповідь</Label>
                <Textarea
                  id="answer"
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  placeholder="Напиши тут відповідь або посилання на роботу..."
                  rows={5}
                />
              </div>
              <div className="space-y-2">
                <Label>Прикріпити файл</Label>
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-6 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Натисніть для вибору файлу</p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedHomework(null)}>Скасувати</Button>
              <Button onClick={handleSubmitHomework} disabled={!submissionText}>Відправити вчителю</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
