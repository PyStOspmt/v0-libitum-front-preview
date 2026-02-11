"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { BookOpen, Search, Star, MapPin, Video, Home, Award, SlidersHorizontal, Users, Heart } from "lucide-react"
export default function SpecialistsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(true)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [onlineOnly, setOnlineOnly] = useState(false)
  const [offlineOnly, setOfflineOnly] = useState(false)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [favorites, setFavorites] = useState<number[]>([])

  const specialists = [
    {
      id: 1,
      name: "Олена Іваненко",
      specialization: "Репетитор",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
      subjects: ["Англійська мова", "Німецька мова", "Французька мова", "Іспанська мова", "Математика", "Історія"],
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
      bio: "Маю 5 років досвіду викладання англійської мови. Працюю з учнями різного віку - від школярів до дорослих. Готую до міжнародних іспитів IELTS та TOEFL, допомагаю прокачати розмовну мову для подорожей та роботи. Адаптую програму під цілі кожного учня, щоб кожне заняття давало відчутний прогрес та результати.",
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
      bio: "Клінічний психолог з 10-річним досвідом. Спеціалізуюсь на роботі з тривожністю, депресією та стресом. Проводжу індивідуальну та сімейну терапію, допомагаю знайти баланс.",
    },
    {
      id: 4,
      name: "Анна Мельник",
      specialization: "Логопед",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      subjects: ["Постановка звуків", "Корекція мовлення"],
      rating: 4.9,
      reviews: 41,
      activeStudents: 32,
      lessonsCompleted: 4300,
      experience: 8,
      priceOnline: 500,
      priceOffline: 600,
      location: "Київ",
      verified: true,
      online: true,
      offline: true,
      bio: "Логопед-дефектолог. Працюю з дітьми та дорослими. Корекція вимови, постановка звуків.",
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
  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    )
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
            {/* Favorites Bar */}
            {favorites.length > 0 && (
              <div className="mb-6 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500 fill-current" />
                    <span className="text-sm font-medium text-slate-700">
                      {favorites.length} {favorites.length === 1 ? 'обраний' : 'обраних'}
                    </span>
                  </div>
                  <Link href="/favorites">
                    <Button variant="outline" size="sm" className="text-xs">
                      Переглянути обраних
                    </Button>
                  </Link>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-3 sm:gap-4">
              {specialists.map((specialist, index) => {
                const accent = getAccentStyles(specialist.specialization)
                return (
                  <div
                    key={specialist.id}
                    className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden
                      shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200"
                  >
                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(specialist.id)}
                      className={`absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full transition-all hover:scale-110 shadow-sm ${
                        favorites.includes(specialist.id)
                          ? 'text-red-500 bg-white hover:bg-red-50'
                          : 'text-slate-300 bg-white/90 hover:text-red-500 hover:bg-red-50'
                      }`}
                    >
                      <Heart className={`h-3.5 w-3.5 ${favorites.includes(specialist.id) ? 'fill-current' : ''}`} />
                    </button>

                    <div className="flex flex-row">
                      {/* Photo column — hidden on mobile, visible on sm+ */}
                      <div className="relative hidden sm:block sm:w-36 md:w-40 lg:w-44 flex-shrink-0">
                        <div className="relative h-full overflow-hidden bg-slate-100">
                          {specialist.image ? (
                            <Image src={specialist.image} alt={specialist.name} fill className="object-cover object-top" />
                          ) : (
                            <Avatar className="h-full w-full rounded-none">
                              <AvatarFallback className="bg-slate-100 text-lg font-bold text-slate-600 rounded-none">{specialist.name[0]}</AvatarFallback>
                            </Avatar>
                          )}
                          {specialist.verified && (
                            <div className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-white z-10">
                              <Award className={`h-3 w-3 ${accent.icon}`} />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1 min-w-0 p-2.5 sm:p-4">
                        {/* Header row — circle avatar (mobile only) + name + rating */}
                        <div className="mb-1">
                          <div className="flex items-center gap-2.5 mb-0.5">
                            {/* Circle avatar — mobile only */}
                            <div className="relative flex-shrink-0 sm:hidden">
                              <div className="relative h-12 w-12 rounded-full overflow-hidden bg-slate-100 ring-2 ring-white shadow-sm">
                                {specialist.image ? (
                                  <Image src={specialist.image} alt={specialist.name} fill className="object-cover object-top" />
                                ) : (
                                  <Avatar className="h-full w-full">
                                    <AvatarFallback className="bg-slate-100 text-sm font-bold text-slate-600">{specialist.name[0]}</AvatarFallback>
                                  </Avatar>
                                )}
                              </div>
                              {specialist.verified && (
                                <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow ring-1 ring-white z-10">
                                  <Award className={`h-2.5 w-2.5 ${accent.icon}`} />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight truncate">{specialist.name}</h3>
                                {/* Rating — inline with name */}
                                <div className="flex items-center gap-0.5 flex-shrink-0">
                                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                  <span className="text-[11px] font-bold text-amber-700">{specialist.rating}</span>
                                  <span className="text-[9px] text-amber-600/60">({specialist.reviews})</span>
                                </div>
                              </div>
                              <p className="text-[11px] font-medium text-slate-500">{specialist.specialization} · {specialist.experience} р. досвіду</p>
                            </div>
                          </div>
                        </div>

                        {/* Stats — hidden on very small screens to save space */}
                        <div className="hidden xs:flex items-center gap-3 text-[10px] sm:text-[11px] font-medium text-slate-500 mb-1.5">
                          <span className="inline-flex items-center gap-1">
                            <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            {specialist.activeStudents} учнів
                          </span>
                          <span className="text-slate-200">|</span>
                          <span className="inline-flex items-center gap-1">
                            <BookOpen className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            {specialist.lessonsCompleted} занять
                          </span>
                        </div>

                        {/* Subjects */}
                        <div className="flex flex-wrap gap-1 mb-1.5">
                          {specialist.subjects.slice(0, 3).map((s) => (
                            <span key={s} className="rounded-md bg-slate-50 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-medium text-slate-600 ring-1 ring-slate-100">
                              {s}
                            </span>
                          ))}
                          {specialist.subjects.length > 3 && (
                            <span className="rounded-md bg-slate-50 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-medium text-slate-400 ring-1 ring-slate-100">
                              +{specialist.subjects.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Bio — more lines visible */}
                        <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-3 sm:line-clamp-2 mb-2">
                          {specialist.bio}
                        </p>

                        {/* Footer: location + format + price + CTA */}
                        <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mt-auto pt-1.5 sm:pt-2 border-t border-slate-100">
                          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-medium text-slate-500">
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                              {specialist.location}
                            </span>
                            {specialist.online && (
                              <span className="inline-flex items-center gap-1">
                                <Video className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                Онлайн
                              </span>
                            )}
                            {specialist.offline && (
                              <span className="hidden sm:inline-flex items-center gap-1">
                                <Home className="h-3 w-3" />
                                Офлайн
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="text-right">
                              <span className={`text-sm sm:text-lg font-bold ${accent.price}`}>
                                {specialist.priceOnline} ₴
                              </span>
                              <span className="text-[9px] sm:text-[10px] text-slate-400 ml-0.5">/год</span>
                            </div>
                            <Link href={`/specialists/${specialist.id}`}>
                              <Button
                                size="sm"
                                className={`h-7 sm:h-8 px-3 sm:px-4 rounded-lg text-[11px] sm:text-xs font-semibold shadow-sm ${accent.button}`}
                              >
                                Переглянути
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
