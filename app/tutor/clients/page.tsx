"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { useRequestStore } from "@/lib/request-store"
import { useChatStore } from "@/lib/chat-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, User, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function TutorClientsPage() {
  const router = useRouter()
  const { getRequestsBySpecialist, getStudentsByTutor, addOwnStudent } = useRequestStore()
  const { openChat } = useChatStore()
  const [showAddStudent, setShowAddStudent] = useState(false)
  const [newStudent, setNewStudent] = useState({
    name: "",
    grade: "",
    phone: "",
    subject: "",
  })

  const students = getStudentsByTutor("specialist-1")
  const specialistRequests = getRequestsBySpecialist("specialist-1")

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.subject) {
      alert("Будь ласка, заповніть обов'язкові поля")
      return
    }

    addOwnStudent({
      tutorId: "specialist-1",
      name: newStudent.name,
      grade: newStudent.grade,
      phone: newStudent.phone,
      subject: newStudent.subject,
      status: "active",
    })

    setNewStudent({ name: "", grade: "", phone: "", subject: "" })
    setShowAddStudent(false)
  }

  return (
    <ProtectedRoute allowedRoles={["specialist"]}>
      <SidebarLayout userType="tutor">
        <div className="container mx-auto max-w-7xl space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Мої учні</h1>
              <p className="text-muted-foreground">Клієнти, з якими ви працюєте</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-base">
                Всього: {students.length}
              </Badge>
              <Dialog open={showAddStudent} onOpenChange={setShowAddStudent}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Додати свого учня
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Додати свого учня</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
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
                        className="flex-1 bg-transparent"
                      >
                        Скасувати
                      </Button>
                      <Button onClick={handleAddStudent} className="flex-1">
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
                  <Card key={student.id} className="flex flex-col">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={`/placeholder_64px.png?height=64&width=64`} />
                          <AvatarFallback>
                            <User className="h-8 w-8" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{student.name}</CardTitle>
                          <CardDescription className="mt-1">{student.subject}</CardDescription>
                          <div className="mt-2 flex gap-2">
                            <Badge variant={student.type === "platform" ? "default" : "secondary"}>
                              {student.type === "platform" ? "З платформи" : "Свій учень"}
                            </Badge>
                            {student.status === "active" && <Badge className="bg-green-500">Активний</Badge>}
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
                        <div className="rounded-lg border bg-muted/50 p-3">
                          <div className="text-xs font-medium text-muted-foreground">Контакт</div>
                          <div className="mt-1 text-sm">{student.phone}</div>
                        </div>
                      )}

                      {relatedRequest?.date && (
                        <div className="rounded-lg border bg-primary/5 p-3">
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
                          className="w-full bg-transparent"
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
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <User className="mb-4 h-16 w-16 text-muted-foreground" />
                <h3 className="mb-2 text-xl font-semibold">У вас ще немає учнів</h3>
                <p className="mb-6 text-center text-muted-foreground">
                  Додайте свого учня або прийміть запит з платформи
                </p>
                <div className="flex gap-3">
                  <Button onClick={() => setShowAddStudent(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Додати учня
                  </Button>
                  <Button variant="outline" onClick={() => router.push("/tutor/requests")} className="bg-transparent">
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
