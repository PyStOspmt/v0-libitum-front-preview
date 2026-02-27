"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { type LoginFormValues, loginSchema } from "@/features/auth/schemas/login.schema"
import { useAuth } from "@/lib/hooks/use-auth"

import { Eye, EyeOff, Loader2, Chrome } from "lucide-react"
import { useForm } from "react-hook-form"

export function LoginForm() {
    const { login, loginWithGoogle } = useAuth()
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [serverError, setServerError] = useState<string | null>(null)
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    })

    const {
        formState: { isSubmitting },
    } = form

    async function onSubmit(values: LoginFormValues) {
        setServerError(null)
        try {
            await login(values.email, values.password)
            router.push("/")
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Невірний email або пароль. Спробуйте ще раз."
            setServerError(message)
        }
    }

    async function handleGoogleLogin() {
        setIsGoogleLoading(true)
        try {
            await loginWithGoogle()
        } catch {
            setServerError("Не вдалося підключити Google. Спробуйте пізніше.")
            setIsGoogleLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Server error */}
                {serverError && (
                    <div className="rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-[14px] font-medium text-red-700">
                        {serverError}
                    </div>
                )}

                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[14px] font-[600] text-[#121117]">Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="your@email.com"
                                    autoComplete="email"
                                    className="h-[48px] rounded-[12px] border-slate-200 bg-[#f8f9fa] text-[15px] focus:border-[#009688] focus:bg-white focus:ring-[#009688]/20"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-[13px]" />
                        </FormItem>
                    )}
                />

                {/* Password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center justify-between">
                                <FormLabel className="text-[14px] font-[600] text-[#121117]">Пароль</FormLabel>
                                <Link
                                    href="/forgot-password"
                                    className="text-[13px] font-[600] text-[#009688] hover:underline"
                                >
                                    Забули пароль?
                                </Link>
                            </div>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        className="h-[48px] rounded-[12px] border-slate-200 bg-[#f8f9fa] pr-12 text-[15px] focus:border-[#009688] focus:bg-white focus:ring-[#009688]/20"
                                        {...field}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((p) => !p)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                        aria-label={showPassword ? "Приховати пароль" : "Показати пароль"}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage className="text-[13px]" />
                        </FormItem>
                    )}
                />

                {/* Remember me */}
                <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-2.5">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="border-slate-300 data-[state=checked]:border-[#009688] data-[state=checked]:bg-[#009688]"
                                />
                            </FormControl>
                            <FormLabel className="cursor-pointer text-[14px] font-medium text-[#3e3d45]">
                                Запам&apos;ятати мене
                            </FormLabel>
                        </FormItem>
                    )}
                />

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-[52px] w-full rounded-[12px] bg-[#009688] text-[16px] font-bold text-white hover:bg-[#00796b] disabled:opacity-70"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Вхід...
                        </>
                    ) : (
                        "Увійти"
                    )}
                </Button>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="bg-white px-4 text-slate-400">або</span>
                    </div>
                </div>

                {/* Google Login */}
                <Button
                    type="button"
                    variant="outline"
                    disabled={isGoogleLoading}
                    onClick={handleGoogleLogin}
                    className="h-[52px] w-full rounded-[12px] border-slate-200 bg-white font-medium text-slate-700 hover:bg-slate-50 text-[15px] cursor-pointer"
                >
                    {isGoogleLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Chrome className="mr-2 h-5 w-5" />
                    )}
                    Увійти через Google
                </Button>

                {/* Register link */}
                <p className="text-center text-[14px] text-[#69686f]">
                    Немає акаунту?{" "}
                    <Link href="/register" className="font-[700] text-[#009688] hover:underline">
                        Зареєструватись
                    </Link>
                </p>
            </form>
        </Form>
    )
}
