import { AdminVerificationsPage } from "@/features/admin/components/verifications-page"

export const metadata = {
    title: "Верифікація | Admin | Libitum",
    description: "Адміністративна панель Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <AdminVerificationsPage />
}
