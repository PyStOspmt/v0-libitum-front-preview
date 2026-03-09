import { SpecialistProfilePage } from "@/features/specialist/components/profile-page"

export const metadata = {
    title: "Профіль | Libitum",
    description: "Кабінет спеціаліста Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <SpecialistProfilePage />
}
