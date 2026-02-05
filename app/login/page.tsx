"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Chrome, Eye, EyeOff } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const testAccounts = [
    { role: "Клієнт", email: "client@test.com", password: "password123" },
    { role: "Спеціаліст", email: "specialist@test.com", password: "password123" },
    { role: "Адмін", email: "admin@test.com", password: "password123" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await login(email, password)
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const quickLogin = (email: string, password: string) => {
    setEmail(email)
    setPassword(password)
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: "linear-gradient(135deg, #059669 0%, #047857 25%, #065f46 50%, #0d9488 75%, #14b8a6 100%)"
    }}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/30 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-300/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-3xl" />
        
        {/* Decorative shapes */}
        <div className="absolute top-32 right-1/4 w-16 h-16 bg-lime-400 rounded-full animate-float-slow" />
        <div className="absolute bottom-1/4 left-20 w-10 h-10 bg-white/30 rounded-full animate-float-slower" />
        <div className="absolute top-1/2 left-10 w-8 h-8 bg-orange-400/60 rounded-full animate-float-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-32 right-32 w-12 h-12 bg-teal-300/50 rounded-full animate-float-slower" />
        
        {/* Curved lines */}
        <svg className="absolute bottom-0 left-0 w-1/3 h-auto text-white/10" viewBox="0 0 200 300" fill="none">
          <path d="M-50 300C50 200 100 100 200 50" stroke="currentColor" strokeWidth="3" fill="none"/>
          <path d="M-30 300C70 180 120 80 220 30" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
        <svg className="absolute top-0 right-0 w-1/4 h-auto text-white/10" viewBox="0 0 200 200" fill="none">
          <path d="M250 0C150 50 100 100 50 200" stroke="currentColor" strokeWidth="3" fill="none"/>
        </svg>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-3 transition-transform hover:scale-105">
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl shadow-xl ring-2 ring-white/30">
                <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
              </div>
            </Link>
          </div>

          {/* Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-emerald-900/20 overflow-hidden">
            <div className="p-8 sm:p-10">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
                <p className="text-slate-500">Please login to your account</p>
              </div>

              {/* Test Accounts */}
              <div className="mb-6 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Тестові акаунти</p>
                <div className="flex flex-wrap gap-2">
                  {testAccounts.map((account) => (
                    <Button
                      key={account.email}
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-8 rounded-full text-xs border-slate-200 hover:bg-lime-50 hover:text-emerald-700 hover:border-lime-300"
                      onClick={() => quickLogin(account.email, account.password)}
                    >
                      {account.role}
                    </Button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 rounded-xl border-slate-200 bg-white px-4 text-base focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 rounded-xl border-slate-200 bg-white px-4 pr-12 text-base focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Password must contain at least 8 characters</p>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox className="border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600" />
                    <span className="text-sm text-slate-600">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                    Forgot your password?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="h-12 w-full rounded-xl bg-lime-400 text-base font-semibold text-emerald-900 shadow-lg shadow-lime-200 hover:bg-lime-300 transition-all hover:scale-[1.02] active:scale-[0.98]" 
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Log in"}
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full bg-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-3 text-slate-400 font-medium">or</span>
                  </div>
                </div>

                <Button 
                  type="button" 
                  variant="outline" 
                  className="h-12 w-full rounded-xl border-slate-200 bg-white font-medium text-slate-700 hover:bg-slate-50" 
                >
                  <Chrome className="mr-2 h-5 w-5" />
                  Sign in with Google
                </Button>
              </form>

              <div className="mt-8 text-center text-sm text-slate-500">
                {"Don't have an account?"}{" "}
                <Link href="/register" className="font-semibold text-emerald-600 hover:text-emerald-700">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
