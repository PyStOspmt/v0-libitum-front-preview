"use client"

import { useToast } from "@/hooks/use-toast"
import { useTheme } from "@/providers/theme-provider"
import { MapPin, Plus, Save, Search, Upload, UserPlus, Users, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { SidebarLayout } from "@/components/sidebar-layout"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

import { useAuthContext } from "@/features/auth/context/auth-context"

import { type SpecialistType, useSpecialistProfileStore } from "@/lib/specialist-profile-store"

export function TutorProfilePage() {
    const { user } = useAuthContext()
    const { theme, updateSpecialistTheme } = useTheme()
    const router = useRouter()
    const { getProfile, updateProfile } = useSpecialistProfileStore()
    const { toast } = useToast()

    const [specialization, setSpecialization] = useState<SpecialistType>("tutor")
    const [subjects, setSubjects] = useState<string[]>([])
    const [newSubject, setNewSubject] = useState("")
    const [firstName, setFirstName] = useState("Олена")
    const [lastName, setLastName] = useState("Іваненко")
    const [phone, setPhone] = useState("+380 50 123 45 67")
    const [experience, setExperience] = useState("5")
    const [education, setEducation] = useState(
        "Київський національний університет імені Тараса Шевченка, філологічний факультет",
    )
    const [bio, setBio] = useState(
        "Маю 5 років досвіду викладання англійської мови. Працюю з учнями різного віку та рівня підготовки. Використовую комунікативну методику та сучасні матеріали.",
    )
    const [priceOnline, setPriceOnline] = useState("400")
    const [priceOffline, setPriceOffline] = useState("500")
    const [priceHomeVisit, setPriceHomeVisit] = useState("600")
    const [location, setLocation] = useState("Київ")
    const [formatOnline, setFormatOnline] = useState(true)
    const [formatOffline, setFormatOffline] = useState(true)
    const [formatHomeVisit, setFormatHomeVisit] = useState(false)

    // New TD fields
    const [isSearching, setIsSearching] = useState(true)
    const [pairLessons, setPairLessons] = useState(false)
    const [foreignProgram, setForeignProgram] = useState(false)
    const [foreignCountry, setForeignCountry] = useState("")

    useEffect(() => {
        if (user?.id) {
            const profile = getProfile(user.id)
            if (profile) {
                const timer = setTimeout(() => {
                    setSpecialization(profile.specialization)
                    setSubjects(profile.subjects?.length ? profile.subjects : ["Англійська мова", "Німецька мова"])
                    setFirstName(profile.firstName || "Олена")
                    setLastName(profile.lastName || "Іваненко")
                    setPhone(profile.phone || "+380 50 123 45 67")
                    setExperience(String(profile.experience || 5))
                    setEducation(
                        profile.education || "Київський національний університет імені Тараса Шевченка, філологічний факультет",
                    )
                    setBio(
                        profile.bio ||
                            "Маю 5 років досвіду викладання англійської мови. Працюю з учнями різного віку та рівня підготовки. Використовую комунікативну методику та сучасні матеріали.",
                    )
                    setPriceOnline(String(profile.priceOnline || 400))
                    setPriceOffline(String(profile.priceOffline || 500))
                    setPriceHomeVisit(String(profile.priceHomeVisit || 600))
                    setLocation(profile.location || "Київ")
                    setFormatOnline(profile.formats?.online ?? true)
                    setFormatOffline(profile.formats?.offline ?? true)
                    setFormatHomeVisit(profile.formats?.homeVisit ?? false)
                    // Mock loading new fields
                    setIsSearching(true)
                    setPairLessons(false)
                    setForeignProgram(false)
                    setForeignCountry("")
                }, 0)
                return () => clearTimeout(timer)
            }
        }
    }, [user?.id, getProfile])

    const addSubject = () => {
        if (newSubject && !subjects.includes(newSubject)) {
            setSubjects([...subjects, newSubject])
            setNewSubject("")
        }
    }

    const removeSubject = (subject: string) => {
        setSubjects(subjects.filter((s) => s !== subject))
    }

    const handleSave = () => {
        if (!user?.id) {
            toast({ title: "Помилка", description: "Користувач не авторизований", variant: "destructive" })
            return
        }
        updateProfile(user.id, {
            firstName,
            lastName,
            email: user.email,
            phone,
            specialization,
            subjects,
            experience: Number(experience),
            education,
            bio,
            priceOnline: Number(priceOnline),
            priceOffline: Number(priceOffline),
            priceHomeVisit: Number(priceHomeVisit),
            formats: { online: formatOnline, offline: formatOffline, homeVisit: formatHomeVisit },
            location,
            // @ts-ignore - Mock saving new fields
            isSearching,
            pairLessons,
            foreignProgram,
            foreignCountry,
        })
        toast({ title: "Профіль оновлено", description: "Ваші зміни успішно збережено" })
    }

    const getDefaultSubjects = (spec: SpecialistType) => {
        switch (spec) {
            case "psychologist":
                return ["Підліткова психологія", "Сімейні консультації"]
            case "speech-therapist":
                return ["Логопедія", "Корекція мовлення"]
            default:
                return ["Англійська мова", "Німецька мова"]
        }
    }

    const handleSpecializationChange = (value: SpecialistType) => {
        setSpecialization(value)
        if (subjects.length <= 2) setSubjects(getDefaultSubjects(value))

        updateSpecialistTheme(value)

        setTimeout(() => {
            window.location.reload()
        }, 100)
    }

    return (
        <SidebarLayout userType="tutor">
            <div className="container mx-auto max-w-4xl space-y-8 px-3 sm:px-4 md:px-6 py-8">
                <div className="space-y-2">
                    <h1 className="text-[32px] font-bold text-[#121117]">Мій профіль</h1>
                    <p className="text-[16px] text-[#69686f]">Налаштуйте свій публічний профіль для клієнтів</p>
                </div>

                <div className="space-y-6">
                    <Card className="border-slate-200/80 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-[24px]">
                        <CardHeader>
                            <CardTitle className="text-[20px] font-bold text-[#121117]">Фото профілю</CardTitle>
                            <CardDescription className="text-[#69686f] text-[14px]">
                                Додайте професійне фото для вашого профілю
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-6">
                                <Avatar className="h-24 w-24 rounded-[16px]">
                                    <AvatarFallback className="text-[28px] font-bold rounded-[16px] bg-[#f0f3f3] text-[#121117]">
                                        {user?.email?.[0] ?? firstName[0] ?? "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="space-y-3">
                                    <Button className="rounded-[8px] bg-[#121117] text-white hover:bg-[#121117]/90 font-[600] h-[40px]">
                                        <Upload className="mr-2 h-4 w-4" />
                                        Завантажити фото
                                    </Button>
                                    <p className="text-[13px] text-[#69686f]">JPG, PNG або GIF. Максимум 5MB.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200/80 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-[24px]">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-[20px] font-bold text-[#121117]">Налаштування пошуку</CardTitle>
                                    <CardDescription className="text-[#69686f] text-[14px]">
                                        Керуйте видимістю анкети та форматами
                                    </CardDescription>
                                </div>
                                <Search className="h-6 w-6 text-[var(--theme-primary)]" />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-[#f0f3f3] rounded-[12px]">
                                <div className="space-y-1">
                                    <Label className="text-[16px] font-[600] text-[#121117]">Активний пошук клієнтів</Label>
                                    <p className="text-[13px] text-[#69686f]">
                                        Якщо вимкнено, ваша анкета не відображатиметься в каталозі
                                    </p>
                                </div>
                                <Switch checked={isSearching} onCheckedChange={setIsSearching} />
                            </div>

                            {isSearching && (
                                <>
                                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-[12px]">
                                        <div className="space-y-1">
                                            <Label className="text-[15px] font-[600] text-[#121117]">Парні заняття</Label>
                                            <p className="text-[13px] text-[#69686f]">
                                                Готові проводити заняття для 2 учнів одночасно
                                            </p>
                                        </div>
                                        <Switch checked={pairLessons} onCheckedChange={setPairLessons} />
                                    </div>

                                    <div className="space-y-4 p-4 border border-slate-200 rounded-[12px]">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <Label className="text-[15px] font-[600] text-[#121117]">
                                                    Програми інших країн
                                                </Label>
                                                <p className="text-[13px] text-[#69686f]">
                                                    Готові викладати за програмою інших країн
                                                </p>
                                            </div>
                                            <Switch checked={foreignProgram} onCheckedChange={setForeignProgram} />
                                        </div>

                                        {foreignProgram && (
                                            <div className="pt-4 border-t border-slate-100">
                                                <Label className="text-[14px] font-[600] mb-2 block">Оберіть країну *</Label>
                                                <Select value={foreignCountry} onValueChange={setForeignCountry}>
                                                    <SelectTrigger className="h-[44px] rounded-[8px]">
                                                        <SelectValue placeholder="Оберіть країну" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="uk">Велика Британія (GCSE, A-Level)</SelectItem>
                                                        <SelectItem value="us">США (SAT, AP)</SelectItem>
                                                        <SelectItem value="pl">Польща</SelectItem>
                                                        <SelectItem value="de">Німеччина</SelectItem>
                                                        <SelectItem value="cz">Польща (Matura)</SelectItem>
                                                        <SelectItem value="other">Інша країна</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200/80 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-[24px]">
                        <CardHeader>
                            <CardTitle className="text-[20px] font-bold text-[#121117]">Основна інформація</CardTitle>
                            <CardDescription className="text-[#69686f] text-[14px]">Ваші особисті дані</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="text-[14px] font-[600]">
                                        Ім'я
                                    </Label>
                                    <Input
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="h-[44px] rounded-[8px]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-[14px] font-[600]">
                                        Прізвище
                                    </Label>
                                    <Input
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="h-[44px] rounded-[8px]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-[14px] font-[600]">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    defaultValue={user?.email}
                                    disabled
                                    className="h-[44px] rounded-[8px] bg-slate-50"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-[14px] font-[600]">
                                    Телефон
                                </Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+380 XX XXX XX XX"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="h-[44px] rounded-[8px]"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200/80 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-[24px]">
                        <CardHeader>
                            <CardTitle className="text-[20px] font-bold text-[#121117]">Професійна інформація</CardTitle>
                            <CardDescription className="text-[#69686f] text-[14px]">
                                Розкажіть про свій досвід та кваліфікацію
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="specialization" className="text-[14px] font-[600]">
                                    Спеціалізація
                                </Label>
                                <Select
                                    value={specialization}
                                    onValueChange={(v) => handleSpecializationChange(v as SpecialistType)}
                                >
                                    <SelectTrigger id="specialization" className="h-[44px] rounded-[8px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="tutor">Репетитор</SelectItem>
                                        <SelectItem value="psychologist">Психолог</SelectItem>
                                        <SelectItem value="speech-therapist">Логопед</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="mt-2 rounded-[8px] px-3 py-2 text-[13px] font-[500] bg-[var(--theme-primary-light)] text-[var(--theme-primary-dark)]">
                                    {specialization === "tutor" && "Репетитор - навчальні предмети та мови"}
                                    {specialization === "psychologist" && "Психолог - психологічні консультації"}
                                    {specialization === "speech-therapist" && "Логопед - корекція мовлення"}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-[14px] font-[600]">Предмети/Напрямки</Label>
                                <div className="flex flex-wrap gap-2">
                                    {subjects.map((subject) => (
                                        <Badge
                                            key={subject}
                                            variant="secondary"
                                            className="gap-1 rounded-[6px] px-3 py-1.5 text-[13px] font-[500] bg-[#f0f3f3] text-[#121117] hover:bg-[#e2e8e8]"
                                        >
                                            {subject}
                                            <button
                                                onClick={() => removeSubject(subject)}
                                                className="ml-1 hover:text-[#e53935] transition-colors"
                                            >
                                                <X className="h-3.5 w-3.5" />
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
                                        className="h-[44px] rounded-[8px]"
                                    />
                                    <Button
                                        type="button"
                                        onClick={addSubject}
                                        className="rounded-[8px] bg-[#121117] text-white hover:bg-[#121117]/90 h-[44px] w-[44px] p-0 shrink-0"
                                    >
                                        <Plus className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="experience" className="text-[14px] font-[600]">
                                    Досвід роботи (років)
                                </Label>
                                <Input
                                    id="experience"
                                    type="number"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    className="h-[44px] rounded-[8px]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="education" className="text-[14px] font-[600]">
                                    Освіта
                                </Label>
                                <Textarea
                                    id="education"
                                    placeholder="Вкажіть вашу освіту, сертифікати, курси..."
                                    value={education}
                                    onChange={(e) => setEducation(e.target.value)}
                                    rows={3}
                                    className="rounded-[8px] resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio" className="text-[14px] font-[600]">
                                    Про себе
                                </Label>
                                <Textarea
                                    id="bio"
                                    placeholder="Розкажіть про себе, свій підхід до навчання..."
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    rows={5}
                                    className="rounded-[8px] resize-none"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200/80 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-[24px]">
                        <CardHeader>
                            <CardTitle className="text-[20px] font-bold text-[#121117]">Ціни та доступність</CardTitle>
                            <CardDescription className="text-[#69686f] text-[14px]">
                                Налаштуйте вартість занять та графік роботи
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="priceOnline" className="text-[14px] font-[600]">
                                        Ціна онлайн (грн/год)
                                    </Label>
                                    <Input
                                        id="priceOnline"
                                        type="number"
                                        value={priceOnline}
                                        onChange={(e) => setPriceOnline(e.target.value)}
                                        className="h-[44px] rounded-[8px]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="priceOffline" className="text-[14px] font-[600]">
                                        Ціна офлайн (грн/год)
                                    </Label>
                                    <Input
                                        id="priceOffline"
                                        type="number"
                                        value={priceOffline}
                                        onChange={(e) => setPriceOffline(e.target.value)}
                                        className="h-[44px] rounded-[8px]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="priceHomeVisit" className="text-[14px] font-[600]">
                                    Ціна виїзду додому (грн/год)
                                </Label>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-[#69686f]" />
                                    <Input
                                        id="priceHomeVisit"
                                        type="number"
                                        value={priceHomeVisit}
                                        onChange={(e) => setPriceHomeVisit(e.target.value)}
                                        disabled={!formatHomeVisit}
                                        className={`h-[44px] rounded-[8px] ${!formatHomeVisit ? "bg-slate-50 text-slate-400" : ""}`}
                                    />
                                </div>
                                <p className="text-[13px] text-[#69686f]">
                                    {formatHomeVisit
                                        ? "Виїзд додому активовано. Вкажіть ціну за годину."
                                        : "Увімкніть 'Виїзд додому' нижче, щоб встановити ціну."}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-[14px] font-[600]">Формати занять</Label>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3 bg-[#f0f3f3]/50 p-3 rounded-[8px]">
                                        <Checkbox
                                            id="online"
                                            checked={formatOnline}
                                            onCheckedChange={(c) => setFormatOnline(c as boolean)}
                                            className="data-[state=checked]:bg-[var(--theme-primary)] data-[state=checked]:border-[var(--theme-primary)]"
                                        />
                                        <Label htmlFor="online" className="font-[500] cursor-pointer text-[#121117]">
                                            Онлайн заняття
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-3 bg-[#f0f3f3]/50 p-3 rounded-[8px]">
                                        <Checkbox
                                            id="offline"
                                            checked={formatOffline}
                                            onCheckedChange={(c) => setFormatOffline(c as boolean)}
                                            className="data-[state=checked]:bg-[var(--theme-primary)] data-[state=checked]:border-[var(--theme-primary)]"
                                        />
                                        <Label htmlFor="offline" className="font-[500] cursor-pointer text-[#121117]">
                                            Офлайн заняття
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-3 bg-[#f0f3f3]/50 p-3 rounded-[8px]">
                                        <Checkbox
                                            id="home"
                                            checked={formatHomeVisit}
                                            onCheckedChange={(c) => setFormatHomeVisit(c as boolean)}
                                            className="data-[state=checked]:bg-[var(--theme-primary)] data-[state=checked]:border-[var(--theme-primary)]"
                                        />
                                        <Label htmlFor="home" className="font-[500] cursor-pointer text-[#121117]">
                                            Виїзд додому до учня
                                        </Label>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location" className="text-[14px] font-[600]">
                                    Місто
                                </Label>
                                <Input
                                    id="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="h-[44px] rounded-[8px]"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200/80 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-[24px]">
                        <CardHeader>
                            <CardTitle className="text-[20px] font-bold text-[#121117]">Документи</CardTitle>
                            <CardDescription className="text-[#69686f] text-[14px]">
                                Завантажте документи для верифікації
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[14px] font-[600]">Диплом про освіту</Label>
                                <Button
                                    variant="outline"
                                    className="w-full h-[48px] rounded-[8px] border-2 border-slate-200 text-[#121117] font-[600] hover:bg-slate-50"
                                >
                                    <Upload className="mr-2 h-4 w-4" />
                                    Завантажити диплом
                                </Button>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[14px] font-[600]">Сертифікати</Label>
                                <Button
                                    variant="outline"
                                    className="w-full h-[48px] rounded-[8px] border-2 border-slate-200 text-[#121117] font-[600] hover:bg-slate-50"
                                >
                                    <Upload className="mr-2 h-4 w-4" />
                                    Завантажити сертифікати
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200/80 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-[24px] overflow-hidden">
                        <CardHeader className="bg-[var(--theme-primary-light)] border-b border-[var(--theme-primary)]/20 pb-6">
                            <CardTitle className="flex items-center gap-2 text-[20px] font-bold text-[var(--theme-primary-dark)]">
                                <Users className="h-5 w-5" />
                                Реферальна програма
                            </CardTitle>
                            <CardDescription className="text-[var(--theme-primary-dark)]/80 text-[14px]">
                                Запрошуйте колег та отримуйте бонуси
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            {/* Referral Link */}
                            <div className="space-y-2">
                                <Label className="text-[14px] font-[600]">Ваше реферальне посилання</Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={`https://libitum.education/ref/tutor/${user?.id || "specialist-1"}`}
                                        readOnly
                                        className="bg-slate-50 h-[44px] rounded-[8px] font-mono text-[13px]"
                                    />
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                `https://libitum.education/ref/tutor/${user?.id || "specialist-1"}`,
                                            )
                                            toast({ title: "Посилання скопійовано", description: "Поділіться ним з колегами" })
                                        }}
                                        className="h-[44px] rounded-[8px] border-[var(--theme-primary)] text-[var(--theme-primary)] hover:bg-[var(--theme-primary-light)] font-[600]"
                                    >
                                        Копіювати
                                    </Button>
                                </div>
                                <p className="text-[13px] text-[#69686f]">
                                    Поділіться цим посиланням з колегами-репетиторами. Ви отримаєте XP бонус після їх реєстрації
                                    та першого заняття.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-4 rounded-[12px] bg-[#f0f3f3]">
                                    <div className="text-[24px] font-bold text-[#121117]">3</div>
                                    <div className="text-[13px] text-[#69686f] font-[500]">Запрошено</div>
                                </div>
                                <div className="text-center p-4 rounded-[12px] bg-[#f0f3f3]">
                                    <div className="text-[24px] font-bold text-[#121117]">2</div>
                                    <div className="text-[13px] text-[#69686f] font-[500]">Активних</div>
                                </div>
                                <div className="text-center p-4 rounded-[12px] bg-[var(--theme-primary-light)]">
                                    <div className="text-[24px] font-bold text-[var(--theme-primary)]">+500</div>
                                    <div className="text-[13px] text-[var(--theme-primary-dark)] font-[500]">XP зароблено</div>
                                </div>
                            </div>

                            {/* Add Own Student CTA */}
                            <div className="rounded-[12px] border-2 border-dashed border-slate-200 p-5 space-y-3 bg-[#f8f9fb]">
                                <div className="flex items-center gap-2">
                                    <UserPlus className="h-5 w-5 text-[#121117]" />
                                    <span className="text-[15px] font-bold text-[#121117]">Додати свого учня</span>
                                </div>
                                <p className="text-[14px] text-[#69686f] leading-relaxed">
                                    Переведіть своїх учнів на платформу та отримуйте XP за кожне їх заняття без комісії.
                                </p>
                                <Button
                                    className="w-full text-[15px] font-[600] h-[44px] rounded-[8px] bg-white border border-slate-200 text-[#121117] hover:bg-slate-50"
                                    onClick={() => router.push("/tutor/clients")}
                                >
                                    Перейти до учнів
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end pt-4 pb-12">
                        <Button
                            onClick={handleSave}
                            className="h-[52px] px-8 rounded-[8px] text-[16px] font-[600] bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-hover)] text-white transition-colors"
                        >
                            <Save className="mr-2 h-5 w-5" />
                            Зберегти всі зміни
                        </Button>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    )
}
