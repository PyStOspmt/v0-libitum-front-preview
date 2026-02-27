import { AdminPaymentsPage } from "@/features/admin/components/payments-page"

export const metadata = {
  title: "Платежі | Admin | Libitum",
  description: "Адміністративна панель Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
  return <AdminPaymentsPage />
}
