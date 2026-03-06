"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export function AdminSeoPage() {
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
        <div className="container mx-auto max-w-6xl space-y-6 p-6 font-sans">
          <div className="space-y-1">
            <h1 className="text-3xl font-[700] text-[#121117]">SEO-налаштування</h1>
            <p className="text-[15px] font-[500] text-[#69686f]">Редагування мета-тегів та загальних SEO-налаштувань платформи.</p>
          </div>

          <Tabs defaultValue="pages" className="w-full">
            <TabsList className="bg-[#f0f3f3] rounded-[12px] p-1 border-0 grid w-full max-w-md grid-cols-2 mb-6 h-[48px]">
              <TabsTrigger value="pages" className="rounded-[8px] h-full data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f]">Публічні сторінки</TabsTrigger>
              <TabsTrigger value="advanced" className="rounded-[8px] h-full data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f]">Технічне SEO</TabsTrigger>
            </TabsList>

            <TabsContent value="pages" className="space-y-4">
              <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                <CardHeader>
                  <CardTitle className="text-xl font-[700] text-[#121117]">Список сторінок</CardTitle>
                  <CardDescription className="text-[#69686f] font-[500]">Оберіть сторінку для редагування мета-даних.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pages.map((page) => (
                    <div key={page.path} className="flex flex-wrap items-center justify-between gap-2 rounded-[16px] border border-slate-200/80 bg-[#f0f3f3]/50 p-4 transition-colors hover:bg-[#f0f3f3]">
                      <div>
                        <div className="text-[16px] font-[700] text-[#121117]">{page.title}</div>
                        <div className="text-[13px] font-[500] text-[#69686f] mt-1 bg-white px-2 py-0.5 rounded-[6px] border border-slate-200/80 inline-block font-mono">{page.path}</div>
                      </div>
                      <Dialog open={selected?.path === page.path} onOpenChange={(open) => !open && setSelected(null)}>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => openEdit(page)} className="rounded-[8px] border-slate-200/80 text-[#121117] font-[600] hover:bg-white shadow-sm">
                            Редагувати
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-[24px] border-0 shadow-[0_8px_32px_rgba(0,0,0,0.08)] font-sans sm:max-w-lg">
                          <DialogHeader className="pb-4 border-b border-slate-200/80">
                            <DialogTitle className="text-[24px] font-[700] text-[#121117]">SEO: {page.title}</DialogTitle>
                            <DialogDescription className="text-[#69686f] font-[500] text-[15px]">Мета-теги та контент для {page.path}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <Input placeholder="Meta Title" value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]" />
                            <Input
                              placeholder="Meta Description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                            />
                            <Input placeholder="H1" value={h1} onChange={(e) => setH1(e.target.value)} className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]" />
                            <Textarea
                              placeholder="SEO текст (відображається внизу сторінки)"
                              className="min-h-[140px] rounded-[12px] border-slate-200/80 focus-visible:ring-[#00c5a6] resize-none text-[15px]"
                              value={seoText}
                              onChange={(e) => setSeoText(e.target.value)}
                            />
                            <div className="flex justify-end gap-2 pt-2">
                              <Button variant="outline" onClick={() => setSelected(null)} className="rounded-[8px] border-slate-200/80 hover:bg-[#f0f3f3] text-[#121117] font-[600]">
                                Скасувати
                              </Button>
                              <Button onClick={handleSave} className="rounded-[8px] bg-[#00c5a6] text-white hover:bg-[#00a389] font-[600] shadow-[0_2px_8px_rgba(0,197,166,0.2)]">Зберегти зміни</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                <CardHeader>
                  <CardTitle className="text-xl font-[700] text-[#121117]">Файл robots.txt</CardTitle>
                  <CardDescription className="text-[#69686f] font-[500]">Налаштування правил індексації для пошукових систем.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea 
                    className="font-mono text-[13px] min-h-[200px] rounded-[12px] border-slate-200/80 focus-visible:ring-[#00c5a6] bg-[#f0f3f3]/30"
                    defaultValue={`User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\nDisallow: /_next/\n\nSitemap: https://libitum.com/sitemap.xml`}
                  />
                  <div className="flex justify-end">
                    <Button className="rounded-[8px] bg-[#121117] text-white hover:bg-[#121117]/90 font-[600]">Оновити robots.txt</Button>
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
