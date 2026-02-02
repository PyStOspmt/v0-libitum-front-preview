"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const analyticsCards = [
  {
    title: "Конверсія лідів у оплату",
    value: "42%",
    description: "За останні 30 днів",
  },
  {
    title: "Середній дохід з репетитора",
    value: "₴14 500",
    description: "Середній показник",
  },
  {
    title: "Середній рейтинг репетиторів",
    value: "4.87",
    description: "За всіма відгуками",
  },
  {
    title: "Ліди з платформою",
    value: "1 240",
    description: "Всього створено",
  },
]

export default function AdminAnalyticsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <SidebarLayout userType="admin">
        <div className="container mx-auto max-w-6xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">Аналітика</h1>
            <p className="text-muted-foreground">Ключові показники платформи та динаміка за період</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {analyticsCards.map((card) => (
              <Card key={card.title}>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">{card.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Огляд</TabsTrigger>
              <TabsTrigger value="leads">Ліди</TabsTrigger>
              <TabsTrigger value="revenue">Фінанси</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Загальна динаміка</CardTitle>
                  <CardDescription>Графіки з можливістю масштабування по днях/тижнях/місяцях.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Badge variant="secondary">День</Badge>
                  <Badge variant="secondary">Тиждень</Badge>
                  <Badge variant="secondary">Місяць</Badge>
                  <Badge variant="secondary">Рік</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Кількість користувачів</CardTitle>
                  <CardDescription>Активні клієнти та спеціалісти за період</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  1 240 клієнтів • 320 спеціалістів • 45 нових реєстрацій
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="leads" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ліди</CardTitle>
                  <CardDescription>Створені, прийняті та оплачені заявки</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Всього: 1 240 • Оплачені: 520 • У процесі: 140 • Відхилені: 60
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="revenue" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Фінансові показники</CardTitle>
                  <CardDescription>Доходи, борги та комісії</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Дохід: ₴125 000 • Очікують оплати: ₴14 000 • Середній чек: ₴1 300
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
