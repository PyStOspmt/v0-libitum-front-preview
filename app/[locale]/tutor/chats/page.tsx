import { TutorChatsPage } from "@/features/tutor/components/chats-page"

export const metadata = {
    title: "Чати | Libitum",
    description: "Кабінет спеціаліста Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <TutorChatsPage />
}
