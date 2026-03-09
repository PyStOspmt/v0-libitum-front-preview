import { TutorStatsPage } from "@/features/tutor/components/stats-page"

export const metadata = {
    title: "Статистика | Libitum",
    description: "Кабінет спеціаліста Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <TutorStatsPage />
}
