"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { useRequestStore } from "@/lib/request-store"
import { useGamificationStore } from "@/lib/gamification-store"
import { RequestCard } from "@/components/request-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { BookOpen, Clock, TrendingUp, Award, Search, FileText, Calendar, Star } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export default function ClientPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { getRequestsByClient, cancelRequest } = useRequestStore()
  const { getProgress } = useGamificationStore()

  const children = [
    { id: "child-1", name: "Марія Коваленко", label: "Марія, 12 років" },
    { id: "child-2", name: "Іван Коваленко", label: "Іван, 9 років" },
  ]
  const initialChild = searchParams.get("child") || children[0].id
  const selectedChildId = children.find((c) => c.id === initialChild)?.id || children[0].id

  const clientRequests = getRequestsByClient(selectedChildId)
  const pendingRequests = clientRequests.filter((req) => req.status === "pending")
  const progress = getProgress(selectedChildId)

  const stats = {
    activeSpecialists: 2,
    completedSessions: 15,
    upcomingSessions: 3,
    pendingRequests: pendingRequests.length,
    level: 2,
  }

  const handleCancelRequest = (requestId: string) => {
    cancelRequest(requestId)
    toast({
      title: "Запит скасовано",
      description: "Ви можете створити новий запит в будь-який час",
    })
  }

  return (
    <ProtectedRoute allowedRoles={["client"]}>
      <SidebarLayout userType="client">
        <div className="container mx-auto max-w-7xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">Головна</h1>
            <p className="text-muted-foreground">Ваш особистий кабінет</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {children.map((child) => (
                <Button
                  key={child.id}
                  variant={child.id === selectedChildId ? "default" : "outline"}
                  size="sm"
                  onClick={() => router.push(`/client?child=${child.id}`)}
                >
                  {child.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Мої спеціалісти</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeSpecialists}</div>
                <p className="text-xs text-muted-foreground">Активні</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Очікують відповіді</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingRequests}</div>
                <p className="text-xs text-muted-foreground">Запити</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Завершено занять</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completedSessions}</div>
                <p className="text-xs text-muted-foreground">Всього</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Рівень</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.level}</div>
                <p className="text-xs text-muted-foreground">Активний учень</p>
              </CardContent>
            </Card>
          </div>

          {/* Gamification Card */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                    <Award className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle>Рівень {stats.level} - Активний учень</CardTitle>
                    <CardDescription>Ще 5 занять до наступного рівня</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="text-lg">
                  {stats.completedSessions} занять
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={60} className="h-2" />
              <div className="mt-4 flex gap-2">
                <Badge variant="outline">
                  <Star className="mr-1 h-3 w-3" />
                  Регулярний
                </Badge>
                <Badge variant="outline">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  Прогрес
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-3">
            <Button size="lg" className="h-auto flex-col gap-2 py-6" onClick={() => router.push("/specialists")}>
              <Search className="h-6 w-6" />
              <span>Знайти спеціаліста</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-auto flex-col gap-2 bg-transparent py-6"
              onClick={() => router.push(`/client/schedule?child=${selectedChildId}`)}
            >
              <Calendar className="h-6 w-6" />
              <span>Переглянути розклад</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-auto flex-col gap-2 bg-transparent py-6"
              onClick={() => router.push(`/client/materials?child=${selectedChildId}`)}
            >
              <FileText className="h-6 w-6" />
              <span>Мої матеріали</span>
            </Button>
          </div>

          {/* Pending Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Мої запити</CardTitle>
              <CardDescription>Очікують відповіді від спеціалістів</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingRequests.length > 0 ? (
                pendingRequests.map((request) => (
                  <RequestCard key={request.id} request={request} userType="client" onCancel={handleCancelRequest} />
                ))
              ) : (
                <p className="py-8 text-center text-muted-foreground">Немає активних запитів</p>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
