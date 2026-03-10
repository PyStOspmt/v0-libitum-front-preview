import { ClientMaterialsPage } from "@/features/client/components/materials-page"

export const metadata = {
    title: "Матеріали | Libitum",
    description: "Кабінет клієнта Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <ClientMaterialsPage />
}
