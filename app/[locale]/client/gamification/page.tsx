import { ClientGamificationPage } from "@/features/client/components/gamification-page"

export const metadata = {
    title: "Гейміфікація | Libitum",
    description: "Кабінет клієнта Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <ClientGamificationPage />
}
