import { TutorRequestsPage } from "@/features/tutor/components/requests-page"

export const metadata = {
  title: "Запити | Libitum",
  description: "Кабінет спеціаліста Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
  return <TutorRequestsPage />
}
