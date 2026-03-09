import { ClientProgressPage } from "@/features/client/components/progress-page"

export const metadata = {
    title: "Прогрес | Libitum",
    description: "Кабінет клієнта Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <ClientProgressPage />
}
