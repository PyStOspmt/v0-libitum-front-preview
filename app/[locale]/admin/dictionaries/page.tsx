import { AdminDictionariesPage } from "@/features/admin/components/dictionaries-page"

export const metadata = {
    title: "Довідники | Admin | Libitum",
    description: "Адміністративна панель Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <AdminDictionariesPage />
}
