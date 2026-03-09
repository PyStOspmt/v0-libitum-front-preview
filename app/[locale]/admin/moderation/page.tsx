import { AdminModerationPage } from "@/features/admin/components/moderation-page"

export const metadata = {
    title: "Модерація | Admin | Libitum",
    description: "Адміністративна панель Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <AdminModerationPage />
}
