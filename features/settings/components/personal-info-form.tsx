"use client"

import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { type PersonalInfoValues, personalInfoSchema } from "@/features/settings/schemas/settings.schema"

interface PersonalInfoFormProps {
    user: any
}

export function PersonalInfoForm({ user }: PersonalInfoFormProps) {
    const { toast } = useToast()

    const form = useForm<PersonalInfoValues>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
        },
    })

    const { isSubmitting } = form.formState

    const onSubmit = async (values: PersonalInfoValues) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        toast({
            title: "Збережено",
            description: "Ваші особисті дані успішно оновлено",
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#121117] font-[600]">Ім&apos;я</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Іван Петренко"
                                        className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#121117] font-[600]">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#121117] font-[600]">Телефон</FormLabel>
                                <FormControl>
                                    <Input
                                        type="tel"
                                        placeholder="+380"
                                        className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-[10px] bg-[#00c5a6] text-[#121117] font-[700] hover:bg-[#00b296] transition-colors"
                >
                    {isSubmitting ? "Збереження..." : "Зберегти зміни"}
                </Button>
            </form>
        </Form>
    )
}
