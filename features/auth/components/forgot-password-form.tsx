"use client"

import { REQUEST_RESET_PASSWORD } from "@/graphql/auth"
import { useToast } from "@/hooks/use-toast"
import { useMutation } from "@apollo/client/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { type ForgotPasswordValues, forgotPasswordSchema } from "../schemas/forgot-password.schema"

export function ForgotPasswordForm() {
    const { toast } = useToast()
    const [isSent, setIsSent] = useState(false)
    const [sentEmail, setSentEmail] = useState("")

    const [requestReset] = useMutation(REQUEST_RESET_PASSWORD)

    const form = useForm<ForgotPasswordValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },
    })

    const onSubmit = async (data: ForgotPasswordValues) => {
        try {
            await requestReset()
            setSentEmail(data.email)
            setIsSent(true)
            toast({
                title: "Листа відправлено",
                description: "Перевірте вашу пошту для відновлення паролю",
            })
        } catch {
            toast({
                title: "Помилка",
                description: "Не вдалося відправити запит. Спробуйте пізніше.",
                variant: "destructive",
            })
        }
    }

    if (isSent) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="mb-2 text-center text-2xl">Перевірте пошту</CardTitle>
                    <CardDescription className="mb-6 text-center">
                        Ми надіслали інструкції для відновлення паролю на <strong>{sentEmail}</strong>
                    </CardDescription>
                    <Link href="/login" className="w-full">
                        <Button className="w-full">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Повернутися до входу
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="overflow-hidden rounded-3xl border-slate-200 bg-white/80 shadow-xl backdrop-blur-xl">
            <CardHeader className="space-y-1 pb-8 pt-8 text-center">
                <CardTitle className="text-2xl font-bold text-slate-900">Відновлення паролю</CardTitle>
                <CardDescription className="px-4 text-base text-slate-500">
                    Введіть вашу email адресу і ми надішлемо інструкції для відновлення
                </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="ml-1 text-sm font-medium text-slate-700">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="name@example.com"
                                            className="h-12 rounded-xl border-slate-200 bg-white/50 px-4 text-base transition-all focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="h-12 w-full rounded-xl bg-[linear-gradient(135deg,#00796b,#009688,#0f766e)] text-base font-semibold text-white shadow-lg shadow-emerald-100 transition-all hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Відправка...
                                </>
                            ) : (
                                "Надіслати інструкції"
                            )}
                        </Button>
                    </form>
                </Form>

                <div className="mt-8 text-center">
                    <Link
                        href="/login"
                        className="inline-flex items-center text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Повернутися до входу
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
