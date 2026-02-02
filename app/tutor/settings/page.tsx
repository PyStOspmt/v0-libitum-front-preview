"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Video, Upload, Share2, Copy, Check } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

export default function TutorSettingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [profileVideoUrl, setProfileVideoUrl] = useState("")
  const [referralCopied, setReferralCopied] = useState(false)

  const handleSaveVideo = () => {
    toast({
      title: "Відео збережено",
      description: "Ваше відео-презентація оновлена",
    })
  }

  const referralLink = `https://libitum.education/ref/${user?.id || "tutor123"}`
  const referralStats = {
    invited: 5,
    registered: 3,
    bonus: 450,
  }

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    setReferralCopied(true)
    toast({
      title: "Посилання скопійовано",
      description: "Реферальне посилання скопійовано в буфер обміну",
    })
    setTimeout(() => setReferralCopied(false), 2000)
  }

  return (
    <ProtectedRoute allowedRoles={["specialist"]}>
      <SidebarLayout userType="tutor">
        <div className="container mx-auto max-w-4xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">Налаштування</h1>
            <p className="text-muted-foreground">Управління вашим профілем та налаштуваннями</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Особиста інформація</CardTitle>
              <CardDescription>Оновіть свої особисті дані</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ім'я</Label>
                <Input id="name" defaultValue={user?.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" type="tel" placeholder="+380" />
              </div>
              <Button>Зберегти зміни</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Безпека</CardTitle>
              <CardDescription>Змініть пароль та налаштування безпеки</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Поточний пароль</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Новий пароль</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Підтвердіть пароль</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button>Змінити пароль</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Відео-презентація профілю
              </CardTitle>
              <CardDescription>Додайте відео "Як я проводжу заняття" щоб збільшити довіру клієнтів</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileVideoUrl ? (
                <div className="space-y-4">
                  <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                    <div className="flex h-full items-center justify-center">
                      <Video className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={profileVideoUrl}
                      onChange={(e) => setProfileVideoUrl(e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                    />
                    <Button variant="outline" onClick={() => setProfileVideoUrl("")}>
                      Видалити
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12">
                    <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
                    <p className="mb-2 text-center font-medium">Додайте відео-презентацію</p>
                    <p className="mb-4 text-center text-sm text-muted-foreground">
                      Підтримуються посилання з YouTube, Vimeo або завантаження файлу
                    </p>
                    <div className="flex w-full max-w-md gap-2">
                      <Input
                        value={profileVideoUrl}
                        onChange={(e) => setProfileVideoUrl(e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                      />
                      <Button onClick={handleSaveVideo}>Додати</Button>
                    </div>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-4">
                    <p className="text-sm font-medium text-blue-900">Порада:</p>
                    <p className="text-sm text-blue-700">
                      Відео-презентація підвищує конверсію до 40%. Розкажіть про свою методику, досвід та підхід до
                      навчання.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Реферальна програма
              </CardTitle>
              <CardDescription>Запрошуйте колег-спеціалістів та отримуйте бонуси</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-muted p-4 text-center">
                  <p className="text-2xl font-bold">{referralStats.invited}</p>
                  <p className="text-sm text-muted-foreground">Запрошено</p>
                </div>
                <div className="rounded-lg bg-muted p-4 text-center">
                  <p className="text-2xl font-bold">{referralStats.registered}</p>
                  <p className="text-sm text-muted-foreground">Зареєструвалось</p>
                </div>
                <div className="rounded-lg bg-primary/10 p-4 text-center">
                  <p className="text-2xl font-bold text-primary">{referralStats.bonus} грн</p>
                  <p className="text-sm text-muted-foreground">Ваш бонус</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ваше реферальне посилання</Label>
                <div className="flex gap-2">
                  <Input value={referralLink} readOnly className="font-mono text-sm" />
                  <Button variant="outline" size="icon" onClick={copyReferralLink}>
                    {referralCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Поділіться цим посиланням з колегами. За кожного зареєстрованого спеціаліста ви отримаєте 150 грн
                  бонусу.
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Share2 className="mr-2 h-4 w-4" />
                  Telegram
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Share2 className="mr-2 h-4 w-4" />
                  Facebook
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Share2 className="mr-2 h-4 w-4" />
                  Viber
                </Button>
              </div>

              <div className="rounded-lg bg-green-50 p-4">
                <p className="text-sm font-medium text-green-900">Як це працює:</p>
                <ul className="mt-2 space-y-1 text-sm text-green-700">
                  <li>• Поділіться посиланням з колегами-викладачами</li>
                  <li>• Вони реєструються за вашим посиланням</li>
                  <li>• Ви отримуєте 150 грн бонусу за кожну реєстрацію</li>
                  <li>• Ваш колега отримує знижку на перший платіж за ліда</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Сповіщення</CardTitle>
              <CardDescription>Налаштуйте, як ви отримуєте сповіщення</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email сповіщення</p>
                  <p className="text-sm text-muted-foreground">Отримувати сповіщення на email</p>
                </div>
                <Button variant="outline">Увімкнено</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push сповіщення</p>
                  <p className="text-sm text-muted-foreground">Отримувати push-сповіщення</p>
                </div>
                <Button variant="outline">Вимкнено</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Сповіщення про нові запити</p>
                  <p className="text-sm text-muted-foreground">Отримувати сповіщення про нові запити від клієнтів</p>
                </div>
                <Button variant="outline">Увімкнено</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
