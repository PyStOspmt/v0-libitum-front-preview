"use client"

import { UserRoles } from "@/graphql/generated/graphql"
import { useToast } from "@/hooks/use-toast"

import { ProtectedRoute } from "@/components/protected-route"
import { RequestCard } from "@/components/request-card"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useAuthContext } from "@/features/auth/context/auth-context"

import { useRequestStore } from "@/lib/request-store"

export function TutorRequestsPage() {
    const { toast } = useToast()
    const { getRequestsBySpecialist, acceptRequest, rejectRequest } = useRequestStore()
    const { user } = useAuthContext()

    const specialistId = user?.id || "specialist-1"

    const specialistRequests = getRequestsBySpecialist(specialistId)
    const pendingRequests = specialistRequests.filter((req) => req.status === "pending")
    const activeRequests = specialistRequests.filter((req) =>
        ["accepted", "communicating", "trial_scheduled"].includes(req.status),
    )
    const completedRequests = specialistRequests.filter((req) =>
        ["trial_completed", "awaiting_payment", "paid"].includes(req.status),
    )

    const handleAcceptRequest = (requestId: string) => {
        acceptRequest(requestId)
        toast({
            title: "Запит прийнято",
            description: "Заняття додано до вашого розкладу",
        })
    }

    const handleRejectRequest = (requestId: string) => {
        rejectRequest(requestId, "Не підходить графік")
        toast({
            title: "Запит відхилено",
            description: "Клієнт отримає повідомлення",
            variant: "destructive",
        })
    }

    return (
        <ProtectedRoute allowedRoles={[UserRoles.Specialist]}>
            <SidebarLayout userType="tutor">
                <div className="container mx-auto max-w-5xl space-y-8 p-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Запити на заняття</h1>
                        <p className="text-slate-500 mt-1">Управління запитами від клієнтів</p>
                    </div>

                    <Tabs defaultValue="pending" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 bg-slate-100/50 p-1 rounded-xl h-12">
                            <TabsTrigger
                                value="pending"
                                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-500 font-medium transition-all"
                            >
                                Нові ({pendingRequests.length})
                            </TabsTrigger>
                            <TabsTrigger
                                value="active"
                                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-500 font-medium transition-all"
                            >
                                Активні ({activeRequests.length})
                            </TabsTrigger>
                            <TabsTrigger
                                value="completed"
                                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-500 font-medium transition-all"
                            >
                                Завершені ({completedRequests.length})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="pending" className="mt-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Нові запити</h2>
                                    <p className="text-sm text-slate-500">
                                        Відповідайте протягом 3 годин для збереження рейтингу
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
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
                                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-12 text-center">
                                        <p className="text-lg font-medium text-slate-900">Немає нових запитів</p>
                                        <p className="text-sm text-slate-500">Ваш профіль зараз не отримує нових заявок</p>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="active" className="mt-6 space-y-6">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">Активні запити</h2>
                                <p className="text-sm text-slate-500">Запити в процесі обробки та планування</p>
                            </div>

                            <div className="space-y-4">
                                {activeRequests.length > 0 ? (
                                    activeRequests.map((request) => (
                                        <RequestCard
                                            key={request.id}
                                            request={request}
                                            userType="specialist"
                                            onAccept={handleAcceptRequest}
                                            onReject={handleRejectRequest}
                                        />
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-12 text-center">
                                        <p className="text-lg font-medium text-slate-900">Немає активних запитів</p>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="completed" className="mt-6 space-y-6">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">Завершені запити</h2>
                                <p className="text-sm text-slate-500">Історія ваших запитів та оплат</p>
                            </div>

                            <div className="space-y-4">
                                {completedRequests.length > 0 ? (
                                    completedRequests.map((request) => (
                                        <RequestCard key={request.id} request={request} userType="specialist" />
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-12 text-center">
                                        <p className="text-lg font-medium text-slate-900">Немає завершених запитів</p>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </SidebarLayout>
        </ProtectedRoute>
    )
}
