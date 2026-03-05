"use client"

import { RESEND_VERIFICATION_EMAIL, VERIFY_USER } from "@/graphql/auth"
import { useToast } from "@/hooks/use-toast"
import { useMutation } from "@apollo/client/react"
import { CheckCircle, Loader2, LogOut, Mail } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { useAuthContext } from "../context/auth-context"

export function VerifyEmailCard() {
    const { user, handleLogout, logoutLoading } = useAuthContext()
    const { toast } = useToast()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [verifyUser, { loading: isVerifying }] = useMutation<{ verifyUser: boolean }>(VERIFY_USER)
    const [resendConfirmation] = useMutation<boolean>(RESEND_VERIFICATION_EMAIL)
    const [isVerified, setIsVerified] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const [verifyError, setVerifyError] = useState<string | null>(null)

    // Auto-verify if token is present in URL
    useEffect(() => {
        if (!token) return

        verifyUser({
            variables: { verifyUserPayload: { token } },
        })
            .then(({ data }) => {
                if (data?.verifyUser) {
                    setIsVerified(true)
                    toast({
                        title: "Email підтверджено",
                        description: "Ваш акаунт активовано. Тепер ви можете користуватися платформою.",
                    })
                } else {
                    setVerifyError("Не вдалося підтвердити email. Токен може бути недійсним.")
                }
            })
            .catch(() => {
                setVerifyError("Не вдалося підтвердити email. Спробуйте запросити новий лист.")
            })
    }, [token, verifyUser, toast])

    const handleResend = async () => {
        setIsResending(true)
        const res = await resendConfirmation()
        console.log("resendConfirmation result", res)
        toast({
            title: "Посилання відправлено",
            description: `Ми відправили нове посилання на ${user?.email}`,
        })
        setIsResending(false)
    }

    if (isVerified) {
        return (
            <Card className="max-w-md w-full text-center bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg">
                <CardHeader>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl">Email підтверджено!</CardTitle>
                    <CardDescription>
                        Ваш акаунт активовано. Тепер ви можете користуватися всіма функціями платформи.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        onClick={() => window.location.replace("/")}
                        className="w-full bg-[linear-gradient(135deg,#00796b,#009688,#0f766e)] hover:brightness-110 text-white"
                    >
                        Перейти на головну
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="max-w-md w-full text-center bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg">
            <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    {isVerifying ? (
                        <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    ) : (
                        <Mail className="h-8 w-8 text-primary" />
                    )}
                </div>
                <CardTitle className="text-2xl">{isVerifying ? "Підтвердження..." : "Підтвердіть ваш Email"}</CardTitle>
                <CardDescription>
                    {isVerifying ? (
                        "Зачекайте, ми підтверджуємо вашу пошту..."
                    ) : (
                        <>
                            Ми відправили посилання для підтвердження на адресу <strong>{user?.email}</strong>
                        </>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {verifyError && (
                    <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700 text-left">
                        <p>{verifyError}</p>
                    </div>
                )}

                {!isVerifying && (
                    <>
                        <div className="rounded-lg bg-orange-50 p-4 text-sm text-orange-800 text-left">
                            <p>Без підтвердження пошти ви не зможете отримати доступ до функцій платформи.</p>
                        </div>
                        <div className="space-y-2">
                            <Button
                                onClick={handleResend}
                                className="w-full bg-[linear-gradient(135deg,#00796b,#009688,#0f766e)] hover:brightness-110 text-white border-transparent"
                                disabled={isResending}
                            >
                                {isResending ? "Відправка..." : "Відправити ще раз"}
                            </Button>
                            <Button variant="ghost" onClick={handleLogout} className="w-full">
                                {logoutLoading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <LogOut className="mr-2 h-4 w-4" />
                                )}
                                Вийти з акаунта
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Не отримали лист? Перевірте папку &quot;Спам&quot; або натисніть кнопку вище.
                        </p>
                    </>
                )}
            </CardContent>
        </Card>
    )
}
