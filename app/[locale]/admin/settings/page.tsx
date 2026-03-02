import { AdminSettingsPage } from "@/features/admin/components/settings-page"

export const metadata = {
    title: "Налаштування | Admin | Libitum",
    description: "Адміністративна панель Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <AdminSettingsPage />
}
