import { TutorJournalPage } from "@/features/tutor/components/journal-page"

export const metadata = {
  title: "Журнал та ДЗ | Libitum",
  description: "Кабінет спеціаліста Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
  return <TutorJournalPage />
}
