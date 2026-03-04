"use client"

import { UserRoles } from "@/graphql/generated/graphql"
import { useToast } from "@/hooks/use-toast"
import { Check, Copy, Share2, Upload, Video } from "lucide-react"
import { useState } from "react"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

import { useAuthContext } from "@/features/auth/context/auth-context"

export function TutorSettingsPage() {
    const { user } = useAuthContext()
    const { toast } = useToast()
    const [profileVideoUrl, setProfileVideoUrl] = useState("")
    const [referralCopied, setReferralCopied] = useState(false)

    const handleSaveVideo = () => {
        toast({
            title: "Відео збережено",
            description: "Ваше відео-презентація оновлена",
        })
    }

    const referralLink = `https://libitum.education/ref/${user?.id || "tutor123"}`
    const referralStats = {
        invited: 5,
        active: 3,
        xpEarned: 450,
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

    return (
        <ProtectedRoute allowedRoles={[UserRoles.Specialist]}>
            <SidebarLayout userType="tutor">
                <div className="container mx-auto max-w-4xl space-y-8 p-6 font-sans">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-[700] text-[#121117]">Налаштування</h1>
                        <p className="text-[15px] font-[500] text-[#69686f]">Управління вашим профілем та налаштуваннями</p>
                    </div>

                    <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                        <CardHeader>
                            <CardTitle className="text-xl font-[700] text-[#121117]">Особиста інформація</CardTitle>
                            <CardDescription className="text-[#69686f] font-[500]">Оновіть свої особисті дані</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-[#121117] font-[600]">
                                    Ім'я
                                </Label>
                                <Input
                                    id="name"
                                    defaultValue={user?.email}
                                    className="rounded-[8px] border-slate-200/80 focus-visible:ring-[var(--theme-primary)]"
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
                                    className="rounded-[8px] border-slate-200/80 focus-visible:ring-[var(--theme-primary)]"
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
                                    className="rounded-[8px] border-slate-200/80 focus-visible:ring-[var(--theme-primary)]"
                                />
                            </div>
                            <Button className="rounded-[8px] bg-[var(--theme-primary)] text-white hover:bg-[var(--theme-primary-hover)] font-[600] shadow-sm">
                                Зберегти зміни
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                        <CardHeader>
                            <CardTitle className="text-xl font-[700] text-[#121117]">Безпека</CardTitle>
                            <CardDescription className="text-[#69686f] font-[500]">
                                Змініть пароль та налаштування безпеки
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password" className="text-[#121117] font-[600]">
                                    Поточний пароль
                                </Label>
                                <Input
                                    id="current-password"
                                    type="password"
                                    className="rounded-[8px] border-slate-200/80 focus-visible:ring-[var(--theme-primary)]"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password" className="text-[#121117] font-[600]">
                                    Новий пароль
                                </Label>
                                <Input
                                    id="new-password"
                                    type="password"
                                    className="rounded-[8px] border-slate-200/80 focus-visible:ring-[var(--theme-primary)]"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password" className="text-[#121117] font-[600]">
                                    Підтвердіть пароль
                                </Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    className="rounded-[8px] border-slate-200/80 focus-visible:ring-[var(--theme-primary)]"
                                />
                            </div>
                            <Button className="rounded-[8px] bg-[#121117] text-white hover:bg-[#121117]/90 font-[600] shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                                Змінити пароль
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl font-[700] text-[#121117]">
                                <Video className="h-5 w-5 text-[#69686f]" />
                                Відео-презентація профілю
                            </CardTitle>
                            <CardDescription className="text-[#69686f] font-[500]">
                                Додайте відео "Як я проводжу заняття" щоб збільшити довіру клієнтів
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {profileVideoUrl ? (
                                <div className="space-y-4">
                                    <div className="aspect-video w-full overflow-hidden rounded-[16px] border border-slate-200/80 bg-[#f0f3f3]/50">
                                        <div className="flex h-full items-center justify-center">
                                            <Video className="h-12 w-12 text-[#69686f]/50" />
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Input
                                            value={profileVideoUrl}
                                            onChange={(e) => setProfileVideoUrl(e.target.value)}
                                            placeholder="https://youtube.com/watch?v=..."
                                            className="rounded-[8px] border-slate-200/80 focus-visible:ring-[var(--theme-primary)]"
                                        />
                                        <Button
                                            variant="outline"
                                            onClick={() => setProfileVideoUrl("")}
                                            className="rounded-[8px] border-slate-200/80 text-[#121117] font-[600] hover:bg-slate-50"
                                        >
                                            Видалити
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="flex flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-slate-200/80 bg-[#f0f3f3]/50 p-12">
                                        <Upload className="mb-4 h-12 w-12 text-[#69686f]/50" />
                                        <p className="mb-2 text-center font-[600] text-[#121117]">Додайте відео-презентацію</p>
                                        <p className="mb-4 text-center text-[13px] font-[500] text-[#69686f]">
                                            Підтримуються посилання з YouTube, Vimeo або завантаження файлу
                                        </p>
                                        <div className="flex w-full max-w-md gap-2">
                                            <Input
                                                value={profileVideoUrl}
                                                onChange={(e) => setProfileVideoUrl(e.target.value)}
                                                placeholder="https://youtube.com/watch?v=..."
                                                className="rounded-[8px] border-slate-200/80 focus-visible:ring-[var(--theme-primary)]"
                                            />
                                            <Button
                                                onClick={handleSaveVideo}
                                                className="rounded-[8px] bg-[#121117] text-white hover:bg-[#121117]/90 font-[600] shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
                                            >
                                                Додати
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="rounded-[16px] border border-[var(--theme-primary)]/20 bg-[var(--theme-primary-light)] p-4 shadow-sm">
                                        <p className="text-[14px] font-[700] text-[var(--theme-primary-dark)] mb-1">Порада:</p>
                                        <p className="text-[13px] font-[500] text-[var(--theme-primary-dark)]/90 leading-relaxed">
                                            Відео-презентація підвищує конверсію до 40%. Розкажіть про свою методику, досвід та
                                            підхід до навчання.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border-b border-indigo-100/50">
                            <CardTitle className="flex items-center gap-2 text-xl font-[700] text-[#121117]">
                                <Share2 className="h-5 w-5 text-indigo-500" />
                                Реферальна програма
                            </CardTitle>
                            <CardDescription className="text-[#69686f] font-[500]">
                                Запрошуйте колег-спеціалістів та отримуйте бонуси
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="rounded-[16px] border border-slate-200/80 bg-[#f0f3f3]/50 p-4 text-center">
                                    <p className="text-2xl font-[700] text-[#121117]">{referralStats.invited}</p>
                                    <p className="text-[13px] font-[600] text-[#69686f]">Запрошено</p>
                                </div>
                                <div className="rounded-[16px] border border-slate-200/80 bg-[#f0f3f3]/50 p-4 text-center">
                                    <p className="text-2xl font-[700] text-[#121117]">{referralStats.active}</p>
                                    <p className="text-[13px] font-[600] text-[#69686f]">Активних</p>
                                </div>
                                <div className="rounded-[16px] border border-[var(--theme-primary)]/20 bg-[var(--theme-primary-light)] p-4 text-center shadow-sm">
                                    <p className="text-2xl font-[700] text-[var(--theme-primary)]">+{referralStats.xpEarned}</p>
                                    <p className="text-[13px] font-[600] text-[var(--theme-primary-dark)]">XP зароблено</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-[#121117] font-[600]">Ваше реферальне посилання</Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={referralLink}
                                        readOnly
                                        className="font-mono text-[14px] bg-[#f0f3f3]/50 rounded-[8px] border-slate-200/80 text-[#69686f] w-full focus-visible:ring-[var(--theme-primary)]"
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={copyReferralLink}
                                        className="shrink-0 rounded-[8px] border-slate-200/80 hover:bg-[#f0f3f3]"
                                    >
                                        {referralCopied ? (
                                            <Check className="h-4 w-4 text-[var(--theme-primary)]" />
                                        ) : (
                                            <Copy className="h-4 w-4 text-[#69686f]" />
                                        )}
                                    </Button>
                                </div>
                                <p className="text-[12px] font-[500] text-[#69686f]">
                                    Поділіться цим посиланням з колегами. За кожного зареєстрованого спеціаліста ви отримаєте
                                    150 грн бонусу.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                <Button
                                    variant="outline"
                                    className="w-full rounded-[14px] border-slate-200/80 text-[#121117] font-[600] hover:text-[var(--theme-primary)] hover:bg-[var(--theme-primary-light)] hover:border-[var(--theme-primary)]/20 shadow-sm"
                                >
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Telegram
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full rounded-[14px] border-slate-200/80 text-[#121117] font-[600] hover:text-[var(--theme-primary)] hover:bg-[var(--theme-primary-light)] hover:border-[var(--theme-primary)]/20 shadow-sm"
                                >
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Facebook
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full rounded-[14px] border-slate-200/80 text-[#121117] font-[600] hover:text-[var(--theme-primary)] hover:bg-[var(--theme-primary-light)] hover:border-[var(--theme-primary)]/20 shadow-sm"
                                >
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Viber
                                </Button>
                            </div>

                            <div className="rounded-[16px] border border-[var(--theme-primary)]/20 bg-[var(--theme-primary-light)] p-5 shadow-sm">
                                <p className="text-[14px] font-[700] text-[var(--theme-primary-dark)] mb-2">Як це працює:</p>
                                <ul className="space-y-1.5 text-[13px] font-[500] text-[var(--theme-primary-dark)]/90">
                                    <li className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[var(--theme-primary)]" /> Поділіться
                                        посиланням з колегами-викладачами
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[var(--theme-primary)]" /> Вони реєструються
                                        за вашим посиланням
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[var(--theme-primary)]" /> Ви отримуєте 150
                                        грн бонусу за кожну реєстрацію
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[var(--theme-primary)]" /> Ваш колега
                                        отримує знижку на перший платіж за ліда
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                        <CardHeader>
                            <CardTitle className="text-xl font-[700] text-[#121117]">Сповіщення</CardTitle>
                            <CardDescription className="text-[#69686f] font-[500]">
                                Налаштуйте, як ви отримуєте сповіщення
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-2 hover:bg-[#f0f3f3] rounded-[12px] transition-colors">
                                <div>
                                    <p className="font-[600] text-[#121117]">Email сповіщення</p>
                                    <p className="text-[13px] font-[500] text-[#69686f]">Отримувати сповіщення на email</p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-[8px] border-slate-200/80 font-[600] text-[#121117]"
                                >
                                    Увімкнено
                                </Button>
                            </div>
                            <Separator className="bg-slate-200/80" />
                            <div className="flex items-center justify-between p-2 hover:bg-[#f0f3f3] rounded-[12px] transition-colors">
                                <div>
                                    <p className="font-[600] text-[#121117]">Push сповіщення</p>
                                    <p className="text-[13px] font-[500] text-[#69686f]">Отримувати push-сповіщення</p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-[8px] border-slate-200/80 font-[600] text-[#69686f] bg-[#f0f3f3]/50 hover:bg-[#f0f3f3]"
                                >
                                    Вимкнено
                                </Button>
                            </div>
                            <Separator className="bg-slate-200/80" />
                            <div className="flex items-center justify-between p-2 hover:bg-[#f0f3f3] rounded-[12px] transition-colors">
                                <div>
                                    <p className="font-[600] text-[#121117]">Сповіщення про нові запити</p>
                                    <p className="text-[13px] font-[500] text-[#69686f]">
                                        Отримувати сповіщення про нові запити від клієнтів
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-[8px] border-slate-200/80 font-[600] text-[#121117]"
                                >
                                    Увімкнено
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </SidebarLayout>
        </ProtectedRoute>
    )
}
