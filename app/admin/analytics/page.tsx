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
        <div className="container mx-auto max-w-6xl space-y-6 p-6 font-sans">
          <div className="space-y-1">
            <h1 className="text-3xl font-[700] text-[#121117]">Аналітика</h1>
            <p className="text-[15px] font-[500] text-[#69686f]">Ключові показники платформи та динаміка за період</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {analyticsCards.map((card) => (
              <Card key={card.title} className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                <CardHeader>
                  <CardTitle className="text-[14px] font-[600] text-[#69686f]">{card.title}</CardTitle>
                  <CardDescription className="text-[#69686f] font-[500] text-[12px]">{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-[32px] font-[700] text-[#121117]">{card.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-[#f0f3f3] rounded-[12px] p-1 border-0 w-full md:w-auto grid grid-cols-3">
              <TabsTrigger value="overview" className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f]">Огляд</TabsTrigger>
              <TabsTrigger value="leads" className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f]">Ліди</TabsTrigger>
              <TabsTrigger value="revenue" className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f]">Фінанси</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 pt-4">
              <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                <CardHeader>
                  <CardTitle className="text-xl font-[700] text-[#121117]">Загальна динаміка</CardTitle>
                  <CardDescription className="text-[#69686f] font-[500]">Графіки з можливістю масштабування по днях/тижнях/місяцях.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="rounded-[8px] bg-[#f0f3f3] text-[#121117] font-[600] border-0 px-3 py-1">День</Badge>
                  <Badge variant="secondary" className="rounded-[8px] bg-[#f0f3f3] text-[#121117] font-[600] border-0 px-3 py-1">Тиждень</Badge>
                  <Badge variant="secondary" className="rounded-[8px] bg-[#f0f3f3] text-[#121117] font-[600] border-0 px-3 py-1">Місяць</Badge>
                  <Badge variant="secondary" className="rounded-[8px] bg-[#f0f3f3] text-[#121117] font-[600] border-0 px-3 py-1">Рік</Badge>
                </CardContent>
              </Card>
              <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                <CardHeader>
                  <CardTitle className="text-xl font-[700] text-[#121117]">Кількість користувачів</CardTitle>
                  <CardDescription className="text-[#69686f] font-[500]">Активні клієнти та спеціалісти за період</CardDescription>
                </CardHeader>
                <CardContent className="text-[15px] font-[500] text-[#69686f]">
                  <span className="font-[600] text-[#121117]">1 240</span> клієнтів • <span className="font-[600] text-[#121117]">320</span> спеціалістів • <span className="font-[600] text-[#121117]">45</span> нових реєстрацій
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="leads" className="space-y-4 pt-4">
              <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                <CardHeader>
                  <CardTitle className="text-xl font-[700] text-[#121117]">Ліди</CardTitle>
                  <CardDescription className="text-[#69686f] font-[500]">Створені, прийняті та оплачені заявки</CardDescription>
                </CardHeader>
                <CardContent className="text-[15px] font-[500] text-[#69686f]">
                  Всього: <span className="font-[600] text-[#121117]">1 240</span> • Оплачені: <span className="font-[600] text-[#00c5a6]">520</span> • У процесі: <span className="font-[600] text-[#121117]">140</span> • Відхилені: <span className="font-[600] text-red-500">60</span>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="revenue" className="space-y-4 pt-4">
              <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                <CardHeader>
                  <CardTitle className="text-xl font-[700] text-[#121117]">Фінансові показники</CardTitle>
                  <CardDescription className="text-[#69686f] font-[500]">Доходи, борги та комісії</CardDescription>
                </CardHeader>
                <CardContent className="text-[15px] font-[500] text-[#69686f]">
                  Дохід: <span className="font-[600] text-[#00c5a6]">₴125 000</span> • Очікують оплати: <span className="font-[600] text-orange-500">₴14 000</span> • Середній чек: <span className="font-[600] text-[#121117]">₴1 300</span>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
