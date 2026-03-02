"use client"

import { Award, CheckCircle2, FileText, XCircle } from "lucide-react"
import { useState } from "react"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function AdminVerificationsPage() {
    const [rejectReason, setRejectReason] = useState("")

    const pendingVerifications = [
        {
            id: "1",
            specialistName: "Марія Петренко",
            email: "maria@example.com",
            specialization: "Логопед",
            subjects: ["Корекція мовлення", "Розвиток дикції"],
            experience: "5 років",
            education: "Київський національний університет, Логопедія",
            documents: ["Диплом", "Сертифікат"],
            submittedDate: "2024-03-10",
            description:
                "Досвідчений логопед з 5-річним стажем роботи. Спеціалізуюсь на корекції мовлення у дітей дошкільного та шкільного віку.",
        },
        {
            id: "2",
            specialistName: "Анна Мельник",
            email: "anna@example.com",
            specialization: "Репетитор",
            subjects: ["Українська мова", "Література"],
            experience: "3 роки",
            education: "Львівський університет, Філологія",
            documents: ["Диплом"],
            submittedDate: "2024-02-28",
            description: "Викладаю українську мову та літературу для учнів 5-11 класів. Підготовка до ЗНО.",
        },
    ]

    return (
        <ProtectedRoute allowedRoles={["admin"]}>
            <SidebarLayout userType="admin">
                <div className="container mx-auto max-w-7xl space-y-6 p-6 font-sans">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-[700] text-[#121117]">Верифікація спеціалістів</h1>
                        <p className="text-[15px] font-[500] text-[#69686f]">Перевірка та затвердження нових спеціалістів</p>
                    </div>

                    <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                        <CardHeader>
                            <CardTitle className="text-xl font-[700] text-[#121117]">Очікують верифікації</CardTitle>
                            <CardDescription className="text-[#69686f] font-[500]">
                                {pendingVerifications.length} спеціалістів очікують перевірки
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {pendingVerifications.map((verification) => (
                                <Card
                                    key={verification.id}
                                    className="rounded-[16px] border-slate-200/80 shadow-none hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow"
                                >
                                    <CardContent className="p-6">
                                        <div className="space-y-5">
                                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                                <div className="space-y-2">
                                                    <h3 className="text-lg font-[700] text-[#121117]">
                                                        {verification.specialistName}
                                                    </h3>
                                                    <p className="text-[14px] font-[500] text-[#69686f]">
                                                        {verification.email}
                                                    </p>
                                                    <Badge className="rounded-[8px] bg-[#f0f3f3] text-[#121117] hover:bg-[#f0f3f3]/80 border-0 font-[600]">
                                                        {verification.specialization}
                                                    </Badge>
                                                </div>
                                                <span className="text-[13px] font-[500] text-[#69686f] bg-[#f0f3f3]/50 px-2 py-1 rounded-[6px]">
                                                    Подано: {new Date(verification.submittedDate).toLocaleDateString("uk-UA")}
                                                </span>
                                            </div>

                                            <div className="grid gap-4 md:grid-cols-2 bg-[#f0f3f3]/30 p-4 rounded-[12px] border border-slate-200/50">
                                                <div>
                                                    <Label className="text-[#69686f] font-[600] text-[13px] uppercase tracking-wide">
                                                        Предмети
                                                    </Label>
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        {verification.subjects.map((subject) => (
                                                            <Badge
                                                                key={subject}
                                                                variant="outline"
                                                                className="rounded-[8px] bg-white text-[#121117] border-slate-200/80 font-[500]"
                                                            >
                                                                {subject}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label className="text-[#69686f] font-[600] text-[13px] uppercase tracking-wide">
                                                        Досвід
                                                    </Label>
                                                    <p className="mt-2 text-[15px] font-[500] text-[#121117]">
                                                        {verification.experience}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="bg-[#f0f3f3]/30 p-4 rounded-[12px] border border-slate-200/50">
                                                <Label className="text-[#69686f] font-[600] text-[13px] uppercase tracking-wide">
                                                    Освіта
                                                </Label>
                                                <p className="mt-2 text-[15px] font-[500] text-[#121117]">
                                                    {verification.education}
                                                </p>
                                            </div>

                                            <div className="bg-[#f0f3f3]/30 p-4 rounded-[12px] border border-slate-200/50">
                                                <Label className="text-[#69686f] font-[600] text-[13px] uppercase tracking-wide">
                                                    Про себе
                                                </Label>
                                                <p className="mt-2 text-[15px] font-[500] text-[#121117] leading-relaxed">
                                                    {verification.description}
                                                </p>
                                            </div>

                                            <div className="bg-[#f0f3f3]/30 p-4 rounded-[12px] border border-slate-200/50">
                                                <Label className="text-[#69686f] font-[600] text-[13px] uppercase tracking-wide">
                                                    Документи
                                                </Label>
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {verification.documents.map((doc) => (
                                                        <Button
                                                            key={doc}
                                                            variant="outline"
                                                            size="sm"
                                                            className="rounded-[8px] border-slate-200/80 text-[#121117] font-[600] hover:bg-white shadow-sm"
                                                        >
                                                            <FileText className="mr-2 h-4 w-4 text-[#69686f]" />
                                                            {doc}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                                <Button className="flex-1 rounded-[8px] bg-[#00c5a6] text-white hover:bg-[#00a389] font-[600] shadow-[0_2px_8px_rgba(0,197,166,0.2)]">
                                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                                    Верифікувати
                                                </Button>

                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="destructive"
                                                            className="flex-1 rounded-[8px] font-[600]"
                                                        >
                                                            <XCircle className="mr-2 h-4 w-4" />
                                                            Відхилити
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="rounded-[24px] border-0 shadow-[0_8px_32px_rgba(0,0,0,0.08)] font-sans sm:max-w-md">
                                                        <DialogHeader className="pb-4 border-b border-slate-200/80">
                                                            <DialogTitle className="text-[20px] font-[700] text-[#121117]">
                                                                Відхилити верифікацію
                                                            </DialogTitle>
                                                            <DialogDescription className="text-[#69686f] font-[500]">
                                                                Вкажіть причину відхилення для{" "}
                                                                <span className="font-[600] text-[#121117]">
                                                                    {verification.specialistName}
                                                                </span>
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="space-y-4 py-4">
                                                            <div className="space-y-2">
                                                                <Label className="text-[#121117] font-[600]">
                                                                    Причина відхилення
                                                                </Label>
                                                                <Textarea
                                                                    placeholder="Опишіть причину відхилення..."
                                                                    value={rejectReason}
                                                                    onChange={(e) => setRejectReason(e.target.value)}
                                                                    rows={4}
                                                                    className="rounded-[12px] border-slate-200/80 focus-visible:ring-[#00c5a6] resize-none text-[15px]"
                                                                />
                                                            </div>
                                                        </div>
                                                        <DialogFooter className="pt-2">
                                                            <Button
                                                                variant="outline"
                                                                className="rounded-[8px] border-slate-200/80 hover:bg-[#f0f3f3] text-[#121117] font-[600]"
                                                            >
                                                                Скасувати
                                                            </Button>
                                                            <Button variant="destructive" className="rounded-[8px] font-[600]">
                                                                Відхилити
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {pendingVerifications.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-slate-200/80 rounded-[16px] bg-[#f0f3f3]/30">
                                    <div className="h-16 w-16 bg-[#e8fffb] rounded-full flex items-center justify-center mb-4">
                                        <Award className="h-8 w-8 text-[#00c5a6]" />
                                    </div>
                                    <h3 className="text-[18px] font-[700] text-[#121117]">Немає запитів на верифікацію</h3>
                                    <p className="text-[14px] font-[500] text-[#69686f] mt-1">Всі спеціалісти перевірені</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </SidebarLayout>
        </ProtectedRoute>
    )
}
