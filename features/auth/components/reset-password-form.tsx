"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

import {
    resetPasswordSchema,
    type ResetPasswordValues,
} from "../schemas/reset-password.schema"

export function ResetPasswordForm() {
    const router = useRouter()
    const { toast } = useToast()

    const form = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { password: "", confirmPassword: "" },
    })

    const onSubmit = (_data: ResetPasswordValues) => {
        setTimeout(() => {
            toast({ title: "Пароль оновлено", description: "Ваш пароль успішно змінено" })
            router.push("/login")
        }, 1500)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Новий пароль</CardTitle>
                <CardDescription>Введіть новий пароль для вашого акаунту</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Новий пароль</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} />
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
                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Зміна паролю..." : "Змінити пароль"}
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
