import { AdminClientsPage } from "@/features/admin/components/clients-page"

export const metadata = {
  title: "Клієнти | Admin | Libitum",
  description: "Адміністративна панель Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
  return <AdminClientsPage />
}
