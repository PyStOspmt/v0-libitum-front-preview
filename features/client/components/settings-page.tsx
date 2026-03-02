"use client"

import { useToast } from "@/hooks/use-toast"
import { Calendar, Check, Copy, Share2, Trash2, UserPlus, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

import { useAuth } from "@/lib/auth-context"

export function ClientSettingsPage() {
    const { user } = useAuth()
    const { toast } = useToast()
    const router = useRouter()
    const [isAddChildOpen, setIsAddChildOpen] = useState(false)
    const [childName, setChildName] = useState("")
    const [childAge, setChildAge] = useState("")
    const [childGrade, setChildGrade] = useState("")
    const [childCity, setChildCity] = useState("")
    const [childNotes, setChildNotes] = useState("")
    const [referralCopied, setReferralCopied] = useState(false)

    const [householdChildren, setHouseholdChildren] = useState([
        {
            id: "1",
            name: "Марія Коваленко",
            age: 12,
            grade: "6 клас",
            city: "Київ",
            subjects: ["Англійська", "Математика"],
            notes: "Підготовка до вступу в ліцей",
            accessLink: "https://libitum.education/student/access/token-123",
        },
    ])

    const selectableChildren = user
        ? [{ id: user.id, name: user.name, label: user.name || "Я", isParent: true }, ...householdChildren]
        : householdChildren

    const referralLink = `https://libitum.education/ref/${user?.id || "client123"}`
    const referralStats = {
        invited: 3,
        registered: 2,
        bonus: 150,
    }

    const copyReferralLink = () => {
        navigator.clipboard.writeText(referralLink)
        setReferralCopied(true)
        toast({
            title: "Посилання скопійовано",
            description: "Реферальне посилання скопійовано в буфер обміну",
        })
        setTimeout(() => setReferralCopied(false), 2000)
    }

    const handleAddChild = () => {
        if (!childName || !childAge) {
            toast({
                title: "Помилка",
                description: "Заповніть всі поля",
                variant: "destructive",
            })
            return
        }

        setHouseholdChildren((prev) => [
            ...prev,
            {
                id: `${prev.length + 1}`,
                name: childName,
                age: Number(childAge),
                grade: childGrade || "-",
                city: childCity || "-",
                subjects: [],
                notes: childNotes || "",
                accessLink: "https://libitum.education/student/access/token-new",
            },
        ])

        toast({
            title: "Дитину додано",
            description: `${childName} успішно доданий(а) до вашого профілю`,
        })

        setIsAddChildOpen(false)
        setChildName("")
        setChildAge("")
        setChildGrade("")
        setChildCity("")
        setChildNotes("")
    }

    return (
        <ProtectedRoute allowedRoles={["client"]}>
            <SidebarLayout userType="client">
                <div className="container mx-auto max-w-4xl space-y-6 sm:space-y-8 px-3 py-6 sm:p-6 font-sans">
                    <div className="px-1 sm:px-0">
                        <h1 className="text-3xl font-[700] text-[#121117]">Налаштування</h1>
                        <p className="text-[#69686f] mt-1 font-[500]">Управління вашим профілем та налаштуваннями</p>
                    </div>

                    <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                        <CardHeader>
                            <CardTitle className="text-xl font-[700] text-[#121117]">Особиста інформація</CardTitle>
                            <CardDescription className="text-[#69686f] font-[500]">Оновіть свої особисті дані</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                                <Avatar className="h-24 w-24 sm:h-20 sm:w-20 rounded-[20px] border-2 border-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] ring-1 ring-slate-100">
                                    <AvatarImage src={user?.avatar} alt={user?.name} />
                                    <AvatarFallback className="bg-[#f0f3f3] text-[#69686f] text-2xl sm:text-xl font-[700]">
                                        {user?.name?.[0] || "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex items-center sm:mt-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-[8px] border-slate-200/80 text-[#121117] font-[600] hover:bg-slate-50 transition-colors"
                                    >
                                        Завантажити фото
                                    </Button>
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-[#121117] font-[600]">
                                        Ім'я
                                    </Label>
                                    <Input
                                        id="name"
                                        defaultValue={user?.name}
                                        className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-[#121117] font-[600]">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        defaultValue={user?.email}
                                        className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-[#121117] font-[600]">
                                        Телефон
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="+380"
                                        className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                                    />
                                </div>
                            </div>
                            <Button className="rounded-[8px] bg-[#00c5a6] text-white hover:bg-[#00a389] font-[600] shadow-[0_2px_8px_rgba(0,197,166,0.2)]">
                                Зберегти зміни
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                        <CardHeader>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2 text-xl font-[700] text-[#121117]">
                                        <Users className="h-5 w-5 text-[#69686f]" />
                                        Мої діти
                                    </CardTitle>
                                    <CardDescription className="text-[#69686f] font-[500] mt-1">
                                        Управління профілями дітей та контроль прогресу
                                    </CardDescription>
                                </div>
                                <Button
                                    onClick={() => setIsAddChildOpen(true)}
                                    className="rounded-[8px] bg-[#00c5a6] text-white hover:bg-[#00a389] font-[600] shadow-[0_2px_8px_rgba(0,197,166,0.2)] w-full sm:w-auto justify-center"
                                >
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Додати дитину
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {householdChildren.length > 0 ? (
                                householdChildren.map((child) => (
                                    <div
                                        key={child.id}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[16px] border border-slate-200/80 bg-[#f0f3f3]/50 p-4 transition-colors hover:bg-[#f0f3f3]"
                                    >
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-12 w-12 rounded-[12px] border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                                                <AvatarFallback className="bg-white text-[#121117] font-[700]">
                                                    {child.name[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-[700] text-[#121117]">{child.name}</p>
                                                <p className="text-[13px] font-[500] text-[#69686f]">
                                                    {child.age} років • {child.grade} • {child.city}
                                                </p>
                                                <div className="mt-2 flex flex-wrap gap-1.5">
                                                    {child.subjects.map((subject) => (
                                                        <Badge
                                                            key={subject}
                                                            variant="secondary"
                                                            className="rounded-[6px] bg-white text-[#69686f] border border-slate-200/80 font-[500] px-2 py-0.5 shadow-sm"
                                                        >
                                                            {subject}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="rounded-[8px] border-slate-200/80 text-[#121117] font-[600] hover:bg-slate-50 w-full sm:w-auto shadow-sm"
                                                onClick={() => {
                                                    if (child.accessLink) {
                                                        navigator.clipboard.writeText(child.accessLink)
                                                        toast({
                                                            title: "Посилання скопійовано",
                                                            description:
                                                                "Передайте це посилання дитині для входу в кабінет учня",
                                                        })
                                                    }
                                                }}
                                            >
                                                <Copy className="mr-2 h-4 w-4" />
                                                Лінк доступу
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="rounded-[8px] border-slate-200/80 text-[#121117] font-[600] hover:bg-slate-50 w-full sm:w-auto shadow-sm"
                                                onClick={() => router.push(`/client/progress?child=${child.id}`)}
                                            >
                                                Прогрес
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-slate-200/80 bg-[#f0f3f3]/50 p-8 text-center">
                                    <Users className="mb-3 h-10 w-10 text-[#69686f]/50" />
                                    <p className="text-[14px] font-[600] text-[#121117]">Ще немає доданих дітей</p>
                                    <p className="text-[13px] font-[500] text-[#69686f] max-w-xs mt-1">
                                        Додайте профілі дітей, щоб відстежувати їх успішність окремо
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                        <CardHeader>
                            <CardTitle className="text-xl font-[700] text-[#121117]">Звітність</CardTitle>
                            <CardDescription className="text-[#69686f] font-[500]">
                                Налаштуйте частоту звітів та отримання в Telegram
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-3">
                                <Label className="text-[#121117] font-[600]">Частота звітів</Label>
                                <Select defaultValue="weekly">
                                    <SelectTrigger className="rounded-[8px] border-slate-200/80 focus:ring-[#00c5a6]">
                                        <SelectValue placeholder="Оберіть період" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-[8px] border-slate-200/80">
                                        <SelectItem value="weekly">Щотижня</SelectItem>
                                        <SelectItem value="biweekly">Кожні 2 тижні</SelectItem>
                                        <SelectItem value="monthly">Щомісяця</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="rounded-[16px] border border-slate-200/80 bg-[#f0f3f3]/50 p-4 sm:p-5">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4 sm:gap-0">
                                    <div>
                                        <p className="font-[700] text-[#121117]">Підключення Telegram-бота</p>
                                        <p className="text-[13px] font-[500] text-[#69686f] mt-1">
                                            Отримуйте звіти та сповіщення у Telegram
                                        </p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="w-full sm:w-auto rounded-[8px] border-[#00c5a6]/20 text-[#00a389] hover:bg-[#e8fffb] font-[600]"
                                    >
                                        Підключити
                                    </Button>
                                </div>
                                <Separator className="bg-slate-200/80 my-4" />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Switch id="tg-reports" defaultChecked className="data-[state=checked]:bg-[#00c5a6]" />
                                        <Label htmlFor="tg-reports" className="text-[#121117] font-[600]">
                                            Надсилати звіти в Telegram
                                        </Label>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border-b border-indigo-100/50">
                            <CardTitle className="flex items-center gap-2 text-xl font-[700] text-[#121117]">
                                <Share2 className="h-5 w-5 text-indigo-500" />
                                Реферальна програма
                            </CardTitle>
                            <CardDescription className="text-[#69686f] font-[500]">
                                Запрошуйте друзів та отримуйте бонуси
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8 pt-6">
                            {/* Referral stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                                <div className="rounded-[16px] bg-[#f0f3f3]/50 p-4 text-center border border-slate-200/80 w-full">
                                    <p className="text-2xl font-[700] text-[#121117]">{referralStats.invited}</p>
                                    <p className="text-[13px] font-[600] text-[#69686f]">Запрошено</p>
                                </div>
                                <div className="rounded-[16px] bg-[#f0f3f3]/50 p-4 text-center border border-slate-200/80 w-full">
                                    <p className="text-2xl font-[700] text-[#121117]">{referralStats.registered}</p>
                                    <p className="text-[13px] font-[600] text-[#69686f]">Зареєструвалось</p>
                                </div>
                                <div className="rounded-[16px] bg-[#e8fffb] p-4 text-center border border-[#00c5a6]/20 w-full shadow-[0_2px_8px_rgba(0,197,166,0.1)]">
                                    <p className="text-2xl font-[700] text-[#00c5a6]">{referralStats.bonus} грн</p>
                                    <p className="text-[13px] font-[600] text-[#00a389]">Ваш бонус</p>
                                </div>
                            </div>

                            {/* Referral link */}
                            <div className="space-y-3">
                                <Label className="text-[#121117] font-[600]">Ваше реферальне посилання</Label>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <Input
                                        value={referralLink}
                                        readOnly
                                        className="font-mono text-[14px] bg-[#f0f3f3]/50 rounded-[8px] border-slate-200/80 text-[#69686f] w-full focus-visible:ring-[#00c5a6]"
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={copyReferralLink}
                                        className="shrink-0 rounded-[8px] border-slate-200/80 hover:bg-[#f0f3f3] sm:w-auto px-3"
                                    >
                                        {referralCopied ? (
                                            <Check className="h-4 w-4 text-[#00c5a6]" />
                                        ) : (
                                            <Copy className="h-4 w-4 text-[#69686f]" />
                                        )}
                                    </Button>
                                </div>
                                <p className="text-[12px] font-[500] text-[#69686f]">
                                    Поділіться цим посиланням з друзями. За кожного зареєстрованого користувача ви отримаєте 100
                                    грн бонусу.
                                </p>
                            </div>

                            {/* Share buttons */}
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                <Button
                                    variant="outline"
                                    className="w-full rounded-[14px] border-slate-200/80 text-[#121117] font-[600] hover:text-[#00c5a6] hover:bg-[#e8fffb] hover:border-[#00c5a6]/20 shadow-sm"
                                >
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Telegram
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full rounded-[14px] border-slate-200/80 text-[#121117] font-[600] hover:text-[#00c5a6] hover:bg-[#e8fffb] hover:border-[#00c5a6]/20 shadow-sm"
                                >
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Facebook
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full rounded-[14px] border-slate-200/80 text-[#121117] font-[600] hover:text-[#00c5a6] hover:bg-[#e8fffb] hover:border-[#00c5a6]/20 shadow-sm"
                                >
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Viber
                                </Button>
                            </div>

                            <div className="rounded-[16px] bg-[#e8fffb] p-5 border border-[#00c5a6]/20 shadow-[0_2px_8px_rgba(0,197,166,0.05)]">
                                <p className="text-[14px] font-[700] text-[#00a389] mb-2">Як це працює:</p>
                                <ul className="space-y-1.5 text-[13px] font-[500] text-[#00a389]/90">
                                    <li className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#00c5a6]" /> Поділіться посиланням з
                                        друзями
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#00c5a6]" /> Вони реєструються за вашим
                                        посиланням
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#00c5a6]" /> Ви отримуєте 100 грн бонусу за
                                        кожну реєстрацію
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#00c5a6]" /> Ваш друг отримує знижку 10% на
                                        перше заняття
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                            <CardHeader>
                                <CardTitle className="text-xl font-[700] text-[#121117]">Безпека</CardTitle>
                                <CardDescription className="text-[#69686f] font-[500]">Пароль та доступ</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current-password" className="text-[#121117] font-[600]">
                                        Поточний пароль
                                    </Label>
                                    <Input
                                        id="current-password"
                                        type="password"
                                        className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-password" className="text-[#121117] font-[600]">
                                        Новий пароль
                                    </Label>
                                    <Input
                                        id="new-password"
                                        type="password"
                                        className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password" className="text-[#121117] font-[600]">
                                        Підтвердження
                                    </Label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                                    />
                                </div>
                                <Button className="w-full rounded-[8px] bg-[#121117] text-white hover:bg-[#121117]/90 font-[600] shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                                    Змінити пароль
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                            <CardHeader>
                                <CardTitle className="text-xl font-[700] text-[#121117]">Акаунт</CardTitle>
                                <CardDescription className="text-[#69686f] font-[500]">Керування даними</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <div className="flex items-center justify-between rounded-[16px] border border-slate-200/80 bg-[#f0f3f3]/50 p-4">
                                    <div>
                                        <p className="font-[600] text-[#121117]">Статус акаунту</p>
                                        <p className="text-[12px] font-[500] text-[#69686f] mt-0.5">Активний з 12.02.2024</p>
                                    </div>
                                    <Badge className="bg-[#e8fffb] text-[#00a389] hover:bg-[#e8fffb]/80 border-[#00c5a6]/20 shadow-none font-[600] px-2 py-1">
                                        <Check className="mr-1 h-3 w-3" /> Активний
                                    </Badge>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-[600] text-[#121117]">Підтримка</p>
                                        <p className="text-[12px] font-[500] text-[#69686f] mt-0.5">Є питання?</p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-[8px] border-slate-200/80 font-[600] text-[#121117] hover:bg-[#f0f3f3]"
                                        onClick={() => {
                                            const email = "support@libitum.education"
                                            const subject = "Питання від клієнта Libitum"
                                            const body = "Доброго дня!\n\nУ мене є питання:\n\n"
                                            window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
                                        }}
                                    >
                                        Написати
                                    </Button>
                                </div>

                                <Separator className="bg-slate-200/80" />

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-[600] text-red-600">Видалити акаунт</p>
                                        <p className="text-[12px] font-[500] text-red-400 mt-0.5">Незворотна дія</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-[8px]"
                                        onClick={() =>
                                            toast({
                                                title: "Запит на видалення",
                                                description: "Ми надіслали підтвердження на email",
                                            })
                                        }
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                        <CardHeader>
                            <CardTitle className="text-xl font-[700] text-[#121117]">Сповіщення</CardTitle>
                            <CardDescription className="text-[#69686f] font-[500]">
                                Налаштування каналів зв'язку
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-2 hover:bg-[#f0f3f3] rounded-[12px] transition-colors">
                                <div>
                                    <p className="font-[600] text-[#121117]">Email сповіщення</p>
                                    <p className="text-[13px] font-[500] text-[#69686f]">Важливі оновлення та звіти</p>
                                </div>
                                <Switch defaultChecked className="data-[state=checked]:bg-[#00c5a6]" />
                            </div>
                            <Separator className="bg-slate-200/80" />
                            <div className="flex items-center justify-between p-2 hover:bg-[#f0f3f3] rounded-[12px] transition-colors">
                                <div>
                                    <p className="font-[600] text-[#121117]">Push сповіщення</p>
                                    <p className="text-[13px] font-[500] text-[#69686f]">Миттєві повідомлення про заняття</p>
                                </div>
                                <Switch className="data-[state=checked]:bg-[#00c5a6]" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Dialog open={isAddChildOpen} onOpenChange={setIsAddChildOpen}>
                    <DialogContent className="rounded-[24px] border-0 shadow-[0_8px_32px_rgba(0,0,0,0.08)] sm:max-w-md font-sans">
                        <DialogHeader className="pb-4 border-b border-slate-200/80">
                            <DialogTitle className="text-[24px] font-[700] text-[#121117]">Додати дитину</DialogTitle>
                            <DialogDescription className="text-[#69686f] font-[500] text-[15px]">
                                Введіть інформацію про вашу дитину для контролю прогресу
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-5 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="child-name" className="text-[#121117] font-[600]">
                                    Ім'я дитини *
                                </Label>
                                <Input
                                    id="child-name"
                                    value={childName}
                                    onChange={(e) => setChildName(e.target.value)}
                                    placeholder="Іван Петренко"
                                    className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="child-age" className="text-[#121117] font-[600]">
                                        Вік *
                                    </Label>
                                    <Input
                                        id="child-age"
                                        type="number"
                                        value={childAge}
                                        onChange={(e) => setChildAge(e.target.value)}
                                        placeholder="12"
                                        min="3"
                                        max="18"
                                        className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="child-grade" className="text-[#121117] font-[600]">
                                        Клас
                                    </Label>
                                    <Input
                                        id="child-grade"
                                        value={childGrade}
                                        onChange={(e) => setChildGrade(e.target.value)}
                                        placeholder="6 клас"
                                        className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="child-city" className="text-[#121117] font-[600]">
                                    Місто
                                </Label>
                                <Input
                                    id="child-city"
                                    value={childCity}
                                    onChange={(e) => setChildCity(e.target.value)}
                                    placeholder="Київ"
                                    className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="child-notes" className="text-[#121117] font-[600]">
                                    Цілі/особливості
                                </Label>
                                <Input
                                    id="child-notes"
                                    value={childNotes}
                                    onChange={(e) => setChildNotes(e.target.value)}
                                    placeholder="Підготовка до вступу, особливі потреби..."
                                    className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                                />
                            </div>
                            <div className="rounded-[16px] bg-[#f0f3f3]/50 p-4 border border-slate-200/80">
                                <p className="text-[13px] font-[500] text-[#69686f] leading-relaxed">
                                    Після додавання ви зможете переглядати прогрес, оцінки та домашні завдання вашої дитини в
                                    окремому профілі.
                                </p>
                            </div>
                        </div>
                        <DialogFooter className="pt-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsAddChildOpen(false)}
                                className="rounded-[8px] border-slate-200/80 hover:bg-[#f0f3f3] text-[#121117] font-[600]"
                            >
                                Скасувати
                            </Button>
                            <Button
                                onClick={handleAddChild}
                                className="rounded-[8px] bg-[#00c5a6] text-white hover:bg-[#00a389] shadow-[0_2px_8px_rgba(0,197,166,0.2)] font-[600]"
                            >
                                <UserPlus className="mr-2 h-4 w-4" />
                                Додати профіль
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </SidebarLayout>
        </ProtectedRoute>
    )
}
