"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { useRequestStore } from "@/lib/request-store"
import { useGamificationStore } from "@/lib/gamification-store"
import { RequestCard } from "@/components/request-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { BookOpen, Clock, TrendingUp, Award, Search, FileText, Calendar, Star, ArrowRight } from "lucide-react"
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
        <div className="p-6 lg:p-10 max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight">Головна</h1>
            <p className="text-slate-500 mt-1">Ваш особистий кабінет</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {children.map((child) => (
                <Button
                  key={child.id}
                  variant={child.id === selectedChildId ? "default" : "outline"}
                  size="sm"
                  onClick={() => router.push(`/client?child=${child.id}`)}
                  className={`rounded-full ${
                    child.id === selectedChildId 
                      ? "bg-[#5c6bc0] hover:bg-[#3949ab]" 
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {child.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-500">Мої спеціалісти</span>
                <div className="h-10 w-10 rounded-xl bg-[#e8eaf6] flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-[#5c6bc0]" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-800">{stats.activeSpecialists}</div>
              <p className="text-sm text-slate-500 mt-1">Активні</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-500">Очікують відповіді</span>
                <div className="h-10 w-10 rounded-xl bg-[#fff8e1] flex items-center justify-center">
                  <Clock className="h-5 w-5 text-[#ffb74d]" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-800">{stats.pendingRequests}</div>
              <p className="text-sm text-slate-500 mt-1">Запити</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-500">Завершено занять</span>
                <div className="h-10 w-10 rounded-xl bg-[#e8f5e9] flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-[#43a047]" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-800">{stats.completedSessions}</div>
              <p className="text-sm text-slate-500 mt-1">Всього</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-500">Рівень</span>
                <div className="h-10 w-10 rounded-xl bg-[#fce4ec] flex items-center justify-center">
                  <Award className="h-5 w-5 text-[#ec407a]" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-800">{stats.level}</div>
              <p className="text-sm text-slate-500 mt-1">Активний учень</p>
            </div>
          </div>

          {/* Gamification Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e8eaf6] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5c6bc0]">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Рівень {stats.level} - Активний учень</h3>
                    <p className="text-slate-500 mt-0.5">Ще 5 занять до наступного рівня</p>
                  </div>
                </div>
                <Badge className="text-sm px-4 py-2 bg-[#e8eaf6] text-[#3949ab] font-medium border-0">
                  {stats.completedSessions} занять
                </Badge>
              </div>
              <Progress value={60} className="h-2 mt-6 bg-slate-100 [&>div]:bg-[#5c6bc0]" />
              <div className="mt-5 flex gap-2 flex-wrap">
                <Badge variant="outline" className="border-slate-200 text-slate-600 bg-white px-3 py-1">
                  <Star className="mr-1.5 h-3 w-3 text-[#ffb74d]" />
                  Регулярний
                </Badge>
                <Badge variant="outline" className="border-slate-200 text-slate-600 bg-white px-3 py-1">
                  <TrendingUp className="mr-1.5 h-3 w-3 text-[#43a047]" />
                  Прогрес
                </Badge>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-5 md:grid-cols-3">
            <button
              onClick={() => router.push(`/client/specialists?child=${selectedChildId}`)}
              className="bg-white rounded-2xl p-6 border border-slate-100 text-left hover:border-[#5c6bc0]/30 hover:shadow-sm transition-all group"
            >
              <div className="h-14 w-14 rounded-2xl bg-[#e8eaf6] flex items-center justify-center mb-4 group-hover:bg-[#5c6bc0] transition-colors">
                <Search className="h-6 w-6 text-[#5c6bc0] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-lg text-slate-800">Знайти спеціаліста</h3>
              <p className="text-slate-500 text-sm mt-1">Пошук серед 500+ спеціалістів</p>
              <div className="flex items-center gap-2 mt-4 text-[#5c6bc0] text-sm font-medium">
                Переглянути
                <ArrowRight className="h-4 w-4" />
              </div>
            </button>
            
            <button
              onClick={() => router.push(`/client/schedule?child=${selectedChildId}`)}
              className="bg-white rounded-2xl p-6 border border-slate-100 text-left hover:border-[#43a047]/30 hover:shadow-sm transition-all group"
            >
              <div className="h-14 w-14 rounded-2xl bg-[#e8f5e9] flex items-center justify-center mb-4 group-hover:bg-[#43a047] transition-colors">
                <Calendar className="h-6 w-6 text-[#43a047] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-lg text-slate-800">Переглянути розклад</h3>
              <p className="text-slate-500 text-sm mt-1">Ваші заплановані заняття</p>
              <div className="flex items-center gap-2 mt-4 text-[#43a047] text-sm font-medium">
                Переглянути
                <ArrowRight className="h-4 w-4" />
              </div>
            </button>
            
            <button
              onClick={() => router.push(`/client/materials?child=${selectedChildId}`)}
              className="bg-white rounded-2xl p-6 border border-slate-100 text-left hover:border-[#ffb74d]/30 hover:shadow-sm transition-all group"
            >
              <div className="h-14 w-14 rounded-2xl bg-[#fff8e1] flex items-center justify-center mb-4 group-hover:bg-[#ffb74d] transition-colors">
                <FileText className="h-6 w-6 text-[#ffb74d] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-lg text-slate-800">Мої матеріали</h3>
              <p className="text-slate-500 text-sm mt-1">Навчальні документи та файли</p>
              <div className="flex items-center gap-2 mt-4 text-[#ffb74d] text-sm font-medium">
                Переглянути
                <ArrowRight className="h-4 w-4" />
              </div>
            </button>
          </div>

          {/* Pending Requests */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-800">Мої запити</h2>
              <p className="text-slate-500 text-sm mt-1">Очікують відповіді від спеціалістів</p>
            </div>
            <div className="space-y-4">
              {pendingRequests.length > 0 ? (
                pendingRequests.map((request) => (
                  <RequestCard key={request.id} request={request} userType="client" onCancel={handleCancelRequest} />
                ))
              ) : (
                <div className="py-12 text-center">
                  <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-slate-300" />
                  </div>
                  <p className="text-slate-500">Немає активних запитів</p>
                  <Button 
                    className="mt-4 rounded-full bg-[#5c6bc0] hover:bg-[#3949ab]"
                    onClick={() => router.push(`/client/specialists?child=${selectedChildId}`)}
                  >
                    Знайти спеціаліста
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
