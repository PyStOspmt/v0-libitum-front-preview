import { TutorFinancesPage } from "@/features/tutor/components/finances-page"

export const metadata = {
  title: "Фінанси | Libitum",
  description: "Кабінет спеціаліста Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
  return <TutorFinancesPage />
}
