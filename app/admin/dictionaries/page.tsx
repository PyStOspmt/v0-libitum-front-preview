"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const subjects = [
  { name: "Математика", slug: "math", status: "active" },
  { name: "Англійська", slug: "english", status: "active" },
  { name: "Фізика", slug: "physics", status: "inactive" },
]

const cities = [
  { name: "Київ", slug: "kyiv", status: "active" },
  { name: "Львів", slug: "lviv", status: "active" },
  { name: "Одеса", slug: "odesa", status: "inactive" },
]

export default function AdminDictionariesPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <SidebarLayout userType="admin">
        <div className="container mx-auto max-w-6xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">Довідники</h1>
            <p className="text-muted-foreground">Керування предметами та містами для каталогу.</p>
          </div>

          <Tabs defaultValue="subjects">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="subjects">Предмети</TabsTrigger>
              <TabsTrigger value="cities">Міста</TabsTrigger>
            </TabsList>

            <TabsContent value="subjects" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Список предметів</CardTitle>
                  <CardDescription>Додавайте, редагуйте slug та керуйте статусами.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {subjects.map((subject) => (
                    <div key={subject.slug} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3">
                      <div>
                        <div className="text-sm font-medium">{subject.name}</div>
                        <div className="text-xs text-muted-foreground">slug: {subject.slug}</div>
                      </div>
                      <Button size="sm" variant={subject.status === "active" ? "outline" : "secondary"}>
                        {subject.status === "active" ? "Активний" : "Вимкнений"}
                      </Button>
                    </div>
                  ))}
                  <div className="grid gap-2 md:grid-cols-[1fr_auto]">
                    <Input placeholder="Новий предмет" />
                    <Button>Додати</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cities" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Список міст</CardTitle>
                  <CardDescription>Керуйте доступністю міст у каталозі.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {cities.map((city) => (
                    <div key={city.slug} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3">
                      <div>
                        <div className="text-sm font-medium">{city.name}</div>
                        <div className="text-xs text-muted-foreground">slug: {city.slug}</div>
                      </div>
                      <Button size="sm" variant={city.status === "active" ? "outline" : "secondary"}>
                        {city.status === "active" ? "Активне" : "Вимкнене"}
                      </Button>
                    </div>
                  ))}
                  <div className="grid gap-2 md:grid-cols-[1fr_auto]">
                    <Input placeholder="Нове місто" />
                    <Button>Додати</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
