"use client"

import { UserRoles } from "@/graphql/generated/graphql"
import { ArrowRight, Calendar, Clock, MapPin, Search, Star, User } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { useAuthContext } from "@/features/auth/context/auth-context"

import { useRequestStore } from "@/lib/request-store"

export function ClientSpecialistsPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { getRequestsByClient } = useRequestStore()

    const { user } = useAuthContext()

    const children = [
        user ? { id: user.id, label: user.email || "Я" } : null,
        { id: "child-1", label: "Марія, 12 років" },
        { id: "child-2", label: "Іван, 9 років" },
    ].filter(Boolean) as { id: string; label: string }[]

    const initialChild = searchParams.get("child") || (user?.id ?? children[0]?.id)
    const selectedChildId = children.find((child) => child.id === initialChild)?.id || (user?.id ?? children[0]?.id)

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

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "trial_scheduled":
                return <Badge className="bg-slate-700">Пробне заплановано</Badge>
            case "paid":
                return <Badge className="bg-green-500">Активний</Badge>
            case "awaiting_payment":
                return <Badge variant="outline">Очікує оплати</Badge>
            default:
                return <Badge variant="secondary">В процесі</Badge>
        }
    }

    return (
        <ProtectedRoute allowedRoles={[UserRoles.Guest, UserRoles.Parent, UserRoles.Student]}>
            <SidebarLayout userType="client">
                <div className="container mx-auto max-w-7xl space-y-8 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold text-slate-800">Мої спеціалісти</h1>
                            <p className="text-muted-foreground">Спеціалісти, з якими ви працюєте</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {children.map((child) => (
                                    <Button
                                        key={child.id}
                                        variant={child.id === selectedChildId ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => router.push(`/client/specialists?child=${child.id}`)}
                                        className="rounded-full"
                                    >
                                        {child.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <Button
                            onClick={() => router.push(`/client/requests/new?child=${selectedChildId}`)}
                            className="rounded-full"
                        >
                            Створити новий запит
                        </Button>
                    </div>

                    <Card className="border-slate-200/80 bg-white/80 shadow-sm">
                        <CardContent className="grid gap-4 p-6 md:grid-cols-2">
                            <button
                                type="button"
                                onClick={() => router.push(`/specialists?child=${selectedChildId}`)}
                                className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-slate-200">
                                        <Search className="h-6 w-6" />
                                    </div>
                                    <h2 className="mt-4 text-lg font-semibold text-slate-800">Знайти спеціаліста в каталозі</h2>
                                    <p className="mt-2 text-sm text-slate-500">
                                        Перегляньте профілі, рейтинги та відгуки і оберіть найкращого.
                                    </p>
                                </div>
                                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 group-hover:text-slate-800">
                                    Перейти до каталогу <ArrowRight className="h-4 w-4" />
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => router.push(`/client/requests/new?child=${selectedChildId}`)}
                                className="group flex h-full flex-col justify-between rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 transition-colors group-hover:bg-emerald-200">
                                        <Calendar className="h-6 w-6" />
                                    </div>
                                    <h2 className="mt-4 text-lg font-semibold text-slate-800">Подати заявку на біржу</h2>
                                    <p className="mt-2 text-sm text-slate-500">
                                        Опишіть запит і отримайте відповіді від підходящих спеціалістів.
                                    </p>
                                </div>
                                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                                    Створити заявку <ArrowRight className="h-4 w-4" />
                                </span>
                            </button>
                        </CardContent>
                    </Card>

                    {specialists.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {specialists.map((specialist) => (
                                <Card key={specialist.id} className="flex flex-col border-slate-200/70 bg-white/80 shadow-sm">
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
                                            <div className="rounded-2xl border border-primary/15 bg-primary/10 p-3">
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
                                                className="w-full bg-transparent rounded-full"
                                                onClick={() => router.push(`/specialists/${specialist.id}?child=${selectedChildId}`)}
                                            >
                                                <User className="mr-2 h-4 w-4" />
                                                Переглянути профіль
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="border-slate-200/70 bg-white/80 shadow-sm">
                            <CardContent className="flex flex-col items-center justify-center py-16">
                                <User className="mb-4 h-16 w-16 text-muted-foreground" />
                                <h3 className="mb-2 text-xl font-semibold">У вас ще немає спеціалістів</h3>
                                <p className="mb-6 text-center text-muted-foreground">
                                    Знайдіть спеціаліста, який підходить вам, та почніть навчання
                                </p>

                                {/* Example specialists preview */}
                                <div className="mb-8 w-full max-w-2xl">
                                    <p className="text-center text-sm text-muted-foreground mb-4">Популярні спеціалісти на платформі:</p>
                                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {[
                                            { name: "Олена Петренко", subject: "Математика", rating: 4.9, reviews: 127, price: 350 },
                                            { name: "Ігор Мельник", subject: "Англійська мова", rating: 4.8, reviews: 89, price: 300 },
                                            { name: "Марія Коваль", subject: "Фізика", rating: 5.0, reviews: 45, price: 400 },
                                        ].map((specialist, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                                                <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
                                                    <User className="h-5 w-5 text-slate-500" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-slate-800 truncate">{specialist.name}</p>
                                                    <p className="text-xs text-slate-500">{specialist.subject}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                        <span className="text-xs font-medium">{specialist.rating}</span>
                                                    </div>
                                                    <p className="text-xs font-semibold text-slate-700">₴{specialist.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button
                                        onClick={() => router.push(`/client/requests/new?child=${selectedChildId}`)}
                                        className="rounded-full"
                                    >
                                        Створити запит
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => router.push(`/specialists?child=${selectedChildId}`)}
                                        className="rounded-full"
                                    >
                                        Переглянути каталог
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </SidebarLayout>
        </ProtectedRoute>
    )
}
