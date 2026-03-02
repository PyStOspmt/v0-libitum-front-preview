import { TutorMaterialsPage } from "@/features/tutor/components/materials-page"

export const metadata = {
    title: "Матеріали | Libitum",
    description: "Кабінет спеціаліста Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <TutorMaterialsPage />
}
