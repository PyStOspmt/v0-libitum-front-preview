"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const pages = [
  { path: "/", title: "Головна" },
  { path: "/catalog/math/kyiv", title: "Каталог" },
  { path: "/specialists/123", title: "Профіль спеціаліста" },
  { path: "/faq", title: "FAQ" },
]

export default function AdminSeoPage() {
  const [selected, setSelected] = useState<(typeof pages)[number] | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [h1, setH1] = useState("")
  const [seoText, setSeoText] = useState("")

  const openEdit = (page: (typeof pages)[number]) => {
    setSelected(page)
    setTitle(page.title)
    setDescription(`Description for ${page.title}`)
    setH1(page.title)
    setSeoText("")
  }

  const handleSave = () => {
    // mock save; in real app call API
    setSelected(null)
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <SidebarLayout userType="admin">
        <div className="container mx-auto max-w-6xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">SEO-налаштування</h1>
            <p className="text-muted-foreground">Редагування мета-тегів та SEO-текстів для публічних сторінок.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Список сторінок</CardTitle>
              <CardDescription>Оберіть сторінку для редагування мета-даних.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {pages.map((page) => (
                <div key={page.path} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3">
                  <div>
                    <div className="text-sm font-medium">{page.title}</div>
                    <div className="text-xs text-muted-foreground">{page.path}</div>
                  </div>
                  <Dialog open={selected?.path === page.path} onOpenChange={(open) => !open && setSelected(null)}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" onClick={() => openEdit(page)}>
                        Редагувати
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>SEO: {page.title}</DialogTitle>
                        <DialogDescription>Мета-теги та контент для {page.path}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-3">
                        <Input placeholder="Meta Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <Input
                          placeholder="Meta Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                        <Input placeholder="H1" value={h1} onChange={(e) => setH1(e.target.value)} />
                        <Textarea
                          placeholder="SEO текст"
                          className="min-h-[140px]"
                          value={seoText}
                          onChange={(e) => setSeoText(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" onClick={() => setSelected(null)}>
                            Скасувати
                          </Button>
                          <Button onClick={handleSave}>Зберегти зміни</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
