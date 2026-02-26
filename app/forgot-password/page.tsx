export const dynamic = "force-dynamic"

import Link from "next/link"
import { BookOpen } from "lucide-react"

import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form"

export const metadata = {
  title: "Відновлення паролю | Libitum",
  description: "Відновіть пароль для вашого акаунту Libitum.",
}

export default function ForgotPasswordPage() {
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

        <ForgotPasswordForm />
      </div>
    </div>
  )
}
