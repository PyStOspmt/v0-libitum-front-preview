"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, ArrowLeft, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsSent(true)
      setIsLoading(false)
      toast({
        title: "Листа відправлено",
        description: "Перевірте вашу пошту для відновлення паролю",
      })
    }, 1500)
  }

  if (isSent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
        <div className="w-full max-w-md">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="mb-2 text-center text-2xl">Перевірте пошту</CardTitle>
              <CardDescription className="mb-6 text-center">
                Ми надіслали інструкції для відновлення паролю на <strong>{email}</strong>
              </CardDescription>
              <Link href="/login" className="w-full">
                <Button className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Повернутися до входу
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
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
            <CardTitle className="text-2xl">Відновлення паролю</CardTitle>
            <CardDescription>
              Введіть вашу email адресу і ми надішлемо інструкції для відновлення паролю
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Відправка..." : "Надіслати інструкції"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/login" className="inline-flex items-center text-sm text-primary hover:underline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Повернутися до входу
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
