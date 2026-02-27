export const dynamic = "force-dynamic"

import Link from "next/link"
import Image from "next/image"
import { Shield, Star, BookOpen } from "lucide-react"

import { Header } from "@/components/header"
import { LoginForm } from "@/features/auth/components/login-form"

export const metadata = {
  title: "Увійти | Libitum",
  description: "Увійдіть у свій акаунт Libitum, щоб продовжити навчання",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left decorative panel - hidden on mobile */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[540px] flex-shrink-0 bg-[#009688] relative overflow-hidden flex-col justify-between p-10">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full -translate-x-1/4 translate-y-1/4" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/5 rounded-full" />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5 mb-16">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-white/20">
              <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
            </div>
            <span className="text-xl font-bold text-white">LIBITUM</span>
          </Link>

          <h2 className="text-3xl xl:text-4xl font-bold text-white mb-4 leading-tight tracking-tight">
            Знайдіть свого ідеального спеціаліста
          </h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-sm">
            Платформа з перевіреними репетиторами, психологами та логопедами
          </p>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-4 bg-white/10 rounded-lg p-4">
            <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Перевірені спеціалісти</p>
              <p className="text-white/60 text-xs">Кожен проходить верифікацію</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/10 rounded-lg p-4">
            <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <Star className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Рейтинг 4.9/5</p>
              <p className="text-white/60 text-xs">Середня оцінка від учнів</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/10 rounded-lg p-4">
            <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">500+ спеціалістів</p>
              <p className="text-white/60 text-xs">В усіх напрямках навчання</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-[420px]">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight">З поверненням</h1>
              <p className="text-slate-500 text-sm">Увійдіть у свій акаунт, щоб продовжити</p>
            </div>

            {/* Client Component — form with RHF + Zod */}
            <LoginForm />
          </div>
        </div>

        <div className="px-6 pb-6 text-center">
          <p className="text-xs text-slate-400">Захищено та безпечно</p>
        </div>
      </div>
    </div>
  )
}
