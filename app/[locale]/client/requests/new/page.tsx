import { ClientNewRequestPage } from "@/features/client/components/new-request-page"

export const metadata = {
    title: "Нова заявка | Libitum",
    description: "Створення нової заявки на заняття",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <ClientNewRequestPage />
}
