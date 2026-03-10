"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, UserCheck, UserPlus, Target, DollarSign, Star, TrendingUp, BarChart3, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { UserRoles } from "@/graphql/generated/graphql"

const chartData = [
  { name: "Пн", leads: 400, paid: 240 },
  { name: "Вв", leads: 300, paid: 139 },
  { name: "Ср", leads: 200, paid: 980 },
  { name: "Чт", leads: 278, paid: 390 },
  { name: "Пт", leads: 189, paid: 480 },
  { name: "Сб", leads: 239, paid: 380 },
  { name: "Нд", leads: 349, paid: 430 },
]

export function AdminAnalyticsPage() {
  const [period, setPeriod] = useState<"day" | "week" | "month" | "year">("month")

  const periods = [
    { id: "day", label: "День" },
    { id: "week", label: "Тиждень" },
    { id: "month", label: "Місяць" },
    { id: "year", label: "Рік" },
  ] as const

  const metrics = {
    users: { total: 1560, clients: 1240, tutors: 320, growth: "+12%" },
    leads: { total: 850, paid: 357, conversion: "42%", growth: "+5%" },
    quality: { avgRating: 4.87, avgIncome: 14500, topSubject: "Англійська мова" }
  }

  return (
    <ProtectedRoute allowedRoles={[UserRoles.SuperAdmin]}>
      <SidebarLayout userType="admin">
        <div className="container mx-auto max-w-7xl space-y-6 p-6 font-sans">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-[700] text-[#121117]">Аналітика</h1>
              <p className="text-[15px] font-[500] text-[#69686f]">Ключові показники платформи та динаміка за період</p>
            </div>

            <div className="bg-[#f0f3f3] p-1 rounded-[12px] inline-flex">
              {periods.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPeriod(p.id)}
                  className={cn(
                    "px-4 py-2 rounded-[8px] text-[14px] font-[600] transition-all",
                    period === p.id
                      ? "bg-white text-[#121117] shadow-sm"
                      : "text-[#69686f] hover:text-[#121117]"
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <p className="text-[14px] font-[600] text-[#69686f]">Користувачі</p>
                    <p className="text-[32px] font-[700] text-[#121117]">{metrics.users.total}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[13px] font-[500]">
                  <span className="text-emerald-600 flex items-center"><TrendingUp className="h-3 w-3 mr-1" />{metrics.users.growth}</span>
                  <span className="text-[#69686f]">до минулого періоду</span>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-[13px] font-[500] text-[#69686f]">
                  <span>Клієнтів: <b className="text-[#121117]">{metrics.users.clients}</b></span>
                  <span>Репетиторів: <b className="text-[#121117]">{metrics.users.tutors}</b></span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <p className="text-[14px] font-[600] text-[#69686f]">Конверсія лідів</p>
                    <p className="text-[32px] font-[700] text-[#121117]">{metrics.leads.conversion}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-[#e8fffb] flex items-center justify-center">
                    <Target className="h-5 w-5 text-[#00c5a6]" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[13px] font-[500]">
                  <span className="text-emerald-600 flex items-center"><TrendingUp className="h-3 w-3 mr-1" />{metrics.leads.growth}</span>
                  <span className="text-[#69686f]">до минулого періоду</span>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-[13px] font-[500] text-[#69686f]">
                  <span>Створено: <b className="text-[#121117]">{metrics.leads.total}</b></span>
                  <span>Оплачено: <b className="text-[#121117]">{metrics.leads.paid}</b></span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <p className="text-[14px] font-[600] text-[#69686f]">Дохід з репетитора</p>
                    <p className="text-[32px] font-[700] text-[#121117]">₴{metrics.quality.avgIncome.toLocaleString()}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[13px] font-[500] text-[#69686f]">
                  Середній дохід платформи з 1 фахівця
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-[13px] font-[500] text-[#69686f]">
                  <span>Топ предмет: <b className="text-[#121117]">{metrics.quality.topSubject}</b></span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <p className="text-[14px] font-[600] text-[#69686f]">Рейтинг платформи</p>
                    <p className="text-[32px] font-[700] text-[#121117]">{metrics.quality.avgRating}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center">
                    <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[13px] font-[500] text-[#69686f]">
                  Середня оцінка всіх репетиторів
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-[13px] font-[500] text-[#69686f]">
                  <span>Відгуків: <b className="text-[#121117]">3,450</b></span>
                  <span className="text-emerald-600 flex items-center">Стабільно високо</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2 rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[18px] font-[700]">
                  <BarChart3 className="h-5 w-5 text-[#00c5a6]" />
                  Динаміка реєстрацій та лідів
                </CardTitle>
                <CardDescription>Загальна тенденція за обраний період</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00c5a6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#00c5a6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#69686f' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#69686f' }} />
                      <CartesianGrid vertical={false} stroke="#f0f3f3" />
                      <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
                        itemStyle={{ fontSize: '14px', fontWeight: 600 }}
                        labelStyle={{ color: '#69686f', marginBottom: '4px' }}
                      />
                      <Area type="monotone" dataKey="leads" name="Створено лідів" stroke="#00c5a6" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
                      <Area type="monotone" dataKey="paid" name="Оплачено лідів" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorPaid)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[18px] font-[700]">
                  <Activity className="h-5 w-5 text-indigo-500" />
                  Популярні предмети
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Англійська мова", val: 45 },
                  { name: "Математика", val: 25 },
                  { name: "Українська мова", val: 15 },
                  { name: "Програмування", val: 10 },
                  { name: "Інше", val: 5 },
                ].map(item => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-[13px] font-[600] text-[#121117]">
                      <span>{item.name}</span>
                      <span>{item.val}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${item.val}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
