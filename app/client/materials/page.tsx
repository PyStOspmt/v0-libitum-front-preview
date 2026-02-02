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

export default function ClientMaterialsPage() {
  const { user } = useAuth()
  const { lessons, submitHomework } = useLessonStore()
  const { toast } = useToast()
  const [selectedHomework, setSelectedHomework] = useState<any>(null)
  const [submissionText, setSubmissionText] = useState("")

  const clientLessons = lessons.filter((l) => l.clientId === (user?.id || "client-1"))
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
        grade: homework?.grade ?? 0,
        lessonId: l.id,
        lessonDate: l.date,
        subject: l.subject,
        specialistName: l.specialistName,
      }
    })

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

  const pendingHomeworks = homeworks.filter((h) => h.status === "pending")
  const submittedHomeworks = homeworks.filter((h) => h.status === "submitted")
  const checkedHomeworks = homeworks.filter((h) => h.status === "checked")

  const handleSubmitHomework = () => {
    if (!selectedHomework) return

    submitHomework(selectedHomework.lessonId, {
      description: submissionText,
      attachments: [],
    })

    toast({
      title: "Домашнє завдання здано",
      description: "Ваша робота успішно відправлена на перевірку",
    })

    setSelectedHomework(null)
    setSubmissionText("")
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
            На перевірці
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
    <ProtectedRoute allowedRoles={["client"]}>
      <SidebarLayout userType="client">
        <div className="container mx-auto max-w-7xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">Матеріали та завдання</h1>
            <p className="text-muted-foreground">Домашні завдання та навчальні матеріали</p>
          </div>

          <Tabs defaultValue="homework" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="homework">Домашні завдання</TabsTrigger>
              <TabsTrigger value="materials">Матеріали</TabsTrigger>
            </TabsList>

            <TabsContent value="homework" className="space-y-6">
              {pendingHomeworks.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Потрібно здати</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {pendingHomeworks.map((hw) => (
                      <Card key={hw.id} className="border-yellow-200">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-lg">{hw.title}</CardTitle>
                              <CardDescription>
                                {hw.subject} • {hw.specialistName}
                              </CardDescription>
                            </div>
                            {getStatusBadge(hw.status)}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground">{hw.description}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>Здати до: {new Date(hw.dueDate).toLocaleDateString("uk-UA")}</span>
                          </div>
                          <Button className="w-full" onClick={() => setSelectedHomework(hw)}>
                            <Upload className="mr-2 h-4 w-4" />
                            Здати роботу
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {submittedHomeworks.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">На перевірці</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {submittedHomeworks.map((hw) => (
                      <Card key={hw.id} className="border-blue-200">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-lg">{hw.title}</CardTitle>
                              <CardDescription>
                                {hw.subject} • {hw.specialistName}
                              </CardDescription>
                            </div>
                            {getStatusBadge(hw.status)}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p className="text-sm text-muted-foreground">{hw.description}</p>
                          <div className="text-sm text-muted-foreground">
                            Здано: {hw.submittedAt ? new Date(hw.submittedAt).toLocaleDateString("uk-UA") : "-"}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {checkedHomeworks.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Перевірені роботи</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {checkedHomeworks.map((hw) => (
                      <Card key={hw.id} className="border-green-200">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-lg">{hw.title}</CardTitle>
                              <CardDescription>
                                {hw.subject} • {hw.specialistName}
                              </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(hw.status)}
                              <Badge className="bg-green-600 text-lg">{hw.grade}/5</Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground">{hw.description}</p>
                          {hw.feedback && (
                            <div className="rounded-lg bg-muted p-3">
                              <p className="text-sm font-medium">Відгук викладача:</p>
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
                </div>
              )}

              {homeworks.length === 0 && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <BookOpen className="h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-center text-muted-foreground">Поки що немає домашніх завдань</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="materials" className="space-y-4">
              {materials.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {materials.map((material, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                          <FileText className="h-5 w-5" />
                          {material.fileName}
                        </CardTitle>
                        <CardDescription>
                          {material.subject} • {new Date(material.date).toLocaleDateString("uk-UA")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full bg-transparent">
                          <Download className="mr-2 h-4 w-4" />
                          Завантажити
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-center text-muted-foreground">Поки що немає навчальних матеріалів</p>
                  </CardContent>
                </Card>
              )}
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
                <Label>Завдання</Label>
                <p className="text-sm text-muted-foreground">{selectedHomework?.description}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="submission">Ваша відповідь</Label>
                <Textarea
                  id="submission"
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  placeholder="Опишіть виконану роботу або додайте посилання..."
                  rows={5}
                />
              </div>
              <div className="space-y-2">
                <Label>Прикріпити файли</Label>
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Перетягніть файли або натисніть для вибору</p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedHomework(null)}>
                Скасувати
              </Button>
              <Button onClick={handleSubmitHomework}>
                <Upload className="mr-2 h-4 w-4" />
                Здати роботу
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
