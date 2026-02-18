"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "@/lib/theme-context"
import { useSpecialistProfileStore, type SpecialistType } from "@/lib/specialist-profile-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Upload, Plus, X, Save, MapPin, Users, UserPlus } from "lucide-react"
import { SidebarLayout } from "@/components/sidebar-layout"
import { useToast } from "@/hooks/use-toast"

export default function TutorProfilePage() {
  const { user } = useAuth()
  const { theme, updateSpecialistTheme } = useTheme()
  const router = useRouter()
  const { getProfile, updateProfile } = useSpecialistProfileStore()

  const [specialization, setSpecialization] = useState<SpecialistType>("tutor")
  const [subjects, setSubjects] = useState<string[]>([])
  const [newSubject, setNewSubject] = useState("")
  const [firstName, setFirstName] = useState("Олена")
  const [lastName, setLastName] = useState("Іваненко")
  const [phone, setPhone] = useState("+380 50 123 45 67")
  const [experience, setExperience] = useState("5")
  const [education, setEducation] = useState("Київський національний університет імені Тараса Шевченка, філологічний факультет")
  const [bio, setBio] = useState("Маю 5 років досвіду викладання англійської мови. Працюю з учнями різного віку та рівня підготовки. Використовую комунікативну методику та сучасні матеріали.")
  const [priceOnline, setPriceOnline] = useState("400")
  const [priceOffline, setPriceOffline] = useState("500")
  const [priceHomeVisit, setPriceHomeVisit] = useState("600")
  const [location, setLocation] = useState("Київ")
  const [formatOnline, setFormatOnline] = useState(true)
  const [formatOffline, setFormatOffline] = useState(true)
  const [formatHomeVisit, setFormatHomeVisit] = useState(false)

  useEffect(() => {
    if (user?.id) {
      const profile = getProfile(user.id)
      if (profile) {
        setSpecialization(profile.specialization)
        setSubjects(profile.subjects?.length ? profile.subjects : ["Англійська мова", "Німецька мова"])
        setFirstName(profile.firstName || "Олена")
        setLastName(profile.lastName || "Іваненко")
        setPhone(profile.phone || "+380 50 123 45 67")
        setExperience(String(profile.experience || 5))
        setEducation(profile.education || "Київський національний університет імені Тараса Шевченка, філологічний факультет")
        setBio(profile.bio || "Маю 5 років досвіду викладання англійської мови. Працюю з учнями різного віку та рівня підготовки. Використовую комунікативну методику та сучасні матеріали.")
        setPriceOnline(String(profile.priceOnline || 400))
        setPriceOffline(String(profile.priceOffline || 500))
        setPriceHomeVisit(String(profile.priceHomeVisit || 600))
        setLocation(profile.location || "Київ")
        setFormatOnline(profile.formats?.online ?? true)
        setFormatOffline(profile.formats?.offline ?? true)
        setFormatHomeVisit(profile.formats?.homeVisit ?? false)
      }
    }
  }, [user?.id, getProfile])

  const addSubject = () => {
    if (newSubject && !subjects.includes(newSubject)) {
      setSubjects([...subjects, newSubject])
      setNewSubject("")
    }
  }

  const removeSubject = (subject: string) => {
    setSubjects(subjects.filter((s) => s !== subject))
  }

  const handleSave = () => {
    if (!user?.id) {
      toast({ title: "Помилка", description: "Користувач не авторизований", variant: "destructive" })
      return
    }
    updateProfile(user.id, {
      firstName, lastName, email: user.email, phone, specialization, subjects,
      experience: Number(experience), education, bio,
      priceOnline: Number(priceOnline), priceOffline: Number(priceOffline), priceHomeVisit: Number(priceHomeVisit),
      formats: { online: formatOnline, offline: formatOffline, homeVisit: formatHomeVisit },
      location,
    })
    toast({ title: "Профіль оновлено", description: "Ваші зміни успішно збережено" })
  }

  const getDefaultSubjects = (spec: SpecialistType) => {
    switch (spec) {
      case "psychologist": return ["Підліткова психологія", "Сімейні консультації"]
      case "speech-therapist": return ["Логопедія", "Корекція мовлення"]
      default: return ["Англійська мова", "Німецька мова"]
    }
  }

  const handleSpecializationChange = (value: SpecialistType) => {
    setSpecialization(value)
    if (subjects.length <= 2) setSubjects(getDefaultSubjects(value))
    
    // Update theme immediately
    updateSpecialistTheme(value)
    
    // Reload page after a short delay to ensure theme applies globally
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  return (
    <SidebarLayout userType="tutor">
      <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Мій профіль</h1>
          <p className="text-muted-foreground">Налаштуйте свій публічний профіль для клієнтів</p>
        </div>

        <div className="space-y-6">
          <Card className="border-slate-200/70 bg-white/80 shadow-sm">
            <CardHeader>
              <CardTitle>Фото профілю</CardTitle>
              <CardDescription>Додайте професійне фото для вашого профілю</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl" style={{ backgroundColor: theme.primaryLight, color: theme.primaryDark }}>
                    {user?.name?.[0] ?? firstName[0] ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button className="rounded-full text-white" style={{ backgroundColor: theme.primary }}>
                    <Upload className="mr-2 h-4 w-4" />
                    Завантажити фото
                  </Button>
                  <p className="text-sm text-muted-foreground">JPG, PNG або GIF. Максимум 5MB.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/70 bg-white/80 shadow-sm">
            <CardHeader>
              <CardTitle>Основна інформація</CardTitle>
              <CardDescription>Ваші особисті дані</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Ім'я</Label>
                  <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Прізвище</Label>
                  <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" type="tel" placeholder="+380 XX XXX XX XX" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/70 bg-white/80 shadow-sm">
            <CardHeader>
              <CardTitle>Професійна інформація</CardTitle>
              <CardDescription>Розкажіть про свій досвід та кваліфікацію</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="specialization">Спеціалізація</Label>
                <Select value={specialization} onValueChange={(v) => handleSpecializationChange(v as SpecialistType)}>
                  <SelectTrigger id="specialization">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tutor">Репетитор</SelectItem>
                    <SelectItem value="psychologist">Психолог</SelectItem>
                    <SelectItem value="speech-therapist">Логопед</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-2 rounded-lg px-3 py-2 text-sm font-medium" style={{ backgroundColor: theme.primaryLight, color: theme.primaryDark }}>
                  {specialization === "tutor" && "Репетитор - навчальні предмети та мови"}
                  {specialization === "psychologist" && "Психолог - психологічні консультації"}
                  {specialization === "speech-therapist" && "Логопед - корекція мовлення"}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Предмети/Напрямки</Label>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject) => (
                    <Badge key={subject} variant="secondary" className="gap-1 rounded-full" style={{ backgroundColor: theme.primaryLight, color: theme.primaryDark }}>
                      {subject}
                      <button onClick={() => removeSubject(subject)} className="ml-1 hover:opacity-70">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Додати предмет" value={newSubject} onChange={(e) => setNewSubject(e.target.value)} onKeyPress={(e) => e.key === "Enter" && addSubject()} />
                  <Button type="button" onClick={addSubject} className="rounded-full text-white" style={{ backgroundColor: theme.primary }}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Досвід роботи (років)</Label>
                <Input id="experience" type="number" value={experience} onChange={(e) => setExperience(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">Освіта</Label>
                <Textarea id="education" placeholder="Вкажіть вашу освіту, сертифікати, курси..." value={education} onChange={(e) => setEducation(e.target.value)} rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Про себе</Label>
                <Textarea id="bio" placeholder="Розкажіть про себе, свій підхід до навчання..." value={bio} onChange={(e) => setBio(e.target.value)} rows={5} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/70 bg-white/80 shadow-sm">
            <CardHeader>
              <CardTitle>Ціни та доступність</CardTitle>
              <CardDescription>Налаштуйте вартість занять та графік роботи</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="priceOnline">Ціна онлайн (грн/год)</Label>
                  <Input id="priceOnline" type="number" value={priceOnline} onChange={(e) => setPriceOnline(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceOffline">Ціна офлайн (грн/год)</Label>
                  <Input id="priceOffline" type="number" value={priceOffline} onChange={(e) => setPriceOffline(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priceHomeVisit">Ціна виїзду додому (грн/год)</Label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Input id="priceHomeVisit" type="number" value={priceHomeVisit} onChange={(e) => setPriceHomeVisit(e.target.value)} disabled={!formatHomeVisit} className={!formatHomeVisit ? "opacity-50" : ""} />
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatHomeVisit ? "Виїзд додому активовано. Вкажіть ціну за годину." : "Увімкніть 'Виїзд додому' нижче, щоб встановити ціну."}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Формати занять</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="online" checked={formatOnline} onCheckedChange={(c) => setFormatOnline(c as boolean)} />
                    <Label htmlFor="online" className="font-normal">Онлайн заняття</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="offline" checked={formatOffline} onCheckedChange={(c) => setFormatOffline(c as boolean)} />
                    <Label htmlFor="offline" className="font-normal">Офлайн заняття</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="home" checked={formatHomeVisit} onCheckedChange={(c) => setFormatHomeVisit(c as boolean)} />
                    <Label htmlFor="home" className="font-normal">Виїзд додому до учня</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Місто</Label>
                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/70 bg-white/80 shadow-sm">
            <CardHeader>
              <CardTitle>Документи</CardTitle>
              <CardDescription>Завантажте документи для верифікації</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Диплом про освіту</Label>
                <Button variant="outline" className="w-full bg-transparent rounded-full" style={{ borderColor: theme.primary, color: theme.primary }}>
                  <Upload className="mr-2 h-4 w-4" />
                  Завантажити диплом
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Сертифікати</Label>
                <Button variant="outline" className="w-full bg-transparent rounded-full" style={{ borderColor: theme.primary, color: theme.primary }}>
                  <Upload className="mr-2 h-4 w-4" />
                  Завантажити сертифікати
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/70 bg-white/80 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" style={{ color: theme.primary }} />
                Реферальна програма
              </CardTitle>
              <CardDescription>Запрошуйте колег та отримуйте бонуси</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Referral Link */}
              <div className="space-y-2">
                <Label>Ваше реферальне посилання</Label>
                <div className="flex gap-2">
                  <Input 
                    value={`https://libitum.education/ref/tutor/${user?.id || "specialist-1"}`} 
                    readOnly 
                    className="bg-slate-50"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      navigator.clipboard.writeText(`https://libitum.education/ref/tutor/${user?.id || "specialist-1"}`)
                      toast({ title: "Посилання скопійовано", description: "Поділіться ним з колегами" })
                    }}
                    style={{ borderColor: theme.primary, color: theme.primary }}
                  >
                    Копіювати
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Поділіться цим посиланням з колегами-репетиторами. Ви отримаєте XP бонус після їх реєстрації та першого заняття.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: theme.primaryLight }}>
                  <div className="text-xl font-bold" style={{ color: theme.primaryDark }}>3</div>
                  <div className="text-xs" style={{ color: theme.primary }}>Запрошено</div>
                </div>
                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: theme.primaryLight }}>
                  <div className="text-xl font-bold" style={{ color: theme.primaryDark }}>2</div>
                  <div className="text-xs" style={{ color: theme.primary }}>Активних</div>
                </div>
                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: theme.primaryLight }}>
                  <div className="text-xl font-bold" style={{ color: theme.primaryDark }}>+500</div>
                  <div className="text-xs" style={{ color: theme.primary }}>XP зароблено</div>
                </div>
              </div>

              {/* Add Own Student CTA */}
              <div className="rounded-lg border border-dashed border-slate-200 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4 text-slate-500" />
                  <span className="text-sm font-medium">Додати свого учня</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Переведіть своїх учнів на платформу та отримуйте XP за кожне їх заняття без комісії.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full text-sm"
                  onClick={() => router.push("/tutor/clients")}
                >
                  Перейти до учнів
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button variant="default" onClick={handleSave} size="lg" className="rounded-full">
              <Save className="mr-2 h-4 w-4" />
              Зберегти зміни
            </Button>
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}
