"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BookOpen, Search, Star, Video, Home, Award, Users, Heart, ArrowLeft, MessageCircle, ChevronDown, TrendingUp, Play, Calendar, User } from "lucide-react"

export default function SpecialistsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")
  const [formatFilter, setFormatFilter] = useState("all")
  const [sortBy, setSortBy] = useState("top")
  const [favorites, setFavorites] = useState<number[]>([])
  const [expandedBio, setExpandedBio] = useState<number | null>(null)
  const [hoveredSpecialist, setHoveredSpecialist] = useState<number | null>(null)

  const specialists = [
    {
      id: 1,
      name: "Олена Іваненко",
      specialization: "Репетитор",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
      subjects: ["Англійська мова", "Німецька мова"],
      languages: ["Українська (рідна)", "Англійська (C2)"],
      rating: 4.9,
      reviews: 48,
      activeStudents: 49,
      lessonsCompleted: 4975,
      experience: 5,
      priceOnline: 400,
      priceOffline: 500,
      location: "Київ",
      verified: true,
      superTutor: true,
      online: true,
      offline: true,
      bio: "Маю 5 років досвіду викладання англійської мови. Працюю з учнями різного віку та рівня підготовки. Готую до іспитів ЗНО/НМТ, допомагаю прокачати розмовну мову та адаптую програму під індивідуальні цілі кожного учня.",
      popular: true,
      bookedRecently: 12,
      videoTags: ["Англійська", "Розмовна", "ЗНО", "Репетитор", "IELTS", "B2+"],
    },
    {
      id: 3,
      name: "Марія Коваленко",
      specialization: "Психолог",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      subjects: ["Індивідуальна терапія", "Сімейна терапія"],
      languages: ["Українська (рідна)", "Англійська (B2)"],
      rating: 5.0,
      reviews: 62,
      activeStudents: 38,
      lessonsCompleted: 6100,
      experience: 10,
      priceOnline: 600,
      priceOffline: 700,
      location: "Київ",
      verified: true,
      superTutor: true,
      online: true,
      offline: false,
      bio: "Клінічний психолог з 10-річним досвідом. Спеціалізуюсь на роботі з тривожністю, депресією та вигоранням. Використовую когнітивно-поведінкову терапію та mindfulness-підходи для досягнення стійких результатів.",
      popular: false,
      bookedRecently: 9,
      videoTags: ["Психолог", "КПТ", "Терапія", "Тривожність", "Mindfulness"],
    },
    {
      id: 4,
      name: "Анна Мельник",
      specialization: "Логопед",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      subjects: ["Постановка звуків", "Корекція мовлення"],
      languages: ["Українська (рідна)"],
      rating: 4.9,
      reviews: 41,
      activeStudents: 32,
      lessonsCompleted: 4300,
      experience: 8,
      priceOnline: 500,
      priceOffline: 600,
      location: "Київ",
      verified: true,
      superTutor: false,
      online: true,
      offline: true,
      bio: "Логопед-дефектолог з 8-річним стажем. Працюю з дітьми від 3 років та дорослими. Спеціалізуюсь на постановці звуків, корекції заїкання та розвитку мовлення.",
      popular: true,
      bookedRecently: 7,
      videoTags: ["Логопед", "Звуки", "Діти", "Мовлення", "Корекція"],
    },
  ]

  const getAccentColor = (type: string) => {
    if (type === "Репетитор") return { bg: "bg-[#e0f7fa]", text: "text-[#0891b2]" }
    if (type === "Психолог") return { bg: "bg-[#eef2ff]", text: "text-[#6366f1]" }
    return { bg: "bg-[#fef3c7]", text: "text-[#f59e0b]" }
  }

  const getVideoColor = (type: string) => {
    if (type === "Репетитор") return "bg-[#b2ebf2]"
    if (type === "Психолог") return "bg-[#c7d2fe]"
    return "bg-[#fde68a]"
  }

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id])
  }

  const hoveredData = specialists.find(s => s.id === hoveredSpecialist) || specialists[0]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="relative h-9 w-9 overflow-hidden rounded-lg">
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
                <Button variant="outline" className="h-9 rounded-md px-5 text-sm font-medium border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer">
                  Увійти
                </Button>
              </Link>
              <Link href="/register">
                <Button className="h-9 rounded-md px-5 text-sm font-medium text-white hover:opacity-90 cursor-pointer" style={{ backgroundColor: '#0891b2', border: '2px solid black' }}>
                  Реєстрація
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Top Filter Bar */}
      <div className="sticky top-14 z-40 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Primary filters row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-slate-200 py-2.5">
            <div className="px-4 first:pl-0">
              <div className="text-xs font-medium text-slate-400 mb-0.5">Спеціальність</div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-auto border-0 p-0 shadow-none text-sm font-semibold text-slate-800 focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Всі спеціалісти</SelectItem>
                  <SelectItem value="tutor">Репетитори</SelectItem>
                  <SelectItem value="psychologist">Психологи</SelectItem>
                  <SelectItem value="speech-therapist">Логопеди</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="px-4">
              <div className="text-xs font-medium text-slate-400 mb-0.5">Ціна за заняття</div>
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="h-auto border-0 p-0 shadow-none text-sm font-semibold text-slate-800 focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{"₴100 – ₴1,000+"}</SelectItem>
                  <SelectItem value="low">{"До ₴300"}</SelectItem>
                  <SelectItem value="mid">{"₴300 – ₴600"}</SelectItem>
                  <SelectItem value="high">{"₴600+"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="px-4">
              <div className="text-xs font-medium text-slate-400 mb-0.5">Формат</div>
              <Select value={formatFilter} onValueChange={setFormatFilter}>
                <SelectTrigger className="h-auto border-0 p-0 shadow-none text-sm font-semibold text-slate-800 focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Будь-який</SelectItem>
                  <SelectItem value="online">Онлайн</SelectItem>
                  <SelectItem value="offline">Офлайн</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="px-4">
              <div className="text-xs font-medium text-slate-400 mb-0.5">Сортувати</div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-auto border-0 p-0 shadow-none text-sm font-semibold text-slate-800 focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top">Наш вибір</SelectItem>
                  <SelectItem value="rating">За рейтингом</SelectItem>
                  <SelectItem value="price-low">Ціна: низька</SelectItem>
                  <SelectItem value="price-high">Ціна: висока</SelectItem>
                  <SelectItem value="reviews">За відгуками</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Secondary chips row */}
          <div className="flex items-center gap-2 pb-2.5 overflow-x-auto">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer">
              Предмети
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer">
              Рідна мова
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer">
              Супер-спеціаліст
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div className="ml-auto flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Пошук за ім'ям..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8 w-44 rounded-md border-slate-200 pl-9 text-sm focus:border-[#0891b2] focus:ring-1 focus:ring-[#b2ebf2]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="container mx-auto px-4 lg:px-8 pt-5 pb-2">
        <h1 className="text-xl lg:text-2xl font-bold text-slate-900">
          <span className="italic">{specialists.length}</span> спеціалістів для вашого розвитку
        </h1>
      </div>

      {/* Two-column layout: Cards + Video Sidebar */}
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex gap-5">
          {/* Left column - Specialist cards */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            {specialists.map((specialist) => {
              const accent = getAccentColor(specialist.specialization)
              const isFav = favorites.includes(specialist.id)
              const isExpanded = expandedBio === specialist.id
              return (
                <div
                  key={specialist.id}
                  className="relative bg-white rounded-lg border border-slate-200 hover:border-[3px] hover:border-black hover:m-[-2px] transition-all cursor-pointer"
                  onMouseEnter={() => setHoveredSpecialist(specialist.id)}
                >
                  <div className="flex flex-col md:flex-row p-4 lg:p-5 gap-4">
                    {/* Photo */}
                    <div className="relative w-full md:w-36 lg:w-40 flex-shrink-0">
                      <div className="relative aspect-[4/5] md:aspect-square overflow-hidden rounded-lg bg-slate-100">
                        {specialist.image ? (
                          <Image src={specialist.image} alt={specialist.name} fill className="object-cover object-top" crossOrigin="anonymous" />
                        ) : (
                          <Avatar className="h-full w-full rounded-lg">
                            <AvatarFallback className="bg-slate-50 text-2xl font-bold text-slate-700">{specialist.name[0]}</AvatarFallback>
                          </Avatar>
                        )}
                        {specialist.online && (
                          <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-[#0891b2] border-2 border-white" />
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-4 mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-slate-900">{specialist.name}</h3>
                            {specialist.verified && (
                              <Award className="h-4 w-4 text-[#0891b2]" />
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            {specialist.superTutor && (
                              <span className="text-xs font-bold text-white bg-[#0891b2] px-2 py-0.5 rounded-md">
                                Супер-спеціаліст
                              </span>
                            )}
                            <span className={`text-xs font-semibold ${accent.text} ${accent.bg} px-2 py-0.5 rounded-md`}>
                              {specialist.specialization}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Subjects & Languages */}
                      <div className="flex flex-col gap-1 mb-2 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                          <span>{specialist.subjects.join(", ")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">{"🗣"}</span>
                          <span>{specialist.languages.join(", ")}</span>
                        </div>
                      </div>

                      {/* Stats row */}
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-bold text-slate-900">{specialist.rating}</span>
                          <Star className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-slate-900">{specialist.reviews}</span>
                          <span className="text-xs text-slate-400 ml-1">відгуків</span>
                        </div>
                        <div>
                          <span className="text-sm font-bold text-slate-900">{specialist.activeStudents}</span>
                          <span className="text-xs text-slate-400 ml-1">учнів</span>
                        </div>
                        <div>
                          <span className="text-sm font-bold text-slate-900">{specialist.lessonsCompleted}</span>
                          <span className="text-xs text-slate-400 ml-1">занять</span>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className={`text-sm text-slate-600 leading-relaxed mb-1 ${isExpanded ? "" : "line-clamp-2"}`}>
                        {specialist.bio}
                      </p>
                      <button
                        onClick={(e) => { e.stopPropagation(); setExpandedBio(isExpanded ? null : specialist.id) }}
                        className="text-sm font-semibold text-slate-900 underline underline-offset-2 hover:text-[#0891b2] transition-colors cursor-pointer mb-1.5"
                      >
                        {isExpanded ? "Згорнути" : "Дізнатись більше"}
                      </button>

                      {/* Popular badge */}
                      {specialist.popular && specialist.bookedRecently > 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                          <TrendingUp className="h-3.5 w-3.5 text-[#0891b2]" />
                          <span>Популярний. Записалось <span className="font-semibold">{specialist.bookedRecently}</span> разів нещодавно</span>
                        </div>
                      )}
                    </div>

                    {/* Price & Actions */}
                    <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:w-44 flex-shrink-0 border-t md:border-t-0 pt-3 md:pt-0">
                      <div className="flex items-center gap-2 md:flex-col md:items-end">
                        <span className="text-2xl font-bold text-slate-900">{"₴"}{specialist.priceOnline}</span>
                        <span className="text-xs text-slate-400">50-хв заняття</span>
                      </div>

                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(specialist.id) }}
                        className="md:absolute md:top-4 md:right-4 p-0 cursor-pointer"
                        aria-label="Додати в обране"
                      >
                        <Heart className={`h-5 w-5 transition-colors ${isFav ? "fill-red-500 text-red-500" : "text-slate-300 hover:text-slate-500"}`} />
                      </button>

                      <div className="flex flex-row md:flex-col gap-2 flex-1 md:flex-initial md:w-full mt-1">
                        <Link href={`/specialists/${specialist.id}`} className="flex-1 md:w-full">
                          <Button className="w-full h-10 rounded-md bg-[#0891b2] border-2 border-black text-white font-semibold hover:bg-[#0e7490] cursor-pointer text-sm">
                            Записатись
                          </Button>
                        </Link>
                        <Button variant="outline" className="flex-1 md:w-full h-10 rounded-md border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 cursor-pointer text-sm">
                          <MessageCircle className="h-4 w-4 mr-1.5" />
                          Написати
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right column - Video Sidebar (sticky, desktop only) */}
          <div className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
            <div className="sticky top-36">
              {hoveredData && (
                <div className="rounded-lg border border-slate-200 overflow-hidden animate-scale-in" key={hoveredData.id}>
                  {/* Video preview */}
                  <div className={`relative ${getVideoColor(hoveredData.specialization)} aspect-[4/3]`}>
                    {/* Floating tags */}
                    <div className="absolute inset-0 p-3 flex flex-wrap content-start gap-1.5">
                      {hoveredData.videoTags?.map((tag, i) => (
                        <span
                          key={tag}
                          className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                            i % 3 === 0
                              ? "bg-white/90 text-slate-800"
                              : i % 3 === 1
                              ? "bg-[#0891b2] text-white"
                              : "bg-slate-800 text-white"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Small tutor photo */}
                    <div className="absolute bottom-3 right-3 w-16 h-16 rounded-lg overflow-hidden border-2 border-white">
                      <Image
                        src={hoveredData.image}
                        alt={hoveredData.name}
                        fill
                        className="object-cover object-top"
                        crossOrigin="anonymous"
                      />
                    </div>

                    {/* Play button */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                      <div className="w-12 h-12 rounded-full bg-[#0891b2] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                        <Play className="h-5 w-5 text-white fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Action buttons inside the same border block */}
                  <div className="flex flex-col">
                    <Link href={`/specialists/${hoveredData.id}`} className="w-full border-t border-slate-200 block">
                      <button className="w-full h-11 flex items-center justify-center gap-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors">
                        <Calendar className="h-4 w-4" />
                        Переглянути розклад
                      </button>
                    </Link>
                    <Link href={`/specialists/${hoveredData.id}`} className="w-full border-t border-slate-200 block">
                      <button className="w-full h-11 flex items-center justify-center gap-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors">
                        <User className="h-4 w-4" />
                        {"Профіль " + hoveredData.name.split(" ")[0]}
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
