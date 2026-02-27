import { AdminSpecialistsPage } from "@/features/admin/components/specialists-page"

export const metadata = {
  title: "Спеціалісти | Admin | Libitum",
  description: "Адміністративна панель Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
  return <AdminSpecialistsPage />
}
