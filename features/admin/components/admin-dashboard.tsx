"use client"

import { AlertCircle, ArrowRight, Clock, DollarSign, TrendingUp, UserCheck, Users } from "lucide-react"
import Link from "next/link"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Badge } from "@/components/ui/badge"
import { UserRoles } from "@/graphql/generated/graphql"

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
    { id: 1, type: "verification", text: "Новий спеціаліст очікує верифікації", user: "Олена Іваненко", time: "5 хвилин тому" },
    { id: 2, type: "payment", text: "Отримано платіж за лід", user: "Петро Коваль", amount: "1300 ₴", time: "1 година тому" },
    { id: 3, type: "registration", text: "Новий клієнт зареєструвався", user: "Марія Петренко", time: "2 години тому" },
    { id: 4, type: "booking", text: "Створено новий запит на заняття", user: "Іван Сидоренко", time: "3 години тому" },
]

const activityLinks: Record<string, string> = {
    verification: "/admin/moderation",
    payment: "/admin/payments",
    registration: "/admin/clients",
    booking: "/admin/clients",
}

export function AdminDashboard() {
    return (
        <ProtectedRoute allowedRoles={[UserRoles.SuperAdmin]}>
            <SidebarLayout userType="admin">
                <div className="p-6 lg:p-10 max-w-[1200px] mx-auto space-y-8 font-sans">
                    {/* Header */}
                    <div>
                        <h1 className="text-[32px] lg:text-[40px] font-bold text-[#121117] tracking-tight">
                            Адміністративна панель
                        </h1>
                        <p className="text-[#69686f] mt-1 text-[16px]">Огляд платформи</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="bg-white rounded-[24px] p-8 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[14px] font-[600] text-[#69686f]">Всього користувачів</span>
                                <div className="h-10 w-10 rounded-full bg-[#f0f3f3] flex items-center justify-center">
                                    <Users className="h-5 w-5 text-[#121117]" />
                                </div>
                            </div>
                            <div className="text-[32px] font-bold text-[#121117] leading-none">{stats.totalUsers}</div>
                            <p className="text-[13px] text-[#69686f] mt-2">
                                {stats.totalSpecialists} спеціалістів, {stats.totalClients} клієнтів
                            </p>
                        </div>

                        <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[14px] font-[600] text-[#69686f]">Очікують верифікації</span>
                                <div className="h-10 w-10 rounded-full bg-[#fff8e1] flex items-center justify-center">
                                    <UserCheck className="h-5 w-5 text-[#ffb74d]" />
                                </div>
                            </div>
                            <div className="text-[32px] font-bold text-[#121117] leading-none">
                                {stats.pendingVerifications}
                            </div>
                            <p className="text-[13px] text-[#69686f] mt-2">Нові спеціалісти</p>
                        </div>

                        <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[14px] font-[600] text-[#69686f]">Активні запити</span>
                                <div className="h-10 w-10 rounded-full bg-[#e8eaf6] flex items-center justify-center">
                                    <Clock className="h-5 w-5 text-[#5c6bc0]" />
                                </div>
                            </div>
                            <div className="text-[32px] font-bold text-[#121117] leading-none">{stats.activeRequests}</div>
                            <p className="text-[13px] text-[#69686f] mt-2">В обробці</p>
                        </div>

                        <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[14px] font-[600] text-[#69686f]">Дохід за місяць</span>
                                <div className="h-10 w-10 rounded-full bg-[#e8f5e9] flex items-center justify-center">
                                    <DollarSign className="h-5 w-5 text-[#43a047]" />
                                </div>
                            </div>
                            <div className="text-[32px] font-bold text-[#121117] leading-none">
                                {stats.monthlyRevenue.toLocaleString()} ₴
                            </div>
                            <p className="text-[13px] text-[#43a047] mt-2 font-[600]">
                                +{stats.growthRate}% від минулого місяця
                            </p>
                        </div>
                    </div>

                    {/* Alert Cards */}
                    <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                        <div className="bg-white rounded-[24px] p-8 border border-yellow-200/50 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-12 w-12 rounded-full bg-[#fff8e1] flex items-center justify-center">
                                    <AlertCircle className="h-6 w-6 text-[#f57c00]" />
                                </div>
                                <h3 className="text-[20px] font-bold text-[#121117]">Потребують уваги</h3>
                            </div>
                            <div className="space-y-4">
                                <Link href="/admin/moderation" className="flex items-center justify-between py-4 px-5 rounded-[12px] bg-gray-50 hover:bg-gray-100 transition-colors group">
                                    <span className="text-[15px] font-[500] text-[#121117]">Верифікація спеціалістів</span>
                                    <div className="flex items-center gap-3">
                                        <Badge className="bg-[#fff8e1] text-[#f57c00] border-0 text-[14px] px-3 font-[600] rounded-[6px] hover:bg-[#fff8e1]">
                                            {stats.pendingVerifications}
                                        </Badge>
                                        <ArrowRight className="h-4 w-4 text-[#69686f] group-hover:translate-x-1 group-hover:text-[#121117] transition-all" />
                                    </div>
                                </Link>
                                <Link
                                    href="/admin/payments"
                                    className="flex items-center justify-between py-4 px-5 rounded-[12px] bg-gray-50 hover:bg-gray-100 transition-colors group"
                                >
                                    <span className="text-[15px] font-[500] text-[#121117]">Очікують оплати</span>
                                    <div className="flex items-center gap-3">
                                        <Badge className="bg-[#fff8e1] text-[#f57c00] border-0 text-[14px] px-3 font-[600] rounded-[6px] hover:bg-[#fff8e1]">
                                            {stats.pendingPayments}
                                        </Badge>
                                        <ArrowRight className="h-4 w-4 text-[#69686f] group-hover:translate-x-1 group-hover:text-[#121117] transition-all" />
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white rounded-[24px] p-8 border border-green-200/50 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-12 w-12 rounded-full bg-[#e8f5e9] flex items-center justify-center">
                                    <TrendingUp className="h-6 w-6 text-[#43a047]" />
                                </div>
                                <h3 className="text-[20px] font-bold text-[#121117]">Зростання платформи</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-4 px-5 rounded-[12px] bg-gray-50">
                                    <span className="text-[15px] font-[500] text-[#121117]">Нові користувачі (тиждень)</span>
                                    <Badge className="bg-[#e8f5e9] text-[#2e7d32] border-0 text-[14px] px-3 font-[600] rounded-[6px] hover:bg-[#e8f5e9]">
                                        +47
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between py-4 px-5 rounded-[12px] bg-gray-50">
                                    <span className="text-[15px] font-[500] text-[#121117]">Завершені заняття (тиждень)</span>
                                    <Badge className="bg-[#e8f5e9] text-[#2e7d32] border-0 text-[14px] px-3 font-[600] rounded-[6px] hover:bg-[#e8f5e9]">
                                        +156
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="bg-white rounded-[24px] p-8 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
                        <div className="mb-6">
                            <h2 className="text-[24px] font-bold text-[#121117]">Остання активність</h2>
                            <p className="text-[#69686f] text-[16px] mt-1">Нещодавні події на платформі</p>
                        </div>
                        <div className="space-y-2">
                            {activities.map((activity) => {
                                const href = activityLinks[activity.type] || "#"
                                const Wrapper = href === "#" ? "div" : Link

                                return (
                                    <Wrapper
                                        key={activity.id}
                                        href={href as string}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between py-4 px-5 rounded-[12px] hover:bg-gray-50 transition-colors border border-transparent hover:border-slate-200/50"
                                    >
                                        <div className="mb-2 sm:mb-0">
                                            <p className="text-[15px] font-[600] text-[#121117]">{activity.text}</p>
                                            <p className="text-[14px] text-[#69686f] mt-1 flex items-center gap-2">
                                                <span className="font-[500]">{activity.user}</span>
                                                {activity.amount && (
                                                    <>
                                                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                        <span className="text-[#121117] font-[600]">{activity.amount}</span>
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                        <span className="text-[13px] font-[500] text-[#69686f] bg-white px-3 py-1 rounded-full border border-gray-200 shrink-0 self-start sm:self-auto">
                                            {activity.time}
                                        </span>
                                    </Wrapper>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </SidebarLayout>
        </ProtectedRoute>
    )
}
