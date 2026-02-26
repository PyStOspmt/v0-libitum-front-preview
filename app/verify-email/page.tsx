export const dynamic = "force-dynamic"

import { VerifyEmailCard } from "@/features/auth/components/verify-email-card"

export const metadata = {
  title: "Підтвердження Email | Libitum",
  description: "Підтвердіть вашу email адресу для активації акаунту Libitum.",
}

export default function VerifyEmailPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-white p-4 overflow-hidden">
      <div className="hidden sm:block fixed top-20 -left-32 w-64 h-64 rounded-full bg-emerald-100/40 blur-3xl animate-orb pointer-events-none" />
      <div className="hidden sm:block fixed top-40 -right-32 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl animate-orb pointer-events-none" style={{ animationDelay: "1s" }} />

      <VerifyEmailCard />
    </div>
  )
}
