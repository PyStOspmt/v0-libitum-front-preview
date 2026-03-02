"use client"

import { useState } from "react"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

const moderationQueue = [
    {
        id: "t1",
        name: "Олена Іваненко",
        subject: "Англійська мова",
        status: "pending",
        experience: "8 років",
    },
    {
        id: "t2",
        name: "Петро Коваль",
        subject: "Математика",
        status: "pending",
        experience: "5 років",
    },
]

export function AdminModerationPage() {
    const [comment, setComment] = useState("")

    return (
        <ProtectedRoute allowedRoles={["admin"]}>
            <SidebarLayout userType="admin">
                <div className="container mx-auto max-w-6xl space-y-6 p-6 font-sans">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-[700] text-[#121117]">Модерація</h1>
                        <p className="text-[15px] font-[500] text-[#69686f]">
                            Перевірка профілів спеціалістів перед активацією.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {moderationQueue.map((item) => (
                            <Card
                                key={item.id}
                                className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                            >
                                <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="text-xl font-[700] text-[#121117]">{item.name}</CardTitle>
                                        <CardDescription className="text-[#69686f] font-[500]">
                                            {item.subject} • {item.experience}
                                        </CardDescription>
                                    </div>
                                    <Badge
                                        variant="secondary"
                                        className="rounded-[8px] bg-orange-100 text-orange-700 hover:bg-orange-100/80 border-0 font-[600]"
                                    >
                                        Очікує перевірки
                                    </Badge>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="text-[14px] font-[500] text-[#69686f] bg-[#f0f3f3]/50 p-4 rounded-[12px] border border-slate-200/80">
                                        Заповнена анкета, дипломи та відео доступні для перегляду в профілі.
                                    </div>
                                    <Textarea
                                        value={comment}
                                        onChange={(event) => setComment(event.target.value)}
                                        placeholder="Коментар для відхилення (опційно)"
                                        className="rounded-[12px] border-slate-200/80 focus-visible:ring-[#00c5a6] resize-none text-[15px] placeholder:text-[#69686f]/50"
                                        rows={3}
                                    />
                                    <div className="flex flex-wrap gap-2">
                                        <Button className="rounded-[8px] bg-[#00c5a6] text-white hover:bg-[#00a389] font-[600] shadow-[0_2px_8px_rgba(0,197,166,0.2)]">
                                            Затвердити
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="rounded-[8px] border-slate-200/80 text-[#121117] font-[600] hover:bg-slate-50 shadow-sm"
                                        >
                                            Відхилити
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </SidebarLayout>
        </ProtectedRoute>
    )
}
