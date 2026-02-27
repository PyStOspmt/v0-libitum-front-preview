export const dynamic = "force-dynamic"

import { AdminDashboard } from "@/features/admin/components/admin-dashboard"

export const metadata = {
  title: "Адміністративна панель | Libitum",
  description: "Огляд платформи та управління Libitum.",
}

export default function AdminPage() {
  return <AdminDashboard />
}
