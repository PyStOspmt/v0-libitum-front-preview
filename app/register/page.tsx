export const dynamic = "force-dynamic"

import Link from "next/link"
import Image from "next/image"
import { Check, Users, TrendingUp } from "lucide-react"

import { Header } from "@/components/header"
import { RegisterForm } from "@/features/auth/components/register-form"

export const metadata = {
  title: "Реєстрація | Libitum",
  description: "Створіть акаунт та отримайте доступ до найкращих спеціалістів",
}

export default function RegisterPage() {
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
            Приєднуйтесь до спільноти
          </h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-sm">
            Створіть акаунт та отримайте доступ до найкращих спеціалістів
          </p>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-4 bg-white/10 rounded-lg p-4">
            <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <Check className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Безкоштовне пробне заняття</p>
              <p className="text-white/60 text-xs">Перше заняття з кожним спеціалістом</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/10 rounded-lg p-4">
            <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Персональний підхід</p>
              <p className="text-white/60 text-xs">Індивідуальна програма навчання</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/10 rounded-lg p-4">
            <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Відстеження прогресу</p>
              <p className="text-white/60 text-xs">Детальна аналітика навчання</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - form wrapper */}
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-[440px]">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight">Створити акаунт</h1>
              <p className="text-slate-500 text-sm">Приєднуйтесь до нашої спільноти</p>
            </div>

            <RegisterForm />
          </div>
        </div>

        <div className="px-6 pb-6 text-center">
          <p className="text-xs text-slate-400">Реєструючись, ви погоджуєтесь з нашими умовами використання</p>
        </div>
      </div>
    </div>
  )
}
