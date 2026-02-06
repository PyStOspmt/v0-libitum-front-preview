"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BookOpen, Search, Star, MapPin, Video, Home, Award, SlidersHorizontal, Users, Heart, ArrowLeft } from "lucide-react"

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
      bio: "Маю 5 років досвіду викладання англійської мови. Працюю з учнями різного віку. Готую до іспитів, допомагаю прокачати розмовну мову та адаптую програму під цілі учня.",
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
      bio: "Логопед-дефектолог. Працюю з дітьми та дорослими.",
    },
  ]

  const getAccentColor = (type: string) => {
    if (type === "Репетитор") return { bg: "bg-[#e8f5e9]", text: "text-[#43a047]", border: "border-[#43a047]" }
    if (type === "Психолог") return { bg: "bg-[#e8eaf6]", text: "text-[#5c6bc0]", border: "border-[#5c6bc0]" }
    return { bg: "bg-[#fff8e1]", text: "text-[#f9a825]", border: "border-[#f9a825]" }
  }

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id])
  }

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 border-b border-slate-100/80">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="relative h-10 w-10 overflow-hidden rounded-xl">
                  <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
                </div>
                <span className="text-lg font-bold text-slate-800">LIBITUM</span>
              </Link>
              <Link href="/" className="hidden sm:flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                На головну
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="outline" className="h-10 rounded-full px-6 text-sm font-medium border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer">
                  Увійти
                </Button>
              </Link>
              <Link href="/register">
                <Button className="h-10 rounded-full bg-[#43a047] px-6 text-sm font-medium text-white hover:bg-[#388e3c] cursor-pointer">
                  Реєстрація
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Search bar */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-6 tracking-tight font-heading">Знайти спеціаліста</h1>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Пошук за ім'ям або предметом..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-13 rounded-2xl border-slate-200 bg-white pl-12 text-base focus:border-[#43a047] focus:ring-2 focus:ring-[#c8e6c9]"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-13 w-full rounded-2xl border-slate-200 bg-white md:w-[220px]">
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
              className="h-13 rounded-2xl border-slate-200 bg-white md:w-auto hover:bg-slate-50 cursor-pointer"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Фільтри
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Filters */}
          {showFilters && (
            <div className="lg:col-span-1">
              <div className="bg-[#fafaf8] rounded-3xl p-6 border-2 border-transparent hover:border-black transition-all">
                <h3 className="text-base font-bold text-slate-800 mb-6">Фільтри</h3>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700">Ціна за годину</Label>
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

                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700">Формат занять</Label>
                    <div className="space-y-2.5">
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <Checkbox
                          checked={onlineOnly}
                          onCheckedChange={(c) => setOnlineOnly(c as boolean)}
                          className="border-slate-300 data-[state=checked]:bg-[#43a047] data-[state=checked]:border-[#43a047]"
                        />
                        <span className="text-sm text-slate-600">Онлайн</span>
                      </label>
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <Checkbox
                          checked={offlineOnly}
                          onCheckedChange={(c) => setOfflineOnly(c as boolean)}
                          className="border-slate-300 data-[state=checked]:bg-[#43a047] data-[state=checked]:border-[#43a047]"
                        />
                        <span className="text-sm text-slate-600">Офлайн</span>
                      </label>
                    </div>
                  </div>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <Checkbox
                      checked={verifiedOnly}
                      onCheckedChange={(c) => setVerifiedOnly(c as boolean)}
                      className="border-slate-300 data-[state=checked]:bg-[#43a047] data-[state=checked]:border-[#43a047]"
                    />
                    <span className="text-sm text-slate-600">Тільки верифіковані</span>
                  </label>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700">Предмети</Label>
                    <div className="space-y-2.5 max-h-48 overflow-y-auto">
                      {["Англійська мова", "Німецька мова", "Математика", "Фізика", "Хімія", "Українська мова", "Історія", "Біологія"].map((subject) => (
                        <label key={subject} className="flex items-center gap-2.5 cursor-pointer">
                          <Checkbox
                            checked={selectedSubjects.includes(subject)}
                            onCheckedChange={(checked) => {
                              if (checked) setSelectedSubjects([...selectedSubjects, subject])
                              else setSelectedSubjects(selectedSubjects.filter((s) => s !== subject))
                            }}
                            className="border-slate-300 data-[state=checked]:bg-[#43a047] data-[state=checked]:border-[#43a047]"
                          />
                          <span className="text-sm text-slate-600">{subject}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-dashed border-slate-300 text-slate-500 hover:bg-white hover:text-slate-800 cursor-pointer"
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
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
            <div className="mb-6 text-sm font-medium text-slate-500">
              Знайдено {specialists.length} спеціалістів
            </div>

            {favorites.length > 0 && (
              <div className="mb-6 p-4 bg-[#fafaf8] rounded-2xl border-2 border-transparent hover:border-black transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500 fill-current" />
                    <span className="text-sm font-medium text-slate-700">
                      {favorites.length} {favorites.length === 1 ? "обраний" : "обраних"}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs rounded-full cursor-pointer">
                    Переглянути обраних
                  </Button>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-5">
              {specialists.map((specialist) => {
                const accent = getAccentColor(specialist.specialization)
                return (
                  <div
                    key={specialist.id}
                    className="bg-white rounded-3xl border-2 border-transparent hover:border-black card-hover overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Photo + mobile info */}
                      <div className="flex flex-row md:flex-col gap-4 p-5 md:w-56 lg:w-64 flex-shrink-0">
                        <div className="relative w-[38%] md:w-full flex-shrink-0">
                          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100">
                            {specialist.image ? (
                              <Image src={specialist.image} alt={specialist.name} fill className="object-cover object-top" crossOrigin="anonymous" />
                            ) : (
                              <Avatar className="h-full w-full rounded-2xl">
                                <AvatarFallback className="bg-slate-50 text-xl font-bold text-slate-700">{specialist.name[0]}</AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                          {specialist.verified && (
                            <div className="absolute -bottom-1.5 -right-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-2 ring-white z-10">
                              <Award className={`h-4 w-4 ${accent.text}`} />
                            </div>
                          )}
                        </div>

                        {/* Mobile header info */}
                        <div className="flex flex-col flex-1 min-w-0 md:hidden py-0.5">
                          <h3 className="text-lg font-bold text-slate-800 mb-0.5">{specialist.name}</h3>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-medium ${accent.text} ${accent.bg} px-2 py-0.5 rounded-full`}>
                              {specialist.specialization}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-slate-500">
                              <Star className="h-3 w-3 fill-[#ffc107] text-[#ffc107]" />
                              {specialist.rating}
                            </span>
                          </div>
                          <div className="flex flex-col gap-1 text-[11px] text-slate-500 mb-1">
                            <span className="flex items-center gap-1.5">
                              <Users className="h-3 w-3" />
                              {specialist.activeStudents} учнів
                            </span>
                            <span className="flex items-center gap-1.5">
                              <BookOpen className="h-3 w-3" />
                              {specialist.lessonsCompleted} занять
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {specialist.subjects.slice(0, 2).map((s) => (
                              <span key={s} className="rounded-full bg-[#fafaf8] px-2 py-0.5 text-[10px] font-medium text-slate-600">{s}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Desktop info */}
                      <div className="flex flex-col flex-1 min-w-0 p-5 pt-0 md:pt-5 md:pl-0">
                        <div className="hidden md:flex flex-col gap-1 mb-2">
                          <div className="flex items-center justify-between gap-4">
                            <h3 className="text-xl font-bold text-slate-800">{specialist.name}</h3>
                            <div className="flex items-center gap-1.5 bg-[#fff8e1] px-2.5 py-1 rounded-full">
                              <Star className="h-4 w-4 fill-[#ffc107] text-[#ffc107]" />
                              <span className="text-sm font-bold text-slate-700">{specialist.rating}</span>
                              <span className="text-xs text-slate-500">({specialist.reviews})</span>
                            </div>
                          </div>
                          <span className={`self-start text-xs font-medium ${accent.text} ${accent.bg} px-2.5 py-1 rounded-full`}>
                            {specialist.specialization}
                          </span>
                          <div className="mt-2 flex items-center gap-4 text-xs font-medium text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <Users className="h-3.5 w-3.5" />
                              {specialist.activeStudents} учнів
                            </span>
                            <span className="text-slate-300">|</span>
                            <span className="flex items-center gap-1.5">
                              <BookOpen className="h-3.5 w-3.5" />
                              {specialist.lessonsCompleted} занять
                            </span>
                            <span className="text-slate-300">|</span>
                            <div className="flex gap-1.5">
                              {specialist.subjects.map((s) => (
                                <span key={s} className="rounded-full bg-[#fafaf8] px-2 py-0.5 text-xs text-slate-600">{s}</span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-slate-600 mb-3 leading-relaxed line-clamp-3 md:line-clamp-none">
                          {specialist.bio}
                        </p>

                        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" />
                            {specialist.location}
                          </span>
                          {specialist.online && (
                            <span className="flex items-center gap-1.5">
                              <Video className="h-3.5 w-3.5" />
                              Онлайн
                            </span>
                          )}
                          {specialist.offline && (
                            <span className="flex items-center gap-1.5">
                              <Home className="h-3.5 w-3.5" />
                              Офлайн
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price sidebar */}
                      <div className="flex flex-row md:flex-col items-center justify-between gap-3 border-t md:border-t-0 md:border-l border-slate-100 bg-[#fafaf8] p-5 md:w-48">
                        <div className="text-left md:text-center">
                          <div className="text-xs font-medium text-slate-500 mb-1">Вартість заняття</div>
                          <div className="text-2xl font-bold text-[#43a047]">
                            {specialist.priceOnline} ₴
                            <span className="text-sm font-medium text-slate-400 ml-1">/ год</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 md:w-full md:flex-col">
                          <button
                            onClick={() => toggleFavorite(specialist.id)}
                            className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer ${
                              favorites.includes(specialist.id)
                                ? "text-red-500 bg-red-50 border-red-200"
                                : "text-slate-400 bg-white border-slate-200 hover:text-red-500 hover:border-red-200"
                            }`}
                          >
                            <Heart className={`h-4 w-4 ${favorites.includes(specialist.id) ? "fill-current" : ""}`} />
                          </button>
                          <Link href={`/specialists/${specialist.id}`} className="shrink-0 md:w-full">
                            <Button className="w-full rounded-xl bg-[#43a047] text-white font-semibold hover:bg-[#388e3c] cursor-pointer">
                              Переглянути
                            </Button>
                          </Link>
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
