"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo, useState } from "react"
import {
  Search,
  Star,
  Heart,
  ArrowRight,
  Play,
  Users,
  Globe,
  ChevronDown,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { getCityBySlug, getSubjectBySlug } from "@/lib/catalog-dictionaries"
import { useAuth } from "@/lib/auth-context"
import { useTranslation } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"
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
  const [priceRange, setPriceRange] = useState([200, 800])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["en"])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  
  const { user } = useAuth()
  const { t } = useTranslation(user?.language || "UA")
  const { toast } = useToast()

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
    <div className="min-h-screen bg-white">
      {/* Header - same style as homepage */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-8 pt-4">
        <div className="container mx-auto">
          <div className="flex h-16 items-center justify-between bg-white/80 backdrop-blur-xl rounded-2xl px-6 shadow-lg shadow-slate-900/5 border border-slate-100">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-md ring-1 ring-slate-200/50 transition-transform group-hover:scale-105">
                <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900">Libitum</span>
                <p className="text-[10px] font-medium text-slate-500">Education</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 rounded-xl p-1">
              <Link href="/catalog" className="text-sm font-medium text-emerald-600 bg-white px-4 py-2 rounded-lg shadow-sm">
                {t("nav.specialists")}
              </Link>
              <Link href="/#how-it-works" className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white px-4 py-2 rounded-lg transition-all">
                {t("nav.how_it_works")}
              </Link>
              <Link href="/#reviews" className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white px-4 py-2 rounded-lg transition-all">
                {t("nav.reviews")}
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              {user ? (
                <Link href={user.role === "specialist" ? "/tutor" : user.role === "admin" ? "/admin" : "/client"}>
                  <Button className="h-10 rounded-xl bg-emerald-600 px-5 font-medium text-white hover:bg-emerald-700 transition-all">
                    Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" className="h-10 rounded-xl px-4 font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                      {t("btn.login")}
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="h-10 rounded-xl bg-emerald-600 px-5 font-semibold text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/25">
                      {t("btn.register")}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Banner - same style as homepage */}
        <section className="relative pt-28 pb-8 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="relative rounded-[2.5rem] overflow-hidden" style={{
              background: "linear-gradient(135deg, #059669 0%, #047857 40%, #065f46 70%, #0d9488 100%)"
            }}>
              {/* Decorative blobs */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/30 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-300/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
              <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-emerald-300/20 rounded-full blur-2xl" />
              
              {/* Decorative shapes */}
              <div className="absolute top-16 right-16 w-16 h-16 bg-lime-400/40 rounded-full animate-float-slow" />
              <div className="absolute bottom-20 left-12 w-10 h-10 bg-white/20 rounded-full animate-float-slower" />
              <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-orange-400/50 rounded-full animate-float-slow" style={{ animationDelay: "1s" }} />

              <div className="relative z-10 text-center py-16 lg:py-20 px-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-2 mb-6">
                  <Sparkles className="h-4 w-4 text-lime-300" />
                  <span className="text-sm font-semibold text-white">Find your perfect tutor</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 font-heading tracking-tight leading-[0.95]">
                  Find the best
                  <br />
                  <span className="relative inline-block">
                    online tutor
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                      <path d="M2 10C80 2 220 2 298 10" stroke="#bef264" strokeWidth="4" strokeLinecap="round"/>
                    </svg>
                  </span>
                </h1>
                
                <p className="text-lg lg:text-xl text-white/80 max-w-2xl mx-auto mb-8 font-light">
                  Connect with expert tutors for personalized learning experiences
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto">
                  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-2 border border-white/20">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                        <Input 
                          placeholder="Search by subject, language or name..."
                          className="h-14 pl-12 rounded-xl bg-white/10 border-0 text-white text-base placeholder:text-white/50 focus-visible:ring-white/30"
                        />
                      </div>
                      <Button className="h-14 px-8 rounded-xl bg-lime-400 text-emerald-900 hover:bg-lime-300 font-semibold shadow-lg shadow-lime-400/30">
                        Search
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap items-center justify-center gap-8 mt-8 text-white/70">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Users className="h-4 w-4 text-lime-300" />
                    </div>
                    <span className="font-medium">500+ Tutors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Globe className="h-4 w-4 text-lime-300" />
                    </div>
                    <span className="font-medium">50+ Languages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Star className="h-4 w-4 text-lime-300" />
                    </div>
                    <span className="font-medium">4.9 Rating</span>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute top-20 left-8 bg-white rounded-full px-4 py-2 shadow-xl flex items-center gap-2 animate-float-slow hidden lg:flex">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="text-[10px] text-white font-bold">EN</span>
                </div>
                <span className="text-sm font-semibold text-slate-700">English</span>
              </div>

              <div className="absolute bottom-24 right-12 bg-white rounded-full px-4 py-2 shadow-xl flex items-center gap-2 animate-float-slower hidden lg:flex">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <span className="text-[10px] text-white font-bold">UA</span>
                </div>
                <span className="text-sm font-semibold text-slate-700">Ukrainian</span>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="container mx-auto px-4 lg:px-8 py-8">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-slate-500">{specialists.length} tutors found</span>
              {selectedLanguages.map(lang => {
                const langData = languages.find(l => l.id === lang)
                return langData ? (
                  <span key={lang} className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium">
                    {langData.name}
                    <button onClick={() => toggleLanguage(lang)} className="ml-1 hover:text-emerald-900">&times;</button>
                  </span>
                ) : null
              })}
            </div>
            <select className="h-10 px-4 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
              <option>By rating</option>
              <option>Price: low to high</option>
              <option>Price: high to low</option>
              <option>By experience</option>
            </select>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-28 space-y-4">
                {/* Language Filter */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">Language</h3>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="space-y-3">
                    {languages.map(lang => (
                      <label key={lang.id} className="flex items-center gap-3 cursor-pointer group">
                        <Checkbox 
                          checked={selectedLanguages.includes(lang.id)}
                          onCheckedChange={() => toggleLanguage(lang.id)}
                          className="border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                        />
                        <span className="text-sm text-slate-600 group-hover:text-slate-900 flex-1">{lang.name}</span>
                        <span className="text-xs text-slate-400">({lang.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Country Filter */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">Birthplace</h3>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="space-y-3">
                    {countries.map(country => (
                      <label key={country.id} className="flex items-center gap-3 cursor-pointer group">
                        <Checkbox 
                          checked={selectedCountries.includes(country.id)}
                          onCheckedChange={() => setSelectedCountries(prev => 
                            prev.includes(country.id) ? prev.filter(c => c !== country.id) : [...prev, country.id]
                          )}
                          className="border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                        />
                        <span className="text-sm text-slate-600 group-hover:text-slate-900 flex-1">{country.name}</span>
                        <span className="text-xs text-slate-400">({country.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">Price, $/hour</h3>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <Input 
                      type="number" 
                      value={priceRange[0]} 
                      onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                      className="h-10 rounded-xl text-center text-sm"
                    />
                    <span className="text-slate-400">—</span>
                    <Input 
                      type="number" 
                      value={priceRange[1]} 
                      onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                      className="h-10 rounded-xl text-center text-sm"
                    />
                  </div>
                  <input 
                    type="range" 
                    min="100" 
                    max="1000" 
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                    className="w-full accent-emerald-600"
                  />
                </div>

                {/* Experience Filter */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">Experience</h3>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="space-y-3">
                    {["1-2 years", "3-5 years", "5+ years"].map(exp => (
                      <label key={exp} className="flex items-center gap-3 cursor-pointer group">
                        <Checkbox className="border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600" />
                        <span className="text-sm text-slate-600 group-hover:text-slate-900">{exp}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Info Card */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-semibold text-emerald-800">Pro tip</span>
                  </div>
                  <p className="text-sm text-emerald-700 leading-relaxed">
                    Try a free lesson with any tutor before making your decision.
                  </p>
                </div>
              </div>
            </aside>

            {/* Tutor Cards */}
            <div className="flex-1 space-y-6">
              {specialists.map((specialist) => (
                <div 
                  key={specialist.id} 
                  className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Photo Section */}
                    <div className="relative w-full md:w-72 h-64 md:h-auto flex-shrink-0 bg-gradient-to-br from-emerald-50 to-teal-50">
                      <Avatar className="w-full h-full rounded-none">
                        <AvatarImage src={specialist.avatar} className="object-cover" />
                        <AvatarFallback className="text-6xl font-bold rounded-none bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-400">
                          {specialist.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      
                      {/* Video Play Button */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
                          <Play className="h-4 w-4 text-white fill-white ml-0.5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-900">{specialist.name.split(' ')[0]}'s appeal</p>
                          <p className="text-[10px] text-slate-500">{specialist.videoLength} min</p>
                        </div>
                      </div>

                      {/* Online Status */}
                      {specialist.available && (
                        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                          Online
                        </div>
                      )}
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 p-6 lg:p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-2 font-heading">{specialist.name}</h3>
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                              {specialist.rating}
                            </span>
                            <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                              <Clock className="h-3.5 w-3.5" />
                              {specialist.experience} y/e
                            </span>
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                              <Globe className="h-3.5 w-3.5" />
                              {specialist.languages} languages
                            </span>
                            <span className="inline-flex items-center gap-1 bg-violet-50 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">
                              <Users className="h-3.5 w-3.5" />
                              {specialist.students} active students
                            </span>
                          </div>
                        </div>
                        <button 
                          onClick={() => toggleWishlist(specialist.id)}
                          className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center hover:border-rose-300 hover:bg-rose-50 transition-colors"
                        >
                          <Heart className={`h-5 w-5 ${wishlist.includes(specialist.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                        </button>
                      </div>

                      <p className="text-slate-600 mb-6 line-clamp-2 leading-relaxed">
                        {specialist.bio}
                      </p>

                      <div className="flex items-center gap-4">
                        <Link href="#" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:underline underline-offset-2">
                          Learn More
                        </Link>
                        <Button className="h-12 px-6 rounded-xl bg-lime-400 text-emerald-900 hover:bg-lime-300 font-semibold shadow-lg shadow-lime-400/20">
                          Free lesson
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <div className="ml-auto text-right">
                          <p className="text-2xl font-bold text-slate-900">${specialist.priceMin}</p>
                          <p className="text-sm text-slate-500">per hour</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Load More */}
              <div className="text-center pt-8">
                <Button variant="outline" className="h-14 px-10 rounded-2xl border-slate-200 font-semibold text-slate-700 hover:bg-slate-50">
                  Show more tutors
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
