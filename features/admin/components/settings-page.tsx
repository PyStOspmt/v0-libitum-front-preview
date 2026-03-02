"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AdminSettingsPage() {
    return (
        <ProtectedRoute allowedRoles={["admin"]}>
            <SidebarLayout userType="admin">
                <div className="container mx-auto max-w-4xl space-y-6 p-6 font-sans">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-[700] text-[#121117]">Налаштування платформи</h1>
                        <p className="text-[15px] font-[500] text-[#69686f]">Управління глобальними налаштуваннями</p>
                    </div>

                    <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                        <CardHeader>
                            <CardTitle className="text-xl font-[700] text-[#121117]">Загальні налаштування</CardTitle>
                            <CardDescription className="text-[#69686f] font-[500]">Основні параметри платформи</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="platform-name" className="text-[#121117] font-[600]">
                                    Назва платформи
                                </Label>
                                <Input
                                    id="platform-name"
                                    defaultValue="Libitum Education"
                                    className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="support-email" className="text-[#121117] font-[600]">
                                    Email підтримки
                                </Label>
                                <Input
                                    id="support-email"
                                    type="email"
                                    defaultValue="support@libitum.com"
                                    className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                                />
                            </div>
                            <Button className="rounded-[8px] bg-[#00c5a6] text-white hover:bg-[#00a389] font-[600] shadow-[0_2px_8px_rgba(0,197,166,0.2)]">
                                Зберегти зміни
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                        <CardHeader>
                            <CardTitle className="text-xl font-[700] text-[#121117]">Фінансові налаштування</CardTitle>
                            <CardDescription className="text-[#69686f] font-[500]">Параметри оплати та комісій</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="lead-price" className="text-[#121117] font-[600]">
                                    Вартість ліда (₴)
                                </Label>
                                <Input
                                    id="lead-price"
                                    type="number"
                                    defaultValue="1300"
                                    className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="trial-lessons" className="text-[#121117] font-[600]">
                                    Кількість пробних занять
                                </Label>
                                <Input
                                    id="trial-lessons"
                                    type="number"
                                    defaultValue="3"
                                    className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                                />
                            </div>
                            <Button className="rounded-[8px] bg-[#00c5a6] text-white hover:bg-[#00a389] font-[600] shadow-[0_2px_8px_rgba(0,197,166,0.2)]">
                                Зберегти зміни
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                        <CardHeader>
                            <CardTitle className="text-xl font-[700] text-[#121117]">Таймінги</CardTitle>
                            <CardDescription className="text-[#69686f] font-[500]">
                                Налаштування часових обмежень
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="response-time" className="text-[#121117] font-[600]">
                                    Час на відповідь (години)
                                </Label>
                                <Input
                                    id="response-time"
                                    type="number"
                                    defaultValue="3"
                                    className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status-update-time" className="text-[#121117] font-[600]">
                                    Час на оновлення статусу (години)
                                </Label>
                                <Input
                                    id="status-update-time"
                                    type="number"
                                    defaultValue="2"
                                    className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="payment-time" className="text-[#121117] font-[600]">
                                    Час на оплату (години)
                                </Label>
                                <Input
                                    id="payment-time"
                                    type="number"
                                    defaultValue="24"
                                    className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                                />
                            </div>
                            <Button className="rounded-[8px] bg-[#00c5a6] text-white hover:bg-[#00a389] font-[600] shadow-[0_2px_8px_rgba(0,197,166,0.2)]">
                                Зберегти зміни
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </SidebarLayout>
        </ProtectedRoute>
    )
}
