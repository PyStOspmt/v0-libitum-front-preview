"use client"

import { BookOpen, DollarSign, TrendingUp, Users } from "lucide-react"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserRoles } from "@/graphql/generated/graphql"

export function AdminReportsPage() {
    return (
        <ProtectedRoute allowedRoles={[UserRoles.SuperAdmin]}>
            <SidebarLayout userType="admin">
                <div className="container mx-auto max-w-7xl space-y-6 p-6">
                    <div>
                        <h1 className="text-3xl font-bold">Звіти та аналітика</h1>
                        <p className="text-muted-foreground">Детальна статистика платформи</p>
                    </div>

                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList>
                            <TabsTrigger value="overview">Огляд</TabsTrigger>
                            <TabsTrigger value="users">Користувачі</TabsTrigger>
                            <TabsTrigger value="financial">Фінанси</TabsTrigger>
                            <TabsTrigger value="lessons">Заняття</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Зростання користувачів</CardTitle>
                                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">+15.3%</div>
                                        <p className="text-xs text-muted-foreground">За останній місяць</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Нові користувачі</CardTitle>
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">+47</div>
                                        <p className="text-xs text-muted-foreground">За останній тиждень</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Дохід</CardTitle>
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">125,000 ₴</div>
                                        <p className="text-xs text-muted-foreground">За цей місяць</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Завершені заняття</CardTitle>
                                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">+156</div>
                                        <p className="text-xs text-muted-foreground">За останній тиждень</p>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Статистика за місяць</CardTitle>
                                    <CardDescription>Основні показники платформи</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between border-b pb-3">
                                            <span className="text-sm font-medium">Всього користувачів</span>
                                            <span className="text-2xl font-bold">1,247</span>
                                        </div>
                                        <div className="flex items-center justify-between border-b pb-3">
                                            <span className="text-sm font-medium">Активних спеціалістів</span>
                                            <span className="text-2xl font-bold">342</span>
                                        </div>
                                        <div className="flex items-center justify-between border-b pb-3">
                                            <span className="text-sm font-medium">Активних клієнтів</span>
                                            <span className="text-2xl font-bold">905</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Завершених занять</span>
                                            <span className="text-2xl font-bold">2,456</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="users" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Статистика користувачів</CardTitle>
                                    <CardDescription>Детальна інформація про користувачів платформи</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between border-b pb-3">
                                            <span className="text-sm">Нові реєстрації (тиждень)</span>
                                            <span className="font-bold">47</span>
                                        </div>
                                        <div className="flex items-center justify-between border-b pb-3">
                                            <span className="text-sm">Нові реєстрації (місяць)</span>
                                            <span className="font-bold">189</span>
                                        </div>
                                        <div className="flex items-center justify-between border-b pb-3">
                                            <span className="text-sm">Активні користувачі (тиждень)</span>
                                            <span className="font-bold">823</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Середній час на платформі</span>
                                            <span className="font-bold">24 хв</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="financial" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Фінансова статистика</CardTitle>
                                    <CardDescription>Детальна інформація про доходи платформи</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between border-b pb-3">
                                            <span className="text-sm">Дохід за тиждень</span>
                                            <span className="font-bold">28,600 ₴</span>
                                        </div>
                                        <div className="flex items-center justify-between border-b pb-3">
                                            <span className="text-sm">Дохід за місяць</span>
                                            <span className="font-bold">125,000 ₴</span>
                                        </div>
                                        <div className="flex items-center justify-between border-b pb-3">
                                            <span className="text-sm">Середній чек</span>
                                            <span className="font-bold">1,300 ₴</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Очікують оплати</span>
                                            <span className="font-bold">12,300 ₴</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="lessons" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Статистика занять</CardTitle>
                                    <CardDescription>Інформація про проведені заняття</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between border-b pb-3">
                                            <span className="text-sm">Завершені заняття (тиждень)</span>
                                            <span className="font-bold">156</span>
                                        </div>
                                        <div className="flex items-center justify-between border-b pb-3">
                                            <span className="text-sm">Завершені заняття (місяць)</span>
                                            <span className="font-bold">678</span>
                                        </div>
                                        <div className="flex items-center justify-between border-b pb-3">
                                            <span className="text-sm">Активні запити</span>
                                            <span className="font-bold">45</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Середня тривалість заняття</span>
                                            <span className="font-bold">60 хв</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </SidebarLayout>
        </ProtectedRoute>
    )
}
