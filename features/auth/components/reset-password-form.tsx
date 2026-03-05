"use client"

import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useResetPassword } from "@/features/dashboard/hooks/use-reset-password"

import { type ResetPasswordValues, resetPasswordSchema } from "../lib/schemas/reset-password.schema"

type ResetPasswordFormProps = {
    token: string
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
    const { toast } = useToast()
    const [showPassword, setShowPassword] = useState(false)

    const { confirmResetPassword } = useResetPassword()

    const form = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { password: "", confirmPassword: "" },
    })

    const onSubmit = async (data: ResetPasswordValues) => {
        if (!token) {
            toast({
                title: "Помилка",
                description: "Токен відсутній. Спробуйте запросити скидання паролю ще раз.",
                variant: "destructive",
            })
            return
        }

        try {
            await confirmResetPassword({
                variables: {
                    resetPasswordPayload: { token, password: data.password },
                },
            })
        } catch (error) {
            if (error instanceof Error) {
                toast({
                    title: "Помилка",
                    description: error.message,
                    variant: "destructive",
                })
                return
            }

            toast({
                title: "Помилка",
                description: "Не вдалося змінити пароль. Спробуйте запросити скидання ще раз.",
                variant: "destructive",
            })
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Новий пароль</CardTitle>
                <CardDescription>Введіть новий пароль для вашого акаунту</CardDescription>
            </CardHeader>
            <CardContent>
                {!token && (
                    <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700 mb-4">
                        Токен для скидання паролю відсутній. Перейдіть за посиланням з email.
                    </div>
                )}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Новий пароль</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((p) => !p)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <p className="text-xs text-muted-foreground">Мінімум 8 символів</p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Підтвердіть пароль</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || !token}>
                            {form.formState.isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Зміна паролю...
                                </>
                            ) : (
                                "Змінити пароль"
                            )}
                        </Button>
                    </form>
                </Form>
                <div className="mt-6 text-center text-sm">
                    <Link href="/login" className="font-medium text-primary hover:underline">
                        Повернутися до входу
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
