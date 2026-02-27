import { FavoritesPage } from "@/features/catalog/components/favorites-page"

export const metadata = {
  title: "Обране | Libitum",
  description: "Libitum Education Platform",
}

export const dynamic = "force-dynamic"

export default function Page() {
  return <FavoritesPage />
}
