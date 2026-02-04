"use client"

import { use, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useRequestStore } from "@/lib/request-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BookingModal } from "@/components/booking-modal"
import {
  BookOpen,
  Star,
  MapPin,
  Video,
  Home,
  Award,
  Calendar,
  ArrowLeft,
  GraduationCap,
  Users,
  Heart,
  Share,
  Play,
  Flame,
} from "lucide-react"

export default function SpecialistProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const { getActiveTrialCount } = useRequestStore()
  const [bookingOpen, setBookingOpen] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const resolvedParams = use(params)

  // Mock specialists database
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
            { label: "1–4 клас", priceOnline: 350, priceOffline: 400 },
            { label: "5–9 клас", priceOnline: 380, priceOffline: 430 },
            { label: "ЗНО/НМТ", priceOnline: 450, priceOffline: 520 },
            { label: "IELTS/TOEFL", priceOnline: 500, priceOffline: 560, groupPrice: 320 },
          ],
          groupAvailable: true,
        },
        {
          subject: "Німецька мова",
          levels: [
            { label: "А1–А2", priceOnline: 360, priceOffline: 420 },
            { label: "B1–B2", priceOnline: 420, priceOffline: 480, groupPrice: 300 },
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
      activityLevel: "High",
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
      videoIntroUrl: "",
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
      activityLevel: "Very High",
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
      videoIntroUrl: "",
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
      activityLevel: "Medium",
    }
  }

  // Fallback to default if ID not found or if param is missing (default to id 1)
  // In a real app we'd show 404
  const idToUse = resolvedParams?.id || "1"
  const specialist = specialistsDB[idToUse] || specialistsDB["1"]

  const activeTrialCount = getActiveTrialCount(user?.id || "")
  const hasReachedLimit = activeTrialCount >= 3

  const handleBookingClick = () => {
    if (!user) {
      toast({
        title: "Потрібна авторизація",
        description: "Увійдіть в акаунт, щоб записатися до спеціаліста",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (hasReachedLimit) {
      toast({
        title: "Досягнуто ліміт заявок",
        description: "Ви можете мати максимум 3 активні пробні заняття одночасно. Скасуйте одну з існуючих заявок.",
        variant: "destructive",
      })
      return
    }

    setBookingOpen(true)
  }

  const reviews = [
    {
      id: 1,
      clientName: "Марія К.",
      rating: 5,
      date: "15.01.2025",
      text: "Чудовий викладач! Олена дуже професійна та уважна. За 2 місяці занять мій рівень англійської значно покращився.",
    },
    {
      id: 2,
      clientName: "Іван П.",
      rating: 5,
      date: "10.01.2025",
      text: "Рекомендую! Зрозумілі пояснення, цікаві матеріали. Підготувався до IELTS на 7.5 балів.",
    },
    {
      id: 3,
      clientName: "Софія Б.",
      rating: 4,
      date: "05.01.2025",
      text: "Гарний викладач, але іноді бракує часу на практику розмовної мови.",
    },
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
    } catch (error) {
      toast({ title: "Не вдалося скопіювати", variant: "destructive" })
    }
  }

  const isHealthSpecialist = ["Психолог", "Логопед"].includes(specialist.specialization)
  const logoSrc = isHealthSpecialist ? "/logo-health.jpg" : "/logo-education.jpg"

  const getAccentStyles = () => {
    if (specialist.specialization === "Репетитор") {
      return {
        button: "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-emerald-100",
        text: "text-emerald-700",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        icon: "text-emerald-600",
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200"
      }
    }

    if (["Психолог", "Логопед"].includes(specialist.specialization)) {
      return {
        button: "bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-600 hover:to-orange-500 text-white shadow-amber-100",
        text: "text-amber-700",
        bg: "bg-amber-50",
        border: "border-amber-200",
        icon: "text-amber-600",
        badge: "bg-amber-50 text-amber-700 border-amber-200"
      }
    }

    return {
      button: "bg-slate-800 hover:bg-slate-700 text-white shadow-slate-100",
      text: "text-slate-700",
      bg: "bg-slate-50",
      border: "border-slate-200",
      icon: "text-slate-600",
      badge: "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  const accent = getAccentStyles()

  const specialistsListHref = user?.role === "client" ? "/client/specialists" : "/specialists"

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href={specialistsListHref} className="flex items-center gap-2 group transition-colors hover:text-slate-600">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-slate-200 shadow-sm">
                <Image src={logoSrc} alt="Libitum" fill className="object-cover" />
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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Profile Header - Clean, no card */}
            <div className="mb-10 flex flex-col gap-6 sm:flex-row">
              <div className="relative shrink-0">
                <Avatar className="h-32 w-32 rounded-2xl border-2 border-white shadow-lg sm:h-40 sm:w-40">
                  <AvatarImage src={specialist.avatarUrl} alt={specialist.name} className="object-cover" />
                  <AvatarFallback className="text-4xl font-bold bg-slate-100 text-slate-400">{specialist.name[0]}</AvatarFallback>
                </Avatar>
                {specialist.verified && (
                  <div className="absolute -bottom-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ring-4 ring-slate-50">
                    <Award className={`h-5 w-5 ${accent.icon}`} />
                  </div>
                )}
              </div>
              
              <div className="flex-1 pt-2">
                <div className="mb-3 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">{specialist.name}</h1>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-sm font-medium ${accent.badge}`}>
                        {specialist.specialization}
                      </span>
                      {specialist.badges.map((badge: string) => (
                        <span key={badge} className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-2.5 py-0.5 text-sm font-medium text-slate-600">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={handleWishlist} className="rounded-xl border-slate-200 hover:bg-slate-50 hover:text-red-500">
                      <Heart className={`h-5 w-5 ${wishlisted ? "fill-red-500 text-red-500" : "text-slate-400"}`} />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleShare} className="rounded-xl border-slate-200 hover:bg-slate-50 hover:text-slate-800">
                      <Share className="h-5 w-5 text-slate-400" />
                    </Button>
                  </div>
                </div>

                <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-800">{specialist.rating}</span>
                    <span className="text-slate-400">({specialist.reviews} відгуків)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {specialist.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    {specialist.completedSessions} занять
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {specialist.subjects.map((subject: string) => (
                    <span key={subject} className="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Tabs - Clean Style */}
            <Tabs defaultValue="about" className="space-y-8">
              <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent p-0 h-auto gap-8 rounded-none">
                <TabsTrigger 
                  value="about" 
                  className="rounded-none border-b-2 border-transparent px-0 py-3 text-base font-medium text-slate-500 data-[state=active]:border-slate-700 data-[state=active]:text-slate-800 data-[state=active]:shadow-none hover:text-slate-700 bg-transparent"
                >
                  Про спеціаліста
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews" 
                  className="rounded-none border-b-2 border-transparent px-0 py-3 text-base font-medium text-slate-500 data-[state=active]:border-slate-700 data-[state=active]:text-slate-800 data-[state=active]:shadow-none hover:text-slate-700 bg-transparent"
                >
                  Відгуки ({specialist.reviews})
                </TabsTrigger>
                <TabsTrigger 
                  value="schedule" 
                  className="rounded-none border-b-2 border-transparent px-0 py-3 text-base font-medium text-slate-500 data-[state=active]:border-slate-700 data-[state=active]:text-slate-800 data-[state=active]:shadow-none hover:text-slate-700 bg-transparent"
                >
                  Розклад
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-10 animate-in fade-in-50 duration-300">
                {/* Bio Section - No Card */}
                <section>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Про мене</h3>
                  <p className="text-lg leading-relaxed text-slate-600 whitespace-pre-line">
                    {specialist.bio}
                  </p>
                </section>

                {/* Video Section */}
                {specialist.videoIntroUrl && (
                  <section>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Відео-візитівка</h3>
                    <div className="relative overflow-hidden rounded-2xl bg-black aspect-video shadow-md">
                      <video controls poster={specialist.avatarUrl} className="w-full h-full object-cover">
                        <source src={specialist.videoIntroUrl} type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none group">
                        <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="h-8 w-8 text-white fill-white ml-1" />
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                <div className="grid gap-8 md:grid-cols-2">
                  {/* Education */}
                  <section>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Освіта</h3>
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{specialist.education}</h4>
                        <p className="text-slate-500">Магістр філології</p>
                      </div>
                    </div>
                  </section>

                  {/* Certificates */}
                  <section>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Сертифікати</h3>
                    <div className="space-y-4">
                      {specialist.certificates.map((cert: { title: string; description: string }) => (
                        <div key={cert.title} className="flex gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                            <Award className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800">{cert.title}</h4>
                            <p className="text-slate-500">{cert.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Pricing / Subjects Detailed */}
                <section>
                  <h3 className="text-xl font-bold text-slate-800 mb-6">Вартість навчання</h3>
                  <div className="grid gap-6">
                    {specialist.subjectsDetails.map(
                      (subject: {
                        subject: string
                        levels: { label: string; priceOnline?: number; priceOffline?: number; groupPrice?: number }[]
                        groupAvailable?: boolean
                      }) => (
                      <div key={subject.subject} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                          <h4 className="text-lg font-bold text-slate-900">{subject.subject}</h4>
                          {subject.groupAvailable && (
                            <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                              Групові заняття доступні
                            </span>
                          )}
                        </div>
                        <div className="overflow-hidden rounded-xl border border-slate-100">
                          <div className="grid grid-cols-4 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            <span>Рівень</span>
                            <span>Онлайн</span>
                            <span>Офлайн</span>
                            <span>Група</span>
                          </div>
                          <div className="divide-y divide-slate-100 bg-white">
                            {subject.levels.map((level: { label: string; priceOnline?: number; priceOffline?: number; groupPrice?: number }) => (
                              <div key={level.label} className="grid grid-cols-4 items-center px-4 py-3 text-sm hover:bg-slate-50/50">
                                <span className="font-medium text-slate-900">{level.label}</span>
                                <span className="text-slate-600">{level.priceOnline ? `${level.priceOnline} ₴` : "—"}</span>
                                <span className="text-slate-600">{level.priceOffline ? `${level.priceOffline} ₴` : "—"}</span>
                                <span className="text-slate-600">{level.groupPrice ? `${level.groupPrice} ₴` : "—"}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="grid gap-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-600">
                            {review.clientName[0]}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{review.clientName}</p>
                            <p className="text-sm text-slate-500">{review.date}</p>
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
                      <p className="text-slate-600 leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-6">
                <Card className="border-slate-200 shadow-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle>Тижневий графік</CardTitle>
                    <CardDescription>Вільні слоти для бронювання (оновлюється в реальному часі)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {[{ day: "Понеділок", slots: ["10:00", "14:00", "18:00"] },
                        { day: "Вівторок", slots: ["12:00", "16:00"] },
                        { day: "Середа", slots: ["09:00", "15:00", "19:00"] },
                        { day: "Четвер", slots: ["11:00", "17:00"] },
                        { day: "Пʼятниця", slots: ["10:00", "13:00"] },
                      ].map((day) => (
                        <div key={day.day} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                          <div className="mb-3 flex items-center justify-between font-semibold text-slate-900">
                            <span>{day.day}</span>
                            <Calendar className="h-4 w-4 text-slate-400" />
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {day.slots.map((slot) => (
                              <span key={slot} className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium ${accent.bg} ${accent.border} ${accent.text}`}>
                                {slot}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Sticky */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <Card className="border-slate-200 shadow-lg rounded-2xl overflow-hidden ring-1 ring-slate-200">
                <div className="bg-slate-50 p-6 border-b border-slate-100 text-center">
                   <p className="text-sm font-medium text-slate-500 mb-1">Вартість заняття</p>
                   <div className={`text-3xl font-bold ${accent.text}`}>
                     {specialist.priceOnline} ₴
                     <span className="text-lg text-slate-400 font-medium ml-1">/ год</span>
                   </div>
                   <p className="text-xs text-slate-400 mt-2 font-medium">Перше пробне заняття безкоштовно</p>
                </div>

                <CardContent className="p-6 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm text-slate-600">
                          <Video className="h-4 w-4" />
                        </div>
                        <span className="font-medium text-slate-700">Онлайн</span>
                      </div>
                      <span className="font-bold text-slate-900">{specialist.priceOnline} ₴</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm text-slate-600">
                          <Home className="h-4 w-4" />
                        </div>
                        <span className="font-medium text-slate-700">Офлайн</span>
                      </div>
                      <span className="font-bold text-slate-900">{specialist.priceOffline} ₴</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/50 border border-slate-100">
                    <MapPin className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                    <div className="text-sm text-slate-600">
                      <p className="font-medium text-slate-900 mb-0.5">Локація</p>
                      {specialist.location}
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Button 
                      variant="ghost"
                      className={`w-full h-12 rounded-xl text-base font-semibold shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] spotlight-button hover-glow ${accent.button}`} 
                      onClick={handleBookingClick}
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Записатися на пробне
                    </Button>

                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                    <Users className="h-3 w-3" />
                    <span>{specialist.currentStudents} учнів вже навчаються</span>
                  </div>
                </CardContent>
              </Card>
              
              <div className="rounded-2xl bg-slate-100/50 p-4 text-center">
                 <p className="text-xs text-slate-500 leading-relaxed">
                   Гарантія повернення коштів, якщо заняття не відбудеться або не сподобається (для першого платного уроку).
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
