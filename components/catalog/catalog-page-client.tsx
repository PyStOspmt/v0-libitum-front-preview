"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo, useState } from "react"
import {
  Search,
  Star,
  Heart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Users,
  Globe,
  ChevronDown,
  Filter,
  Grid3X3,
  List,
  MapPin,
  Clock,
  BookOpen,
  Check,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
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

const languages = [
  { id: "en", name: "English", count: 156 },
  { id: "de", name: "German", count: 89 },
  { id: "fr", name: "French", count: 67 },
  { id: "es", name: "Spanish", count: 54 },
  { id: "it", name: "Italian", count: 32 },
  { id: "ua", name: "Ukrainian", count: 124 },
]

const countries = [
  { id: "ua", name: "Ukraine", count: 198 },
  { id: "us", name: "USA", count: 45 },
  { id: "uk", name: "United Kingdom", count: 38 },
  { id: "de", name: "Germany", count: 29 },
]

export function CatalogPageClient({ subjectSlug, citySlug }: CatalogPageClientProps) {
  const [sortBy, setSortBy] = useState("rating")
  const [priceRange, setPriceRange] = useState([200, 800])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["en"])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(true)
  
  const { user } = useAuth()
  const { toast } = useToast()
  const isClient = user?.role === "client"
  const homeHref = isClient ? "/client" : "/"

  const [wishlist, setWishlist] = useState<number[]>([])

  const toggleWishlist = (id: number) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Sign in to save tutors to your favorites",
        variant: "destructive",
      })
      return
    }
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const toggleLanguage = (id: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    )
  }

  const toggleCountry = (id: string) => {
    setSelectedCountries((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  const subject = getSubjectBySlug(subjectSlug)
  const city = getCityBySlug(citySlug)

  const specialists = useMemo(
    () => [
      {
        id: 1,
        name: "Lisa Krisa",
        avatar: "",
        subjects: ["English"],
        rating: 4.9,
        reviews: 48,
        experience: 3,
        priceMin: 400,
        location: "Kyiv, Ukraine",
        verified: true,
        languages: 5,
        students: 27,
        videoLength: "2:23",
        bio: "Hello, I'm Teacher Lisa, and Welcome to Tulkka! I enjoy watching movies, reading books, doing calligraphy, designing websites and doing photo and video editing. Teaching is my passion.",
        available: true,
      },
      {
        id: 2,
        name: "Kate Clarsoon",
        avatar: "",
        subjects: ["Math", "Physics"],
        rating: 4.7,
        reviews: 35,
        experience: 5,
        priceMin: 450,
        location: "London, UK",
        verified: true,
        languages: 7,
        students: 43,
        videoLength: "2:23",
        bio: "Experienced tutor specializing in mathematics and physics for all levels. I make complex concepts simple and engaging.",
        available: true,
      },
      {
        id: 3,
        name: "Kamilla Goy",
        avatar: "",
        subjects: ["Ukrainian"],
        rating: 4.9,
        reviews: 67,
        experience: 3,
        priceMin: 350,
        location: "Lviv, Ukraine",
        verified: true,
        languages: 5,
        students: 27,
        videoLength: "1:45",
        bio: "Native Ukrainian speaker with passion for teaching language and literature. Fun and interactive lessons guaranteed!",
        available: false,
      },
      {
        id: 4,
        name: "Alex Morgan",
        avatar: "",
        subjects: ["German"],
        rating: 4.8,
        reviews: 52,
        experience: 4,
        priceMin: 500,
        location: "Berlin, Germany",
        verified: true,
        languages: 4,
        students: 31,
        videoLength: "2:05",
        bio: "German language expert from Berlin. Business German, exam prep, and conversational practice - I cover it all!",
        available: true,
      },
    ],
    []
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href={homeHref} className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-sm">
                <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
              </div>
              <span className="text-xl font-bold text-slate-900">Libitum</span>
            </Link>
            
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="#" className="text-sm font-semibold text-emerald-600 border-b-2 border-emerald-600 pb-0.5">
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
              {user ? (
                <Link href={user.role === "specialist" ? "/tutor" : user.role === "admin" ? "/admin" : "/client"}>
                  <Button className="rounded-full h-10 px-6 bg-emerald-600 hover:bg-emerald-700 font-medium">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="rounded-full h-10 px-6 border-slate-200 font-medium">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="rounded-full h-10 px-6 bg-emerald-600 hover:bg-emerald-700 font-medium">
                      Create Account
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative overflow-hidden mx-4 lg:mx-8 my-6 rounded-[2rem]" style={{
        background: "linear-gradient(135deg, #059669 0%, #047857 40%, #065f46 70%, #0d9488 100%)"
      }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-lime-400/30 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-300/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-20 right-20 w-20 h-20 bg-lime-400 rounded-full opacity-50 animate-float-slow" />
          <div className="absolute bottom-16 left-16 w-12 h-12 bg-white/20 rounded-full animate-float-slower" />
        </div>

        <div className="relative z-10 text-center py-16 lg:py-20 px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[0.95]">
            Find the best
            <br />
            <span className="relative inline-block">
              online tutor
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 10C80 2 220 2 298 10" stroke="#bef264" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-white/80 max-w-xl mx-auto">
            Connect with expert tutors for personalized learning
          </p>
        </div>
      </section>

      {/* Filters Bar */}
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600">{specialists.length} teachers found</span>
            <Badge variant="secondary" className="rounded-full bg-emerald-100 text-emerald-700 px-3">
              English
              <button className="ml-2 hover:text-emerald-900">&times;</button>
            </Badge>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">Select options for quick search:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[130px] rounded-full border-slate-200 bg-white h-9 text-sm">
                <SelectValue placeholder="By rating" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="rating">By rating</SelectItem>
                <SelectItem value="price_low">Price: Low</SelectItem>
                <SelectItem value="price_high">Price: High</SelectItem>
                <SelectItem value="experience">Experience</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 pb-16">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Language Filter */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200">
                <button className="flex items-center justify-between w-full text-left">
                  <span className="font-semibold text-slate-900">Language</span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>
                <div className="mt-4 space-y-3">
                  {languages.map((lang) => (
                    <label key={lang.id} className="flex items-center gap-3 cursor-pointer group">
                      <Checkbox
                        checked={selectedLanguages.includes(lang.id)}
                        onCheckedChange={() => toggleLanguage(lang.id)}
                        className="border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                      />
                      <span className="text-sm text-slate-600 group-hover:text-slate-900 flex-1">
                        {lang.name}
                      </span>
                      <span className="text-xs text-slate-400">({lang.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Country Filter */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200">
                <button className="flex items-center justify-between w-full text-left">
                  <span className="font-semibold text-slate-900">Birthplace</span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>
                <div className="mt-4 space-y-3">
                  {countries.map((country) => (
                    <label key={country.id} className="flex items-center gap-3 cursor-pointer group">
                      <Checkbox
                        checked={selectedCountries.includes(country.id)}
                        onCheckedChange={() => toggleCountry(country.id)}
                        className="border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                      />
                      <span className="text-sm text-slate-600 group-hover:text-slate-900 flex-1">
                        {country.name}
                      </span>
                      <span className="text-xs text-slate-400">({country.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200">
                <button className="flex items-center justify-between w-full text-left">
                  <span className="font-semibold text-slate-900">Price, $/hour</span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-slate-900">${priceRange[0]}</span>
                    <span className="text-sm text-slate-400">-</span>
                    <span className="text-sm font-medium text-slate-900">${priceRange[1]}</span>
                  </div>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={100}
                    max={1000}
                    step={50}
                    className="[&_[role=slider]]:bg-emerald-600 [&_[role=slider]]:border-emerald-600"
                  />
                </div>
              </div>

              {/* Experience Filter */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200">
                <button className="flex items-center justify-between w-full text-left">
                  <span className="font-semibold text-slate-900">Experience</span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>
                <div className="mt-4 space-y-3">
                  {["0-1 years", "1-3 years", "3-5 years", "5+ years"].map((exp) => (
                    <label key={exp} className="flex items-center gap-3 cursor-pointer group">
                      <Checkbox className="border-slate-300 data-[state=checked]:bg-emerald-600" />
                      <span className="text-sm text-slate-600 group-hover:text-slate-900">{exp}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                <p className="text-sm text-emerald-800 leading-relaxed">
                  We will select teachers who conduct speaking clubs with other students to make learning more interesting and playful.
                </p>
              </div>
            </div>
          </aside>

          {/* Tutors List */}
          <div className="flex-1 space-y-4">
            {specialists.map((specialist) => (
              <div
                key={specialist.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Photo Section */}
                  <div className="relative lg:w-72 aspect-[4/3] lg:aspect-auto bg-gradient-to-br from-violet-100 to-violet-200 flex-shrink-0">
                    <Avatar className="w-full h-full rounded-none">
                      <AvatarImage src={specialist.avatar} />
                      <AvatarFallback className="text-6xl font-bold rounded-none bg-gradient-to-br from-violet-100 to-violet-200 text-violet-400">
                        {specialist.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    
                    {/* Video Button */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
                        <Play className="h-3.5 w-3.5 text-white fill-white ml-0.5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900">{specialist.name.split(" ")[0]}'s appeal</p>
                        <p className="text-[10px] text-slate-500">{specialist.videoLength} min</p>
                      </div>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{specialist.name}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className="rounded-full bg-amber-100 text-amber-700 font-semibold text-xs px-2.5">
                            <Star className="h-3 w-3 mr-1 fill-amber-500 text-amber-500" />
                            {specialist.rating}
                          </Badge>
                          <Badge variant="outline" className="rounded-full text-xs border-slate-200 text-slate-600">
                            {specialist.experience} y/e
                          </Badge>
                          <Badge variant="outline" className="rounded-full text-xs border-emerald-200 text-emerald-700 bg-emerald-50">
                            {specialist.languages} languages
                          </Badge>
                          <Badge variant="outline" className="rounded-full text-xs border-violet-200 text-violet-700 bg-violet-50">
                            {specialist.students} active students
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-9 w-9 rounded-full ${
                          wishlist.includes(specialist.id)
                            ? "text-red-500 bg-red-50"
                            : "text-slate-400 hover:text-red-500 hover:bg-red-50"
                        }`}
                        onClick={() => toggleWishlist(specialist.id)}
                      >
                        <Heart className={wishlist.includes(specialist.id) ? "fill-current h-5 w-5" : "h-5 w-5"} />
                      </Button>
                    </div>

                    <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                      {specialist.bio}
                    </p>

                    <div className="flex items-center justify-between">
                      <Link href="#" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:underline">
                        Learn More
                      </Link>
                      <Button className="rounded-full h-10 px-6 bg-emerald-600 hover:bg-emerald-700 text-sm font-semibold">
                        Free lesson
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Calendar Section (expandable) */}
                <div className="border-t border-slate-100 p-6 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-slate-900">Select best slot for you</h4>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium text-slate-700">February 2026</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Mini Calendar */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                      <div key={day} className="text-center text-[10px] font-semibold text-slate-400 py-1">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 14 }, (_, i) => i + 1).map((day) => (
                      <button
                        key={day}
                        className={`text-center py-2 text-sm rounded-lg transition-colors ${
                          day === 5
                            ? "bg-emerald-600 text-white font-semibold"
                            : day === 8 || day === 12
                            ? "bg-emerald-100 text-emerald-700 font-medium"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded bg-emerald-600" />
                        <span>Selected</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded bg-emerald-100" />
                        <span>Available</span>
                      </div>
                    </div>
                    <Button size="sm" className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-xs px-4">
                      Book now
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* Load More */}
            <div className="text-center pt-8">
              <Button variant="outline" className="rounded-full px-8 border-slate-200 text-slate-700 hover:bg-slate-50">
                Show more tutors
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
