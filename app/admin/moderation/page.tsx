"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

const moderationQueue = [
  {
    id: "t1",
    name: "Олена Іваненко",
    subject: "Англійська мова",
    status: "pending",
    experience: "8 років",
  },
  {
    id: "t2",
    name: "Петро Коваль",
    subject: "Математика",
    status: "pending",
    experience: "5 років",
  },
]

export default function AdminModerationPage() {
  const [comment, setComment] = useState("")

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <SidebarLayout userType="admin">
        <div className="container mx-auto max-w-6xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">Модерація</h1>
            <p className="text-muted-foreground">Перевірка профілів спеціалістів перед активацією.</p>
          </div>

          <div className="grid gap-4">
            {moderationQueue.map((item) => (
              <Card key={item.id}>
                <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>
                      {item.subject} • {item.experience}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">Очікує перевірки</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Заповнена анкета, дипломи та відео доступні для перегляду в профілі.
                  </div>
                  <Textarea
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="Коментар для відхилення (опційно)"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button>Затвердити</Button>
                    <Button variant="outline">Відхилити</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
