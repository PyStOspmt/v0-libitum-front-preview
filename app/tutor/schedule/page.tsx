import { TutorSchedulePage } from "@/features/tutor/components/schedule-page"

export const metadata = {
  title: "Розклад | Libitum",
  description: "Кабінет спеціаліста Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
  return <TutorSchedulePage />
}
