import { ClientChatsPage } from "@/features/client/components/chats-page"

export const metadata = {
    title: "Чати | Libitum",
    description: "Кабінет клієнта Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <ClientChatsPage />
}
