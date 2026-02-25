"use client"

import { use, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useRequestStore } from "@/lib/request-store"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookingModal } from "@/components/booking-modal"
import { LanguageSwitcher } from "@/components/language-switcher"
import {
  ArrowLeft, Star, Heart, Share, MapPin, Calendar, Clock, Award, Shield,
  Check, Play, ChevronRight, ChevronUp, ChevronDown, MessageCircle, BookOpen, Users, GraduationCap, Video, Home as HomeIcon
} from "lucide-react"
import { Header } from "@/components/header"

export default function SpecialistProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const { getActiveTrialCount } = useRequestStore()
  const [bookingOpen, setBookingOpen] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const resolvedParams = use(params)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 }
    )

    const sections = ['about', 'reviews', 'schedule']
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
    e?.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 130
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const specialistsDB: Record<string, any> = {
    "1": {
      id: 1,
      name: "Олена Іваненко",
      specialization: "Репетитор",
      subjects: ["Англійська мова", "Німецька мова"],
      subjectsDetails: [
        {
          subject: "Англійська мова",
          levels: [
            { label: "1-4 клас", priceOnline: 350, priceOffline: 400 },
            { label: "5-9 клас", priceOnline: 380, priceOffline: 430 },
            { label: "ЗНО/НМТ", priceOnline: 450, priceOffline: 520 },
            { label: "IELTS/TOEFL", priceOnline: 500, priceOffline: 560, groupPrice: 320 },
          ],
          groupAvailable: true,
        },
        {
          subject: "Німецька мова",
          levels: [
            { label: "А1-А2", priceOnline: 360, priceOffline: 420 },
            { label: "B1-B2", priceOnline: 420, priceOffline: 480, groupPrice: 300 },
          ],
          groupAvailable: true,
        },
      ],
      rating: 4.9,
      reviews: 48,
      experience: 5,
      priceOnline: 400,
      priceOffline: 500,
      location: "Київ",
      verified: true,
      online: true,
      offline: true,
      avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
      badges: ["Top", "Fast reply"],
      videoIntroUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      certificates: [
        { title: "CELTA", description: "Cambridge English Level 5 Certificate in Teaching" },
        { title: "IELTS Academic 8.5", description: "Verified 2024" },
      ],
      bio: "Маю 5 років досвіду викладання англійської мови. Працюю з учнями різного віку та рівня підготовки. Використовую комунікативну методику та сучасні матеріали. Допомагаю підготуватися до міжнародних іспитів IELTS, TOEFL, Cambridge.",
      education: "Київський національний університет імені Тараса Шевченка, філологічний факультет",
      achievements: ["Топ-рейтинг", "Швидка відповідь", "Надійний", "50+ занять"],
      completedSessions: 156,
      currentStudents: 18,
      responseTime: "2 години",
      acceptanceRate: 95,
    },
    "3": {
      id: 3,
      name: "Марія Коваленко",
      specialization: "Психолог",
      subjects: ["Індивідуальна терапія", "Сімейна терапія"],
      subjectsDetails: [
        {
          subject: "Індивідуальна консультація",
          levels: [
            { label: "Дорослі", priceOnline: 600, priceOffline: 700 },
            { label: "Підлітки", priceOnline: 550, priceOffline: 650 },
          ],
          groupAvailable: false,
        },
        {
          subject: "Сімейна терапія",
          levels: [
            { label: "Пара", priceOnline: 900, priceOffline: 1000 },
          ],
          groupAvailable: false,
        }
      ],
      rating: 5.0,
      reviews: 62,
      experience: 10,
      priceOnline: 600,
      priceOffline: 700,
      location: "Київ",
      verified: true,
      online: true,
      offline: false,
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      badges: ["Super Prof", "Empathy Expert"],
      videoIntroUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      certificates: [
        { title: "CBT Therapist", description: "Certified Cognitive Behavioral Therapist" },
        { title: "Gestalt Level 2", description: "European Association for Gestalt Therapy" },
      ],
      bio: "Клінічний психолог з 10-річним досвідом. Спеціалізуюсь на роботі з тривожністю, депресивними станами та проблемами у стосунках. Використовую інтегративний підхід, поєднуючи КПТ та гештальт-терапію. Гарантую повну конфіденційність та підтримку.",
      education: "Київський національний університет імені Тараса Шевченка, факультет психології",
      achievements: ["500+ годин практики", "Супервізор", "Наукові публікації"],
      completedSessions: 342,
      currentStudents: 12,
      responseTime: "1 година",
      acceptanceRate: 100,
    },
    "4": {
      id: 4,
      name: "Анна Мельник",
      specialization: "Логопед",
      subjects: ["Постановка звуків", "Корекція мовлення"],
      subjectsDetails: [
        {
          subject: "Логопедичне заняття",
          levels: [
            { label: "Діти 3-5 років", priceOnline: 500, priceOffline: 600 },
            { label: "Діти 6-10 років", priceOnline: 500, priceOffline: 600 },
          ],
          groupAvailable: true,
        }
      ],
      rating: 4.9,
      reviews: 41,
      experience: 8,
      priceOnline: 500,
      priceOffline: 600,
      location: "Київ",
      verified: true,
      online: true,
      offline: true,
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      badges: ["Kids Friendly", "Pro"],
      videoIntroUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      certificates: [
        { title: "Логопед-дефектолог", description: "Вища категорія" },
      ],
      bio: "Логопед-дефектолог. Працюю з дітьми та дорослими. Допомагаю виправити дефекти мовлення, поставити звуки, розвинути фонематичний слух. Заняття проходять в ігровій формі, що дозволяє зацікавити дитину та досягти швидких результатів.",
      education: "НПУ імені М.П. Драгоманова, корекційна педагогіка",
      achievements: ["Автор методик", "Робота з особливими дітьми"],
      completedSessions: 215,
      currentStudents: 24,
      responseTime: "4 години",
      acceptanceRate: 90,
    }
  }

  const idToUse = resolvedParams?.id || "1"
  const specialist = specialistsDB[idToUse] || specialistsDB["1"]

  const activeTrialCount = getActiveTrialCount(user?.id || "")
  const hasReachedLimit = activeTrialCount >= 3

  const handleBookingClick = () => {
    if (!user) {
      toast({
        title: "Потрібна авторизація",
        description: "Увійдіть в акаунт, щоб залишити заявку",
        variant: "destructive",
      })
      router.push("/login")
      return
    }
    if (hasReachedLimit) {
      toast({
        title: "Досягнуто ліміт заявок",
        description: "Ви можете мати максимум 3 активні пробні заняття одночасно.",
        variant: "destructive",
      })
      return
    }
    setBookingOpen(true)
  }

  const reviews = [
    { id: 1, clientName: "Марія К.", rating: 5, date: "15.01.2025", text: "Чудовий викладач! Олена дуже професійна та уважна. За 2 місяці занять мій рівень англійської значно покращився." },
    { id: 2, clientName: "Іван П.", rating: 5, date: "10.01.2025", text: "Рекомендую! Зрозумілі пояснення, цікаві матеріали. Підготувався до IELTS на 7.5 балів." },
    { id: 3, clientName: "Софія Б.", rating: 4, date: "05.01.2025", text: "Гарний викладач, але іноді бракує часу на практику розмовної мови." },
    { id: 4, clientName: "Андрій Л.", rating: 5, date: "28.12.2024", text: "Дуже задоволений результатами! Олена допомогла подолати мовний бар'єр. Тепер спілкуюся англійською впевнено." },
    { id: 5, clientName: "Оксана М.", rating: 5, date: "20.12.2024", text: "Професійний підхід до кожного учня. Індивідуальна програма, яка дійсно працює. Рекомендую!" },
    { id: 6, clientName: "Сергій Т.", rating: 4, date: "15.12.2024", text: "Хороший викладач, пояснює складні теми просто. Іноді занять відбуваються онлайн з невеликими затримками." },
    { id: 7, clientName: "Наталія К.", rating: 5, date: "10.12.2024", text: "Олена - найкращий викладач, з яким я займався! Результат перевершив усі очікування. Дякую!" },
    { id: 8, clientName: "Дмитро В.", rating: 5, date: "05.12.2024", text: "Системний підхід, чудові матеріали. Підготувався до співбесіди в міжнародну компанію." },
  ]

  const handleWishlist = () => {
    setWishlisted((prev) => !prev)
    toast({ title: wishlisted ? "Видалено з обраного" : "Додано до обраного" })
  }

  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : ""
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast({ title: "Посилання скопійовано" })
    } catch {
      toast({ title: "Не вдалося скопіювати", variant: "destructive" })
    }
  }

  const isHealthSpecialist = ["Психолог", "Логопед"].includes(specialist.specialization)
  const logoSrc = isHealthSpecialist ? "/logo-health.jpg" : "/logo-education.jpg"
  const specialistsListHref = user?.role === "client" ? "/client/specialists" : "/specialists"

  return (
    <div className="min-h-screen bg-white">
      <Header theme={isHealthSpecialist ? "health" : "education"} />

      {/* Breadcrumbs */}
      <div className="border-b border-slate-100 bg-[#f8f9fa]">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-[#69686f] font-medium">
            <Link href="/" className="hover:text-[#121117] transition-colors">Головна</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href={specialistsListHref} className="hover:text-[#121117] transition-colors">Спеціалісти</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#121117]">{specialist.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-6xl">
        <div className="flex gap-8 lg:flex-row flex-col">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Video at the top */}
            {specialist.videoIntroUrl && (
              <div className="mb-4 sm:mb-6 rounded-[24px] sm:rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] sm:shadow-sm relative aspect-video">
                <video controls poster={specialist.avatarUrl} className="w-full h-full object-cover">
                  <source src={specialist.videoIntroUrl} type="video/mp4" />
                </video>
              </div>
            )}

            {/* Profile Header */}
            <div className="mb-4 sm:mb-6 bg-white rounded-[24px] sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-[0_4px_20px_rgb(0,0,0,0.03)] sm:shadow-sm relative overflow-hidden">
              {/* Action buttons - Absolute top right */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 z-20">
                <button
                  onClick={handleWishlist}
                  className="h-10 w-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer group"
                >
                  <Heart className={`h-4 w-4 transition-colors ${wishlisted ? "fill-[#ff4757] text-[#ff4757]" : "text-slate-400 group-hover:text-slate-600"}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="h-10 w-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer group"
                >
                  <Share className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                </button>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row gap-5 sm:gap-0 items-center sm:items-start pt-2 sm:pt-0">
                <div className="relative shrink-0 mx-auto sm:mx-0 mt-2 sm:mt-0 sm:w-[220px]">
                  <div className="relative h-[130px] w-[130px] sm:h-[180px] sm:w-[180px] rounded-full overflow-hidden ring-4 ring-slate-50 shadow-sm mx-auto sm:mx-0">
                    <Avatar className="h-full w-full rounded-none">
                      <AvatarImage src={specialist.avatarUrl} alt={specialist.name} className="object-cover object-top" />
                      <AvatarFallback className="text-4xl font-bold bg-[#f0f3f3] text-[#121117]">{specialist.name[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  {specialist.verified && (
                    <div className="absolute bottom-0 right-0 sm:bottom-2 sm:right-6 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white border-2 border-slate-50 shadow-sm z-10">
                      <Award className={`h-5 w-5 sm:h-6 sm:w-6 ${specialist.specialization === "Репетитор" ? "text-[#00c5a6]" : "text-[#f57c00]"}`} />
                    </div>
                  )}
                </div>

                <div className="flex-1 pt-1 sm:pt-2 text-center sm:text-left w-full sm:pr-20">
                  <div className="mb-4 sm:mb-5 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3 sm:gap-4">
                    <div className="space-y-3 w-full">
                      <h1 className="text-[28px] sm:text-[36px] font-bold text-[#121117] leading-tight tracking-tight">{specialist.name}</h1>
                      <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
                        <span className={`inline-flex items-center rounded-lg px-3 py-1.5 sm:px-3 sm:py-1.5 text-[13px] sm:text-[14px] font-[700] ${specialist.specialization === "Репетитор" ? "bg-[#e8fffb] text-[#00a389]" : "bg-[#fff8e1] text-[#d87b00]"}`}>
                          {specialist.specialization}
                        </span>
                        {specialist.badges.map((badge: string) => (
                          <span key={badge} className="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1.5 sm:px-3 sm:py-1.5 text-[12px] sm:text-[13px] font-[600] text-slate-700">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-x-6 gap-y-3 sm:gap-y-0 text-[14px] text-[#69686f] font-medium bg-[#f8f9fa] p-3.5 sm:p-4 rounded-[16px] w-full sm:w-fit border border-slate-100 mx-auto sm:mx-0">
                      <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-[#fff8e1] p-1.5 rounded-[8px] flex items-center justify-center shadow-sm">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
                          </div>
                          <span className="font-bold text-[#121117] text-[16px]">{specialist.rating}</span>
                        </div>
                        
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:block"></div>
                        
                        <button 
                          onClick={() => {
                            setShowAllReviews(true)
                            scrollToSection('reviews')
                          }}
                          className="text-slate-500 underline decoration-dashed underline-offset-4 hover:text-slate-800 cursor-pointer transition-colors font-[600]"
                        >
                          {specialist.reviews} відгуків
                        </button>
                      </div>

                      <div className="w-full h-px bg-slate-200/60 sm:hidden"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:block"></div>
                      
                      <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-3">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          <span className="text-slate-600 font-[600]">{specialist.location}</span>
                        </div>

                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:block"></div>

                        <div className="flex items-center gap-1.5">
                          <Users className="h-4 w-4 text-slate-400" />
                          <span className="text-slate-600 font-[600]"><strong className="text-[#121117]">{specialist.completedSessions}</strong> занять</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mt-2 w-full">
                      <div className="flex items-center gap-2 shrink-0 pt-0.5">
                        <BookOpen className="h-4 w-4 text-slate-400" />
                        <span className="text-[14px] font-[600] text-slate-500">Викладає:</span>
                      </div>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 w-full max-w-[500px]">
                        {specialist.subjects.map((subject: string) => (
                          <span key={subject} className="inline-flex items-center rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-[13px] font-[600] text-[#121117] shadow-sm hover:border-slate-300 hover:shadow-md transition-all cursor-default">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>

                    {(specialist.education || (specialist.achievements && specialist.achievements.length > 0)) && (
                      <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-slate-100 w-full max-w-3xl">
                        {specialist.education && (
                          <div className="flex items-start justify-center sm:justify-start gap-2 text-center sm:text-left">
                            <GraduationCap className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                            <span className="text-[13px] font-medium text-[#3e3d45] leading-snug">{specialist.education}</span>
                          </div>
                        )}
                        
                        {specialist.achievements && specialist.achievements.length > 0 && (
                          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                            {specialist.achievements.map((ach: string) => (
                              <span key={ach} className="inline-flex items-center rounded-lg bg-[#f8f9fa] border border-slate-100 text-[#121117] px-2.5 py-1.5 text-[12px] font-[600]">
                                <Check className={`w-3.5 h-3.5 mr-1 ${specialist.specialization === "Репетитор" ? "text-[#00c5a6]" : "text-[#f57c00]"}`} />
                                {ach}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Nav */}
            <div className="sticky top-[72px] sm:top-[80px] z-30 bg-white/95 backdrop-blur-md pb-0 pt-2 mb-6 border-b border-slate-200/60 no-scrollbar">
              <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar w-full sm:px-1">
                <a
                  href="#about"
                  onClick={(e) => scrollToSection('about', e)}
                  className={`whitespace-nowrap rounded-t-[12px] px-3 sm:px-4 py-3 text-[14px] sm:text-[15px] font-bold transition-all border-b-[3px] ${activeSection === 'about' ? 'border-[#121117] text-[#121117]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                  Про мене
                </a>
                <a
                  href="#reviews"
                  onClick={(e) => scrollToSection('reviews', e)}
                  className={`whitespace-nowrap rounded-t-[12px] px-3 sm:px-4 py-3 text-[14px] sm:text-[15px] font-bold transition-all border-b-[3px] ${activeSection === 'reviews' ? 'border-[#121117] text-[#121117]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                  Відгуки <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[12px] ${activeSection === 'reviews' ? 'bg-[#121117] text-white' : 'bg-slate-100 text-slate-500'}`}>{specialist.reviews}</span>
                </a>
                <a
                  href="#schedule"
                  onClick={(e) => scrollToSection('schedule', e)}
                  className={`whitespace-nowrap rounded-t-[12px] px-3 sm:px-4 py-3 text-[14px] sm:text-[15px] font-bold transition-all border-b-[3px] ${activeSection === 'schedule' ? 'border-[#121117] text-[#121117]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                  Розклад
                </a>
              </div>
            </div>

            <div className="space-y-8 sm:space-y-12 pb-10">
              {/* About Section */}
              <section id="about" className="scroll-mt-32 space-y-6 sm:space-y-8 block">
                <div className="bg-white rounded-[24px] p-5 sm:p-6 md:p-8 border border-slate-200/80 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                    <h3 className="text-[20px] font-bold text-[#121117]">Про мене</h3>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-[#f0f3f3] text-[13px] sm:text-[14px] font-[600] text-[#121117] w-fit">
                      <Clock className="w-4 h-4 text-[#69686f]" />
                      {specialist.experience} років досвіду
                    </div>
                  </div>
                  <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#3e3d45] whitespace-pre-line font-medium">
                    {specialist.bio}
                  </p>
                </div>

                <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                  {/* Education */}
                  <div className="bg-[#f0f3f3] rounded-[24px] p-5 sm:p-6 border border-slate-200/50 hover:border-slate-300 transition-colors">
                    <h3 className="text-[18px] font-bold text-[#121117] mb-4">Освіта</h3>
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-white text-[#00c5a6] border border-slate-200/80 shadow-sm">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-[600] text-[#121117]">{specialist.education}</h4>
                        <p className="text-[#69686f] text-[13px] font-medium mt-1">Магістр філології</p>
                      </div>
                    </div>
                  </div>

                  {/* Certificates */}
                  <div className="bg-[#f0f3f3] rounded-[24px] p-5 sm:p-6 border border-slate-200/50 hover:border-slate-300 transition-colors">
                    <h3 className="text-[18px] font-bold text-[#121117] mb-4">Сертифікати</h3>
                    <div className="space-y-4">
                      {specialist.certificates.map((cert: { title: string; description: string }) => (
                        <div key={cert.title} className="flex gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-white text-[#00c5a6] border border-slate-200/80 shadow-sm">
                            <Award className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-[600] text-[#121117]">{cert.title}</h4>
                            <p className="text-[#69686f] text-[13px] font-medium mt-0.5">{cert.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-white rounded-[24px] p-5 sm:p-6 md:p-8 border border-slate-200/80 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                  <h3 className="text-[20px] font-bold text-[#121117] mb-6">Вартість навчання</h3>
                  <div className="grid gap-6">
                    {specialist.subjectsDetails.map(
                      (subject: {
                        subject: string
                        levels: { label: string; priceOnline?: number; priceOffline?: number; groupPrice?: number }[]
                        groupAvailable?: boolean
                      }) => (
                        <div key={subject.subject} className="rounded-[16px] border border-slate-200/80 bg-white p-4 sm:p-6 hover:border-slate-300 transition-colors shadow-sm">
                          <div className="mb-4 flex items-center justify-between">
                            <h4 className="text-[18px] font-bold text-[#121117]">{subject.subject}</h4>
                            {subject.groupAvailable && (
                              <span className="inline-flex items-center rounded-full bg-[#e8fffb] px-3 py-1 text-[12px] font-[600] text-[#00a389]">
                                Групові доступні
                              </span>
                            )}
                          </div>
                          <div className="overflow-hidden rounded-[12px] border border-slate-200/80">
                            <div className="grid grid-cols-4 bg-[#f0f3f3] px-3 sm:px-4 py-3 text-[11px] sm:text-[12px] font-[600] uppercase tracking-wider text-[#69686f]">
                              <span>Рівень</span>
                              <span>Онлайн</span>
                              <span>Офлайн</span>
                              <span>Група</span>
                            </div>
                            <div className="divide-y divide-slate-100 bg-white">
                              {subject.levels.map((level: { label: string; priceOnline?: number; priceOffline?: number; groupPrice?: number }) => (
                                <div key={level.label} className="grid grid-cols-4 items-center px-3 sm:px-4 py-3 text-[13px] sm:text-[14px] hover:bg-[#fafaf8] transition-colors">
                                  <span className="font-medium text-slate-800 pr-2 leading-tight">{level.label}</span>
                                  <span className="text-slate-600">{level.priceOnline ? `${level.priceOnline} ₴` : "---"}</span>
                                  <span className="text-slate-600">{level.priceOffline ? `${level.priceOffline} ₴` : "---"}</span>
                                  <span className="text-slate-600">{level.groupPrice ? `${level.groupPrice} ₴` : "---"}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </section>

              {/* Reviews Section */}
              <section id="reviews" className="scroll-mt-32 space-y-4 block">
                <h3 className="text-[20px] font-bold text-[#121117] mb-6 pl-1 pt-2">Відгуки учнів</h3>
                {reviews.slice(0, showAllReviews ? reviews.length : 3).map((review) => (
                  <div key={review.id} className="rounded-[16px] border border-slate-200/80 bg-white p-5 sm:p-6 hover:border-slate-300 transition-colors shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f0f3f3] font-bold text-[#121117] text-[16px]">
                          {review.clientName[0]}
                        </div>
                        <div>
                          <p className="font-bold text-[#121117] text-[15px]">{review.clientName}</p>
                          <p className="text-[13px] font-medium text-[#69686f] mt-0.5">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "fill-slate-100 text-slate-200"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-[#3e3d45] leading-relaxed text-[15px] font-medium">{review.text}</p>
                  </div>
                ))}
                
                {reviews.length > 3 && (
                  <div className="flex justify-center pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="px-6 py-2 rounded-[12px] border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
                    >
                      {showAllReviews ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-2" />
                          Показати менше відгуків
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-2" />
                          Показати всі {reviews.length} відгуків
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </section>

              {/* Schedule Section */}
              <section id="schedule" className="scroll-mt-32 block">
                <div className="rounded-[24px] border border-slate-200/80 bg-white p-5 sm:p-6 md:p-8 hover:border-slate-300 transition-colors shadow-[0_2px_10px_rgb(0,0,0,0.02)] mt-2">
                  <h3 className="text-[20px] font-bold text-[#121117] mb-2">Тижневий графік</h3>
                  <p className="text-[14px] font-medium text-[#69686f] mb-6">Вільні слоти для бронювання</p>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      { day: "Понеділок", slots: ["10:00", "14:00", "18:00"] },
                      { day: "Вівторок", slots: ["12:00", "16:00"] },
                      { day: "Середа", slots: ["09:00", "15:00", "19:00"] },
                      { day: "Четвер", slots: ["11:00", "17:00"] },
                      { day: "П'ятниця", slots: ["10:00", "13:00"] },
                    ].map((day) => (
                      <div key={day.day} className="rounded-[16px] bg-[#f0f3f3] p-4 sm:p-5 border border-slate-200/50">
                        <div className="mb-4 flex items-center justify-between font-bold text-[#121117]">
                          <span>{day.day}</span>
                          <Calendar className="h-4 w-4 text-[#69686f]" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {day.slots.map((slot) => (
                            <button key={slot} className="inline-flex items-center rounded-[8px] border border-slate-200/80 bg-white px-3 py-1.5 text-[13px] font-[600] text-[#121117] hover:border-[#121117] transition-colors cursor-pointer shadow-sm">
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-[340px] xl:w-[380px] flex-shrink-0">
            <div className="sticky top-24 flex flex-col gap-4 pb-6">
              {/* Price card */}
              <div className="rounded-[24px] border border-slate-200/80 bg-white overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] shrink-0">
                <div className="bg-white p-4 sm:p-6 border-b border-slate-100 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f0f3f3]/50 to-transparent pointer-events-none" />
                  <div className="relative z-10">
                    <p className="text-[13px] font-[600] text-[#69686f] mb-2 uppercase tracking-wider">Вартість заняття</p>
                    <div className="flex items-end justify-center gap-1.5 mb-1">
                      <span className="text-[36px] font-bold text-[#121117] leading-none">{specialist.priceOnline} ₴</span>
                      <span className="text-[16px] font-[600] text-[#69686f] mb-1">/ год</span>
                    </div>
                    <p className={`text-[13px] mt-2 font-bold inline-block px-3 py-1 rounded-full ${specialist.specialization === "Репетитор" ? "text-[#00a389] bg-[#e8fffb]" : "text-[#d87b00] bg-[#fff8e1]"}`}>Перше пробне заняття безкоштовно</p>
                  </div>
                </div>

                <div className="p-4 sm:p-6 flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between rounded-[12px] bg-[#f0f3f3] p-3.5 border border-slate-200/50">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-white border border-slate-200/80 text-[#121117] flex-shrink-0 shadow-sm">
                          <Video className="h-4 w-4" />
                        </div>
                        <span className="font-[600] text-[#121117] text-[15px]">Онлайн</span>
                      </div>
                      <span className="font-bold text-[#121117] text-[16px]">{specialist.priceOnline} ₴</span>
                    </div>
                    <div className="flex items-center justify-between rounded-[12px] bg-[#f0f3f3] p-3.5 border border-slate-200/50">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-white border border-slate-200/80 text-[#121117] flex-shrink-0 shadow-sm">
                          <HomeIcon className="h-4 w-4" />
                        </div>
                        <span className="font-[600] text-[#121117] text-[15px]">Офлайн</span>
                      </div>
                      <span className="font-bold text-[#121117] text-[16px]">{specialist.priceOffline} ₴</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-[12px] bg-[#f8f9fa] border border-slate-100">
                    <MapPin className="h-5 w-5 text-[#b2b1b9] shrink-0 mt-0.5" />
                    <div className="text-[14px] text-[#3e3d45] font-medium">
                      <p className="font-bold text-[#121117] mb-1">Локація</p>
                      {specialist.location}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-2">
                    <Button
                      className={`w-full h-[52px] rounded-[12px] text-white text-[16px] font-bold cursor-pointer shadow-sm transition-colors ${specialist.specialization === "Репетитор" ? "bg-[#00c5a6] hover:bg-[#00a389]" : "bg-[#f57c00] hover:bg-[#e65100]"}`}
                      onClick={handleBookingClick}
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Залишити заявку
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[13px] font-[600] text-[#69686f] pt-1 bg-[#f0f3f3] py-2 rounded-[8px]">
                    <Users className="h-4 w-4" />
                    <span>{specialist.currentStudents} учнів вже навчаються</span>
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="rounded-[24px] border border-slate-200/80 bg-white p-4 sm:p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                  <div className="text-center">
                    <div className="text-[24px] font-bold text-[#121117]">{specialist.experience}</div>
                    <div className="text-[12px] font-[600] text-[#69686f] mt-1">років досвіду</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[24px] font-bold text-[#121117]">{specialist.acceptanceRate}%</div>
                    <div className="text-[12px] font-[600] text-[#69686f] mt-1">прийняття заявок</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[20px] font-bold text-[#121117]">{specialist.responseTime}</div>
                    <div className="text-[12px] font-[600] text-[#69686f] mt-1">час відповіді</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-[24px] font-bold ${specialist.specialization === "Репетитор" ? "text-[#00c5a6]" : "text-[#f57c00]"}`}>{specialist.completedSessions}</div>
                    <div className="text-[12px] font-[600] text-[#69686f] mt-1">проведено занять</div>
                  </div>
                </div>
              </div>

              {/* Activity Level */}
              <div className="rounded-[24px] p-4 sm:p-5 border border-slate-200/80 bg-gradient-to-br from-white to-[#f0f3f3]/40 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-[600] text-[#69686f] mb-1">Рівень активності</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[18px] font-bold text-[#121117]">Pro (Lvl 24)</span>
                    <Shield className={`h-4 w-4 ${specialist.specialization === "Репетитор" ? "text-[#00c5a6]" : "text-[#f57c00]"}`} />
                  </div>
                </div>
                <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center border ${specialist.specialization === "Репетитор" ? "bg-[#e8fffb] border-[#00c5a6]/20" : "bg-[#fff8e1] border-[#f57c00]/20"}`}>
                  <Star className={`h-5 w-5 ${specialist.specialization === "Репетитор" ? "text-[#00c5a6]" : "text-[#f57c00]"}`} />
                </div>
              </div>

              {/* Guarantee */}
              <div className={`rounded-[16px] p-5 text-center border ${specialist.specialization === "Репетитор" ? "bg-[#e8fffb] border-[#00c5a6]/20" : "bg-[#fff8e1] border-[#f57c00]/20"}`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Check className={`h-5 w-5 ${specialist.specialization === "Репетитор" ? "text-[#00a389]" : "text-[#d87b00]"}`} />
                  <span className={`text-[15px] font-bold ${specialist.specialization === "Репетитор" ? "text-[#00a389]" : "text-[#d87b00]"}`}>Гарантія якості</span>
                </div>
                <p className={`text-[13px] font-medium leading-relaxed ${specialist.specialization === "Репетитор" ? "text-[#00a389]/80" : "text-[#d87b00]/80"}`}>
                  Повернення коштів, якщо заняття не відбудеться або не сподобається.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} specialist={{ ...specialist, id: String(specialist.id) }} />
    </div>
  )
}
