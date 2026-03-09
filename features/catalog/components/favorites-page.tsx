"use client"

import { Award, BookOpen, Heart, Home, MapPin, Star, Users, Video } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Mock data - in real app this would come from API or context
const mockSpecialists = [
    {
        id: 1,
        name: "Олена Іваненко",
        specialization: "Репетитор",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
        subjects: ["Англійська мова", "Німецька мова"],
        rating: 4.9,
        reviews: 48,
        activeStudents: 49,
        lessonsCompleted: 4975,
        experience: 5,
        priceOnline: 400,
        priceOffline: 500,
        location: "Київ",
        verified: true,
        online: true,
        offline: true,
        bio: "Маю 5 років досвіду викладання англійської мови. Працюю з учнями різного віку. Готую до іспитів, допомагаю прокачати розмовну мову та адаптую програму під цілі учня, щоб кожне заняття давало відчутний прогрес.",
    },
    {
        id: 3,
        name: "Марія Коваленко",
        specialization: "Психолог",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
        subjects: ["Індивідуальна терапія", "Сімейна терапія"],
        rating: 5.0,
        reviews: 62,
        activeStudents: 38,
        lessonsCompleted: 6100,
        experience: 10,
        priceOnline: 600,
        priceOffline: 700,
        location: "Київ",
        verified: true,
        online: true,
        offline: false,
        bio: "Клінічний психолог з 10-річним досвідом. Спеціалізуюсь на роботі з тривожністю.",
    },
]

type AccentStyles = {
    button: string
    price: string
    icon: string
    ring: string
    glow: string
    soft: string
    cardBg: string
}

const accentPalette: Record<"tutor" | "health" | "neutral", AccentStyles> = {
    tutor: {
        button: "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-transparent shadow-emerald-100",
        price: "text-emerald-700",
        icon: "text-emerald-600",
        ring: "focus-visible:ring-emerald-600",
        glow: "rgba(16, 185, 129, 0.05)",
        soft: "rgba(16, 185, 129, 0.03)",
        cardBg: "from-emerald-50/18 via-white to-white",
    },
    health: {
        button: "bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-600 hover:to-orange-500 text-white border-transparent shadow-amber-100",
        price: "text-amber-700",
        icon: "text-amber-600",
        ring: "focus-visible:ring-amber-600",
        glow: "rgba(251, 146, 60, 0.05)",
        soft: "rgba(251, 146, 60, 0.03)",
        cardBg: "from-amber-50/18 via-white to-white",
    },
    neutral: {
        button: "bg-slate-900 hover:bg-slate-800 text-white border-transparent shadow-slate-100",
        price: "text-slate-900",
        icon: "text-slate-600",
        ring: "focus-visible:ring-slate-900",
        glow: "rgba(148, 163, 184, 0.05)",
        soft: "rgba(148, 163, 184, 0.03)",
        cardBg: "from-slate-50/18 via-white to-white",
    },
}

export function FavoritesPage() {
    const [favorites, setFavorites] = useState<number[]>([1, 3]) // Mock favorites

    const getAccentStyles = (specialistType: string) => {
        if (specialistType === "Репетитор") return accentPalette.tutor
        if (["Психолог", "Логопед"].includes(specialistType)) return accentPalette.health
        return accentPalette.neutral
    }

    const toggleFavorite = (id: number) => {
        setFavorites((prev) => (prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]))
    }

    const favoriteSpecialists = mockSpecialists.filter((s) => favorites.includes(s.id))

    return (
        <div className="min-h-screen bg-slate-50/50 text-[#111827]">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-800">Обрані спеціалісти</h1>
                    <p className="text-slate-600">
                        {favoriteSpecialists.length === 0
                            ? "У вас ще немає обраних спеціалістів"
                            : `У вас ${favoriteSpecialists.length} ${favoriteSpecialists.length === 1 ? "обраний" : "обраних"} спеціаліст${favoriteSpecialists.length > 1 ? "ів" : ""}`}
                    </p>
                </div>

                {favoriteSpecialists.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="mx-auto w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                            <Heart className="h-12 w-12 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">Немає обраних</h3>
                        <p className="text-slate-600 mb-6">Додайте спеціалістів до обраних, щоб легко знаходити їх пізніше</p>
                        <Link href="/specialists">
                            <Button className="rounded-xl bg-slate-800 text-white hover:bg-slate-700">
                                Знайти спеціалістів
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 max-w-5xl mx-auto">
                        {favoriteSpecialists.map((specialist, index) => {
                            const accent = getAccentStyles(specialist.specialization)
                            return (
                                <Card
                                    key={specialist.id}
                                    className={`overflow-hidden border-slate-200 bg-gradient-to-br ${accent.cardBg} shadow-sm transition-all hover:shadow-lg hover:translate-y-[-2px] rounded-2xl hover-glow relative`}
                                >
                                    {/* Favorite Button */}
                                    <button
                                        onClick={() => toggleFavorite(specialist.id)}
                                        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all hover:scale-110 shadow-md ${
                                            favorites.includes(specialist.id)
                                                ? "text-red-500 bg-white hover:bg-red-50"
                                                : "text-slate-400 bg-white hover:text-red-500 hover:bg-red-50"
                                        }`}
                                    >
                                        <Heart
                                            className={`h-4 w-4 ${favorites.includes(specialist.id) ? "fill-current" : ""}`}
                                        />
                                    </button>
                                    <CardContent className="p-0">
                                        <div className="flex flex-col md:flex-row">
                                            {/* Main Info Area */}
                                            <div className="flex flex-col md:flex-row flex-1 p-0 sm:p-1 md:p-2 gap-2 md:gap-6 px-1">
                                                {/* Photo Column */}
                                                <div className="flex flex-row md:flex-col gap-3 md:gap-6 md:shrink-0 md:w-56 lg:w-64">
                                                    {/* Photo Box */}
                                                    <div className="relative shrink-0 w-[38%] md:w-full">
                                                        <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] sm:rounded-[24px] border border-slate-100 bg-white shadow-md sm:shadow-lg ring-1 ring-slate-200/60">
                                                            {specialist.image ? (
                                                                <Image
                                                                    src={specialist.image}
                                                                    alt={specialist.name}
                                                                    fill
                                                                    className="object-cover object-top"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                                                                    <span className="text-xl font-bold text-slate-700">
                                                                        {specialist.name[0]}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {specialist.verified && (
                                                            <div className="absolute -bottom-1.5 -right-1.5 sm:bottom-2 sm:right-2 sm:translate-x-1/4 sm:translate-y-1/4 flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white shadow-lg ring-2 ring-white z-10">
                                                                <Award className={`h-4 w-4 sm:h-4.5 sm:w-4.5 ${accent.icon}`} />
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Mobile Header Info (beside photo) */}
                                                    <div className="flex flex-col flex-1 min-w-0 md:hidden text-left py-0.5">
                                                        <h3 className="text-lg font-bold text-slate-900 leading-tight mb-0.5">
                                                            {specialist.name}
                                                        </h3>
                                                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                                            <p className="text-xs font-medium text-slate-500">
                                                                {specialist.specialization}
                                                            </p>
                                                            <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 ring-1 ring-amber-200/50">
                                                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                                                <span className="text-xs font-bold text-amber-700">
                                                                    {specialist.rating}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col gap-1 text-[11px] font-medium text-slate-500 mb-0.5">
                                                            <span className="inline-flex items-center gap-1.5">
                                                                <Users className="h-3 w-3 text-slate-400" />
                                                                {specialist.activeStudents} учнів
                                                            </span>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                <BookOpen className="h-3 w-3 text-slate-400" />
                                                                {specialist.lessonsCompleted} занять
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {specialist.subjects.slice(0, 2).map((s) => (
                                                                <span
                                                                    key={s}
                                                                    className="rounded-md bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 ring-1 ring-slate-200"
                                                                >
                                                                    {s}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Info Column (Desktop Header + Bio + Footer) */}
                                                <div className="flex flex-col flex-1 min-w-0">
                                                    {/* Desktop Header */}
                                                    <div className="hidden md:flex flex-col gap-1 mb-1 text-left">
                                                        <div className="flex items-center justify-between gap-4">
                                                            <h3 className="text-xl font-bold text-slate-900">
                                                                {specialist.name}
                                                            </h3>
                                                            <div className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1">
                                                                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                                                <span className="text-sm font-bold text-amber-700">
                                                                    {specialist.rating}
                                                                </span>
                                                                <span className="text-xs text-amber-600/80">
                                                                    ({specialist.reviews})
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm font-medium text-slate-500">
                                                            {specialist.specialization}
                                                        </p>
                                                        <div className="mt-2 flex items-center gap-4 text-xs font-medium text-slate-500">
                                                            <span className="inline-flex items-center gap-1.5">
                                                                <Users className="h-3.5 w-3.5" />
                                                                {specialist.activeStudents} учнів
                                                            </span>
                                                            <span className="text-slate-300">•</span>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                <BookOpen className="h-3.5 w-3.5" />
                                                                {specialist.lessonsCompleted} занять
                                                            </span>
                                                            <span className="text-slate-300">•</span>
                                                            <div className="flex gap-1.5">
                                                                {specialist.subjects.map((s) => (
                                                                    <span
                                                                        key={s}
                                                                        className="rounded-md bg-slate-50 px-1.5 py-0.5 ring-1 ring-slate-500/10"
                                                                    >
                                                                        {s}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Bio */}
                                                    <p className="text-xs sm:text-sm text-slate-600 mb-1 leading-relaxed text-left line-clamp-6 md:line-clamp-none px-1">
                                                        {specialist.bio}
                                                    </p>

                                                    {/* Footer */}
                                                    <div className="mt-auto flex flex-wrap items-center justify-start gap-x-4 gap-y-2 text-[11px] sm:text-xs font-medium text-slate-500 px-1">
                                                        <div className="flex items-center gap-1.5">
                                                            <MapPin className="h-3.5 w-3.5" />
                                                            {specialist.location}
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            {specialist.online && (
                                                                <span className="flex items-center gap-1.5 text-slate-600">
                                                                    <Video className="h-3.5 w-3.5" />
                                                                    Онлайн
                                                                </span>
                                                            )}
                                                            {specialist.offline && (
                                                                <span className="flex items-center gap-1.5 text-slate-600">
                                                                    <Home className="h-3.5 w-3.5" />
                                                                    Офлайн
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Price and CTA Sidebar */}
                                            <div className="flex flex-row md:flex-col items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/50 p-2 sm:p-2.5 md:w-48 md:border-l md:border-t-0 md:justify-center">
                                                <div className="text-left md:text-center">
                                                    <div className="text-xs font-medium text-slate-500 mb-1">
                                                        Вартість заняття
                                                    </div>
                                                    <div className={`text-2xl font-bold ${accent.price}`}>
                                                        {specialist.priceOnline} ₴
                                                        <span className="text-sm font-medium text-slate-400 ml-1">/ год</span>
                                                    </div>
                                                </div>

                                                <Link href={`/specialists/${specialist.id}`} className="shrink-0 md:w-full">
                                                    <Button
                                                        variant="ghost"
                                                        className={`w-full rounded-xl font-semibold shadow-md transition-all hover:scale-[1.02] ${accent.button}`}
                                                    >
                                                        Переглянути
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
