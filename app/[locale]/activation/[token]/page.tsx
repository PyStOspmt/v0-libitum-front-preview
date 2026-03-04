import { fetchGraphQL } from "@/lib/apollo/server-client"
import { CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { VERIFY_USER } from "@/graphql/auth"

export const metadata = {
    title: "Активація акаунту | Libitum",
    description: "Активація вашого акаунту Libitum.",
}


export default async function ActivationPage({
    params,
}: {
    params: Promise<{ token: string; locale: string }>
}) {
    const { token, locale } = await params

    let isSuccess = false
    let errorMessage = ""

    try {
        const response = await fetchGraphQL<{ verifyUser: boolean }>(VERIFY_USER, {
            verifyUserPayload: { token }
        })

        if (response.errors && response.errors.length > 0) {
            errorMessage = response.errors[0]?.message || "Не вдалося активувати акаунт."
        } else if (response.data?.verifyUser) {
            isSuccess = true
        } else {
            errorMessage = "Токен недійсний або акаунт вже активовано."
        }
    } catch (error) {
        errorMessage = "Сталася помилка під час активації акаунту. Спробуйте пізніше."
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-white p-4 overflow-hidden">
            <div className="hidden sm:block fixed top-20 -left-32 w-64 h-64 rounded-full bg-emerald-100/40 blur-3xl animate-orb pointer-events-none" />
            <div
                className="hidden sm:block fixed top-40 -right-32 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl animate-orb pointer-events-none"
                style={{ animationDelay: "1s" }}
            />

            <Card className="max-w-md w-full text-center bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg z-10">
                <CardHeader>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50">
                        {isSuccess ? (
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        ) : (
                            <XCircle className="h-8 w-8 text-red-600" />
                        )}
                    </div>
                    <CardTitle className="text-2xl">
                        {isSuccess ? "Акаунт активовано!" : "Помилка активації"}
                    </CardTitle>
                    <CardDescription>
                        {isSuccess
                            ? "Ваш акаунт успішно активовано. Тепер ви можете увійти до системи."
                            : errorMessage}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        asChild
                        className="w-full bg-[linear-gradient(135deg,#00796b,#009688,#0f766e)] hover:brightness-110 text-white"
                    >
                        <Link href={`/${locale === "uk" ? "" : locale}/login`.replace("//", "/") || "/"}>
                            {isSuccess ? "Перейти до входу" : "Повернутися на головну"}
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
