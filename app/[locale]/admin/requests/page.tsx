import { AdminRequestsPage } from "@/features/admin/components/requests-page"

export const metadata = {
    title: "Запити | Admin | Libitum",
    description: "Адміністративна панель Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <AdminRequestsPage />
}
