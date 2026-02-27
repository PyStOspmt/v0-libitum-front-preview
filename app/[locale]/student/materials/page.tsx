import { StudentMaterialsPage } from "@/features/student/components/materials-page"

export const metadata = {
  title: "Матеріали | Libitum",
  description: "Кабінет учня Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
  return <StudentMaterialsPage />
}
