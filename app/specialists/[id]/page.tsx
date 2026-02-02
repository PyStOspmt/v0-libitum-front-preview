"use client"

import { useState } from "react"
import Link from "next/link"
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
  MessageSquare,
  ArrowLeft,
  GraduationCap,
  Users,
  Heart,
  Share,
  Play,
  Flame,
} from "lucide-react"

export default function SpecialistProfilePage() {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const { getActiveTrialCount } = useRequestStore()
  const [bookingOpen, setBookingOpen] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

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

  // Mock specialist data
  const specialist = {
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
    videoIntroUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
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

  const handleStartChat = () => {
    // Navigate to client chats page
    router.push("/client/chats")
  }

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

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/specialists" className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">Libitum Education</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost">Увійти</Button>
              </Link>
              <Link href="/register">
                <Button>Реєстрація</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Profile Header */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex flex-col gap-6 md:flex-row">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={specialist.avatarUrl} alt={specialist.name} />
                    <AvatarFallback className="text-3xl">{specialist.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h1 className="text-2xl font-bold">{specialist.name}</h1>
                      {specialist.verified && (
                        <Badge variant="secondary" className="gap-1">
                          <Award className="h-3 w-3" />
                          Верифікований
                        </Badge>
                      )}
                      {specialist.badges.map((badge) => (
                        <Badge key={badge} variant="default" className="bg-amber-100 text-amber-800">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                    <p className="mb-3 text-muted-foreground">{specialist.specialization}</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {specialist.subjects.map((subject) => (
                        <Badge key={subject} variant="outline">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">{specialist.rating}</span>
                        <span className="text-muted-foreground">({specialist.reviews} відгуків)</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <span>{specialist.experience} років досвіду</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{specialist.completedSessions} занять</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <div className="flex items-center gap-1">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <span>Activity: {specialist.activityLevel}</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{specialist.currentStudents} учнів зараз</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-start">
                    <Button variant="outline" size="icon" onClick={handleWishlist} aria-label="wishlist">
                      <Heart className={`h-5 w-5 ${wishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleShare} aria-label="share">
                      <Share className="h-5 w-5 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="about" className="space-y-4">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="about">Про спеціаліста</TabsTrigger>
                <TabsTrigger value="reviews">Відгуки ({specialist.reviews})</TabsTrigger>
                <TabsTrigger value="schedule">Розклад</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Про мене</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{specialist.bio}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Відео-привітання</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative overflow-hidden rounded-2xl border bg-black/80">
                      <video controls poster={specialist.avatarUrl} className="w-full h-auto">
                        <source src={specialist.videoIntroUrl} type="video/mp4" />
                      </video>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Освіта</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{specialist.education}</p>
                        <p className="text-sm text-muted-foreground">Магістр філології</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Досягнення</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {specialist.achievements.map((achievement) => (
                        <Badge key={achievement} variant="secondary">
                          <Award className="mr-1 h-3 w-3" />
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Сертифікати</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {specialist.certificates.map((cert) => (
                      <div key={cert.title} className="rounded-lg border p-3">
                        <p className="font-medium">{cert.title}</p>
                        <p className="text-sm text-muted-foreground">{cert.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Предмети та рівні</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {specialist.subjectsDetails.map((subject) => (
                      <div key={subject.subject} className="rounded-xl border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="text-lg font-semibold">{subject.subject}</h4>
                          {subject.groupAvailable && <Badge variant="outline">Групові заняття</Badge>}
                        </div>
                        <div className="overflow-hidden rounded-lg border">
                          <div className="grid grid-cols-4 bg-muted px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">
                            <span>Рівень</span>
                            <span>Онлайн</span>
                            <span>Офлайн</span>
                            <span>Група</span>
                          </div>
                          {subject.levels.map((level) => (
                            <div key={level.label} className="grid grid-cols-4 items-center px-3 py-2 text-sm">
                              <span className="font-medium">{level.label}</span>
                              <span>{level.priceOnline ? `${level.priceOnline} ₴/год` : "—"}</span>
                              <span>{level.priceOffline ? `${level.priceOffline} ₴/год` : "—"}</span>
                              <span>{level.groupPrice ? `${level.groupPrice} ₴/год` : "—"}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Статистика</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Час відповіді</span>
                        <span className="font-medium">{specialist.responseTime}</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Прийняття запитів</span>
                        <span className="font-medium">{specialist.acceptanceRate}%</span>
                      </div>
                      <Progress value={specialist.acceptanceRate} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{review.clientName[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{review.clientName}</p>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{review.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Доступність</CardTitle>
                    <CardDescription>Вільні слоти для пробних та регулярних занять</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3 md:grid-cols-2">
                    {[{ day: "Понеділок", slots: ["10:00", "14:00", "18:00"] },
                      { day: "Вівторок", slots: ["12:00", "16:00"] },
                      { day: "Середа", slots: ["09:00", "15:00", "19:00"] },
                      { day: "Четвер", slots: ["11:00", "17:00"] },
                      { day: "Пʼятниця", slots: ["10:00", "13:00"] },
                    ].map((day) => (
                      <div key={day.day} className="rounded-xl border p-3">
                        <div className="mb-2 flex items-center justify-between text-sm font-semibold">
                          <span>{day.day}</span>
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {day.slots.map((slot) => (
                            <Badge key={slot} variant="outline">
                              {slot}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Записатися на заняття</CardTitle>
                <CardDescription>Оберіть формат та час</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Онлайн</span>
                    </div>
                    <span className="font-bold">{specialist.priceOnline} ₴/год</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Офлайн</span>
                    </div>
                    <span className="font-bold">{specialist.priceOffline} ₴/год</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {specialist.location}
                </div>

                <Button className="w-full" size="lg" onClick={handleBookingClick}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Записатися
                </Button>

                <Button variant="outline" className="w-full bg-transparent" size="lg" onClick={handleStartChat}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Написати
                </Button>

                <p className="text-center text-xs text-muted-foreground">Перше заняття безкоштовно</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} specialist={specialist} />
    </div>
  )
}
