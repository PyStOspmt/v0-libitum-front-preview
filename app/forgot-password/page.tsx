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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-white px-4">
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
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-white px-4 py-12 overflow-hidden">
      <div className="hidden sm:block fixed top-20 -left-32 w-64 h-64 rounded-full bg-emerald-100/40 blur-3xl animate-orb pointer-events-none" />
      <div className="hidden sm:block fixed top-40 -right-32 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl animate-orb pointer-events-none" style={{ animationDelay: "1s" }} />

      <div className="w-full max-w-md animate-fade-in-up">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3 transition-transform hover:scale-105">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 shadow-lg shadow-slate-200">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <span className="block text-xl font-bold tracking-tight text-slate-900">Libitum</span>
              <span className="block text-xs font-medium text-slate-500">Education Platform</span>
            </div>
          </Link>
        </div>

        <Card className="border-slate-200 bg-white/80 shadow-xl backdrop-blur-xl rounded-3xl overflow-hidden">
          <CardHeader className="space-y-1 text-center pb-8 pt-8">
            <CardTitle className="text-2xl font-bold text-slate-900">Відновлення паролю</CardTitle>
            <CardDescription className="text-base text-slate-500 px-4">
              Введіть вашу email адресу і ми надішлемо інструкції для відновлення
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700 ml-1">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 rounded-xl border-slate-200 bg-white/50 px-4 text-base transition-all focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <Button 
                type="submit" 
                className="h-12 w-full rounded-xl text-base font-semibold text-white shadow-lg shadow-emerald-100 transition-all hover:scale-[1.02] active:scale-[0.98] bg-[linear-gradient(135deg,#00796b,#009688,#0f766e)] hover:brightness-110" 
                disabled={isLoading}
              >
                {isLoading ? "Відправка..." : "Надіслати інструкції"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <Link href="/login" className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
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
