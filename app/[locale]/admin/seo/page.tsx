import { AdminSeoPage } from "@/features/admin/components/seo-page"

export const metadata = {
    title: "SEO | Admin | Libitum",
    description: "Адміністративна панель Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <AdminSeoPage />
}
