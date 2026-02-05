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
  Check,
  Filter,
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
        bio: "Hello, I'm Teacher Lisa, and Welcome to Tulkka! I enjoy watching movies, reading books, doing calligraphy, designing websites and doing photo and video editing.",
        available: true,
        color: "bg-rose-100",
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
        color: "bg-amber-100",
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
        color: "bg-emerald-100",
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
        color: "bg-sky-100",
      },
    ],
    []
  )

  return (
    <div className="min-h-screen bg-emerald-50/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-9 w-9 overflow-hidden rounded-xl">
                <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
              </div>
              <span className="text-lg font-bold text-slate-900">LIBITUM</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/catalog" className="text-sm font-medium text-slate-900 border-b-2 border-emerald-600 pb-0.5">
                Teachers
              </Link>
              <Link href="/#about" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                About us
              </Link>
              <Link href="/#contact" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Contacts
              </Link>
              <Link href="/#plans" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Plans
              </Link>
              <LanguageSwitcher />
            </nav>

            <div className="flex items-center gap-3">
              {user ? (
                <Link href={user.role === "specialist" ? "/tutor" : user.role === "admin" ? "/admin" : "/client"}>
                  <Button className="h-9 rounded-full bg-emerald-600 px-5 text-sm font-medium text-white hover:bg-emerald-700">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="h-9 rounded-full px-5 text-sm font-medium border-slate-300">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="h-9 rounded-full bg-emerald-600 px-5 text-sm font-medium text-white hover:bg-emerald-700">
                      Create Account
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Banner */}
        <section className="relative py-8 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="relative bg-emerald-600 rounded-[2rem] p-8 lg:p-12 overflow-hidden">
              {/* Decorative shapes - flat, no blur */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500 rounded-full -translate-x-1/4 translate-y-1/4" />
              
              {/* Organic blob */}
              <svg className="absolute right-10 bottom-0 w-72 h-72 text-emerald-500/50" viewBox="0 0 200 200">
                <path fill="currentColor" d="M45.3,-51.2C58.3,-40.9,68.1,-25.5,71.2,-8.5C74.3,8.5,70.6,27.1,60.1,40.3C49.6,53.5,32.3,61.3,14.1,66.1C-4.1,70.9,-23.2,72.7,-39.7,66.1C-56.2,59.5,-70.1,44.5,-75.4,27C-80.7,9.5,-77.4,-10.5,-68.4,-26.3C-59.4,-42.1,-44.7,-53.7,-29.5,-63.2C-14.3,-72.7,1.4,-80.1,15.7,-77.3C30,-74.5,32.3,-61.5,45.3,-51.2Z" transform="translate(100 100)" />
              </svg>

              <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-heading leading-[1.1]">
                  Find the best
                  <br />
                  online tutor
                </h1>
                
                <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                  Connect with expert tutors for personalized learning experiences
                </p>

                {/* Search Bar */}
                <div className="bg-white rounded-2xl p-2 max-w-2xl mx-auto">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input 
                        placeholder="Search by subject, language or name..."
                        className="h-12 pl-12 rounded-xl border-0 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-500"
                      />
                    </div>
                    <Button className="h-12 px-8 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-semibold">
                      Search
                    </Button>
                  </div>
                </div>

                {/* Floating language badges */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                  {["English", "German", "Ukrainian", "Spanish", "French"].map((lang, i) => (
                    <span 
                      key={lang}
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        i === 0 ? "bg-lime-400 text-emerald-900" : "bg-white/20 text-white"
                      }`}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="container mx-auto px-4 lg:px-8 py-8">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-slate-600 font-medium">{specialists.length} teachers found</span>
              {selectedLanguages.map(lang => {
                const langData = languages.find(l => l.id === lang)
                return langData ? (
                  <span key={lang} className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium">
                    {langData.name}
                    <button onClick={() => toggleLanguage(lang)} className="ml-1 hover:text-emerald-900">&times;</button>
                  </span>
                ) : null
              })}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">Select options for quick search:</span>
              <select className="h-10 px-4 rounded-full border border-slate-200 bg-white text-sm font-medium text-slate-700">
                <option>By rating</option>
                <option>Price: low to high</option>
                <option>Price: high to low</option>
              </select>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24 space-y-4">
                {/* Language Filter */}
                <div className="bg-white rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900">Language</h3>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="space-y-3">
                    {languages.map(lang => (
                      <label key={lang.id} className="flex items-center gap-3 cursor-pointer group">
                        <Checkbox 
                          checked={selectedLanguages.includes(lang.id)}
                          onCheckedChange={() => toggleLanguage(lang.id)}
                          className="border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 rounded"
                        />
                        <span className="text-sm text-slate-600 group-hover:text-slate-900 flex-1">{lang.name}</span>
                        <span className="text-xs text-slate-400">({lang.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Country Filter */}
                <div className="bg-white rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900">Birthplace</h3>
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
                          className="border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 rounded"
                        />
                        <span className="text-sm text-slate-600 group-hover:text-slate-900 flex-1">{country.name}</span>
                        <span className="text-xs text-slate-400">({country.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="bg-white rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900">Price, $/hour</h3>
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

                {/* Apply Button */}
                <Button className="w-full h-12 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 font-semibold">
                  Apply
                </Button>
              </div>
            </aside>

            {/* Teachers List */}
            <div className="flex-1 space-y-4">
              {specialists.map((specialist) => (
                <div 
                  key={specialist.id} 
                  className="bg-white rounded-2xl p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-5">
                    {/* Photo */}
                    <div className="relative flex-shrink-0">
                      <div className={`w-36 h-44 ${specialist.color} rounded-2xl overflow-hidden relative`}>
                        {/* Video button */}
                        <div className="absolute bottom-3 left-3 bg-emerald-600 text-white rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs font-medium">
                          <Play className="h-3 w-3 fill-white" />
                          {specialist.name.split(" ")[0]}'s appeal
                        </div>
                        <div className="absolute bottom-3 right-3 text-xs text-slate-600 bg-white/80 rounded-full px-2 py-0.5">
                          {specialist.videoLength}
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold text-slate-900">{specialist.name}</h3>
                            <button 
                              onClick={() => toggleWishlist(specialist.id)}
                              className="text-slate-300 hover:text-rose-500 transition-colors"
                            >
                              <Heart className={`h-5 w-5 ${wishlist.includes(specialist.id) ? "fill-rose-500 text-rose-500" : ""}`} />
                            </button>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-medium">
                              <Star className="h-3 w-3 fill-amber-500" />
                              {specialist.rating}
                            </span>
                            <span className="text-xs text-slate-500">33 A/s</span>
                            <span className="text-xs text-slate-500">{specialist.experience} y/e</span>
                            <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium">
                              {specialist.languages} languages
                            </span>
                            {specialist.available && (
                              <span className="bg-emerald-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                                Online
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                        {specialist.bio}
                      </p>

                      <div className="flex items-center gap-3">
                        <Link href={`/specialists/${specialist.id}`}>
                          <Button variant="outline" className="h-10 rounded-full px-6 text-sm font-medium border-slate-300 hover:bg-slate-50">
                            Read more
                          </Button>
                        </Link>
                        <Button className="h-10 rounded-full px-6 text-sm font-medium bg-lime-400 text-emerald-900 hover:bg-lime-300">
                          Free lesson
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Load More */}
              <div className="text-center pt-6">
                <Button variant="outline" className="h-11 rounded-full px-8 font-semibold border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                  Show more teachers
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-emerald-600 text-white py-12 px-4 lg:px-8 mt-16 rounded-t-[2rem]">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-white">
                    <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
                  </div>
                  <span className="font-bold">LIBITUM</span>
                </div>
                <p className="text-2xl font-bold mb-6">smart.english@com</p>
                <Button variant="outline" className="rounded-full border-white/30 text-white hover:bg-white/10">
                  WRITE IN TELEGRAM
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div>
                <p className="font-semibold mb-2">Learn with inspiration!</p>
                <p className="text-white/80 text-sm">Follow us for tips and motivation.</p>
              </div>

              <div className="flex flex-wrap gap-3">
                {["FACEBOOK", "INSTAGRAM", "YOUTUBE", "LINKEDIN", "TELEGRAM"].map(social => (
                  <span key={social} className="px-4 py-2 rounded-full border border-white/30 text-sm font-medium hover:bg-white/10 cursor-pointer transition-colors">
                    {social}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-12 pt-8 border-t border-white/20">
              <LanguageSwitcher />
              <nav className="flex gap-6 text-sm">
                <Link href="/catalog" className="hover:underline">Teachers</Link>
                <Link href="/#about" className="hover:underline">About us</Link>
                <Link href="/#contact" className="hover:underline">Contact</Link>
                <Link href="/#plans" className="hover:underline">Plans</Link>
              </nav>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
