"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle, ArrowRight, LogOut } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function VerifyEmailPage() {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const [isResending, setIsResending] = useState(false)

  const handleResend = async () => {
    setIsResending(true)
    // Mock resend logic
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast({
      title: "Посилання відправлено",
      description: `Ми відправили нове посилання на ${user?.email}`,
    })
    setIsResending(false)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-white p-4 overflow-hidden">
      <div className="hidden sm:block fixed top-20 -left-32 w-64 h-64 rounded-full bg-emerald-100/40 blur-3xl animate-orb pointer-events-none" />
      <div className="hidden sm:block fixed top-40 -right-32 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl animate-orb pointer-events-none" style={{ animationDelay: "1s" }} />

      <Card className="max-w-md w-full text-center bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Підтвердіть ваш Email</CardTitle>
          <CardDescription>
            Ми відправили посилання для підтвердження на адресу <strong>{user?.email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-orange-50 p-4 text-sm text-orange-800 text-left">
            <p>Без підтвердження пошти ви не зможете отримати доступ до функцій платформи.</p>
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleResend}
              className="w-full bg-[linear-gradient(135deg,#00796b,#009688,#0f766e)] hover:brightness-110 text-white border-transparent"
              disabled={isResending}
            >
              {isResending ? "Відправка..." : "Відправити ще раз"}
            </Button>
            <Button variant="ghost" onClick={logout} className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Вийти з акаунта
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Не отримали лист? Перевірте папку "Спам" або натисніть кнопку вище.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
