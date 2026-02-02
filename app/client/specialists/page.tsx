"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { useRequestStore } from "@/lib/request-store"
import { useChatStore } from "@/lib/chat-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Calendar, Star, User, Clock, MapPin } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export default function ClientSpecialistsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { getRequestsByClient } = useRequestStore()
  const { openChat } = useChatStore()

  const children = [
    { id: "child-1", label: "Марія, 12 років" },
    { id: "child-2", label: "Іван, 9 років" },
  ]
  const initialChild = searchParams.get("child") || children[0].id
  const selectedChildId = children.find((child) => child.id === initialChild)?.id || children[0].id

  // Get all requests for this client
  const clientRequests = getRequestsByClient(selectedChildId)

  // Filter to get unique specialists the client is working with
  // Include: accepted, trial_scheduled, trial_completed, awaiting_payment, paid
  const activeStatuses = ["accepted", "communicating", "trial_scheduled", "trial_completed", "awaiting_payment", "paid"]
  const activeRequests = clientRequests.filter((req) => activeStatuses.includes(req.status))

  // Group by specialist to avoid duplicates
  const specialistsMap = new Map()
  activeRequests.forEach((req) => {
    if (!specialistsMap.has(req.specialistId)) {
      specialistsMap.set(req.specialistId, {
        id: req.specialistId,
        name: req.specialistName,
        subject: req.subject,
        nextLesson: req.status === "trial_scheduled" ? { date: req.date, time: req.time } : null,
        format: req.format,
        status: req.status,
        totalSessions: activeRequests.filter((r) => r.specialistId === req.specialistId && r.status === "paid").length,
      })
    }
  })

  const specialists = Array.from(specialistsMap.values())

  const handleOpenChat = (specialistId: string, specialistName: string) => {
    openChat(specialistId, specialistName, "specialist")
    router.push("/client/chats")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "trial_scheduled":
        return <Badge className="bg-blue-500">Пробне заплановано</Badge>
      case "paid":
        return <Badge className="bg-green-500">Активний</Badge>
      case "awaiting_payment":
        return <Badge variant="outline">Очікує оплати</Badge>
      default:
        return <Badge variant="secondary">В процесі</Badge>
    }
  }

  return (
    <ProtectedRoute allowedRoles={["client"]}>
      <SidebarLayout userType="client">
        <div className="container mx-auto max-w-7xl space-y-6 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Мої спеціалісти</h1>
              <p className="text-muted-foreground">Спеціалісти, з якими ви працюєте</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {children.map((child) => (
                  <Button
                    key={child.id}
                    variant={child.id === selectedChildId ? "default" : "outline"}
                    size="sm"
                    onClick={() => router.push(`/client/specialists?child=${child.id}`)}
                  >
                    {child.label}
                  </Button>
                ))}
              </div>
            </div>
            <Button onClick={() => router.push("/specialists")}>Знайти нового спеціаліста</Button>
          </div>

          {specialists.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {specialists.map((specialist) => (
                <Card key={specialist.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={`/placeholder_64px.png?height=64&width=64`} />
                        <AvatarFallback>
                          <User className="h-8 w-8" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{specialist.name}</CardTitle>
                        <CardDescription className="mt-1">{specialist.subject}</CardDescription>
                        <div className="mt-2">{getStatusBadge(specialist.status)}</div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-4">
                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>4.9</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{specialist.totalSessions} занять</span>
                      </div>
                    </div>

                    {/* Next Lesson */}
                    {specialist.nextLesson && (
                      <div className="rounded-lg border bg-muted/50 p-3">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>Наступне заняття</span>
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {new Date(specialist.nextLesson.date).toLocaleDateString("uk-UA", {
                            day: "numeric",
                            month: "long",
                          })}{" "}
                          о {specialist.nextLesson.time}
                        </div>
                        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{specialist.format === "online" ? "Онлайн" : "Офлайн"}</span>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent"
                        onClick={() => router.push(`/specialists/${specialist.id}`)}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Переглянути профіль
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent"
                        onClick={() => handleOpenChat(specialist.id, specialist.name)}
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Написати
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <User className="mb-4 h-16 w-16 text-muted-foreground" />
                <h3 className="mb-2 text-xl font-semibold">У вас ще немає спеціалістів</h3>
                <p className="mb-6 text-center text-muted-foreground">
                  Знайдіть спеціаліста, який підходить вам, та почніть навчання
                </p>
                <Button onClick={() => router.push("/specialists")}>Знайти спеціаліста</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
