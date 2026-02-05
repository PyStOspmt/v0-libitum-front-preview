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
  Clock,
  Users,
  Award,
  ChevronDown,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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

// Category cards data
const categories = [
  {
    id: 1,
    title: "For Kids",
    subtitle: "4-12 Years",
    tag: "Languages",
    description: "Fun and engaging lessons with games, songs, and interactive activities.",
    bgColor: "bg-lime-400",
    textColor: "text-emerald-900",
    accentColor: "bg-emerald-900",
  },
  {
    id: 2,
    title: "For Teens",
    subtitle: "13-17 Years",
    tag: "School",
    description: "Exam preparation, homework help, and skill development.",
    bgColor: "bg-white",
    textColor: "text-slate-900",
    accentColor: "bg-slate-200",
  },
  {
    id: 3,
    title: "For Adults",
    subtitle: "18+ Years",
    tag: "Business",
    description: "Professional skills, career growth, and personal development.",
    bgColor: "bg-teal-400",
    textColor: "text-teal-900",
    accentColor: "bg-teal-900",
  },
  {
    id: 4,
    title: "For All",
    subtitle: "Any age",
    tag: "Hobby",
    description: "Music, art, coding, and other creative pursuits.",
    bgColor: "bg-violet-400",
    textColor: "text-white",
    accentColor: "bg-white",
  },
]

export function CatalogPageClient({ subjectSlug, citySlug }: CatalogPageClientProps) {
  const [sortBy, setSortBy] = useState("rating_desc")
  const { user } = useAuth()
  const { toast } = useToast()
  const isClient = user?.role === "client"
  const homeHref = isClient ? "/client" : "/"
  const specialistsHref = isClient ? "/client/requests/new" : "/specialists"

  const [wishlist, setWishlist] = useState<number[]>([])
  const [categoryIndex, setCategoryIndex] = useState(0)

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
        languages: 5,
        students: 27,
        videoLength: "2:23",
        cardBg: "bg-lime-400",
        photoBg: "bg-violet-300",
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
        languages: 7,
        students: 43,
        videoLength: "2:23",
        cardBg: "bg-white",
        photoBg: "bg-amber-200",
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
        languages: 5,
        students: 27,
        videoLength: "1:45",
        cardBg: "bg-teal-400",
        photoBg: "bg-rose-200",
      },
      {
        id: 4,
        name: "Alex Morgan",
        subjects: ["Німецька мова"],
        rating: 4.8,
        reviews: 52,
        experience: 4,
        priceMin: 500,
        location: city?.name ?? "Онлайн",
        verified: true,
        languages: 4,
        students: 31,
        videoLength: "2:05",
        cardBg: "bg-violet-400",
        photoBg: "bg-emerald-200",
      },
    ],
    [city?.name]
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href={homeHref} className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-sm">
                <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
              </div>
              <span className="text-xl font-bold text-slate-900">Libitum</span>
            </Link>
            
            <nav className="hidden lg:flex items-center gap-8">
              <Link href={specialistsHref} className="text-sm font-semibold text-slate-900 border-b-2 border-emerald-500 pb-0.5">
                Teachers
              </Link>
              <Link href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                About us
              </Link>
              <Link href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                Contacts
              </Link>
              <Link href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                Plans
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              {user ? (
                <Link href={user.role === "specialist" ? "/tutor" : user.role === "admin" ? "/admin" : "/client"}>
                  <Button className="rounded-full h-10 px-6 bg-emerald-600 hover:bg-emerald-700 font-medium">
                    Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="rounded-full h-10 px-6 border-slate-200 font-medium hover:bg-slate-50">
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
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/30 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-300/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
          
          {/* Decorative circles */}
          <div className="absolute top-16 right-24 w-20 h-20 bg-lime-400 rounded-full opacity-60 animate-float-slow" />
          <div className="absolute bottom-24 left-16 w-12 h-12 bg-white/30 rounded-full animate-float-slower" />
          <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-orange-400 rounded-full opacity-70 animate-float-slow" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative z-10 text-center py-16 lg:py-24 px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 font-heading tracking-tight">
            Find the best
            <br />
            <span className="relative inline-block">
              online tutor
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 10C80 2 220 2 298 10" stroke="#bef264" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Connect with expert tutors for personalized learning experiences
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                  <Input 
                    placeholder="Search for subject or tutor..."
                    className="h-12 pl-12 rounded-xl bg-white/10 border-0 text-white placeholder:text-white/50 focus-visible:ring-white/30"
                  />
                </div>
                <Button className="h-12 px-8 rounded-xl bg-lime-400 text-emerald-900 hover:bg-lime-300 font-semibold">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm font-medium text-emerald-600 mb-2">Improve your knowledge</p>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 tracking-tight font-heading">
              Foreign language
              <br />
              training for everyone
            </h2>
          </div>
          
          <div className="hidden lg:flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full border-slate-200"
              onClick={() => setCategoryIndex(Math.max(0, categoryIndex - 1))}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              size="icon" 
              className="h-12 w-12 rounded-full bg-emerald-900 hover:bg-emerald-800"
              onClick={() => setCategoryIndex(Math.min(categories.length - 1, categoryIndex + 1))}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`${category.bgColor} rounded-3xl overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02] border ${category.bgColor === 'bg-white' ? 'border-slate-200' : 'border-transparent'}`}
            >
              <div className="p-6 pb-4">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className={`rounded-full ${category.bgColor === 'bg-white' ? 'border-slate-200 bg-slate-100' : 'border-white/30 bg-white/20'} ${category.textColor} text-xs font-medium`}>
                    {category.subtitle}
                  </Badge>
                  <Badge variant="outline" className={`rounded-full ${category.bgColor === 'bg-white' ? 'border-slate-200 bg-slate-100' : 'border-white/30 bg-white/20'} ${category.textColor} text-xs font-medium`}>
                    {category.tag}
                  </Badge>
                  <div className={`ml-auto w-8 h-8 rounded-full ${category.accentColor} ${category.bgColor === 'bg-white' ? '' : 'opacity-30'}`} />
                </div>
                
                <h3 className={`text-2xl lg:text-3xl font-bold ${category.textColor} mb-2 font-heading`}>
                  {category.title}
                </h3>
                <p className={`text-sm ${category.bgColor === 'bg-white' ? 'text-slate-600' : category.textColor} opacity-80 mb-4`}>
                  {category.description}
                </p>
              </div>
              
              {/* Photo area with gradient placeholder */}
              <div className={`aspect-[4/3] relative ${category.bgColor === 'bg-white' ? 'bg-gradient-to-br from-amber-100 to-orange-100' : category.bgColor === 'bg-lime-400' ? 'bg-gradient-to-br from-violet-200 to-violet-300' : category.bgColor === 'bg-teal-400' ? 'bg-gradient-to-br from-teal-200 to-cyan-200' : 'bg-gradient-to-br from-violet-200 to-purple-300'}`}>
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    className={`rounded-full ${category.bgColor === 'bg-white' || category.bgColor === 'bg-lime-400' ? 'bg-slate-900/80 text-white hover:bg-slate-900' : 'bg-white/80 text-slate-900 hover:bg-white'} px-4 h-10 font-medium`}
                  >
                    Read More
                  </Button>
                  <div className={`w-10 h-10 rounded-full ${category.bgColor === 'bg-white' || category.bgColor === 'bg-lime-400' ? 'bg-white' : 'bg-white'} flex items-center justify-center`}>
                    <ArrowRight className="h-4 w-4 text-slate-900 -rotate-45" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tutors Section */}
      <section className="container mx-auto px-4 lg:px-8 py-12 border-t border-slate-100">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm font-medium text-emerald-600 mb-2">Best specialists</p>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 tracking-tight font-heading">
              Popular tutors
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] rounded-full border-slate-200 bg-white h-10">
                <SelectValue placeholder="By rating" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="rating_desc">By rating</SelectItem>
                <SelectItem value="price_asc">Price: Low</SelectItem>
                <SelectItem value="price_desc">Price: High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tutor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {specialists.map((specialist) => (
            <div
              key={specialist.id}
              className={`${specialist.cardBg} rounded-3xl overflow-hidden group cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02] ${specialist.cardBg === 'bg-white' ? 'border border-slate-200' : ''}`}
            >
              {/* Info Section */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="rounded-full bg-white/90 text-emerald-700 font-semibold text-xs px-2 shadow-sm">
                    <Star className="h-3 w-3 mr-1 fill-emerald-600 text-emerald-600" />
                    {specialist.rating}
                  </Badge>
                  <Badge variant="outline" className={`rounded-full text-xs ${specialist.cardBg === 'bg-white' ? 'border-slate-200' : 'border-white/30 bg-white/20 text-white'}`}>
                    {specialist.experience}y exp
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`ml-auto h-8 w-8 rounded-full ${
                      wishlist.includes(specialist.id)
                        ? "text-red-500 bg-red-100"
                        : specialist.cardBg === 'bg-white' 
                          ? "text-slate-400 hover:text-red-500 hover:bg-red-50"
                          : "text-white/70 hover:text-red-400 hover:bg-white/20"
                    }`}
                    onClick={() => toggleWishlist(specialist.id)}
                  >
                    <Heart className={wishlist.includes(specialist.id) ? "fill-current h-4 w-4" : "h-4 w-4"} />
                  </Button>
                </div>
                
                <h3 className={`text-xl lg:text-2xl font-bold mb-1 font-heading ${specialist.cardBg === 'bg-white' ? 'text-slate-900' : specialist.cardBg === 'bg-violet-400' ? 'text-white' : 'text-emerald-900'}`}>
                  {specialist.name}
                </h3>
                <p className={`text-sm mb-3 ${specialist.cardBg === 'bg-white' ? 'text-slate-600' : specialist.cardBg === 'bg-violet-400' ? 'text-white/80' : 'text-emerald-800'}`}>
                  {specialist.subjects.join(", ")}
                </p>
                
                <div className={`flex items-center gap-3 text-xs ${specialist.cardBg === 'bg-white' ? 'text-slate-500' : specialist.cardBg === 'bg-violet-400' ? 'text-white/70' : 'text-emerald-700'}`}>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {specialist.students}
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    {specialist.languages} lang
                  </span>
                </div>
              </div>
              
              {/* Photo Section */}
              <div className={`aspect-square relative ${specialist.photoBg}`}>
                <Avatar className="w-full h-full rounded-none">
                  <AvatarFallback
                    className={`text-5xl font-bold rounded-none ${specialist.photoBg} ${specialist.cardBg === 'bg-violet-400' ? 'text-violet-600' : 'text-slate-600'}`}
                  >
                    {specialist.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                
                {/* Video Play Button */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <Button 
                    size="sm"
                    className="rounded-full bg-slate-900/80 text-white hover:bg-slate-900 px-3 h-9 font-medium text-xs"
                  >
                    <Play className="h-3 w-3 mr-1 fill-white" />
                    Video
                  </Button>
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <ArrowRight className="h-4 w-4 text-slate-900 -rotate-45" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-10">
          <Button variant="outline" className="rounded-full h-12 px-8 border-slate-200 font-medium hover:bg-slate-50">
            Show more tutors
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}
