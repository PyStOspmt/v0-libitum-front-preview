import { TutorProfilePage } from "@/features/tutor/components/profile-page"

export const metadata = {
    title: "Профіль | Libitum",
    description: "Кабінет спеціаліста Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <TutorProfilePage />
}
