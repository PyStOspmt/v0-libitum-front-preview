import { TutorSettingsPage } from "@/features/tutor/components/settings-page"

export const metadata = {
  title: "Налаштування | Libitum",
  description: "Кабінет спеціаліста Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
  return <TutorSettingsPage />
}
