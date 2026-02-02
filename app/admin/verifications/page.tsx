"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, FileText, Award } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function AdminVerificationsPage() {
  const [rejectReason, setRejectReason] = useState("")

  const pendingVerifications = [
    {
      id: "1",
      specialistName: "Марія Петренко",
      email: "maria@example.com",
      specialization: "Логопед",
      subjects: ["Корекція мовлення", "Розвиток дикції"],
      experience: "5 років",
      education: "Київський національний університет, Логопедія",
      documents: ["Диплом", "Сертифікат"],
      submittedDate: "2024-03-10",
      description:
        "Досвідчений логопед з 5-річним стажем роботи. Спеціалізуюсь на корекції мовлення у дітей дошкільного та шкільного віку.",
    },
    {
      id: "2",
      specialistName: "Анна Мельник",
      email: "anna@example.com",
      specialization: "Репетитор",
      subjects: ["Українська мова", "Література"],
      experience: "3 роки",
      education: "Львівський університет, Філологія",
      documents: ["Диплом"],
      submittedDate: "2024-02-28",
      description: "Викладаю українську мову та літературу для учнів 5-11 класів. Підготовка до ЗНО.",
    },
  ]

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <SidebarLayout userType="admin">
        <div className="container mx-auto max-w-7xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">Верифікація спеціалістів</h1>
            <p className="text-muted-foreground">Перевірка та затвердження нових спеціалістів</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Очікують верифікації</CardTitle>
              <CardDescription>{pendingVerifications.length} спеціалістів очікують перевірки</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingVerifications.map((verification) => (
                <Card key={verification.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold">{verification.specialistName}</h3>
                          <p className="text-sm text-muted-foreground">{verification.email}</p>
                          <Badge>{verification.specialization}</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Подано: {new Date(verification.submittedDate).toLocaleDateString("uk-UA")}
                        </span>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label className="text-muted-foreground">Предмети</Label>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {verification.subjects.map((subject) => (
                              <Badge key={subject} variant="outline">
                                {subject}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Досвід</Label>
                          <p className="mt-1 text-sm">{verification.experience}</p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-muted-foreground">Освіта</Label>
                        <p className="mt-1 text-sm">{verification.education}</p>
                      </div>

                      <div>
                        <Label className="text-muted-foreground">Про себе</Label>
                        <p className="mt-1 text-sm">{verification.description}</p>
                      </div>

                      <div>
                        <Label className="text-muted-foreground">Документи</Label>
                        <div className="mt-2 flex gap-2">
                          {verification.documents.map((doc) => (
                            <Button key={doc} variant="outline" size="sm">
                              <FileText className="mr-2 h-4 w-4" />
                              {doc}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 border-t pt-4">
                        <Button className="flex-1">
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Верифікувати
                        </Button>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="destructive" className="flex-1">
                              <XCircle className="mr-2 h-4 w-4" />
                              Відхилити
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Відхилити верифікацію</DialogTitle>
                              <DialogDescription>
                                Вкажіть причину відхилення для {verification.specialistName}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Причина відхилення</Label>
                                <Textarea
                                  placeholder="Опишіть причину відхилення..."
                                  value={rejectReason}
                                  onChange={(e) => setRejectReason(e.target.value)}
                                  rows={4}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Скасувати</Button>
                              <Button variant="destructive">Відхилити</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {pendingVerifications.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Award className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">Немає запитів на верифікацію</h3>
                  <p className="text-sm text-muted-foreground">Всі спеціалісти перевірені</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
