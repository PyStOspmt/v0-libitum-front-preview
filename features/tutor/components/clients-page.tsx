"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { useRequestStore } from "@/lib/request-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, User, Users, Plus, Link as LinkIcon, Copy, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"

export function TutorClientsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { getRequestsBySpecialist, getStudentsByTutor, addOwnStudent } = useRequestStore()
  const { user } = useAuth()
  const [showAddStudent, setShowAddStudent] = useState(false)
  const [copied, setCopied] = useState(false)
  const [newStudent, setNewStudent] = useState({
    name: "",
    grade: "",
    phone: "",
    subject: "",
  })

  const tutorId = user?.id || "specialist-1"
  const inviteLink = `https://libitum.com.ua/register?ref=${tutorId}`

  const students = getStudentsByTutor(tutorId)
  const specialistRequests = getRequestsBySpecialist(tutorId)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    toast({
      title: "Посилання скопійовано",
      description: "Тепер ви можете надіслати його учню",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.subject) {
      toast({
        title: "Помилка валідації",
        description: "Будь ласка, заповніть обов'язкові поля",
        variant: "destructive",
      })
      return
    }

    addOwnStudent({
      tutorId,
      name: newStudent.name,
      grade: newStudent.grade,
      phone: newStudent.phone,
      subject: newStudent.subject,
      status: "active",
    })

    setNewStudent({ name: "", grade: "", phone: "", subject: "" })
    setShowAddStudent(false)

    toast({
      title: "Учень додано",
      description: `${newStudent.name} успішно додано до вашого списку`,
    })
  }

  return (
    <ProtectedRoute allowedRoles={["specialist"]}>
      <SidebarLayout userType="tutor">
        <div className="container mx-auto max-w-7xl space-y-6 sm:space-y-8 px-3 py-6 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-1 sm:px-0">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-slate-900">Мої учні</h1>
              <p className="text-muted-foreground">Клієнти, з якими ви працюєте</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-sm font-medium">
                <Users className="h-4 w-4 text-slate-500" />
                <span>Всього: {students.length}</span>
              </div>
              <Dialog open={showAddStudent} onOpenChange={setShowAddStudent}>
                <DialogTrigger asChild>
                  <Button className="rounded-full flex-1 sm:flex-none">
                    <Plus className="mr-2 h-4 w-4" />
                    Додати свого учня
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Додати свого учня</DialogTitle>
                    <CardDescription>Учень буде доданий до вашого списку, але для отримання бонусів він має зареєструватися.</CardDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label>Посилання для реєстрації</Label>
                      <div className="flex items-center gap-2">
                        <Input value={inviteLink} readOnly className="bg-slate-50 font-mono text-sm text-slate-600" />
                        <Button size="icon" variant="outline" onClick={handleCopyLink} className="shrink-0 w-[40px] h-[40px]">
                          {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500">Надішліть це посилання учню. Після його реєстрації ви зможете повноцінно взаємодіяти.</p>
                    </div>
                    <div className="relative py-2">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
                      <div className="relative flex justify-center"><span className="bg-white px-2 text-xs text-slate-500 uppercase">або додати вручну зараз</span></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Label htmlFor="name">
                        Ім'я учня <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={newStudent.name}
                        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                        placeholder="Введіть ім'я"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">
                        Предмет <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="subject"
                        value={newStudent.subject}
                        onChange={(e) => setNewStudent({ ...newStudent, subject: e.target.value })}
                        placeholder="Наприклад: Математика"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grade">Клас / Вік</Label>
                      <Input
                        id="grade"
                        value={newStudent.grade}
                        onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
                        placeholder="Наприклад: 10 клас"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        value={newStudent.phone}
                        onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                        placeholder="+380..."
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setShowAddStudent(false)}
                        className="flex-1 bg-transparent rounded-full"
                      >
                        Скасувати
                      </Button>
                      <Button onClick={handleAddStudent} className="flex-1 rounded-full">
                        Додати
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {students.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {students.map((student) => {
                const relatedRequest = student.leadId ? specialistRequests.find((r) => r.id === student.leadId) : null

                return (
                  <Card key={student.id} className="flex flex-col border-slate-200/70 bg-white/80 shadow-sm">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={`/placeholder_64px.png?height=64&width=64`} />
                          <AvatarFallback>
                            <User className="h-8 w-8" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-lg text-slate-900">{student.name}</CardTitle>
                          <CardDescription className="mt-1">{student.subject}</CardDescription>
                          <div className="mt-2 flex gap-2">
                            <Badge
                              variant={student.type === "platform" ? "default" : "secondary"}
                              className="rounded-full"
                            >
                              {student.type === "platform" ? "З платформи" : "Свій учень"}
                            </Badge>
                            {student.status === "active" && (
                              <Badge className="rounded-full bg-emerald-500">Активний</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1 space-y-4">
                      {student.grade && (
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Клас:</span> {student.grade}
                        </div>
                      )}

                      {student.phone && (
                        <div className="rounded-2xl border border-slate-200/60 bg-slate-50/70 p-3">
                          <div className="text-xs font-medium text-muted-foreground">Контакт</div>
                          <div className="mt-1 text-sm">{student.phone}</div>
                        </div>
                      )}

                      {relatedRequest?.date && (
                        <div className="rounded-2xl border border-primary/15 bg-primary/10 p-3">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>Наступне заняття</span>
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground">
                            {new Date(relatedRequest.date).toLocaleDateString("uk-UA", {
                              day: "numeric",
                              month: "long",
                            })}{" "}
                            о {relatedRequest.time}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-transparent rounded-full"
                          onClick={() => router.push("/tutor/schedule")}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          Переглянути розклад
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="border-slate-200/70 bg-white/80 shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <User className="mb-4 h-16 w-16 text-muted-foreground" />
                <h3 className="mb-2 text-xl font-semibold">У вас ще немає учнів</h3>
                <p className="mb-6 text-center text-muted-foreground">
                  Додайте свого учня або прийміть запит з платформи
                </p>
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                  <Button onClick={() => setShowAddStudent(true)} className="rounded-full w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    Додати учня
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/tutor/requests")}
                    className="bg-transparent rounded-full w-full sm:w-auto"
                  >
                    Переглянути запити
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
