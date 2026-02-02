"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { useRequestStore } from "@/lib/request-store"
import { useGamificationStore } from "@/lib/gamification-store"
import { RequestCard } from "@/components/request-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Users, Clock, Star, DollarSign, Award, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function TutorPage() {
  const { toast } = useToast()
  const { getRequestsBySpecialist, acceptRequest, rejectRequest } = useRequestStore()
  const { getProgress, getLevelInfo } = useGamificationStore()

  const specialistRequests = getRequestsBySpecialist("specialist-1")
  const pendingRequests = specialistRequests.filter((req) => req.status === "pending")
  const progress = getProgress("specialist-1")
  const currentLevel = getLevelInfo(progress.totalSessions)

  const stats = {
    activeClients: 12,
    pendingRequests: pendingRequests.length,
    completedSessions: progress.totalSessions,
    earnings: 15600,
    rating: 4.8,
    level: progress.level,
  }

  const handleAcceptRequest = (requestId: string) => {
    acceptRequest(requestId)
    toast({
      title: "Запит прийнято",
      description: "Заняття додано до вашого розкладу",
    })
  }

  const handleRejectRequest = (requestId: string) => {
    rejectRequest(requestId)
    toast({
      title: "Запит відхилено",
      description: "Клієнт отримає повідомлення",
      variant: "destructive",
    })
  }

  return (
    <ProtectedRoute allowedRoles={["specialist"]}>
      <SidebarLayout userType="tutor">
        <div className="container mx-auto max-w-7xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">Головна</h1>
            <p className="text-muted-foreground">Кабінет спеціаліста</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Активні клієнти</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeClients}</div>
                <p className="text-xs text-muted-foreground">+2 цього місяця</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Нові запити</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingRequests}</div>
                <p className="text-xs text-muted-foreground">Потребують відповіді</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Рейтинг</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.rating}</div>
                <p className="text-xs text-muted-foreground">З 48 відгуків</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Заробіток</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.earnings} ₴</div>
                <p className="text-xs text-muted-foreground">За цей місяць</p>
              </CardContent>
            </Card>
          </div>

          <Link href="/tutor/stats">
            <Card className="cursor-pointer border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                      <Award className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle>
                        Рівень {stats.level} - {currentLevel.title}
                      </CardTitle>
                      <CardDescription>Натисніть для детальної статистики</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-lg">
                      {stats.completedSessions} занять
                    </Badge>
                    <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={75} className="h-2" />
                <div className="mt-4 flex gap-2">
                  {progress.achievements.slice(0, 3).map((achievement) => (
                    <Badge key={achievement.id} variant="outline">
                      {achievement.icon} {achievement.title}
                    </Badge>
                  ))}
                  {progress.achievements.length > 3 && (
                    <Badge variant="outline">+{progress.achievements.length - 3} ще</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card>
            <CardHeader>
              <CardTitle>Нові запити на заняття</CardTitle>
              <CardDescription>Відповідайте протягом 3 годин для збереження рейтингу</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingRequests.length > 0 ? (
                pendingRequests.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    userType="specialist"
                    onAccept={handleAcceptRequest}
                    onReject={handleRejectRequest}
                  />
                ))
              ) : (
                <p className="py-8 text-center text-muted-foreground">Немає нових запитів</p>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
