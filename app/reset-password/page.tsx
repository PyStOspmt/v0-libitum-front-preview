"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ResetPasswordPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Помилка",
        description: "Паролі не співпадають",
        variant: "destructive",
      })
      return
    }

    if (password.length < 8) {
      toast({
        title: "Помилка",
        description: "Пароль повинен містити мінімум 8 символів",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Пароль оновлено",
        description: "Ваш пароль успішно змінено",
      })
      router.push("/login")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">Libitum Education</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Новий пароль</CardTitle>
            <CardDescription>Введіть новий пароль для вашого акаунту</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Новий пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <p className="text-xs text-muted-foreground">Мінімум 8 символів</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Підтвердіть пароль</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Зміна паролю..." : "Змінити пароль"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <Link href="/login" className="font-medium text-primary hover:underline">
                Повернутися до входу
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
