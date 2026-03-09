import { ClientDashboardPage } from "@/features/client/components/dashboard-page"

export const metadata = {
    title: "Кабінет | Libitum",
    description: "Кабінет клієнта Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <ClientDashboardPage />
}
