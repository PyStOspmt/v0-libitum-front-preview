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
  ArrowRight,
  Users,
  ChevronDown,
  Play,
  Clock,
  MessageCircle,
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

const languageTags = [
  { name: "ENGLISH", color: "bg-lime-400 text-emerald-900", rotate: "-12deg", top: "15%", left: "5%" },
  { name: "УКРАЇНСЬКА", color: "bg-emerald-500 text-white", rotate: "8deg", top: "25%", left: "15%" },
  { name: "DEUTSCH", color: "bg-amber-400 text-amber-900", rotate: "-5deg", top: "60%", left: "2%" },
  { name: "ITALIANO", color: "bg-orange-400 text-white", rotate: "15deg", top: "45%", left: "12%" },
  { name: "HINDI", color: "bg-rose-400 text-white", rotate: "-8deg", top: "35%", right: "25%" },
  { name: "SPANISH", color: "bg-violet-400 text-white", rotate: "10deg", top: "50%", right: "15%" },
  { name: "ARABIC", color: "bg-teal-400 text-white", rotate: "-6deg", top: "20%", right: "10%" },
  { name: "FRENCH", color: "bg-sky-400 text-white", rotate: "12deg", top: "65%", right: "5%" },
  { name: "JAPANESE", color: "bg-pink-400 text-white", rotate: "-10deg", top: "75%", left: "20%" },
  { name: "CHINESE", color: "bg-red-400 text-white", rotate: "5deg", top: "70%", right: "25%" },
]

export function CatalogPageClient({ subjectSlug, citySlug }: CatalogPageClientProps) {
  const [sortBy, setSortBy] = useState("rating_desc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
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
        name: "Lisa Krisa",
        subjects: ["Англійська мова"],
        rating: 4.9,
        reviews: 48,
        experience: 3,
        priceMin: 400,
        location: city?.name ?? "Онлайн",
        verified: true,
        availability: "Доступний сьогодні",
        languages: 5,
        students: 27,
        videoLength: "2:23",
      },
      {
        id: 2,
        name: "Kate Clarsoon",
        subjects: ["Математика", "Фізика"],
        rating: 4.7,
        reviews: 35,
        experience: 5,
        priceMin: 450,
        location: city?.name ?? "Онлайн",
        verified: true,
        availability: "Доступний завтра",
        languages: 7,
        students: 43,
        videoLength: "2:23",
      },
      {
        id: 3,
        name: "Kamilla Goy",
        subjects: ["Українська мова"],
        rating: 4.9,
        reviews: 67,
        experience: 3,
        priceMin: 350,
        location: city?.name ?? "Онлайн",
        verified: true,
        availability: "Доступний сьогодні",
        languages: 5,
        students: 27,
        videoLength: "1:45",
      },
    ],
    [city?.name]
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href={homeHref} className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl">
                <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
              </div>
              <span className="text-xl font-bold text-slate-900">Libitum</span>
            </Link>
            
            <nav className="hidden lg:flex items-center gap-8">
              <Link href={specialistsHref} className="text-sm font-semibold text-slate-900 border-b-2 border-slate-900 pb-0.5">
                Teachers
              </Link>
              <Link href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                About us
              </Link>
              <Link href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                Contacts
              </Link>
              <Link href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                Plans
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="outline" className="rounded-full h-10 px-6 border-slate-300 font-medium">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="rounded-full h-10 px-6 bg-emerald-600 hover:bg-emerald-700 font-medium">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative overflow-hidden mx-4 my-4 rounded-[2rem]" style={{
        background: "linear-gradient(135deg, #059669 0%, #047857 40%, #065f46 70%, #0d9488 100%)"
      }}>
        {/* Floating Language Tags */}
        <div className="absolute inset-0 overflow-hidden">
          {languageTags.map((tag, i) => (
            <div
              key={tag.name}
              className={`absolute ${tag.color} px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-float-slow`}
              style={{
                transform: `rotate(${tag.rotate})`,
                top: tag.top,
                left: tag.left,
                right: tag.right,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              {tag.name}
            </div>
          ))}
          
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/30 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-300/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
          
          {/* Decorative circles */}
          <div className="absolute top-10 right-20 w-16 h-16 bg-lime-400 rounded-full opacity-60 animate-float-slow" />
          <div className="absolute bottom-20 left-10 w-10 h-10 bg-white/30 rounded-full animate-float-slower" />
          <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-orange-400 rounded-full opacity-70 animate-float-slow" style={{ animationDelay: "1s" }} />
          
          {/* Avatar bubbles */}
          <div className="absolute top-8 left-1/4 w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 border-4 border-white shadow-xl" />
          <div className="absolute top-16 right-1/4 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 border-4 border-white shadow-xl" />
          <div className="absolute bottom-16 right-20 w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 border-4 border-white shadow-xl" />
        </div>

        <div className="relative z-10 text-center py-20 px-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 font-heading">
            Find the best
            <br />
            <span className="relative inline-block">
              online tutor
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 10C80 2 220 2 298 10" stroke="#bef264" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Connect with expert tutors for personalized learning experiences
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-slate-600">{specialists.length} teachers finded</span>
            <Badge variant="outline" className="rounded-full bg-white border-slate-200 px-3">
              {subject?.name || "English"} <span className="ml-1 text-slate-400">x</span>
            </Badge>
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px] rounded-full border-slate-200 bg-white">
              <SelectValue placeholder="By rating" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="rating_desc">By rating</SelectItem>
              <SelectItem value="price_asc">Price: Low</SelectItem>
              <SelectItem value="price_desc">Price: High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar Filters */}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-900 mb-4">Select options for quick search:</h3>
              
              {/* Language Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-700">Language</span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
                <div className="space-y-2">
                  {["English", "French", "Spanish", "Italian"].map((lang) => (
                    <label key={lang} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                      <span className="text-sm text-slate-600">{lang}</span>
                      <span className="text-xs text-slate-400 ml-auto">(24)</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Birthplace Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-700">Birthplace</span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
                <div className="space-y-2">
                  {["Ukraine", "America", "Spain", "Italia"].map((place) => (
                    <label key={place} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                      <span className="text-sm text-slate-600">{place}</span>
                      <span className="text-xs text-slate-400 ml-auto">(12)</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-700">Price, $/hour</span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-500">5$</span>
                  <div className="flex-1 h-1.5 bg-slate-200 rounded-full relative">
                    <div className="absolute left-[10%] right-[40%] h-full bg-emerald-500 rounded-full" />
                    <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow" />
                    <div className="absolute right-[40%] top-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow" />
                  </div>
                  <span className="text-sm text-slate-500">25$</span>
                </div>
              </div>

              {/* Other Filters */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                {["Gender", "Experience", "Age"].map((filter) => (
                  <div key={filter} className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-slate-700">{filter}</span>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </div>
                ))}
              </div>

              {/* Speaking Club Toggle */}
              <div className="flex items-center justify-between py-4 mt-4 border-t border-slate-100">
                <span className="text-sm font-medium text-slate-700">Speaking club</span>
                <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-700 text-lg">!</span>
                </div>
                <p className="text-sm text-amber-800">
                  We will select teachers who conduct speaking clubs with other students to make learning more interesting and useful
                </p>
              </div>
            </div>
          </aside>

          {/* Teacher Cards */}
          <div className="space-y-6">
            {specialists.map((specialist, index) => (
              <Card
                key={specialist.id}
                className="overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Photo Section */}
                    <div className="relative lg:w-80 flex-shrink-0">
                      <div className="aspect-[4/5] lg:aspect-auto lg:h-full bg-gradient-to-br from-slate-200 to-slate-100 relative overflow-hidden">
                        <Avatar className="w-full h-full rounded-none">
                          <AvatarFallback
                            className={`text-6xl font-bold text-white rounded-none ${
                              index % 3 === 0
                                ? "bg-gradient-to-br from-rose-400 to-pink-500"
                                : index % 3 === 1
                                ? "bg-gradient-to-br from-violet-400 to-purple-500"
                                : "bg-gradient-to-br from-emerald-400 to-teal-500"
                            }`}
                          >
                            {specialist.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        
                        {/* Video Play Button */}
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
                          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
                            <Play className="h-4 w-4 text-white fill-white ml-0.5" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-900">{specialist.name.split(" ")[0]}'s appeal</p>
                            <p className="text-xs text-slate-500">{specialist.videoLength} min</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-2">{specialist.name}</h3>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge className="rounded-full bg-lime-400 text-emerald-900 font-semibold px-3">
                              {specialist.rating} <Star className="h-3 w-3 ml-1 fill-emerald-900" />
                            </Badge>
                            <Badge variant="outline" className="rounded-full border-violet-200 text-violet-700 bg-violet-50">
                              {specialist.experience} y/e
                            </Badge>
                            <Badge variant="outline" className="rounded-full border-sky-200 text-sky-700 bg-sky-50">
                              {specialist.languages} languages
                            </Badge>
                            <Badge variant="outline" className="rounded-full border-emerald-200 text-emerald-700 bg-emerald-50">
                              {specialist.students} active students
                            </Badge>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-10 w-10 rounded-full ${
                            wishlist.includes(specialist.id)
                              ? "text-red-500 bg-red-50"
                              : "text-slate-400 hover:text-red-500 hover:bg-red-50"
                          }`}
                          onClick={() => toggleWishlist(specialist.id)}
                        >
                          <Heart className={wishlist.includes(specialist.id) ? "fill-current h-5 w-5" : "h-5 w-5"} />
                        </Button>
                      </div>

                      <p className="text-slate-600 mb-4 leading-relaxed">
                        Hello, I'm Teacher {specialist.name.split(" ")[0]}, and Welcome to Tutika! I enjoy watching movies, reading books, doing calligraphy, designing websites and doing photo and video editing. Teaching is my passion..
                      </p>

                      <button className="text-sm font-semibold text-slate-900 underline underline-offset-4 mb-6">
                        Learn More
                      </button>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="text-sm text-slate-500">
                          From <span className="text-2xl font-bold text-slate-900 ml-1">{specialist.priceMin} ₴</span>/hour
                        </div>
                        <Link
                          href={
                            isClient
                              ? `/client/requests/new?specialist=${specialist.id}`
                              : `/specialists/${specialist.id}`
                          }
                        >
                          <Button className="rounded-full h-11 px-6 bg-violet-500 hover:bg-violet-600 font-semibold">
                            Free lesson
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
