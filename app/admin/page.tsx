"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, UserCheck, Clock, DollarSign, TrendingUp, AlertCircle } from "lucide-react"

export default function AdminPage() {
  const stats = {
    totalUsers: 1247,
    totalSpecialists: 342,
    totalClients: 905,
    pendingVerifications: 12,
    activeRequests: 45,
    monthlyRevenue: 125000,
    growthRate: 15.3,
    pendingPayments: 8,
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <SidebarLayout userType="admin">
        <div className="container mx-auto max-w-7xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">Адміністративна панель</h1>
            <p className="text-muted-foreground">Огляд платформи</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Всього користувачів</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.totalSpecialists} спеціалістів, {stats.totalClients} клієнтів
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Очікують верифікації</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingVerifications}</div>
                <p className="text-xs text-muted-foreground">Нові спеціалісти</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Активні запити</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeRequests}</div>
                <p className="text-xs text-muted-foreground">В обробці</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Дохід за місяць</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.monthlyRevenue.toLocaleString()} ₴</div>
                <p className="text-xs text-green-600">+{stats.growthRate}% від минулого місяця</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <CardTitle className="text-base">Потребують уваги</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Верифікація спеціалістів</span>
                  <Badge variant="secondary">{stats.pendingVerifications}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Очікують оплати</span>
                  <Badge variant="secondary">{stats.pendingPayments}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-base">Зростання платформи</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Нові користувачі (тиждень)</span>
                  <Badge variant="secondary">+47</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Завершені заняття (тиждень)</span>
                  <Badge variant="secondary">+156</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Остання активність</CardTitle>
              <CardDescription>Нещодавні події на платформі</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    type: "verification",
                    text: "Новий спеціаліст очікує верифікації",
                    user: "Олена Іваненко",
                    time: "5 хвилин тому",
                  },
                  {
                    id: 2,
                    type: "payment",
                    text: "Отримано платіж за лід",
                    user: "Петро Коваль",
                    amount: "1300 ₴",
                    time: "1 година тому",
                  },
                  {
                    id: 3,
                    type: "registration",
                    text: "Новий клієнт зареєструвався",
                    user: "Марія Петренко",
                    time: "2 години тому",
                  },
                  {
                    id: 4,
                    type: "booking",
                    text: "Створено новий запит на заняття",
                    user: "Іван Сидоренко",
                    time: "3 години тому",
                  },
                ].map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{activity.text}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.user} {activity.amount && `• ${activity.amount}`}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
