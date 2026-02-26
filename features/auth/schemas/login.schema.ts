import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().email({ message: "Введіть коректну email-адресу" }),
    password: z
        .string()
        .min(6, { message: "Пароль має містити принаймні 6 символів" }),
    rememberMe: z.boolean().optional().default(false),
})

export type LoginFormValues = z.infer<typeof loginSchema>
