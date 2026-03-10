import { AdminReportsPage } from "@/features/admin/components/reports-page"

export const metadata = {
    title: "Звіти | Admin | Libitum",
    description: "Адміністративна панель Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <AdminReportsPage />
}
