import { AdminSupportAccessPage } from "@/features/admin/components/support-access-page"

export const metadata = {
    title: "Підтримка | Admin | Libitum",
    description: "Адміністративна панель Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <AdminSupportAccessPage />
}
