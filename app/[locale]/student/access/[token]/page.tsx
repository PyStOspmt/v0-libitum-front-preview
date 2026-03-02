import { StudentAccessPage } from "@/features/student/components/access-page"

export const metadata = {
    title: "Доступ | Libitum",
    description: "Доступ учня до матеріалів",
}

export const dynamic = "force-dynamic"

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
    const { token } = await params
    return <StudentAccessPage token={token} />
}
