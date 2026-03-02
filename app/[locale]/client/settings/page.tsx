import { ClientSettingsPage } from "@/features/client/components/settings-page"

export const metadata = {
    title: "Налаштування | Libitum",
    description: "Кабінет клієнта Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <ClientSettingsPage />
}
