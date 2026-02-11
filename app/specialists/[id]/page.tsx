"use client"

import { use, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useRequestStore } from "@/lib/request-store"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookingModal } from "@/components/booking-modal"
import {
  BookOpen,
  Star,
  MapPin,
  Video,
  Home as HomeIcon,
  Award,
  Calendar,
  ArrowLeft,
  GraduationCap,
  Users,
  Heart,
  Share,
  Play,
  ChevronRight,
  MessageCircle,
  Check,
} from "lucide-react"

export default function SpecialistProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const { getActiveTrialCount } = useRequestStore()
  const [bookingOpen, setBookingOpen] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const resolvedParams = use(params)

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
        description: "Увійдіть в акаунт, щоб записатися до спеціаліста",
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
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="relative h-9 w-9 overflow-hidden rounded-lg">
                  <Image src={logoSrc} alt="Libitum" fill className="object-cover" />
                </div>
                <span className="text-lg font-bold text-slate-800">LIBITUM</span>
              </Link>
              <Link href={specialistsListHref} className="hidden sm:flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                До каталогу
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="outline" className="h-9 rounded-lg px-5 text-sm font-medium border border-slate-200 text-slate-700 hover:border-black transition-colors cursor-pointer">
                  Увійти
                </Button>
              </Link>
              <Link href="/register">
                <Button className="h-9 rounded-lg bg-[#009688] px-5 text-sm font-medium text-white hover:bg-[#00796B] cursor-pointer">
                  Реєстрація
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="border-b border-slate-100 bg-[#fafaf8]">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-slate-500">
            <Link href="/" className="hover:text-slate-800 transition-colors">Головна</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href={specialistsListHref} className="hover:text-slate-800 transition-colors">Спеціалісти</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-800 font-medium">{specialist.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-6xl">
        <div className="flex gap-8 lg:flex-row flex-col">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Profile Header */}
            <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="relative shrink-0 mx-auto sm:mx-0">
                <Avatar className="h-52 w-52 rounded-lg border border-slate-200 sm:h-56 sm:w-56">
                  <AvatarImage src={specialist.avatarUrl} alt={specialist.name} className="object-cover object-top" />
                  <AvatarFallback className="text-4xl font-bold bg-[#fafaf8] text-slate-400">{specialist.name[0]}</AvatarFallback>
                </Avatar>
                {specialist.verified && (
                  <div className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200">
                    <Award className="h-5 w-5 text-[#009688]" />
                  </div>
                )}
              </div>

              <div className="flex-1 pt-1 text-center sm:text-left">
                <div className="mb-4 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3">
                  <div className="space-y-3">
                    <h1 className="text-3xl font-bold text-slate-800">{specialist.name}</h1>
                    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
                      <span className="inline-flex items-center rounded-lg px-3 py-1 text-sm font-semibold bg-[#E0F2F1] text-[#009688]">
                        {specialist.specialization}
                      </span>
                      {specialist.badges.map((badge: string) => (
                        <span key={badge} className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleWishlist}
                      className="h-10 w-10 rounded-lg border border-slate-200 flex items-center justify-center hover:border-black transition-colors cursor-pointer"
                    >
                      <Heart className={`h-5 w-5 ${wishlisted ? "fill-red-500 text-red-500" : "text-slate-400"}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="h-10 w-10 rounded-lg border border-slate-200 flex items-center justify-center hover:border-black transition-colors cursor-pointer"
                    >
                      <Share className="h-5 w-5 text-slate-400" />
                    </button>
                  </div>
                </div>

                <div className="mb-5 flex flex-wrap justify-center sm:justify-start items-center gap-x-6 gap-y-2 text-sm text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-[#ffc107] text-[#ffc107]" />
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

                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {specialist.subjects.map((subject: string) => (
                    <span key={subject} className="inline-flex items-center rounded-lg bg-[#fafaf8] px-3 py-1.5 text-sm font-medium text-slate-600 border border-slate-100">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="about" className="space-y-8">
              <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent p-0 h-auto gap-8 rounded-none">
                <TabsTrigger
                  value="about"
                  className="rounded-none border-b-2 border-transparent px-0 py-3 text-base font-medium text-slate-500 data-[state=active]:border-[#009688] data-[state=active]:text-slate-800 data-[state=active]:shadow-none hover:text-slate-700 bg-transparent cursor-pointer"
                >
                  Про спеціаліста
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent px-0 py-3 text-base font-medium text-slate-500 data-[state=active]:border-[#009688] data-[state=active]:text-slate-800 data-[state=active]:shadow-none hover:text-slate-700 bg-transparent cursor-pointer"
                >
                  Відгуки ({specialist.reviews})
                </TabsTrigger>
                <TabsTrigger
                  value="schedule"
                  className="rounded-none border-b-2 border-transparent px-0 py-3 text-base font-medium text-slate-500 data-[state=active]:border-[#009688] data-[state=active]:text-slate-800 data-[state=active]:shadow-none hover:text-slate-700 bg-transparent cursor-pointer"
                >
                  Розклад
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-10">
                {/* Bio */}
                <section>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Про мене</h3>
                  <p className="text-lg leading-relaxed text-slate-600 whitespace-pre-line">
                    {specialist.bio}
                  </p>
                </section>

                {/* Video */}
                {specialist.videoIntroUrl && (
                  <section>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Відео-візитівка</h3>
                    <div className="relative overflow-hidden rounded-lg bg-slate-900 aspect-video border border-slate-200">
                      <video controls poster={specialist.avatarUrl} className="w-full h-full object-cover">
                        <source src={specialist.videoIntroUrl} type="video/mp4" />
                      </video>
                    </div>
                  </section>
                )}

                <div className="grid gap-8 md:grid-cols-2">
                  {/* Education */}
                  <section className="bg-[#fafaf8] rounded-lg p-6 border border-transparent hover:border-black transition-colors">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Освіта</h3>
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white text-[#009688] border border-slate-100">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{specialist.education}</h4>
                        <p className="text-slate-500 text-sm mt-1">Магістр філології</p>
                      </div>
                    </div>
                  </section>

                  {/* Certificates */}
                  <section className="bg-[#fafaf8] rounded-lg p-6 border border-transparent hover:border-black transition-colors">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Сертифікати</h3>
                    <div className="space-y-4">
                      {specialist.certificates.map((cert: { title: string; description: string }) => (
                        <div key={cert.title} className="flex gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white text-[#009688] border border-slate-100">
                            <Award className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800">{cert.title}</h4>
                            <p className="text-slate-500 text-sm mt-0.5">{cert.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Pricing */}
                <section>
                  <h3 className="text-xl font-bold text-slate-800 mb-6">Вартість навчання</h3>
                  <div className="grid gap-6">
                    {specialist.subjectsDetails.map(
                      (subject: {
                        subject: string
                        levels: { label: string; priceOnline?: number; priceOffline?: number; groupPrice?: number }[]
                        groupAvailable?: boolean
                      }) => (
                      <div key={subject.subject} className="rounded-lg border border-slate-200 bg-white p-6 hover:border-black transition-colors">
                        <div className="mb-4 flex items-center justify-between">
                          <h4 className="text-lg font-bold text-slate-800">{subject.subject}</h4>
                          {subject.groupAvailable && (
                            <span className="inline-flex items-center rounded-lg bg-[#E0F2F1] px-2.5 py-1 text-xs font-semibold text-[#009688]">
                              Групові доступні
                            </span>
                          )}
                        </div>
                        <div className="overflow-hidden rounded-lg border border-slate-100">
                          <div className="grid grid-cols-4 bg-[#fafaf8] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            <span>Рівень</span>
                            <span>Онлайн</span>
                            <span>Офлайн</span>
                            <span>Група</span>
                          </div>
                          <div className="divide-y divide-slate-100 bg-white">
                            {subject.levels.map((level: { label: string; priceOnline?: number; priceOffline?: number; groupPrice?: number }) => (
                              <div key={level.label} className="grid grid-cols-4 items-center px-4 py-3 text-sm hover:bg-[#fafaf8] transition-colors">
                                <span className="font-medium text-slate-800">{level.label}</span>
                                <span className="text-slate-600">{level.priceOnline ? `${level.priceOnline} ₴` : "---"}</span>
                                <span className="text-slate-600">{level.priceOffline ? `${level.priceOffline} ₴` : "---"}</span>
                                <span className="text-slate-600">{level.groupPrice ? `${level.groupPrice} ₴` : "---"}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="rounded-lg border border-slate-200 bg-white p-6 hover:border-black transition-colors">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E0F2F1] font-bold text-[#009688]">
                          {review.clientName[0]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{review.clientName}</p>
                          <p className="text-sm text-slate-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "fill-[#ffc107] text-[#ffc107]" : "fill-slate-100 text-slate-200"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="schedule" className="space-y-6">
                <div className="rounded-lg border border-slate-200 bg-white p-6 hover:border-black transition-colors">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Тижневий графік</h3>
                  <p className="text-sm text-slate-500 mb-6">Вільні слоти для бронювання</p>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      { day: "Понеділок", slots: ["10:00", "14:00", "18:00"] },
                      { day: "Вівторок", slots: ["12:00", "16:00"] },
                      { day: "Середа", slots: ["09:00", "15:00", "19:00"] },
                      { day: "Четвер", slots: ["11:00", "17:00"] },
                      { day: "П'ятниця", slots: ["10:00", "13:00"] },
                    ].map((day) => (
                      <div key={day.day} className="rounded-lg bg-[#fafaf8] p-4 border border-slate-100">
                        <div className="mb-3 flex items-center justify-between font-semibold text-slate-800">
                          <span>{day.day}</span>
                          <Calendar className="h-4 w-4 text-slate-400" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {day.slots.map((slot) => (
                            <button key={slot} className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-[#009688] hover:text-[#009688] transition-colors cursor-pointer">
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-24 flex flex-col gap-4">
              {/* Price card */}
              <div className="rounded-lg border border-slate-200 bg-white overflow-hidden hover:border-black transition-colors">
                <div className="bg-[#fafaf8] p-6 border-b border-slate-100 text-center">
                  <p className="text-sm font-medium text-slate-500 mb-1">Вартість заняття</p>
                  <div className="text-3xl font-bold text-[#009688]">
                    {specialist.priceOnline} ₴
                    <span className="text-lg text-slate-400 font-medium ml-1">/ год</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 font-medium">Перше пробне заняття безкоштовно</p>
                </div>

                <div className="p-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between rounded-lg bg-[#fafaf8] p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-slate-100 text-[#009688] flex-shrink-0">
                          <Video className="h-4 w-4" />
                        </div>
                        <span className="font-medium text-slate-700 text-sm">Онлайн</span>
                      </div>
                      <span className="font-bold text-slate-800">{specialist.priceOnline} ₴</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-[#fafaf8] p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-slate-100 text-[#009688] flex-shrink-0">
                          <HomeIcon className="h-4 w-4" />
                        </div>
                        <span className="font-medium text-slate-700 text-sm">Офлайн</span>
                      </div>
                      <span className="font-bold text-slate-800">{specialist.priceOffline} ₴</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#fafaf8]">
                    <MapPin className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                    <div className="text-sm text-slate-600">
                      <p className="font-medium text-slate-800 mb-0.5">Локація</p>
                      {specialist.location}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <Button
                      className="w-full h-12 rounded-lg bg-[#009688] text-white text-base font-semibold hover:bg-[#00796B] cursor-pointer"
                      onClick={handleBookingClick}
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Записатися на пробне
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-11 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:border-black transition-colors cursor-pointer"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Написати
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-1">
                    <Users className="h-3 w-3" />
                    <span>{specialist.currentStudents} учнів вже навчаються</span>
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="rounded-lg border border-slate-200 bg-white p-5 hover:border-black transition-colors">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">{specialist.experience}</div>
                    <div className="text-xs text-slate-500 mt-0.5">років досвіду</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">{specialist.acceptanceRate}%</div>
                    <div className="text-xs text-slate-500 mt-0.5">прийняття заявок</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">{specialist.responseTime}</div>
                    <div className="text-xs text-slate-500 mt-0.5">час відповіді</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#009688]">{specialist.completedSessions}</div>
                    <div className="text-xs text-slate-500 mt-0.5">проведено занять</div>
                  </div>
                </div>
              </div>

              {/* Guarantee */}
              <div className="rounded-lg bg-[#E0F2F1] p-4 text-center border border-[#b2ebf2]">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Check className="h-4 w-4 text-[#009688]" />
                  <span className="text-sm font-semibold text-[#009688]">Гарантія якості</span>
                </div>
                <p className="text-xs text-[#009688] leading-relaxed">
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
