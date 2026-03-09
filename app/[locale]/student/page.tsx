import { StudentDashboardPage } from "@/features/student/components/dashboard-page"

export const metadata = {
    title: "Кабінет | Libitum",
    description: "Кабінет учня Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <StudentDashboardPage />
}
