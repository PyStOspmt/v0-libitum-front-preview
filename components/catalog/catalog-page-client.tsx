"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo, useState } from "react"
import {
  BookOpen,
  MapPin,
  Search,
  Star,
  Award,
  Heart,
  Filter,
  Grid3X3,
  LayoutList,
  Sparkles,
  ArrowRight,
  Users,
  ChevronDown,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getCityBySlug, getSubjectBySlug } from "@/lib/catalog-dictionaries"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"

type CatalogPageClientProps = {
  subjectSlug: string
  citySlug: string
}

export function CatalogPageClient({ subjectSlug, citySlug }: CatalogPageClientProps) {
  const [sortBy, setSortBy] = useState("rating_desc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { user } = useAuth()
  const { toast } = useToast()
  const isClient = user?.role === "client"
  const homeHref = isClient ? "/client" : "/"
  const specialistsHref = isClient ? "/client/requests/new" : "/specialists"

  const [wishlist, setWishlist] = useState<number[]>([])

  const toggleWishlist = (id: number) => {
    if (!user) {
      toast({
        title: "Потрібна авторизація",
        description: "Увійдіть в акаунт, щоб додавати спеціалістів до обраного",
        variant: "destructive",
      })
      return
    }

    setWishlist((prev) => {
      const isAdded = prev.includes(id)
      const newWishlist = isAdded ? prev.filter((item) => item !== id) : [...prev, id]

      toast({
        title: isAdded ? "Видалено з обраного" : "Додано в обране",
        description: isAdded
          ? "Спеціаліста видалено з вашого списку"
          : "Спеціаліст тепер у вашому списку обраних",
      })

      return newWishlist
    })
  }

  const subject = getSubjectBySlug(subjectSlug)
  const city = getCityBySlug(citySlug)

  const specialists = useMemo(
    () => [
      {
        id: 1,
        name: "Олена Іваненко",
        subjects: ["Англійська мова"],
        rating: 4.9,
        reviews: 48,
        experience: 5,
        priceMin: 400,
        location: city?.name ?? "Онлайн",
        verified: true,
        availability: "Доступний сьогодні",
      },
      {
        id: 2,
        name: "Петро Коваль",
        subjects: ["Математика"],
        rating: 4.8,
        reviews: 35,
        experience: 7,
        priceMin: 450,
        location: city?.name ?? "Онлайн",
        verified: true,
        availability: "Доступний завтра",
      },
      {
        id: 3,
        name: "Марія Шевченко",
        subjects: ["Фізика", "Математика"],
        rating: 5.0,
        reviews: 67,
        experience: 10,
        priceMin: 500,
        location: city?.name ?? "Онлайн",
        verified: true,
        availability: "Доступний сьогодні",
      },
      {
        id: 4,
        name: "Анна Бондаренко",
        subjects: ["Українська мова"],
        rating: 4.7,
        reviews: 29,
        experience: 4,
        priceMin: 350,
        location: city?.name ?? "Онлайн",
        verified: false,
        availability: "Доступний через 2 дні",
      },
    ],
    [city?.name]
  )

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50/50" />
        <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-emerald-100/50 via-teal-50/30 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-60 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-orange-100/40 via-amber-50/20 to-transparent blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-slate-200/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href={homeHref} className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-2xl ring-1 ring-slate-200/50 shadow-lg shadow-emerald-100/50">
                <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
              </div>
              <div>
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent text-2xl font-bold tracking-tight">
                  Libitum
                </span>
                <p className="text-xs text-slate-500 font-medium">Education</p>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="rounded-2xl font-medium">
                  Увійти
                </Button>
              </Link>
              <Link href="/register">
                <Button className="rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-200/50 hover:bg-emerald-700 h-11 px-6 font-semibold">
                  Реєстрація
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link href={homeHref} className="hover:text-slate-900 transition-colors">
            Головна
          </Link>
          <ChevronDown className="h-4 w-4 -rotate-90" />
          <Link href={specialistsHref} className="hover:text-slate-900 transition-colors">
            Спеціалісти
          </Link>
          <ChevronDown className="h-4 w-4 -rotate-90" />
          <span className="text-slate-900 font-medium">{subject?.name}</span>
          <ChevronDown className="h-4 w-4 -rotate-90" />
          <span className="text-slate-900 font-medium">{city?.name}</span>
        </div>

        {/* Page Header */}
        <div className="mb-10 rounded-3xl glass-card p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                <Sparkles className="h-4 w-4" />
                Каталог спеціалістів
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3 font-heading">
                {subject?.name} <span className="text-slate-400">у</span> {city?.name}
              </h1>
              <p className="text-lg text-slate-500">
                Знайдено{" "}
                <span className="font-semibold text-emerald-600">{specialists.length}</span>{" "}
                перевірених спеціалістів
              </p>
            </div>

            <div className="flex gap-4">
              <div className="rounded-2xl bg-emerald-500/10 px-5 py-3 text-center">
                <p className="text-2xl font-bold text-emerald-600">{specialists.length}</p>
                <p className="text-xs font-medium text-slate-500">Спеціалістів</p>
              </div>
              <div className="rounded-2xl bg-orange-500/10 px-5 py-3 text-center">
                <p className="text-2xl font-bold text-orange-600">4.8</p>
                <p className="text-xs font-medium text-slate-500">Сер. рейтинг</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="mb-8 rounded-3xl glass-card p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Пошук за ім'ям спеціаліста..."
                className="h-12 pl-12 rounded-2xl border-slate-200/60 bg-white/80 text-base focus-visible:ring-2 focus-visible:ring-emerald-500/20"
              />
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="h-12 rounded-2xl border-slate-200/60 bg-white/80 hover:bg-white gap-2"
              >
                <Filter className="h-4 w-4" />
                Фільтри
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px] h-12 rounded-2xl border-slate-200/60 bg-white/80">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="rating_desc">За рейтингом</SelectItem>
                  <SelectItem value="price_asc">За ціною (дешевші)</SelectItem>
                  <SelectItem value="price_desc">За ціною (дорожчі)</SelectItem>
                  <SelectItem value="reviews_desc">За відгуками</SelectItem>
                </SelectContent>
              </Select>

              <div className="hidden md:flex items-center rounded-2xl border border-slate-200/60 bg-white/80 p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className={`h-10 w-10 rounded-xl ${viewMode === "grid" ? "bg-emerald-600 text-white" : ""}`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className={`h-10 w-10 rounded-xl ${viewMode === "list" ? "bg-emerald-600 text-white" : ""}`}
                  onClick={() => setViewMode("list")}
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Specialists Grid */}
        <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
          {specialists.map((specialist, index) => (
            <Card
              key={specialist.id}
              className="group overflow-hidden rounded-3xl glass-card border-0 hover-lift transition-all animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <CardContent className="p-0">
                {/* Card Header */}
                <div
                  className={`relative h-28 ${
                    index % 2 === 0
                      ? "bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-teal-500/10"
                      : "bg-gradient-to-br from-orange-500/10 via-orange-400/5 to-amber-500/10"
                  }`}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-4 right-4 h-10 w-10 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm transition-all hover:scale-110 ${
                      wishlist.includes(specialist.id)
                        ? "text-red-500"
                        : "text-slate-400 hover:text-red-500"
                    }`}
                    onClick={() => toggleWishlist(specialist.id)}
                  >
                    <Heart className={wishlist.includes(specialist.id) ? "fill-current h-5 w-5" : "h-5 w-5"} />
                  </Button>

                  {specialist.verified && (
                    <div className="absolute top-4 left-4">
                      <Badge className="rounded-xl bg-emerald-600 text-white border-0 gap-1.5 px-3 py-1 shadow-lg shadow-emerald-200/50">
                        <Award className="h-3.5 w-3.5" />
                        Перевірений
                      </Badge>
                    </div>
                  )}

                  <div className="absolute -bottom-10 left-6">
                    <Avatar className="h-20 w-20 ring-4 ring-white shadow-xl">
                      <AvatarFallback
                        className={`text-2xl font-bold text-white ${
                          index % 2 === 0
                            ? "bg-gradient-to-br from-emerald-500 to-teal-500"
                            : "bg-gradient-to-br from-orange-500 to-amber-500"
                        }`}
                      >
                        {specialist.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                {/* Card Body */}
                <div className="pt-14 px-6 pb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{specialist.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-amber-50 rounded-lg px-2 py-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-amber-700">{specialist.rating}</span>
                        </div>
                        <span className="text-sm text-slate-400">({specialist.reviews} відгуків)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {specialist.subjects.map((subj) => (
                      <Badge
                        key={subj}
                        variant="outline"
                        className={`rounded-xl border-0 font-medium ${
                          index % 2 === 0 ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700"
                        }`}
                      >
                        {subj}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-slate-600" />
                      </div>
                      <span>{specialist.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-slate-600" />
                      </div>
                      <span>{specialist.experience} років</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-5 text-sm">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        specialist.availability.includes("сьогодні") ? "bg-emerald-500" : "bg-orange-500"
                      }`}
                    />
                    <span className="text-slate-500">{specialist.availability}</span>
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-0.5">
                        Від
                      </p>
                      <p className="text-2xl font-bold text-slate-900">
                        {specialist.priceMin}{" "}
                        <span className="text-base font-medium text-slate-400">₴/год</span>
                      </p>
                    </div>
                    <Link
                      href={
                        isClient
                          ? `/client/requests/new?specialist=${specialist.id}`
                          : `/specialists/${specialist.id}`
                      }
                    >
                      <Button
                        className={`rounded-2xl h-12 px-6 font-semibold shadow-lg transition-all hover:scale-[1.02] ${
                          index % 2 === 0
                            ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200/50"
                            : "bg-orange-600 hover:bg-orange-700 shadow-orange-200/50"
                        }`}
                      >
                        {isClient ? "Запит" : "Детальніше"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            className="h-14 rounded-3xl border-slate-200/60 bg-white/80 px-10 text-base font-semibold hover:bg-white hover:shadow-lg transition-all"
          >
            Завантажити більше
            <ChevronDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
