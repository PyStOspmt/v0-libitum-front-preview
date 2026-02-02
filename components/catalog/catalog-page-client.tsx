"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { BookOpen, MapPin, Search, Star, Award, Heart } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getCityBySlug, getSubjectBySlug } from "@/lib/catalog-dictionaries"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"

type CatalogPageClientProps = {
  subjectSlug: string
  citySlug: string
}

export function CatalogPageClient({ subjectSlug, citySlug }: CatalogPageClientProps) {
  const [sortBy, setSortBy] = useState("rating_desc")
  const { user } = useAuth()
  const { toast } = useToast()
  
  // Use a proper state for wishlist, but initialize it from user data if possible
  // For MVP we'll use a local state that would ideally sync with a backend
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
        name: "Олена Іваненко",
        subjects: ["Англійська мова"],
        rating: 4.9,
        reviews: 48,
        experience: 5,
        priceMin: 400,
        location: city?.name ?? "Онлайн",
        verified: true,
        efficiencyScore: 95,
      },
      {
        id: 2,
        name: "Петро Коваль",
        subjects: ["Математика"],
        rating: 4.8,
        reviews: 35,
        experience: 7,
        priceMin: 450,
        location: city?.name ?? "Онлайн",
        verified: true,
        efficiencyScore: 92,
      },
    ],
    [city?.name],
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-libitum-teal to-libitum-emerald">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-semibold">Libitum</span>
                <span className="block text-xs text-muted-foreground">Education</span>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost">Увійти</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-libitum-teal to-libitum-emerald hover:opacity-90">Реєстрація</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Головна
          </Link>
          <span>/</span>
          <Link href="/specialists" className="hover:text-foreground">
            Спеціалісти
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{subject?.name}</span>
          <span>/</span>
          <span className="text-foreground font-medium">{city?.name}</span>
        </div>

        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">
            {subject?.name} у {city?.name}
          </h1>
          <p className="text-muted-foreground">Знайдено {specialists.length} перевірених спеціалістів</p>
        </div>

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Пошук за ім'ям..." className="pl-10" />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[240px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating_desc">За рейтингом</SelectItem>
              <SelectItem value="price_asc">За ціною (дешевші)</SelectItem>
              <SelectItem value="price_desc">За ціною (дорожчі)</SelectItem>
              <SelectItem value="reviews_desc">За відгуками</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {specialists.map((specialist) => (
            <Card key={specialist.id} className="overflow-hidden transition-all hover:shadow-lg hover:border-libitum-teal/50">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-xl bg-gradient-to-br from-libitum-teal to-libitum-emerald text-white">
                      {specialist.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="flex items-center gap-2 text-base">
                        {specialist.name}
                        {specialist.verified && (
                          <Badge variant="secondary" className="gap-1 text-xs">
                            <Award className="h-3 w-3" />
                          </Badge>
                        )}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={wishlist.includes(specialist.id) ? "text-red-500 hover:text-red-600" : "text-muted-foreground"}
                        onClick={() => toggleWishlist(specialist.id)}
                      >
                        <Heart className={wishlist.includes(specialist.id) ? "fill-current h-5 w-5" : "h-5 w-5"} />
                      </Button>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{specialist.rating}</span>
                        <span className="text-muted-foreground">({specialist.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {specialist.subjects.map((subj) => (
                    <Badge key={subj} variant="outline" className="border-libitum-teal/30">
                      {subj}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {specialist.location}
                  </div>
                  <span>{specialist.experience} років</span>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Від</div>
                    <div className="text-xl font-bold">{specialist.priceMin} ₴/год</div>
                  </div>
                  <Link href={`/specialists/${specialist.id}`}>
                    <Button className="bg-gradient-to-r from-libitum-teal to-libitum-emerald hover:opacity-90">Переглянути</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
