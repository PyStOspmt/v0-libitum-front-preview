import { StudentSchedulePage } from "@/features/student/components/schedule-page"

export const metadata = {
  title: "Розклад | Libitum",
  description: "Кабінет учня Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
  return <StudentSchedulePage />
}
