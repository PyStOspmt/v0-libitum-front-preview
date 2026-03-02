"use client"

import { useToast } from "@/hooks/use-toast"
import { BookOpen, CheckCircle, Clock, Download, FileText, Upload } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

import { useAuth } from "@/lib/auth-context"
import { useLessonStore } from "@/lib/lesson-store"

export function ClientMaterialsPage() {
    const { user } = useAuth()
    const { lessons, submitHomework } = useLessonStore()
    const { toast } = useToast()
    const [selectedHomework, setSelectedHomework] = useState<any>(null)
    const [submissionText, setSubmissionText] = useState("")
    const router = useRouter()
    const searchParams = useSearchParams()

    const children = [
        user ? { id: user.id, label: user.name ? `${user.name} (я)` : "Я" } : null,
        { id: "child-1", label: "Марія, 12 років" },
        { id: "child-2", label: "Іван, 9 років" },
    ].filter(Boolean) as { id: string; label: string }[]

    const initialChild = searchParams.get("child") || (user?.id ?? children[0].id)
    const selectedChildId = children.find((child) => child.id === initialChild)?.id || (user?.id ?? children[0].id)

    const clientLessons = lessons.filter((l) => l.clientId === (selectedChildId || user?.id || "client-1"))
    const homeworks = clientLessons
        .filter((l) => l.homework)
        .map((l) => {
            const homework = l.homework

            return {
                ...homework,
                status: homework?.status ?? "pending",
                dueDate: homework?.dueDate ?? l.date,
                submittedAt: homework?.submittedAt ?? null,
                checkedAt: homework?.checkedAt ?? null,
                grade: homework?.grade ?? 0,
                lessonId: l.id,
                lessonDate: l.date,
                subject: l.subject,
                specialistName: l.specialistName,
            }
        })

    const materials = clientLessons
        .filter((l) => l.materials && l.materials.length > 0)
        .flatMap(
            (l) =>
                l.materials?.map((m) => ({
                    fileName: m,
                    lessonId: l.id,
                    subject: l.subject,
                    date: l.date ?? new Date().toISOString(),
                })) || [],
        )

    const pendingHomeworks = homeworks.filter((h) => h.status === "pending")
    const submittedHomeworks = homeworks.filter((h) => h.status === "submitted")
    const checkedHomeworks = homeworks.filter((h) => h.status === "checked")

    // Demo content for empty states
    const demoHomeworks = [
        {
            id: "demo-hw-1",
            title: "Есе про подорожі",
            description: "Написати 150 слів про улюблене місце",
            subject: "Англійська мова",
            specialistName: "Олена Іваненко",
            status: "pending" as const,
            dueDate: new Date().toISOString(),
        },
        {
            id: "demo-hw-2",
            title: "Графіки руху",
            description: "Побудувати графік V(t) для трьох сценаріїв",
            subject: "Фізика",
            specialistName: "Олександр Сидоренко",
            status: "submitted" as const,
            submittedAt: new Date().toISOString(),
        },
        {
            id: "demo-hw-3",
            title: "Вправи на дроби",
            description: "Задачі 4-8, перевірено викладачем",
            subject: "Математика",
            specialistName: "Ігор Петренко",
            status: "checked" as const,
            grade: 4.5,
            feedback: "Лише одна неточність, в цілому чудово!",
            checkedAt: new Date().toISOString(),
        },
    ]

    const demoMaterials = [
        { fileName: "Present_Perfect_Guide.pdf", subject: "Англійська мова", date: new Date().toISOString() },
        { fileName: "Fractions_Practice.xlsx", subject: "Математика", date: new Date().toISOString() },
        { fileName: "Stress_Management_Techniques.pdf", subject: "Психологія", date: new Date().toISOString() },
    ]

    const handleSubmitHomework = () => {
        if (!selectedHomework) return

        submitHomework(selectedHomework.lessonId, {
            description: submissionText,
            attachments: [],
        })

        toast({
            title: "Домашнє завдання здано",
            description: "Ваша робота успішно відправлена на перевірку",
        })

        setSelectedHomework(null)
        setSubmissionText("")
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return (
                    <Badge variant="outline" className="text-yellow-600">
                        <Clock className="mr-1 h-3 w-3" />
                        Очікує здачі
                    </Badge>
                )
            case "submitted":
                return (
                    <Badge variant="outline" className="text-blue-600">
                        <Upload className="mr-1 h-3 w-3" />
                        На перевірці
                    </Badge>
                )
            case "checked":
                return (
                    <Badge variant="outline" className="text-green-600">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Перевірено
                    </Badge>
                )
            default:
                return null
        }
    }

    return (
        <ProtectedRoute allowedRoles={["client"]}>
            <SidebarLayout userType="client">
                <div className="container mx-auto max-w-7xl space-y-6 p-6">
                    <div>
                        <h1 className="text-3xl font-bold">Матеріали та завдання</h1>
                        <p className="text-muted-foreground">Домашні завдання та навчальні матеріали</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {children.map((child) => (
                                <Button
                                    key={child.id}
                                    variant={child.id === selectedChildId ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => router.push(`/client/materials?child=${child.id}`)}
                                    className={`rounded-full transition-all ${
                                        child.id === selectedChildId
                                            ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
                                            : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                                    }`}
                                >
                                    {child.label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <Tabs defaultValue="homework" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="homework">Домашні завдання</TabsTrigger>
                            <TabsTrigger value="materials">Матеріали</TabsTrigger>
                        </TabsList>

                        <TabsContent value="homework" className="space-y-6">
                            {pendingHomeworks.length > 0 && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold">Потрібно здати</h2>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {pendingHomeworks.map((hw) => (
                                            <Card key={hw.id} className="border-yellow-200">
                                                <CardHeader>
                                                    <div className="flex items-start justify-between">
                                                        <div className="space-y-1">
                                                            <CardTitle className="text-lg">{hw.title}</CardTitle>
                                                            <CardDescription>
                                                                {hw.subject} • {hw.specialistName}
                                                            </CardDescription>
                                                        </div>
                                                        {getStatusBadge(hw.status)}
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <p className="text-sm text-muted-foreground">{hw.description}</p>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <Clock className="h-4 w-4" />
                                                        <span>
                                                            Здати до: {new Date(hw.dueDate).toLocaleDateString("uk-UA")}
                                                        </span>
                                                    </div>
                                                    <Button className="w-full" onClick={() => setSelectedHomework(hw)}>
                                                        <Upload className="mr-2 h-4 w-4" />
                                                        Здати роботу
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {submittedHomeworks.length > 0 && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold">На перевірці</h2>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {submittedHomeworks.map((hw) => (
                                            <Card key={hw.id} className="border-blue-200">
                                                <CardHeader>
                                                    <div className="flex items-start justify-between">
                                                        <div className="space-y-1">
                                                            <CardTitle className="text-lg">{hw.title}</CardTitle>
                                                            <CardDescription>
                                                                {hw.subject} • {hw.specialistName}
                                                            </CardDescription>
                                                        </div>
                                                        {getStatusBadge(hw.status)}
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="space-y-2">
                                                    <p className="text-sm text-muted-foreground">{hw.description}</p>
                                                    <div className="text-sm text-muted-foreground">
                                                        Здано:{" "}
                                                        {hw.submittedAt
                                                            ? new Date(hw.submittedAt).toLocaleDateString("uk-UA")
                                                            : "-"}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {checkedHomeworks.length > 0 && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold">Перевірені роботи</h2>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {checkedHomeworks.map((hw) => (
                                            <Card key={hw.id} className="border-green-200">
                                                <CardHeader>
                                                    <div className="flex items-start justify-between">
                                                        <div className="space-y-1">
                                                            <CardTitle className="text-lg">{hw.title}</CardTitle>
                                                            <CardDescription>
                                                                {hw.subject} • {hw.specialistName}
                                                            </CardDescription>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            {getStatusBadge(hw.status)}
                                                            <Badge className="bg-green-600 text-lg">{hw.grade}/5</Badge>
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <p className="text-sm text-muted-foreground">{hw.description}</p>
                                                    {hw.feedback && (
                                                        <div className="rounded-lg bg-muted p-3">
                                                            <p className="text-sm font-medium">Відгук викладача:</p>
                                                            <p className="text-sm text-muted-foreground">{hw.feedback}</p>
                                                        </div>
                                                    )}
                                                    <div className="text-xs text-muted-foreground">
                                                        Перевірено:{" "}
                                                        {hw.checkedAt
                                                            ? new Date(hw.checkedAt).toLocaleDateString("uk-UA")
                                                            : "-"}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {homeworks.length === 0 && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold">Приклад заповненого кабінету</h2>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {demoHomeworks.map((hw) => (
                                            <Card
                                                key={hw.id}
                                                className={
                                                    hw.status === "pending"
                                                        ? "border-yellow-200"
                                                        : hw.status === "submitted"
                                                          ? "border-blue-200"
                                                          : "border-green-200"
                                                }
                                            >
                                                <CardHeader>
                                                    <div className="flex items-start justify-between">
                                                        <div className="space-y-1">
                                                            <CardTitle className="text-lg">{hw.title}</CardTitle>
                                                            <CardDescription>
                                                                {hw.subject} • {hw.specialistName}
                                                            </CardDescription>
                                                        </div>
                                                        {getStatusBadge(hw.status)}
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="space-y-3">
                                                    <p className="text-sm text-muted-foreground">{hw.description}</p>
                                                    {hw.dueDate && (
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <Clock className="h-4 w-4" />
                                                            <span>
                                                                Здати до: {new Date(hw.dueDate).toLocaleDateString("uk-UA")}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {hw.submittedAt && (
                                                        <div className="text-sm text-muted-foreground">
                                                            Здано: {new Date(hw.submittedAt).toLocaleDateString("uk-UA")}
                                                        </div>
                                                    )}
                                                    {hw.feedback && (
                                                        <div className="rounded-lg bg-muted p-3">
                                                            <p className="text-sm font-medium">Відгук викладача:</p>
                                                            <p className="text-sm text-muted-foreground">{hw.feedback}</p>
                                                        </div>
                                                    )}
                                                    {typeof hw.grade === "number" && (
                                                        <Badge className="bg-green-600 text-white w-fit">{hw.grade}/5</Badge>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="materials" className="space-y-4">
                            {materials.length > 0 ? (
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {materials.map((material, index) => (
                                        <Card key={index}>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2 text-base">
                                                    <FileText className="h-5 w-5" />
                                                    {material.fileName}
                                                </CardTitle>
                                                <CardDescription>
                                                    {material.subject} • {new Date(material.date).toLocaleDateString("uk-UA")}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <Button variant="outline" className="w-full bg-transparent">
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Завантажити
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <h2 className="text-xl font-semibold">Приклад матеріалів</h2>
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {demoMaterials.map((material, index) => (
                                            <Card key={index}>
                                                <CardHeader>
                                                    <CardTitle className="flex items-center gap-2 text-base">
                                                        <FileText className="h-5 w-5" />
                                                        {material.fileName}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        {material.subject} •{" "}
                                                        {new Date(material.date).toLocaleDateString("uk-UA")}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <Button variant="outline" className="w-full bg-transparent">
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Завантажити
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>

                <Dialog open={!!selectedHomework} onOpenChange={() => setSelectedHomework(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Здати домашнє завдання</DialogTitle>
                            <DialogDescription>{selectedHomework?.title}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Завдання</Label>
                                <p className="text-sm text-muted-foreground">{selectedHomework?.description}</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="submission">Ваша відповідь</Label>
                                <Textarea
                                    id="submission"
                                    value={submissionText}
                                    onChange={(e) => setSubmissionText(e.target.value)}
                                    placeholder="Опишіть виконану роботу або додайте посилання..."
                                    rows={5}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Прикріпити файли</Label>
                                <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-6">
                                    <div className="text-center">
                                        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Перетягніть файли або натисніть для вибору
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setSelectedHomework(null)}>
                                Скасувати
                            </Button>
                            <Button onClick={handleSubmitHomework}>
                                <Upload className="mr-2 h-4 w-4" />
                                Здати роботу
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </SidebarLayout>
        </ProtectedRoute>
    )
}
