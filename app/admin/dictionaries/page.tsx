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
        <div className="container mx-auto max-w-5xl space-y-8 p-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Довідники та Тарифи</h1>
            <p className="text-muted-foreground mt-2">
              Налаштування предметів, рівнів підготовки та базових тарифів для аукціону лідів.
            </p>
          </div>

          <Tabs defaultValue="subjects">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
              <TabsTrigger value="subjects">Предмети та Ціни</TabsTrigger>
              <TabsTrigger value="cities">Міста</TabsTrigger>
            </TabsList>

            <TabsContent value="subjects" className="space-y-4">
              <div className="flex justify-end">
                <Button
                  onClick={() => handleOpenSubjectDialog()}
                  className="rounded-xl bg-slate-900 text-white shadow-lg shadow-slate-200 hover:bg-slate-800"
                >
                  <Plus className="mr-2 h-4 w-4" /> Додати предмет
                </Button>
              </div>

              <div className="grid gap-4">
                {subjects.map((subject) => (
                  <Card
                    key={subject.id}
                    className="overflow-hidden border-slate-200 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-200 font-bold text-slate-700">
                          {subject.name[0]}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">{subject.name}</h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                              {subject.slug}
                            </span>
                            <span>•</span>
                            <span>Базова: {subject.defaultBasePrice} грн</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={subject.status === "active"}
                          onCheckedChange={() => toggleSubjectStatus(subject.id)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenSubjectDialog(subject)}
                          className="h-8 w-8 text-slate-500 hover:text-slate-900"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="levels" className="border-0">
                        <AccordionTrigger className="px-4 py-2 text-sm text-muted-foreground hover:text-slate-900 hover:no-underline">
                          <span>Рівні підготовки ({subject.levels.length})</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 pt-0">
                          <div className="rounded-lg border border-slate-100 bg-white">
                            <div className="grid grid-cols-12 gap-2 border-b border-slate-100 bg-slate-50/50 px-4 py-2 text-xs font-medium text-muted-foreground">
                              <div className="col-span-5">Назва рівня</div>
                              <div className="col-span-2 text-center">Старт (грн)</div>
                              <div className="col-span-2 text-center">Мін (грн)</div>
                              <div className="col-span-2 text-center">Крок (грн)</div>
                              <div className="col-span-1 text-right">Дії</div>
                            </div>
                            {subject.levels.length === 0 ? (
                              <div className="p-4 text-center text-sm text-muted-foreground italic">Рівні ще не додано</div>
                            ) : (
                              <div className="divide-y divide-slate-100">
                                {subject.levels.map((level) => (
                                  <div
                                    key={level.id}
                                    className="grid grid-cols-12 items-center gap-2 px-4 py-3 text-sm hover:bg-slate-50/50 transition-colors"
                                  >
                                    <div className="col-span-5 font-medium text-slate-700">{level.label}</div>
                                    <div className="col-span-2 text-center bg-emerald-50 text-emerald-700 rounded py-0.5 font-medium">
                                      {level.basePrice}
                                    </div>
                                    <div className="col-span-2 text-center text-slate-500">{level.minPrice}</div>
                                    <div className="col-span-2 text-center text-slate-500">{level.stepValue}</div>
                                    <div className="col-span-1 flex justify-end gap-1">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7"
                                        onClick={() => handleOpenLevelDialog(subject.id, level)}
                                      >
                                        <Pencil className="h-3.5 w-3.5 text-slate-500" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 hover:text-red-600 hover:bg-red-50"
                                        onClick={() => handleDeleteLevel(subject.id, level.id)}
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className="border-t border-slate-100 p-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-center text-slate-500 hover:text-emerald-600 hover:bg-emerald-50"
                                onClick={() => handleOpenLevelDialog(subject.id)}
                              >
                                <Plus className="mr-1 h-3.5 w-3.5" /> Додати рівень
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

            <TabsContent value="cities" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Список міст</CardTitle>
                  <CardDescription>Керуйте доступністю міст у каталозі.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {cities.map((city) => (
                    <div
                      key={city.slug}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <div>
                        <div className="text-base font-semibold text-slate-900">{city.name}</div>
                        <div className="text-xs text-slate-500 font-mono">slug: {city.slug}</div>
                      </div>
                      <Switch checked={city.status === "active"} onCheckedChange={() => toggleCityStatus(city.id)} />
                    </div>
                  ))}
                  <div className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
                    <Input
                      placeholder="Назва міста"
                      value={newCityName}
                      onChange={(event) => setNewCityName(event.target.value)}
                      className="rounded-xl"
                    />
                    <Input
                      placeholder="Slug (ukr-lat)"
                      value={newCitySlug}
                      onChange={(event) => setNewCitySlug(event.target.value)}
                      className="rounded-xl"
                    />
                    <Button onClick={handleAddCity} className="rounded-xl bg-slate-900 text-white">
                      Додати
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Dialog open={isSubjectDialogOpen} onOpenChange={setIsSubjectDialogOpen}>
          <DialogContent className="sm:max-w-[500px] rounded-2xl">
            <DialogHeader>
              <DialogTitle>{editingSubject ? "Редагувати предмет" : "Додати предмет"}</DialogTitle>
              <DialogDescription>Налаштуйте основні параметри предмету та дефолтні ціни.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Назва</Label>
                  <Input value={subjectForm.name} onChange={(event) => setSubjectForm({ ...subjectForm, name: event.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input value={subjectForm.slug} onChange={(event) => setSubjectForm({ ...subjectForm, slug: event.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Базова ціна</Label>
                  <Input type="number" value={subjectForm.defaultBasePrice} onChange={(event) => setSubjectForm({ ...subjectForm, defaultBasePrice: Number(event.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Мін. ціна</Label>
                  <Input type="number" value={subjectForm.defaultMinPrice} onChange={(event) => setSubjectForm({ ...subjectForm, defaultMinPrice: Number(event.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Крок</Label>
                  <Input type="number" value={subjectForm.defaultStepValue} onChange={(event) => setSubjectForm({ ...subjectForm, defaultStepValue: Number(event.target.value) })} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSubjectDialogOpen(false)} className="rounded-xl">
                Скасувати
              </Button>
              <Button onClick={handleSaveSubject} className="rounded-xl bg-slate-900 text-white">
                Зберегти
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isLevelDialogOpen} onOpenChange={setIsLevelDialogOpen}>
          <DialogContent className="sm:max-w-[500px] rounded-2xl">
            <DialogHeader>
              <DialogTitle>{editingLevel?.level ? "Редагувати рівень" : "Додати рівень"}</DialogTitle>
              <DialogDescription>Вкажіть специфічні ціни для цього рівня підготовки.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Назва рівня (напр. "B2", "Підготовка до ЗНО")</Label>
                <Input value={levelForm.label} onChange={(event) => setLevelForm({ ...levelForm, label: event.target.value })} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Стартова ціна</Label>
                  <Input type="number" value={levelForm.basePrice} onChange={(event) => setLevelForm({ ...levelForm, basePrice: Number(event.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Мін. ціна</Label>
                  <Input type="number" value={levelForm.minPrice} onChange={(event) => setLevelForm({ ...levelForm, minPrice: Number(event.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Крок зниження</Label>
                  <Input type="number" value={levelForm.stepValue} onChange={(event) => setLevelForm({ ...levelForm, stepValue: Number(event.target.value) })} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsLevelDialogOpen(false)} className="rounded-xl">
                Скасувати
              </Button>
              <Button onClick={handleSaveLevel} className="rounded-xl bg-slate-900 text-white">
                Зберегти
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
