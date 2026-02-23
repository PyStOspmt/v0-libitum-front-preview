"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { useDictionaryStore, type Subject, type Level } from "@/lib/dictionary-store"
import { useToast } from "@/hooks/use-toast"

export default function AdminDictionariesPage() {
  const {
    subjects,
    cities,
    addSubject,
    updateSubject,
    toggleSubjectStatus,
    addLevel,
    updateLevel,
    removeLevel,
    addCity,
    toggleCityStatus,
  } = useDictionaryStore()
  const { toast } = useToast()

  const [isSubjectDialogOpen, setIsSubjectDialogOpen] = useState(false)
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null)
  const [subjectForm, setSubjectForm] = useState({
    name: "",
    slug: "",
    defaultBasePrice: 250,
    defaultMinPrice: 150,
    defaultStepValue: 10,
  })

  const [isLevelDialogOpen, setIsLevelDialogOpen] = useState(false)
  const [editingLevel, setEditingLevel] = useState<{ subjectId: string; level: Level | null } | null>(null)
  const [levelForm, setLevelForm] = useState({
    label: "",
    basePrice: 0,
    minPrice: 0,
    stepValue: 0,
  })

  const [newCityName, setNewCityName] = useState("")
  const [newCitySlug, setNewCitySlug] = useState("")

  const handleOpenSubjectDialog = (subject?: Subject) => {
    if (subject) {
      setEditingSubject(subject)
      setSubjectForm({
        name: subject.name,
        slug: subject.slug,
        defaultBasePrice: subject.defaultBasePrice,
        defaultMinPrice: subject.defaultMinPrice,
        defaultStepValue: subject.defaultStepValue,
      })
    } else {
      setEditingSubject(null)
      setSubjectForm({
        name: "",
        slug: "",
        defaultBasePrice: 250,
        defaultMinPrice: 150,
        defaultStepValue: 10,
      })
    }
    setIsSubjectDialogOpen(true)
  }

  const handleSaveSubject = () => {
    if (!subjectForm.name || !subjectForm.slug) return

    if (editingSubject) {
      updateSubject(editingSubject.id, subjectForm)
      toast({ title: "Предмет оновлено" })
    } else {
      addSubject({ ...subjectForm, status: "active" })
      toast({ title: "Предмет створено" })
    }
    setIsSubjectDialogOpen(false)
  }

  const handleOpenLevelDialog = (subjectId: string, level?: Level) => {
    const subject = subjects.find((item) => item.id === subjectId)
    if (!subject) return

    if (level) {
      setEditingLevel({ subjectId, level })
      setLevelForm({
        label: level.label,
        basePrice: level.basePrice,
        minPrice: level.minPrice,
        stepValue: level.stepValue,
      })
    } else {
      setEditingLevel({ subjectId, level: null })
      setLevelForm({
        label: "",
        basePrice: subject.defaultBasePrice,
        minPrice: subject.defaultMinPrice,
        stepValue: subject.defaultStepValue,
      })
    }
    setIsLevelDialogOpen(true)
  }

  const handleSaveLevel = () => {
    if (!editingLevel || !levelForm.label) return

    if (editingLevel.level) {
      updateLevel(editingLevel.subjectId, editingLevel.level.id, levelForm)
      toast({ title: "Рівень оновлено" })
    } else {
      addLevel(editingLevel.subjectId, levelForm)
      toast({ title: "Рівень додано" })
    }
    setIsLevelDialogOpen(false)
  }

  const handleDeleteLevel = (subjectId: string, levelId: string) => {
    if (confirm("Ви впевнені, що хочете видалити цей рівень?")) {
      removeLevel(subjectId, levelId)
      toast({ title: "Рівень видалено" })
    }
  }

  const handleAddCity = () => {
    if (!newCityName || !newCitySlug) return
    addCity({ name: newCityName, slug: newCitySlug, status: "active" })
    setNewCityName("")
    setNewCitySlug("")
    toast({ title: "Місто додано" })
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <SidebarLayout userType="admin">
        <div className="container mx-auto max-w-5xl space-y-8 p-8 font-sans">
          <div className="space-y-1">
            <h1 className="text-3xl font-[700] text-[#121117]">Довідники та Тарифи</h1>
            <p className="text-[15px] font-[500] text-[#69686f]">
              Налаштування предметів, рівнів підготовки та базових тарифів для аукціону лідів.
            </p>
          </div>

          <Tabs defaultValue="subjects" className="w-full">
            <TabsList className="bg-[#f0f3f3] rounded-[12px] p-1 border-0 grid w-full max-w-md grid-cols-2 mb-6">
              <TabsTrigger value="subjects" className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f]">Предмети та Ціни</TabsTrigger>
              <TabsTrigger value="cities" className="rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm font-[600] text-[#69686f]">Міста</TabsTrigger>
            </TabsList>

            <TabsContent value="subjects" className="space-y-4 pt-4">
              <div className="flex justify-end">
                <Button
                  onClick={() => handleOpenSubjectDialog()}
                  className="rounded-[8px] bg-[#00c5a6] text-white hover:bg-[#00a389] font-[600] shadow-[0_2px_8px_rgba(0,197,166,0.2)]"
                >
                  <Plus className="mr-2 h-4 w-4" /> Додати предмет
                </Button>
              </div>

              <div className="grid gap-4">
                {subjects.map((subject) => (
                  <Card
                    key={subject.id}
                    className="overflow-hidden rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200/80 bg-[#f0f3f3]/50 p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-200/80 font-[700] text-[#121117] text-lg">
                          {subject.name[0]}
                        </div>
                        <div>
                          <h3 className="font-[700] text-[18px] text-[#121117]">{subject.name}</h3>
                          <div className="flex items-center gap-2 text-[13px] font-[500] text-[#69686f] mt-1">
                            <span className="font-mono bg-white border border-slate-200/80 px-2 py-0.5 rounded-[6px] text-[#121117] font-[600]">
                              {subject.slug}
                            </span>
                            <span>•</span>
                            <span>Базова: {subject.defaultBasePrice} грн</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={subject.status === "active"}
                          onCheckedChange={() => toggleSubjectStatus(subject.id)}
                          className="data-[state=checked]:bg-[#00c5a6]"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenSubjectDialog(subject)}
                          className="h-9 w-9 text-[#69686f] hover:text-[#00c5a6] hover:bg-[#e8fffb] rounded-[8px]"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="levels" className="border-0">
                        <AccordionTrigger className="px-5 py-4 text-[14px] font-[600] text-[#69686f] hover:text-[#00c5a6] hover:bg-slate-50 hover:no-underline transition-colors">
                          <span>Рівні підготовки ({subject.levels.length})</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pb-5 pt-0">
                          <div className="rounded-[16px] border border-slate-200/80 bg-white overflow-hidden shadow-sm">
                            <div className="grid grid-cols-12 gap-2 border-b border-slate-200/80 bg-[#f0f3f3]/50 px-4 py-3 text-[12px] font-[600] text-[#69686f] uppercase tracking-wide">
                              <div className="col-span-5">Назва рівня</div>
                              <div className="col-span-2 text-center">Старт (грн)</div>
                              <div className="col-span-2 text-center">Мін (грн)</div>
                              <div className="col-span-2 text-center">Крок (грн)</div>
                              <div className="col-span-1 text-right">Дії</div>
                            </div>
                            {subject.levels.length === 0 ? (
                              <div className="p-6 text-center text-[14px] font-[500] text-[#69686f]">Рівні ще не додано</div>
                            ) : (
                              <div className="divide-y divide-slate-100">
                                {subject.levels.map((level) => (
                                  <div
                                    key={level.id}
                                    className="grid grid-cols-12 items-center gap-2 px-4 py-3 text-[14px] hover:bg-slate-50 transition-colors"
                                  >
                                    <div className="col-span-5 font-[600] text-[#121117]">{level.label}</div>
                                    <div className="col-span-2 flex justify-center">
                                      <span className="bg-[#e8fffb] text-[#00a389] px-2 py-0.5 rounded-[6px] font-[600] text-[13px] border border-[#00c5a6]/20">
                                        {level.basePrice}
                                      </span>
                                    </div>
                                    <div className="col-span-2 text-center font-[500] text-[#69686f]">{level.minPrice}</div>
                                    <div className="col-span-2 text-center font-[500] text-[#69686f]">{level.stepValue}</div>
                                    <div className="col-span-1 flex justify-end gap-1">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-[8px] text-[#69686f] hover:text-[#00c5a6] hover:bg-[#e8fffb]"
                                        onClick={() => handleOpenLevelDialog(subject.id, level)}
                                      >
                                        <Pencil className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-[8px] text-[#69686f] hover:text-red-600 hover:bg-red-50"
                                        onClick={() => handleDeleteLevel(subject.id, level.id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className="border-t border-slate-200/80 p-3 bg-[#f0f3f3]/30">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-center text-[#121117] font-[600] hover:text-[#00c5a6] hover:bg-[#e8fffb] rounded-[8px]"
                                onClick={() => handleOpenLevelDialog(subject.id)}
                              >
                                <Plus className="mr-2 h-4 w-4" /> Додати рівень
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cities" className="space-y-4 pt-4">
              <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                <CardHeader>
                  <CardTitle className="text-xl font-[700] text-[#121117]">Список міст</CardTitle>
                  <CardDescription className="text-[#69686f] font-[500]">Керуйте доступністю міст у каталозі.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {cities.map((city) => (
                    <div
                      key={city.slug}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-[16px] border border-slate-200/80 bg-white p-4 shadow-sm hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow"
                    >
                      <div>
                        <div className="text-[16px] font-[700] text-[#121117]">{city.name}</div>
                        <div className="text-[13px] font-[500] text-[#69686f] font-mono mt-1 bg-[#f0f3f3] px-2 py-0.5 rounded-[6px] inline-block border border-slate-200">slug: {city.slug}</div>
                      </div>
                      <Switch 
                        checked={city.status === "active"} 
                        onCheckedChange={() => toggleCityStatus(city.id)} 
                        className="data-[state=checked]:bg-[#00c5a6]"
                      />
                    </div>
                  ))}
                  <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto] mt-6 bg-[#f0f3f3]/50 p-4 rounded-[16px] border border-slate-200/80">
                    <Input
                      placeholder="Назва міста"
                      value={newCityName}
                      onChange={(event) => setNewCityName(event.target.value)}
                      className="rounded-[8px] border-slate-200/80 bg-white focus-visible:ring-[#00c5a6]"
                    />
                    <Input
                      placeholder="Slug (ukr-lat)"
                      value={newCitySlug}
                      onChange={(event) => setNewCitySlug(event.target.value)}
                      className="rounded-[8px] border-slate-200/80 bg-white focus-visible:ring-[#00c5a6]"
                    />
                    <Button onClick={handleAddCity} className="rounded-[8px] bg-[#00c5a6] text-white hover:bg-[#00a389] font-[600] shadow-[0_2px_8px_rgba(0,197,166,0.2)]">
                      Додати місто
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Dialog open={isSubjectDialogOpen} onOpenChange={setIsSubjectDialogOpen}>
          <DialogContent className="sm:max-w-[500px] rounded-[24px] border-0 shadow-[0_8px_32px_rgba(0,0,0,0.08)] font-sans">
            <DialogHeader className="pb-4 border-b border-slate-200/80">
              <DialogTitle className="text-[24px] font-[700] text-[#121117]">{editingSubject ? "Редагувати предмет" : "Додати предмет"}</DialogTitle>
              <DialogDescription className="text-[#69686f] font-[500] text-[15px]">Налаштуйте основні параметри предмету та дефолтні ціни.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#121117] font-[600]">Назва</Label>
                  <Input value={subjectForm.name} onChange={(event) => setSubjectForm({ ...subjectForm, name: event.target.value })} className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#121117] font-[600]">Slug</Label>
                  <Input value={subjectForm.slug} onChange={(event) => setSubjectForm({ ...subjectForm, slug: event.target.value })} className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#121117] font-[600]">Базова ціна</Label>
                  <Input type="number" value={subjectForm.defaultBasePrice} onChange={(event) => setSubjectForm({ ...subjectForm, defaultBasePrice: Number(event.target.value) })} className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#121117] font-[600]">Мін. ціна</Label>
                  <Input type="number" value={subjectForm.defaultMinPrice} onChange={(event) => setSubjectForm({ ...subjectForm, defaultMinPrice: Number(event.target.value) })} className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#121117] font-[600]">Крок</Label>
                  <Input type="number" value={subjectForm.defaultStepValue} onChange={(event) => setSubjectForm({ ...subjectForm, defaultStepValue: Number(event.target.value) })} className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]" />
                </div>
              </div>
            </div>
            <DialogFooter className="pt-2">
              <Button variant="outline" onClick={() => setIsSubjectDialogOpen(false)} className="rounded-[8px] border-slate-200/80 hover:bg-[#f0f3f3] text-[#121117] font-[600]">
                Скасувати
              </Button>
              <Button onClick={handleSaveSubject} className="rounded-[8px] bg-[#00c5a6] text-white hover:bg-[#00a389] font-[600] shadow-[0_2px_8px_rgba(0,197,166,0.2)]">
                Зберегти
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isLevelDialogOpen} onOpenChange={setIsLevelDialogOpen}>
          <DialogContent className="sm:max-w-[500px] rounded-[24px] border-0 shadow-[0_8px_32px_rgba(0,0,0,0.08)] font-sans">
            <DialogHeader className="pb-4 border-b border-slate-200/80">
              <DialogTitle className="text-[24px] font-[700] text-[#121117]">{editingLevel?.level ? "Редагувати рівень" : "Додати рівень"}</DialogTitle>
              <DialogDescription className="text-[#69686f] font-[500] text-[15px]">Вкажіть специфічні ціни для цього рівня підготовки.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label className="text-[#121117] font-[600]">Назва рівня (напр. "B2", "Підготовка до ЗНО")</Label>
                <Input value={levelForm.label} onChange={(event) => setLevelForm({ ...levelForm, label: event.target.value })} className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#121117] font-[600]">Стартова ціна</Label>
                  <Input type="number" value={levelForm.basePrice} onChange={(event) => setLevelForm({ ...levelForm, basePrice: Number(event.target.value) })} className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#121117] font-[600]">Мін. ціна</Label>
                  <Input type="number" value={levelForm.minPrice} onChange={(event) => setLevelForm({ ...levelForm, minPrice: Number(event.target.value) })} className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#121117] font-[600]">Крок зниження</Label>
                  <Input type="number" value={levelForm.stepValue} onChange={(event) => setLevelForm({ ...levelForm, stepValue: Number(event.target.value) })} className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]" />
                </div>
              </div>
            </div>
            <DialogFooter className="pt-2">
              <Button variant="outline" onClick={() => setIsLevelDialogOpen(false)} className="rounded-[8px] border-slate-200/80 hover:bg-[#f0f3f3] text-[#121117] font-[600]">
                Скасувати
              </Button>
              <Button onClick={handleSaveLevel} className="rounded-[8px] bg-[#00c5a6] text-white hover:bg-[#00a389] font-[600] shadow-[0_2px_8px_rgba(0,197,166,0.2)]">
                Зберегти
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
