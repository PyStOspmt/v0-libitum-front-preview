import { TutorClientsPage } from "@/features/tutor/components/clients-page"

export const metadata = {
  title: "Клієнти | Libitum",
  description: "Кабінет спеціаліста Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
  return <TutorClientsPage />
}
