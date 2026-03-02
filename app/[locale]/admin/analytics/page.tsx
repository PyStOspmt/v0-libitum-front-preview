import { AdminAnalyticsPage } from "@/features/admin/components/analytics-page"

export const metadata = {
    title: "Аналітика | Admin | Libitum",
    description: "Адміністративна панель Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <AdminAnalyticsPage />
}
