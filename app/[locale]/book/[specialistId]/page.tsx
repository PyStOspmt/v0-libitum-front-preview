import { BookingPage } from "@/features/booking/components/booking-page"

export const metadata = {
    title: "Бронювання | Libitum",
    description: "Libitum Education Platform",
}

export const dynamic = "force-dynamic"

export default async function Page({ params }: { params: Promise<{ specialistId: string }> }) {
    const { specialistId } = await params
    return <BookingPage specialistId={specialistId} />
}
