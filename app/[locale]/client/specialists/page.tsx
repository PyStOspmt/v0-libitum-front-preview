import { ClientSpecialistsPage } from "@/features/client/components/specialists-page"

export const metadata = {
    title: "Спеціалісти | Libitum",
    description: "Кабінет клієнта Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <ClientSpecialistsPage />
}
