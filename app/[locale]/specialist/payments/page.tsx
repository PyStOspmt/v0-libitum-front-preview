import { SpecialistPaymentsPage } from "@/features/specialist/components/payments-page"

export const metadata = {
    title: "Платежі | Libitum",
    description: "Кабінет спеціаліста Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <SpecialistPaymentsPage />
}
