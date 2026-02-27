export const dynamic = "force-dynamic"

import Link from "next/link"
import { BookOpen } from "lucide-react"

import { ResetPasswordForm } from "@/features/auth/components/reset-password-form"

export const metadata = {
  title: "Новий пароль | Libitum",
  description: "Встановіть новий пароль для вашого акаунту Libitum.",
}

export default function ResetPasswordPage() {
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

        <ResetPasswordForm />
      </div>
    </div>
  )
}
