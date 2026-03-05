"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlayCircle, FileText, CheckCircle2, XCircle, TrendingUp, TrendingDown, Eye, AlertCircle, Edit2, Save, X } from "lucide-react"

const moderationQueue = [
  {
    id: "t1",
    name: "Олена Іваненко",
    subject: "Англійська мова",
    status: "pending",
    experience: "8 років",
    email: "olena@example.com",
    phone: "+380501234567",
    videoUrl: "https://youtube.com/watch?v=123",
    education: "КНУ ім. Шевченка, Філологія",
    about: "Досвідчений викладач, готую до IELTS та ЗНО. Жила 2 роки в Лондоні.",
    diplomaUrl: "/dummy-diploma.pdf",
    prices: [
      { level: "B1", price: 400 },
      { level: "IELTS", price: 600 }
    ]
  },
  {
    id: "t2",
    name: "Петро Коваль",
    subject: "Математика",
    status: "pending",
    experience: "5 років",
    email: "petro@example.com",
    phone: "+380671234567",
    videoUrl: "",
    education: "КПІ, Механіко-математичний",
    about: "Студент магістратури, легко знаходжу спільну мову з дітьми. Готую до ДПА та ЗНО.",
    diplomaUrl: "/dummy-diploma.pdf",
    prices: [
      { level: "5-9 класи", price: 300 },
      { level: "ЗНО", price: 450 }
    ]
  },
]

const leaderboard = [
  { id: "1", name: "Анна Мельник", score: 98, trend: "up", change: "+2" },
  { id: "2", name: "Ігор Сидоренко", score: 95, trend: "up", change: "+1" },
  { id: "3", name: "Марія Коваленко", score: 92, trend: "same", change: "0" },
  { id: "4", name: "Олег Бондар", score: 85, trend: "down", change: "-5" },
  { id: "5", name: "Ірина Петренко", score: 72, trend: "down", change: "-12" },
]

export function AdminModerationPage() {
  const [comments, setComments] = useState<Record<string, string>>({})
  const [queue, setQueue] = useState(moderationQueue)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<any>(null)

  const handleAction = (id: string, action: "approve" | "reject") => {
    if (action === "reject" && !comments[id]) {
      alert("Для відхилення обов'язково потрібно вказати причину в коментарі.")
      return
    }
    setQueue(queue.filter(q => q.id !== id))
  }

  const startEditing = (item: any) => {
    setEditingId(item.id)
    setEditForm({ ...item })
  }

  const saveEdits = () => {
    setQueue(queue.map(q => q.id === editingId ? editForm : q))
    setEditingId(null)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const updatePrice = (index: number, field: string, value: string | number) => {
    const newPrices = [...editForm.prices]
    newPrices[index] = { ...newPrices[index], [field]: value }
    setEditForm({ ...editForm, prices: newPrices })
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <SidebarLayout userType="admin">
        <div className="container mx-auto max-w-7xl space-y-6 p-6 font-sans">
          <div className="space-y-1">
            <h1 className="text-3xl font-[700] text-[#121117]">Контроль якості та Модерація</h1>
            <p className="text-[15px] font-[500] text-[#69686f]">Перевірка профілів спеціалістів та моніторинг рейтингів.</p>
          </div>

          <Tabs defaultValue="queue" className="w-full">
            <TabsList className="bg-[#f0f3f3] rounded-[12px] p-1 border-0 h-[48px]">
              <TabsTrigger value="queue" className="rounded-[8px] h-full data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f] px-6">
                Черга модерації ({queue.length})
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="rounded-[8px] h-full data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f] px-6">
                Рейтинги репетиторів
              </TabsTrigger>
            </TabsList>

            <TabsContent value="queue" className="mt-6 space-y-6">
              {queue.length > 0 ? (
                queue.map((item) => {
                  const isEditing = editingId === item.id;
                  const data = isEditing ? editForm : item;

                  return (
                    <Card key={item.id} className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
                      <div className="flex flex-col lg:flex-row">
                        {/* Left: Profile Info */}
                        <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
                          <div className="flex justify-between items-start mb-6">
                            <div className="flex-1 mr-4">
                              {isEditing ? (
                                <div className="space-y-3">
                                  <div>
                                    <Label>ПІБ</Label>
                                    <Input value={data.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <Label>Предмет</Label>
                                      <Input value={data.subject} onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })} />
                                    </div>
                                    <div>
                                      <Label>Досвід</Label>
                                      <Input value={data.experience} onChange={(e) => setEditForm({ ...editForm, experience: e.target.value })} />
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <h3 className="text-2xl font-[700] text-[#121117]">{item.name}</h3>
                                  <p className="text-[15px] text-[#69686f] font-[500]">{item.subject} • {item.experience}</p>
                                </>
                              )}
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-0">
                                Очікує перевірки
                              </Badge>
                              {!isEditing ? (
                                <Button variant="ghost" size="sm" onClick={() => startEditing(item)} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                  <Edit2 className="h-4 w-4 mr-2" /> Редагувати
                                </Button>
                              ) : (
                                <div className="flex gap-2 mt-2">
                                  <Button size="sm" onClick={saveEdits} className="bg-[#00c5a6] hover:bg-[#00a389] text-white">
                                    <Save className="h-4 w-4 mr-1" /> Зберегти
                                  </Button>
                                  <Button size="sm" variant="ghost" onClick={cancelEditing}>
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-4">
                              <div>
                                <div className="text-[13px] font-[600] text-[#69686f] uppercase tracking-wider mb-1">Контакти</div>
                                {isEditing ? (
                                  <div className="space-y-2">
                                    <Input value={data.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} placeholder="Email" />
                                    <Input value={data.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} placeholder="Телефон" />
                                  </div>
                                ) : (
                                  <>
                                    <div className="text-[15px] font-[500]">{item.email}</div>
                                    <div className="text-[15px] font-[500]">{item.phone}</div>
                                  </>
                                )}
                              </div>
                              <div>
                                <div className="text-[13px] font-[600] text-[#69686f] uppercase tracking-wider mb-1">Освіта</div>
                                {isEditing ? (
                                  <Input value={data.education} onChange={(e) => setEditForm({ ...editForm, education: e.target.value })} />
                                ) : (
                                  <div className="text-[15px] font-[500]">{item.education}</div>
                                )}
                              </div>
                              <div>
                                <div className="text-[13px] font-[600] text-[#69686f] uppercase tracking-wider mb-1">Про себе</div>
                                {isEditing ? (
                                  <Textarea rows={4} value={data.about} onChange={(e) => setEditForm({ ...editForm, about: e.target.value })} className="resize-none" />
                                ) : (
                                  <div className="text-[15px] font-[500]">{item.about}</div>
                                )}
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <div className="text-[13px] font-[600] text-[#69686f] uppercase tracking-wider mb-2">Медіа та Документи</div>
                                <div className="flex flex-col gap-2">
                                  {isEditing ? (
                                    <Input value={data.videoUrl} onChange={(e) => setEditForm({ ...editForm, videoUrl: e.target.value })} placeholder="URL відеовізитки" />
                                  ) : (
                                    data.videoUrl ? (
                                      <a href={data.videoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline font-[500] bg-blue-50 p-2.5 rounded-[8px]">
                                        <PlayCircle className="h-5 w-5" /> Відеовізитка
                                      </a>
                                    ) : (
                                      <div className="flex items-center gap-2 text-slate-400 font-[500] bg-slate-50 p-2.5 rounded-[8px]">
                                        <AlertCircle className="h-5 w-5" /> Відео відсутнє
                                      </div>
                                    )
                                  )}
                                  <a href="#" className="flex items-center gap-2 text-blue-600 hover:underline font-[500] bg-blue-50 p-2.5 rounded-[8px]">
                                    <FileText className="h-5 w-5" /> Диплом / Сертифікат
                                  </a>
                                </div>
                              </div>

                              <div>
                                <div className="text-[13px] font-[600] text-[#69686f] uppercase tracking-wider mb-2">Ціни</div>
                                <div className="space-y-2">
                                  {data.prices.map((p: any, i: number) => (
                                    <div key={i} className="flex justify-between items-center bg-[#f0f3f3] p-2.5 rounded-[8px] text-[14px] font-[500]">
                                      {isEditing ? (
                                        <>
                                          <Input className="h-8 w-1/2 mr-2" value={p.level} onChange={(e) => updatePrice(i, 'level', e.target.value)} />
                                          <div className="flex items-center gap-1 w-1/3">
                                            <Input className="h-8" type="number" value={p.price} onChange={(e) => updatePrice(i, 'price', Number(e.target.value))} />
                                            <span>₴</span>
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <span>{p.level}</span>
                                          <span className="font-[600] text-[#121117]">{p.price} ₴</span>
                                        </>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="w-full lg:w-[350px] p-6 bg-slate-50 flex flex-col gap-4">
                          <h4 className="font-[600] text-[#121117]">Рішення</h4>
                          
                          <div className="flex-1">
                            <Textarea
                              value={comments[item.id] || ""}
                              onChange={(e) => setComments({ ...comments, [item.id]: e.target.value })}
                              placeholder="Коментар обов'язковий при відхиленні. Буде надіслано репетитору на email."
                              className="w-full h-[150px] resize-none rounded-[12px] bg-white border-slate-200"
                            />
                          </div>

                          <div className="flex flex-col gap-3 mt-auto">
                            <Button 
                              className="w-full h-[48px] rounded-[10px] bg-[#00c5a6] hover:bg-[#00a389] text-white font-[600] text-[16px]"
                              onClick={() => handleAction(item.id, "approve")}
                              disabled={isEditing}
                            >
                              <CheckCircle2 className="mr-2 h-5 w-5" /> Затвердити
                            </Button>
                            <Button 
                              variant="outline" 
                              className="w-full h-[48px] rounded-[10px] border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-[600] text-[16px]"
                              onClick={() => handleAction(item.id, "reject")}
                              disabled={isEditing}
                            >
                              <XCircle className="mr-2 h-5 w-5" /> Відхилити
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                })
              ) : (
                <Card className="border-dashed border-2 py-16 bg-slate-50/50">
                  <div className="flex flex-col items-center justify-center text-center">
                    <CheckCircle2 className="h-12 w-12 text-[#00c5a6] mb-4" />
                    <h3 className="text-xl font-bold text-[#121117]">Черга порожня</h3>
                    <p className="text-[#69686f] mt-2">Всі нові анкети перевірені</p>
                  </div>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="leaderboard" className="mt-6 space-y-4">
              <Card className="rounded-[24px] border-slate-200/80 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-[700]">Efficiency Score Leaderboard</CardTitle>
                  <CardDescription>Поточний рейтинг репетиторів на основі конверсії та якості.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {leaderboard.map((tutor, idx) => (
                      <div key={tutor.id} className="flex items-center justify-between p-4 rounded-[12px] border border-slate-100 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="font-[700] text-slate-400 w-6">#{idx + 1}</div>
                          <div className="font-[600]">{tutor.name}</div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            {tutor.trend === "up" && <TrendingUp className="h-4 w-4 text-emerald-500" />}
                            {tutor.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                            {tutor.trend === "same" && <div className="h-4 w-4 bg-slate-200 rounded-full flex items-center justify-center text-[10px] text-slate-500">-</div>}
                            <span className={cn(
                              "font-[600] text-[14px]",
                              tutor.trend === "up" ? "text-emerald-500" : tutor.trend === "down" ? "text-red-500" : "text-slate-500"
                            )}>
                              {tutor.change}
                            </span>
                          </div>
                          <div className="font-[700] text-[18px] w-12 text-right">{tutor.score}</div>
                        </div>
                      </div>
                    ))}
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
