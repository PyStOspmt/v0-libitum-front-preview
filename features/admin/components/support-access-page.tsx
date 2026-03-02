"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function AdminSupportAccessPage() {
    return (
        <ProtectedRoute allowedRoles={["admin"]}>
            <SidebarLayout userType="admin">
                <div className="container mx-auto max-w-5xl space-y-6 p-6 font-sans">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-[700] text-[#121117]">Support Access</h1>
                        <p className="text-[15px] font-[500] text-[#69686f]">
                            Режим підтримки для входу в кабінет користувача без зміни його пароля.
                        </p>
                    </div>

                    <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                        <CardHeader>
                            <CardTitle className="text-xl font-[700] text-[#121117]">Створити доступ</CardTitle>
                            <CardDescription className="text-[#69686f] font-[500]">
                                Вкажіть email користувача, щоб згенерувати тимчасовий доступ.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input
                                placeholder="email користувача"
                                type="email"
                                className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                            />
                            <Button className="rounded-[8px] bg-[#00c5a6] text-white hover:bg-[#00a389] font-[600] shadow-[0_2px_8px_rgba(0,197,166,0.2)]">
                                Згенерувати доступ
                            </Button>
                            <p className="text-[13px] font-[500] text-[#69686f]">
                                Доступ діє обмежений час і логуються всі дії адміністратора.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                        <CardHeader>
                            <CardTitle className="text-xl font-[700] text-[#121117]">Останні сесії підтримки</CardTitle>
                            <CardDescription className="text-[#69686f] font-[500]">
                                Історія створених доступів для аудиту.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-[12px] bg-[#f0f3f3]/50 border border-slate-200/80 text-[14px] font-[500] text-[#121117]">
                                <span>Марія Петренко</span>
                                <span className="text-[#69686f]">2 години тому</span>
                                <span className="text-[#00a389] bg-[#e8fffb] px-2 py-0.5 rounded-[6px] font-[600] text-[13px]">
                                    завершено
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-[12px] bg-[#f0f3f3]/50 border border-slate-200/80 text-[14px] font-[500] text-[#121117]">
                                <span>Іван Сидоренко</span>
                                <span className="text-[#69686f]">1 день тому</span>
                                <span className="text-[#00a389] bg-[#e8fffb] px-2 py-0.5 rounded-[6px] font-[600] text-[13px]">
                                    завершено
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-[12px] bg-[#f0f3f3]/50 border border-slate-200/80 text-[14px] font-[500] text-[#121117]">
                                <span>Олена Коваль</span>
                                <span className="text-[#69686f]">3 дні тому</span>
                                <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded-[6px] font-[600] text-[13px]">
                                    скасовано
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </SidebarLayout>
        </ProtectedRoute>
    )
}
