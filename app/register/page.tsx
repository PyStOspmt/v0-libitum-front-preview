"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, Chrome, Eye, EyeOff } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function RegisterPage() {
  const { register } = useAuth()
  const [userType, setUserType] = useState<"client" | "specialist">("client")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showRules, setShowRules] = useState(false)
  const [acceptedRules, setAcceptedRules] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password.length < 8) {
      alert("Пароль повинен містити мінімум 8 символів")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Паролі не співпадають")
      return
    }

    if (!acceptedRules) {
      setShowRules(true)
      return
    }

    setIsLoading(true)
    try {
      await register(formData.name, formData.email, formData.password, userType)
    } catch (error) {
      console.error("Registration error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: "linear-gradient(135deg, #059669 0%, #047857 25%, #065f46 50%, #0d9488 75%, #14b8a6 100%)"
    }}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blobs */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-lime-400/30 rounded-full blur-xl" />
        <div className="absolute bottom-32 left-10 w-56 h-56 bg-teal-300/20 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-20 w-32 h-32 bg-white/10 rounded-full blur-lg" />
        
        {/* Decorative shapes */}
        <div className="absolute top-24 left-1/4 w-14 h-14 bg-lime-400 rounded-full animate-float-slow" />
        <div className="absolute bottom-1/3 right-16 w-10 h-10 bg-white/30 rounded-full animate-float-slower" />
        <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-orange-400/50 rounded-full animate-float-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-24 left-1/3 w-12 h-12 bg-teal-300/40 rounded-full animate-float-slower" />
        
        {/* Curved lines */}
        <svg className="absolute bottom-0 right-0 w-1/3 h-auto text-white/10" viewBox="0 0 200 300" fill="none">
          <path d="M250 300C150 200 100 100 0 50" stroke="currentColor" strokeWidth="3" fill="none"/>
          <path d="M230 300C130 180 80 80 -20 30" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
        <svg className="absolute top-0 left-0 w-1/4 h-auto text-white/10" viewBox="0 0 200 200" fill="none">
          <path d="M-50 0C50 50 100 100 150 200" stroke="currentColor" strokeWidth="3" fill="none"/>
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
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
                <p className="text-slate-500">Join our learning community today</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* User Type Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">I want to</Label>
                  <RadioGroup value={userType} onValueChange={(value) => setUserType(value as "client" | "specialist")} className="grid grid-cols-2 gap-3">
                    <div className={`flex flex-col items-center justify-center rounded-2xl border-2 p-4 transition-all cursor-pointer ${userType === 'client' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                      <RadioGroupItem value="client" id="client" className="sr-only" />
                      <Label htmlFor="client" className="cursor-pointer text-center">
                        <span className="text-2xl mb-2 block">🎓</span>
                        <span className="font-semibold text-slate-900 block">Find tutor</span>
                        <span className="text-xs text-slate-500">For students</span>
                      </Label>
                    </div>
                    <div className={`flex flex-col items-center justify-center rounded-2xl border-2 p-4 transition-all cursor-pointer ${userType === 'specialist' ? 'border-orange-500 bg-orange-50' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                      <RadioGroupItem value="specialist" id="specialist" className="sr-only" />
                      <Label htmlFor="specialist" className="cursor-pointer text-center">
                        <span className="text-2xl mb-2 block">👨‍🏫</span>
                        <span className="font-semibold text-slate-900 block">Become tutor</span>
                        <span className="text-xs text-slate-500">For teachers</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-slate-700">Full name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12 rounded-xl border-slate-200 bg-white px-4 text-base focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12 rounded-xl border-slate-200 bg-white px-4 text-base focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        minLength={8}
                        className="h-12 rounded-xl border-slate-200 bg-white px-4 pr-12 text-base focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">Confirm</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                      minLength={8}
                      className="h-12 rounded-xl border-slate-200 bg-white px-4 text-base focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="rules"
                    checked={acceptedRules}
                    onCheckedChange={(checked) => setAcceptedRules(checked as boolean)}
                    className="mt-0.5 border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                  />
                  <label htmlFor="rules" className="text-sm leading-tight text-slate-500">
                    I accept the{" "}
                    <button type="button" onClick={() => setShowRules(true)} className="font-semibold text-emerald-600 hover:underline">
                      platform rules
                    </button>{" "}
                    and privacy policy
                  </label>
                </div>

                <Button 
                  type="submit" 
                  className="h-12 w-full rounded-xl bg-lime-400 text-base font-semibold text-emerald-900 shadow-lg shadow-lime-200 hover:bg-lime-300 transition-all hover:scale-[1.02] active:scale-[0.98]" 
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>

                <Button 
                  type="button" 
                  variant="outline" 
                  className="h-12 w-full rounded-xl border-slate-200 bg-white font-medium text-slate-700 hover:bg-slate-50" 
                >
                  <Chrome className="mr-2 h-5 w-5" />
                  Sign up with Google
                </Button>
              </form>

              <div className="mt-8 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-emerald-600 hover:text-emerald-700">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rules Dialog */}
      <Dialog open={showRules} onOpenChange={setShowRules}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl border-0 shadow-2xl">
          <DialogHeader className="pb-4 border-b border-slate-100">
            <DialogTitle className="text-2xl font-bold text-slate-900">Platform Rules</DialogTitle>
            <DialogDescription className="text-slate-500">Please read before registering</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4 text-sm text-slate-600">
            <section className="space-y-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs">1</span>
                For Specialists
              </h3>
              <ul className="space-y-2 pl-2">
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span><strong>Response time:</strong> 3 hours to accept/decline requests. Bonus for 20-min response.</span>
                </li>
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span><strong>Status update:</strong> 2 hours after accepting to update communication status.</span>
                </li>
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span><strong>Trial result:</strong> 2 hours after trial lesson to report outcome.</span>
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs">2</span>
                For Students
              </h3>
              <ul className="space-y-2 pl-2">
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span><strong>Booking limit:</strong> Maximum 3 active requests at a time.</span>
                </li>
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span><strong>Trial lessons:</strong> Please inform the tutor of your decision after trial.</span>
                </li>
              </ul>
            </section>

            <section className="bg-amber-50 p-5 rounded-2xl border border-amber-100">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-amber-900 mb-1">Important</h3>
                  <p className="text-amber-800/80 leading-relaxed">
                    Our platform works on trust and mutual respect. Rule violations may result in permanent account suspension.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="flex items-center space-x-3 pt-4 border-t border-slate-100 mt-2">
            <Checkbox
              id="rules-dialog"
              checked={acceptedRules}
              onCheckedChange={(checked) => {
                setAcceptedRules(checked as boolean)
                if (checked) {
                  setShowRules(false)
                }
              }}
              className="border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
            />
            <label htmlFor="rules-dialog" className="text-sm font-medium text-slate-700 cursor-pointer select-none">
              I have read and accept the platform rules
            </label>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
