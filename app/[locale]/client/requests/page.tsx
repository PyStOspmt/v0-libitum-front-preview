import { ClientRequestsPage } from "@/features/client/components/requests-page"

export const metadata = {
  title: "Запити | Libitum",
  description: "Кабінет клієнта Libitum",
}

export const dynamic = "force-dynamic"

export default function Page() {
  return <ClientRequestsPage />
}
