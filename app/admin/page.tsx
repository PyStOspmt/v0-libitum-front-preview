"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Badge } from "@/components/ui/badge"
import { Users, UserCheck, Clock, DollarSign, TrendingUp, AlertCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

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

  const activities = [
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
  ]

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <SidebarLayout userType="admin">
        <div className="p-6 lg:p-10 max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight">Адміністративна панель</h1>
            <p className="text-slate-500 mt-1">Огляд платформи</p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-500">Всього користувачів</span>
                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-slate-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-800">{stats.totalUsers}</div>
              <p className="text-sm text-slate-500 mt-1">
                {stats.totalSpecialists} спеціалістів, {stats.totalClients} клієнтів
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-500">Очікують верифікації</span>
                <div className="h-10 w-10 rounded-xl bg-[#fff8e1] flex items-center justify-center">
                  <UserCheck className="h-5 w-5 text-[#ffb74d]" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-800">{stats.pendingVerifications}</div>
              <p className="text-sm text-slate-500 mt-1">Нові спеціалісти</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-500">Активні запити</span>
                <div className="h-10 w-10 rounded-xl bg-[#e8eaf6] flex items-center justify-center">
                  <Clock className="h-5 w-5 text-[#5c6bc0]" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-800">{stats.activeRequests}</div>
              <p className="text-sm text-slate-500 mt-1">В обробці</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-500">Дохід за місяць</span>
                <div className="h-10 w-10 rounded-xl bg-[#e8f5e9] flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-[#43a047]" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-800">{stats.monthlyRevenue.toLocaleString()} ₴</div>
              <p className="text-sm text-[#43a047] mt-1 font-medium">+{stats.growthRate}% від минулого місяця</p>
            </div>
          </div>

          {/* Alert Cards */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="bg-white rounded-2xl p-6 border border-[#ffb74d]/20">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-xl bg-[#fff8e1] flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-[#f57c00]" />
                </div>
                <h3 className="font-bold text-slate-800">Потребують уваги</h3>
              </div>
              <div className="space-y-4">
                <Link href="/admin/verifications" className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
                  <span className="text-sm text-slate-700">Верифікація спеціалістів</span>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#fff8e1] text-[#f57c00] border-0">{stats.pendingVerifications}</Badge>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
                <Link href="/admin/payments" className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
                  <span className="text-sm text-slate-700">Очікують оплати</span>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#fff8e1] text-[#f57c00] border-0">{stats.pendingPayments}</Badge>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#43a047]/20">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-xl bg-[#e8f5e9] flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-[#43a047]" />
                </div>
                <h3 className="font-bold text-slate-800">Зростання платформи</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50">
                  <span className="text-sm text-slate-700">Нові користувачі (тиждень)</span>
                  <Badge className="bg-[#e8f5e9] text-[#2e7d32] border-0">+47</Badge>
                </div>
                <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50">
                  <span className="text-sm text-slate-700">Завершені заняття (тиждень)</span>
                  <Badge className="bg-[#e8f5e9] text-[#2e7d32] border-0">+156</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Остання активність</h2>
                <p className="text-slate-500 text-sm mt-1">Нещодавні події на платформі</p>
              </div>
            </div>
            <div className="space-y-1">
              {activities.map((activity, i) => (
                <div 
                  key={activity.id} 
                  className={`flex items-center justify-between py-4 px-4 rounded-xl hover:bg-slate-50 transition-colors ${
                    i !== activities.length - 1 ? "border-b border-slate-50" : ""
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium text-slate-800">{activity.text}</p>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {activity.user} {activity.amount && `• ${activity.amount}`}
                    </p>
                  </div>
                  <span className="text-sm text-slate-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
