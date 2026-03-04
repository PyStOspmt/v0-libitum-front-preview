"use client"

import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, Chrome, Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { type RegisterFormValues, registerSchema } from "@/features/auth/lib/schemas/register.schema"

import { useAuthContext } from "../context/auth-context"

export function RegisterForm() {
    const { handleRegisterWithEmailAndPassword, handleOauth } = useAuthContext()
    const { toast } = useToast()
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showRules, setShowRules] = useState(false)
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "client",
        },
    })

    const { isSubmitting } = form.formState

    const onSubmit = async (values: RegisterFormValues) => {
        if (!values.agreeToTerms) {
            setShowRules(true)
            return
        }

        setIsLoading(true)
        try {
            await handleRegisterWithEmailAndPassword(values.name, values.email, values.password, values.role)
            router.push("/verify-email")
        } catch (error) {
            const message = error instanceof Error ? error.message : "Не вдалося створити акаунт. Спробуйте інший email."
            toast({
                title: "Помилка",
                description: message,
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    async function handleGoogleRegister() {
        setIsGoogleLoading(true)
        try {
            await loginWithGoogle()
        } catch {
            toast({
                title: "Помилка",
                description: "Не вдалося підключити Google. Спробуйте пізніше.",
                variant: "destructive",
            })
            setIsGoogleLoading(false)
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-semibold text-slate-800">Ім&apos;я</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ваше ім'я"
                                        autoComplete="name"
                                        className="h-11 rounded-lg border-slate-200 bg-[#f8f9fa] focus:border-[#009688] focus:bg-white focus:ring-[#009688]/20"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-semibold text-slate-800">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="your@email.com"
                                        autoComplete="email"
                                        className="h-11 rounded-lg border-slate-200 bg-[#f8f9fa] focus:border-[#009688] focus:bg-white focus:ring-[#009688]/20"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-semibold text-slate-800">Пароль</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            autoComplete="new-password"
                                            className="h-11 rounded-lg border-slate-200 bg-[#f8f9fa] pr-11 focus:border-[#009688] focus:bg-white focus:ring-[#009688]/20"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((p) => !p)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                            aria-label={showPassword ? "Приховати" : "Показати"}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </FormControl>
                                <p className="text-xs text-slate-400">Мінімум 8 символів, 1 велика літера, 1 цифра</p>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Confirm Password */}
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-semibold text-slate-800">Підтвердження паролю</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        className="h-11 rounded-lg border-slate-200 bg-[#f8f9fa] focus:border-[#009688] focus:bg-white focus:ring-[#009688]/20"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Role */}
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-semibold text-slate-800">Я хочу</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="grid grid-cols-2 gap-3"
                                    >
                                        <div>
                                            <RadioGroupItem value="client" id="client" className="peer sr-only" />
                                            <Label
                                                htmlFor="client"
                                                className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-slate-200 bg-white p-3 text-sm font-medium transition-all hover:border-[#009688] peer-data-[state=checked]:border-[#009688] peer-data-[state=checked]:bg-[#E0F2F1]"
                                            >
                                                Знайти спеціаліста
                                            </Label>
                                        </div>
                                        <div>
                                            <RadioGroupItem value="specialist" id="specialist" className="peer sr-only" />
                                            <Label
                                                htmlFor="specialist"
                                                className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-slate-200 bg-white p-3 text-sm font-medium transition-all hover:border-[#f57c00] peer-data-[state=checked]:border-[#f57c00] peer-data-[state=checked]:bg-[#FFF3E0]"
                                            >
                                                Стати спеціалістом
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Terms */}
                    <FormField
                        control={form.control}
                        name="agreeToTerms"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-start gap-2.5">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="mt-0.5 border-slate-300 data-[state=checked]:bg-[#009688] data-[state=checked]:border-[#009688]"
                                        />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal text-slate-600 leading-tight cursor-pointer">
                                        Я погоджуюсь з{" "}
                                        <button
                                            type="button"
                                            onClick={() => setShowRules(true)}
                                            className="font-semibold text-[#009688] hover:underline"
                                        >
                                            правилами платформи
                                        </button>{" "}
                                        та політикою конфіденційності
                                    </FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="h-11 w-full rounded-lg bg-[#009688] text-sm font-semibold text-white hover:bg-[#00796B] cursor-pointer"
                        disabled={isLoading || isSubmitting}
                    >
                        {isLoading || isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Створення акаунту...
                            </>
                        ) : (
                            "Створити акаунт"
                        )}
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-white px-4 text-slate-400">або</span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        disabled={isGoogleLoading}
                        onClick={handleGoogleRegister}
                        className="h-11 w-full rounded-lg border-slate-200 bg-white font-medium text-slate-700 hover:bg-slate-50 text-sm cursor-pointer"
                    >
                        {isGoogleLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Chrome className="mr-2 h-4 w-4" />
                        )}
                        Зареєструватись через Google
                    </Button>
                </form>
            </Form>

            <div className="mt-8 text-center text-sm text-slate-500">
                Вже маєте акаунт?{" "}
                <Link href="/login" className="font-semibold text-[#009688] hover:text-[#00796B]">
                    Увійти
                </Link>
            </div>

            <Dialog open={showRules} onOpenChange={setShowRules}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto rounded-lg border border-slate-200">
                    <DialogHeader className="pb-5 border-b border-slate-100">
                        <DialogTitle className="text-2xl font-bold text-slate-800">Правила платформи</DialogTitle>
                        <DialogDescription className="text-slate-500">
                            Будь ласка, ознайомтесь перед реєстрацією
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-5 text-sm text-slate-600">
                        <section className="space-y-4">
                            <h3 className="font-bold text-base text-slate-800 flex items-center gap-3">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E0F2F1] text-[#009688] text-xs font-bold">
                                    1
                                </span>
                                Для спеціалістів
                            </h3>
                            <ul className="space-y-3 pl-2">
                                <li className="flex gap-3">
                                    <div className="h-1.5 w-1.5 rounded-full bg-[#22d3ee] mt-2 shrink-0" />
                                    <span>
                                        <strong className="text-slate-700">Час відповіді:</strong> 3 години для
                                        прийняття/відхилення заявок.
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <div className="h-1.5 w-1.5 rounded-full bg-[#22d3ee] mt-2 shrink-0" />
                                    <span>
                                        <strong className="text-slate-700">Оновлення статусу:</strong> 2 години після прийняття
                                        для оновлення статусу комунікації.
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <div className="h-1.5 w-1.5 rounded-full bg-[#22d3ee] mt-2 shrink-0" />
                                    <span>
                                        <strong className="text-slate-700">Результат пробного уроку:</strong> 2 години після
                                        пробного уроку для звіту про результат.
                                    </span>
                                </li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h3 className="font-bold text-base text-slate-800 flex items-center gap-3">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E0F2F1] text-[#009688] text-xs font-bold">
                                    2
                                </span>
                                Для учнів
                            </h3>
                            <ul className="space-y-3 pl-2">
                                <li className="flex gap-3">
                                    <div className="h-1.5 w-1.5 rounded-full bg-[#22d3ee] mt-2 shrink-0" />
                                    <span>
                                        <strong className="text-slate-700">Ліміт бронювань:</strong> Максимум 3 активні заявки
                                        одночасно.
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <div className="h-1.5 w-1.5 rounded-full bg-[#22d3ee] mt-2 shrink-0" />
                                    <span>
                                        <strong className="text-slate-700">Пробні уроки:</strong> Будь ласка, повідомте
                                        репетитора про ваше рішення після пробного уроку.
                                    </span>
                                </li>
                            </ul>
                        </section>

                        <section className="bg-[#fff8e1] p-5 rounded-lg">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-[#f9a825] mt-0.5 shrink-0" />
                                <div>
                                    <h3 className="font-bold text-[#e65100] mb-1">Важливо</h3>
                                    <p className="text-[#795548] leading-relaxed">
                                        Наша платформа працює на основі довіри та взаємної поваги. Порушення правил може
                                        призвести до постійного призупинення облікового запису.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="flex items-center space-x-3 pt-5 border-t border-slate-100 mt-2">
                        <Checkbox
                            id="rules-dialog"
                            checked={form.watch("agreeToTerms")}
                            onCheckedChange={(checked) => {
                                form.setValue("agreeToTerms", checked as true)
                                if (checked) setShowRules(false)
                            }}
                            className="border-slate-300 data-[state=checked]:bg-[#009688] data-[state=checked]:border-[#009688]"
                        />
                        <label htmlFor="rules-dialog" className="text-sm font-medium text-slate-700 cursor-pointer select-none">
                            Я прочитав та приймаю правила платформи
                        </label>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
