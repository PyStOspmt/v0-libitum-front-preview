"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { BookOpen, Search, Star, MapPin, Video, Home, Award, SlidersHorizontal } from "lucide-react"

export default function SpecialistsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(true)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [onlineOnly, setOnlineOnly] = useState(false)
  const [offlineOnly, setOfflineOnly] = useState(false)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])

  const specialists = [
    {
      id: 1,
      name: "Олена Іваненко",
      specialization: "Репетитор",
      subjects: ["Англійська мова", "Німецька мова"],
      rating: 4.9,
      reviews: 48,
      experience: 5,
      priceOnline: 400,
      priceOffline: 500,
      location: "Київ",
      verified: true,
      online: true,
      offline: true,
      bio: "Маю 5 років досвіду викладання англійської мови. Працюю з учнями різного віку.",
    },
    {
      id: 2,
      name: "Петро Коваль",
      specialization: "Репетитор",
      subjects: ["Математика", "Фізика"],
      rating: 4.8,
      reviews: 35,
      experience: 7,
      priceOnline: 450,
      priceOffline: 550,
      location: "Київ",
      verified: true,
      online: true,
      offline: true,
      bio: "Досвідчений викладач математики та фізики. Підготовка до ЗНО.",
    },
    {
      id: 3,
      name: "Марія Коваленко",
      specialization: "Психолог",
      subjects: ["Індивідуальна терапія", "Сімейна терапія"],
      rating: 5.0,
      reviews: 62,
      experience: 10,
      priceOnline: 600,
      priceOffline: 700,
      location: "Київ",
      verified: true,
      online: true,
      offline: false,
      bio: "Клінічний психолог з 10-річним досвідом. Спеціалізуюсь на роботі з тривожністю.",
    },
    {
      id: 4,
      name: "Анна Мельник",
      specialization: "Логопед",
      subjects: ["Постановка звуків", "Корекція мовлення"],
      rating: 4.9,
      reviews: 41,
      experience: 8,
      priceOnline: 500,
      priceOffline: 600,
      location: "Київ",
      verified: true,
      online: true,
      offline: true,
      bio: "Логопед-дефектолог. Працюю з дітьми та дорослими.",
    },
  ]

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
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
        <div className="mb-8">
          <h1 className="mb-6 text-3xl font-bold">Знайти спеціаліста</h1>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Пошук за ім'ям або предметом..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всі спеціалісти</SelectItem>
                <SelectItem value="tutor">Репетитори</SelectItem>
                <SelectItem value="psychologist">Психологи</SelectItem>
                <SelectItem value="speech-therapist">Логопеди</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="md:w-auto">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Фільтри
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {showFilters && (
            <div className="space-y-6 lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Фільтри</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Ціна за годину</Label>
                    <div className="space-y-2">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={1000}
                        step={50}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{priceRange[0]} ₴</span>
                        <span>{priceRange[1]} ₴</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Формат занять</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="online"
                          checked={onlineOnly}
                          onCheckedChange={(checked) => setOnlineOnly(checked as boolean)}
                        />
                        <Label htmlFor="online" className="text-sm font-normal cursor-pointer">
                          Онлайн
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="offline"
                          checked={offlineOnly}
                          onCheckedChange={(checked) => setOfflineOnly(checked as boolean)}
                        />
                        <Label htmlFor="offline" className="text-sm font-normal cursor-pointer">
                          Офлайн
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="verified"
                        checked={verifiedOnly}
                        onCheckedChange={(checked) => setVerifiedOnly(checked as boolean)}
                      />
                      <Label htmlFor="verified" className="text-sm font-normal cursor-pointer">
                        Тільки верифіковані
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Предмети</Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {[
                        "Англійська мова",
                        "Німецька мова",
                        "Математика",
                        "Фізика",
                        "Хімія",
                        "Українська мова",
                        "Історія",
                        "Біологія",
                      ].map((subject) => (
                        <div key={subject} className="flex items-center space-x-2">
                          <Checkbox
                            id={subject}
                            checked={selectedSubjects.includes(subject)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedSubjects([...selectedSubjects, subject])
                              } else {
                                setSelectedSubjects(selectedSubjects.filter((s) => s !== subject))
                              }
                            }}
                          />
                          <Label htmlFor={subject} className="text-sm font-normal cursor-pointer">
                            {subject}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => {
                      setPriceRange([0, 1000])
                      setOnlineOnly(false)
                      setOfflineOnly(false)
                      setVerifiedOnly(false)
                      setSelectedSubjects([])
                    }}
                  >
                    Скинути фільтри
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
            <div className="mb-4 text-sm text-muted-foreground">Знайдено {specialists.length} спеціалістів</div>

            <div className="grid gap-6 md:grid-cols-2">
              {specialists.map((specialist) => (
                <Card key={specialist.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-xl">{specialist.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              {specialist.name}
                              {specialist.verified && (
                                <Badge variant="secondary" className="gap-1">
                                  <Award className="h-3 w-3" />
                                  Верифікований
                                </Badge>
                              )}
                            </CardTitle>
                            <CardDescription>{specialist.specialization}</CardDescription>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{specialist.rating}</span>
                            <span className="text-muted-foreground">({specialist.reviews})</span>
                          </div>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{specialist.experience} років досвіду</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {specialist.subjects.map((subject) => (
                        <Badge key={subject} variant="outline">
                          {subject}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{specialist.bio}</p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {specialist.location}
                      </div>
                      {specialist.online && (
                        <div className="flex items-center gap-1">
                          <Video className="h-4 w-4" />
                          Онлайн
                        </div>
                      )}
                      {specialist.offline && (
                        <div className="flex items-center gap-1">
                          <Home className="h-4 w-4" />
                          Офлайн
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between border-t pt-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Від</div>
                        <div className="text-xl font-bold">{specialist.priceOnline} ₴/год</div>
                      </div>
                      <Link href={`/specialists/${specialist.id}`}>
                        <Button>Переглянути профіль</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
