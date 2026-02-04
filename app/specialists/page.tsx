"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { BookOpen, Search, Star, MapPin, Video, Home, Award, SlidersHorizontal } from "lucide-react"
import Image from "next/image"

export default function SpecialistsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(true)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [onlineOnly, setOnlineOnly] = useState(false)
  const [offlineOnly, setOfflineOnly] = useState(false)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])

  const specialists = [
    {
      id: 1,
      name: "Олена Іваненко",
      specialization: "Репетитор",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
      subjects: ["Англійська мова", "Німецька мова"],
      rating: 4.9,
      reviews: 48,
      experience: 5,
      priceOnline: 400,
      priceOffline: 500,
      location: "Київ",
      verified: true,
      online: true,
      offline: true,
      bio: "Маю 5 років досвіду викладання англійської мови. Працюю з учнями різного віку.",
    },
    {
      id: 3,
      name: "Марія Коваленко",
      specialization: "Психолог",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      subjects: ["Індивідуальна терапія", "Сімейна терапія"],
      rating: 5.0,
      reviews: 62,
      experience: 10,
      priceOnline: 600,
      priceOffline: 700,
      location: "Київ",
      verified: true,
      online: true,
      offline: false,
      bio: "Клінічний психолог з 10-річним досвідом. Спеціалізуюсь на роботі з тривожністю.",
    },
    {
      id: 4,
      name: "Анна Мельник",
      specialization: "Логопед",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      subjects: ["Постановка звуків", "Корекція мовлення"],
      rating: 4.9,
      reviews: 41,
      experience: 8,
      priceOnline: 500,
      priceOffline: 600,
      location: "Київ",
      verified: true,
      online: true,
      offline: true,
      bio: "Логопед-дефектолог. Працюю з дітьми та дорослими.",
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
      cardBg: "from-emerald-50/18 via-white to-white"
    },
    health: {
      button: "bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-600 hover:to-orange-500 text-white border-transparent shadow-amber-100",
      price: "text-amber-700",
      icon: "text-amber-600",
      ring: "focus-visible:ring-amber-600",
      glow: "rgba(251, 146, 60, 0.05)",
      soft: "rgba(251, 146, 60, 0.03)",
      cardBg: "from-amber-50/18 via-white to-white"
    },
    neutral: {
      button: "bg-slate-900 hover:bg-slate-800 text-white border-transparent shadow-slate-100",
      price: "text-slate-900",
      icon: "text-slate-600",
      ring: "focus-visible:ring-slate-900",
      glow: "rgba(148, 163, 184, 0.05)",
      soft: "rgba(148, 163, 184, 0.03)",
      cardBg: "from-slate-50/18 via-white to-white"
    }
  }

  const getAccentStyles = (specialistType: string) => {
    if (specialistType === "Репетитор") return accentPalette.tutor
    if (["Психолог", "Логопед"].includes(specialistType)) return accentPalette.health
    return accentPalette.neutral
  }

  const getDiffuseBackground = (index: number) => {
    const current = getAccentStyles(specialists[index].specialization)
    const prevType = specialists[index - 1]?.specialization
    const nextType = specialists[index + 1]?.specialization
    const prevAccent = prevType ? getAccentStyles(prevType) : null
    const nextAccent = nextType ? getAccentStyles(nextType) : null

    const layers = [
      prevAccent ? `radial-gradient(140px circle at 50% 0%, ${prevAccent.glow}, transparent 65%)` : null,
      `radial-gradient(220px circle at 50% 50%, ${current.glow}, transparent 74%)`,
      nextAccent ? `radial-gradient(160px circle at 50% 100%, ${nextAccent.glow}, transparent 68%)` : null,
      `linear-gradient(180deg, ${current.soft}, rgba(255,255,255,0.9))`
    ].filter(Boolean)

    return { backgroundImage: layers.join(", ") }
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-slate-200 shadow-sm">
                <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-800">Libitum</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="font-medium text-slate-600 hover:text-slate-800">Увійти</Button>
              </Link>
              <Link href="/register">
                <Button className="rounded-xl bg-slate-800 text-white hover:bg-slate-700 shadow-sm">Реєстрація</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-10">
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-800">Знайти спеціаліста</h1>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Пошук за ім'ям або предметом..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 rounded-xl border-slate-200 bg-white pl-12 text-base shadow-sm focus-visible:ring-slate-400"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-12 w-full rounded-xl border-slate-200 bg-white shadow-sm md:w-[220px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всі спеціалісти</SelectItem>
                <SelectItem value="tutor">Репетитори</SelectItem>
                <SelectItem value="psychologist">Психологи</SelectItem>
                <SelectItem value="speech-therapist">Логопеди</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)} 
              className="h-12 rounded-xl border-slate-200 bg-white shadow-sm md:w-auto hover:bg-slate-50"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Фільтри
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {showFilters && (
            <div className="space-y-6 lg:col-span-1">
              <Card className="border-slate-200 shadow-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Фільтри</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700">Ціна за годину</Label>
                    <div className="space-y-4">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={1000}
                        step={50}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-sm font-medium text-slate-600">
                        <span>{priceRange[0]} ₴</span>
                        <span>{priceRange[1]} ₴</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700">Формат занять</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="online"
                          checked={onlineOnly}
                          onCheckedChange={(checked) => setOnlineOnly(checked as boolean)}
                          className="rounded-md border-slate-300 data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900"
                        />
                        <Label htmlFor="online" className="text-sm font-normal text-slate-600 cursor-pointer">
                          Онлайн
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="offline"
                          checked={offlineOnly}
                          onCheckedChange={(checked) => setOfflineOnly(checked as boolean)}
                          className="rounded-md border-slate-300 data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900"
                        />
                        <Label htmlFor="offline" className="text-sm font-normal text-slate-600 cursor-pointer">
                          Офлайн
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="verified"
                        checked={verifiedOnly}
                        onCheckedChange={(checked) => setVerifiedOnly(checked as boolean)}
                        className="rounded-md border-slate-300 data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900"
                      />
                      <Label htmlFor="verified" className="text-sm font-normal text-slate-600 cursor-pointer">
                        Тільки верифіковані
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700">Предмети</Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                      {[
                        "Англійська мова",
                        "Німецька мова",
                        "Математика",
                        "Фізика",
                        "Хімія",
                        "Українська мова",
                        "Історія",
                        "Біологія",
                      ].map((subject) => (
                        <div key={subject} className="flex items-center space-x-2">
                          <Checkbox
                            id={subject}
                            checked={selectedSubjects.includes(subject)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedSubjects([...selectedSubjects, subject])
                              } else {
                                setSelectedSubjects(selectedSubjects.filter((s) => s !== subject))
                              }
                            }}
                            className="rounded-md border-slate-300 data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900"
                          />
                          <Label htmlFor={subject} className="text-sm font-normal text-slate-600 cursor-pointer">
                            {subject}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-dashed border-slate-300 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    onClick={() => {
                      setPriceRange([0, 1000])
                      setOnlineOnly(false)
                      setOfflineOnly(false)
                      setVerifiedOnly(false)
                      setSelectedSubjects([])
                    }}
                  >
                    Скинути фільтри
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
            <div className="mb-6 text-sm font-medium text-slate-500">Знайдено {specialists.length} спеціалістів</div>

            <div className="flex flex-col gap-4">
              {specialists.map((specialist, index) => {
                const accent = getAccentStyles(specialist.specialization);
                return (
                  <Card
                    key={specialist.id}
                    className={`overflow-hidden border-slate-200 bg-gradient-to-br ${accent.cardBg} shadow-sm transition-all hover:shadow-lg hover:translate-y-[-2px] rounded-2xl hover-glow`}
                    style={getDiffuseBackground(index)}
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Avatar and basic info */}
                        <div className="flex flex-col sm:flex-row flex-1 gap-5 p-5 sm:gap-6 sm:p-6">
                          <div className="relative shrink-0 mx-auto sm:mx-0">
                            <div className="relative w-64 sm:w-44 md:w-48 aspect-[4/5] overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-lg ring-1 ring-slate-200/60">
                              {specialist.image ? (
                                <Image src={specialist.image} alt={specialist.name} fill className="object-cover object-top" />
                              ) : (
                                <Avatar className="h-full w-full rounded-2xl">
                                  <AvatarFallback className="bg-slate-50 text-xl font-bold text-slate-700">{specialist.name[0]}</AvatarFallback>
                                </Avatar>
                              )}
                            </div>
                            {specialist.verified && (
                              <div
                                className="absolute -bottom-2 -right-2 sm:bottom-2 sm:right-2 sm:translate-x-1/4 sm:translate-y-1/4 flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white shadow-lg ring-2 ring-white z-10"
                              >
                                <Award className={`h-5 w-5 sm:h-4.5 sm:w-4.5 ${accent.icon}`} />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex min-w-0 flex-1 flex-col text-center sm:text-left">
                            <div className="mb-3 sm:mb-2 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-2">
                              <div>
                                <h3 className="text-xl sm:text-lg font-bold text-slate-900">{specialist.name}</h3>
                                <p className="text-sm font-medium text-slate-500">{specialist.specialization}</p>
                              </div>
                              <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1">
                                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                <span className="text-sm font-bold text-amber-700">{specialist.rating}</span>
                                <span className="text-xs text-amber-600/80">({specialist.reviews})</span>
                              </div>
                            </div>

                            {/* Subjects */}
                            <div className="mb-3 flex flex-wrap justify-center sm:justify-start gap-1.5">
                              {specialist.subjects.slice(0, 3).map((subject) => (
                                <span key={subject} className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10">
                                  {subject}
                                </span>
                              ))}
                              {specialist.subjects.length > 3 && (
                                <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10">
                                  +{specialist.subjects.length - 3}
                                </span>
                              )}
                            </div>

                            {/* Bio */}
                            <p className="line-clamp-2 text-sm text-slate-600 mb-4 leading-relaxed text-center sm:text-left">{specialist.bio}</p>

                            {/* Footer tags */}
                            <div className="mt-auto flex items-center gap-4 text-xs font-medium text-slate-500">
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

                        {/* Price and CTA - Sidebar */}
                        <div className="flex flex-row md:flex-col items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/50 p-6 md:w-64 md:border-l md:border-t-0 md:justify-center">
                          <div className="text-left md:text-center">
                            <div className="text-xs font-medium text-slate-500 mb-1">Вартість заняття</div>
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
          </div>
        </div>
      </div>
    </div>
  )
}
