import { SpecialistProfilePage } from "@/features/specialists/components/profile-page"

export const metadata = {
    title: "Профіль спеціаліста | Libitum",
    description: "Libitum Education Platform",
}

export const dynamic = "force-dynamic"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return <SpecialistProfilePage id={id} />
}
