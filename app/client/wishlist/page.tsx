"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, User, MapPin, Heart, BookOpen } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ClientWishlistPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const children = [
    { id: "child-1", label: "Марія, 12 років" },
    { id: "child-2", label: "Іван, 9 років" },
  ]
  const initialChild = searchParams.get("child") || children[0].id
  const selectedChildId = children.find((child) => child.id === initialChild)?.id || children[0].id
  
  // Mock wishlist data - in real app would come from a store or API
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "Олена Іваненко",
      subjects: ["Англійська мова"],
      rating: 4.9,
      reviews: 48,
      experience: 5,
      priceMin: 400,
      location: "Київ",
      verified: true,
    },
    {
      id: 2,
      name: "Петро Коваль",
      subjects: ["Математика"],
      rating: 4.8,
      reviews: 35,
      experience: 7,
      priceMin: 450,
      location: "Львів",
      verified: true,
    }
  ])

  const removeFromWishlist = (id: number) => {
    setWishlist(prev => prev.filter(item => item.id !== id))
    toast({
      title: "Видалено з обраного",
      description: "Спеціаліста видалено з вашого списку",
    })
  }

  return (
    <ProtectedRoute allowedRoles={["client"]}>
      <SidebarLayout userType="client">
        <div className="container mx-auto max-w-7xl space-y-6 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Обрані спеціалісти</h1>
              <p className="text-muted-foreground">Ваш список збережених викладачів</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {children.map((child) => (
                  <Button
                    key={child.id}
                    variant={child.id === selectedChildId ? "default" : "outline"}
                    size="sm"
                    onClick={() => router.push(`/client/wishlist?child=${child.id}`)}
                  >
                    {child.label}
                  </Button>
                ))}
              </div>
            </div>
            <Button onClick={() => router.push("/specialists")}>Знайти більше</Button>
          </div>

          {wishlist.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {wishlist.map((specialist) => (
                <Card key={specialist.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {specialist.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{specialist.name}</CardTitle>
                          <div className="mt-1 flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{specialist.rating}</span>
                            <span className="text-muted-foreground">({specialist.reviews})</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => removeFromWishlist(specialist.id)}
                      >
                        <Heart className="fill-current h-5 w-5" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {specialist.subjects.map((subj) => (
                        <Badge key={subj} variant="secondary">
                          {subj}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {specialist.location}
                      </div>
                      <span>{specialist.experience} років досвіду</span>
                    </div>

                    <div className="flex items-center justify-between border-t pt-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Від</div>
                        <div className="text-xl font-bold">{specialist.priceMin} ₴/год</div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => router.push(`/client/requests/new?child=${selectedChildId}&specialist=${specialist.id}`)}
                        >
                          Створити запит
                        </Button>
                        <Button onClick={() => router.push(`/specialists/${specialist.id}`)}>Детальніше</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Heart className="mb-4 h-16 w-16 text-muted-foreground" />
                <h3 className="mb-2 text-xl font-semibold">Список порожній</h3>
                <p className="mb-6 text-center text-muted-foreground">
                  Зберігайте спеціалістів, які вам сподобалися, щоб не загубити їх
                </p>
                <Button onClick={() => router.push("/specialists")}>Знайти спеціаліста</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
