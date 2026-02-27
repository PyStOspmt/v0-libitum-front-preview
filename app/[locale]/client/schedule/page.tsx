import { ClientSchedulePage } from "@/features/client/components/schedule-page"

export const metadata = {
  title: "Розклад | Libitum",
  description: "Кабінет клієнта Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
  return <ClientSchedulePage />
}
