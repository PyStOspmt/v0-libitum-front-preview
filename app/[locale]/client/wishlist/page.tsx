import { ClientWishlistPage } from "@/features/client/components/wishlist-page"

export const metadata = {
    title: "Обране | Libitum",
    description: "Кабінет клієнта Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
    return <ClientWishlistPage />
}
