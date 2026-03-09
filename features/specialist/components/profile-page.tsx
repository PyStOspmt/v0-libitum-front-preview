"use client"

import { UserRoles } from "@/graphql/generated/graphql"
import { ArrowLeft, BookOpen, Plus, Upload, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { ProtectedRoute } from "@/components/protected-route"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { useAuthContext } from "@/features/auth/context/auth-context"

export function SpecialistProfilePage() {
    const { user } = useAuthContext()
    const [subjects, setSubjects] = useState(["Англійська мова", "Німецька мова"])
    const [newSubject, setNewSubject] = useState("")

    const addSubject = () => {
        if (newSubject && !subjects.includes(newSubject)) {
            setSubjects([...subjects, newSubject])
            setNewSubject("")
        }
    }

    const removeSubject = (subject: string) => {
        setSubjects(subjects.filter((s) => s !== subject))
    }

    return (
        <ProtectedRoute allowedRoles={[UserRoles.Specialist]}>
            <div className="min-h-screen bg-muted/30">
                <header className="border-b bg-card">
                    <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4">
                        <div className="flex items-center gap-4">
                            <Link href="/specialist/dashboard">
                                <Button variant="ghost" size="icon">
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </Link>
                            <div className="flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                    <BookOpen className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <h1 className="text-xl font-semibold">Налаштування профілю</h1>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="container mx-auto max-w-5xl px-3 sm:px-4 md:px-6 py-6 sm:py-8">
                    <div className="grid gap-4 sm:gap-6 lg:gap-8">
                        {/* Profile Photo - Full width on mobile, half on desktop */}
                        <Card className="lg:col-span-2">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg sm:text-xl">Фото профілю</CardTitle>
                                <CardDescription className="text-sm">
                                    Додайте професійне фото для вашого профілю
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                                    <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                                        <AvatarFallback className="text-xl sm:text-2xl">{user?.email[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
                                        <Button className="w-full sm:w-auto">
                                            <Upload className="mr-2 h-4 w-4" />
                                            Завантажити фото
                                        </Button>
                                        <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
                                            JPG, PNG або GIF. Максимум 5MB.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Basic Info - Optimized grid */}
                        <Card className="lg:col-span-2">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg sm:text-xl">Основна інформація</CardTitle>
                                <CardDescription className="text-sm">Ваші особисті дані</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">Ім'я</Label>
                                        <Input id="firstName" defaultValue="Олена" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Прізвище</Label>
                                        <Input id="lastName" defaultValue="Іваненко" />
                                    </div>
                                    <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                                        <Label htmlFor="phone">Телефон</Label>
                                        <Input id="phone" type="tel" placeholder="+380 XX XXX XX XX" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue={user?.email} disabled />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Professional Info - Better organization */}
                        <Card className="lg:col-span-2">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg sm:text-xl">Професійна інформація</CardTitle>
                                <CardDescription className="text-sm">Розкажіть про свій досвід та кваліфікацію</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="specialization">Спеціалізація</Label>
                                        <Select defaultValue="tutor">
                                            <SelectTrigger id="specialization">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="tutor">Репетитор</SelectItem>
                                                <SelectItem value="psychologist">Психолог</SelectItem>
                                                <SelectItem value="speech-therapist">Логопед</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="experience">Досвід (років)</Label>
                                        <Input id="experience" type="number" defaultValue="5" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location">Місто</Label>
                                        <Input id="location" defaultValue="Київ" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Предмети/Напрямки</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {subjects.map((subject) => (
                                            <Badge key={subject} variant="secondary" className="gap-1">
                                                {subject}
                                                <button
                                                    onClick={() => removeSubject(subject)}
                                                    className="ml-1 hover:text-destructive"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Додати предмет"
                                            value={newSubject}
                                            onChange={(e) => setNewSubject(e.target.value)}
                                            onKeyPress={(e) => e.key === "Enter" && addSubject()}
                                            className="flex-1"
                                        />
                                        <Button type="button" onClick={addSubject} size="icon">
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="education">Освіта</Label>
                                    <Textarea
                                        id="education"
                                        placeholder="Вкажіть вашу освіту, сертифікати, курси..."
                                        defaultValue="Київський національний університет імені Тараса Шевченка, філологічний факультет"
                                        rows={3}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio">Про себе</Label>
                                    <Textarea
                                        id="bio"
                                        placeholder="Розкажіть про себе, свій підхід до навчання..."
                                        defaultValue="Маю 5 років досвіду викладання англійської мови. Працюю з учнями різного віку та рівня підготовки. Використовую комунікативну методику та сучасні матеріали."
                                        rows={4}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pricing & Availability - Optimized layout */}
                        <Card className="lg:col-span-2">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg sm:text-xl">Ціни та доступність</CardTitle>
                                <CardDescription className="text-sm">
                                    Налаштуйте вартість занять та графік роботи
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="priceOnline">Ціна онлайн (грн/год)</Label>
                                        <Input id="priceOnline" type="number" defaultValue="400" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="priceOffline">Ціна офлайн (грн/год)</Label>
                                        <Input id="priceOffline" type="number" defaultValue="500" />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label>Формати занять</Label>
                                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="online" defaultChecked />
                                            <Label htmlFor="online" className="font-normal text-sm">
                                                Онлайн заняття
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="offline" defaultChecked />
                                            <Label htmlFor="offline" className="font-normal text-sm">
                                                Офлайн заняття
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="home" />
                                            <Label htmlFor="home" className="font-normal text-sm">
                                                Виїзд додому
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Documents - Side by side on desktop */}
                        <Card className="lg:col-span-2">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg sm:text-xl">Документи</CardTitle>
                                <CardDescription className="text-sm">Завантажте документи для верифікації</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Диплом про освіту</Label>
                                        <Button variant="outline" className="w-full bg-transparent">
                                            <Upload className="mr-2 h-4 w-4" />
                                            Завантажити диплом
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Сертифікати</Label>
                                        <Button variant="outline" className="w-full bg-transparent">
                                            <Upload className="mr-2 h-4 w-4" />
                                            Завантажити сертифікати
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Save Button - Sticky on mobile */}
                        <div className="lg:col-span-2 sticky bottom-0 bg-background/95 backdrop-blur-sm p-4 -mx-3 sm:mx-0 border-t sm:border-0 sm:static sm:bg-transparent sm:backdrop-blur-none sm:p-0 sm:pt-4">
                            <div className="flex justify-end gap-3">
                                <Link href="/specialist/dashboard">
                                    <Button variant="outline" className="w-full sm:w-auto">
                                        Скасувати
                                    </Button>
                                </Link>
                                <Button className="w-full sm:w-auto">Зберегти зміни</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}
