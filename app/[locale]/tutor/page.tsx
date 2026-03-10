import { TutorDashboardPage } from "@/features/tutor/components/dashboard-page"

export const metadata = {
    title: "Кабінет | Libitum",
    description: "Кабінет спеціаліста Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <TutorDashboardPage />
}
