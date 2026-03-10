"use client"

import { VERIFY_USER } from "@/graphql/auth"
import { useMutation } from "@apollo/client/react"
import { CheckCircle, Loader2, XCircle } from "lucide-react"
import Link from "next/link"
import { use, useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ActivationPage({ params }: { params: Promise<{ token: string; locale: string }> }) {
    const { token } = use(params)
    const [isSuccess, setIsSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const [verifyUser, { loading }] = useMutation(VERIFY_USER, {
        onCompleted: (data) => {
            if (data.user.isVerified) {
                setIsSuccess(true)
            } else {
                setErrorMessage("Не вдалося підтвердити акаунт.")
            }
        },
        onError: (error) => {
            console.error("Activation failed:", error)
            setErrorMessage("Сталася помилка під час активації акаунту. Спробуйте пізніше.")
        },
    })

    useEffect(() => {
        if (token) {
            verifyUser({
                variables: {
                    verifyUserPayload: { token },
                },
            })
        }
    }, [token, verifyUser])

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
                        {loading ? (
                            <Loader2 className="h-8 w-8 text-slate-400 animate-spin" />
                        ) : isSuccess ? (
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        ) : (
                            <XCircle className="h-8 w-8 text-red-600" />
                        )}
                    </div>

                    <CardTitle className="text-2xl">
                        {loading ? "Активація..." : isSuccess ? "Акаунт активовано!" : "Помилка активації"}
                    </CardTitle>

                    <CardDescription>
                        {loading
                            ? "Будь ласка, зачекайте, ми перевіряємо ваші дані."
                            : isSuccess
                              ? "Ваш акаунт успішно активовано. Тепер ви можете увійти до системи."
                              : errorMessage}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {!loading && (
                        <Button
                            asChild
                            className="w-full bg-[linear-gradient(135deg,#00796b,#009688,#0f766e)] hover:brightness-110 text-white"
                        >
                            <Link href={"/"}>{isSuccess ? "Перейти на головну" : "Повернутися на головну"}</Link>
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
