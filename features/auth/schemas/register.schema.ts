import { z } from "zod"

export const registerSchema = z
    .object({
        name: z
            .string()
            .min(2, { message: "Ім'я має містити принаймні 2 символи" })
            .max(50, { message: "Ім'я занадто довге" }),
        email: z.string().email({ message: "Введіть коректну email-адресу" }),
        password: z
            .string()
            .min(8, { message: "Пароль має містити принаймні 8 символів" })
            .regex(/[A-Z]/, { message: "Пароль має містити хоча б одну велику літеру" })
            .regex(/[0-9]/, { message: "Пароль має містити хоча б одну цифру" }),
        confirmPassword: z.string(),
        role: z.enum(["client", "specialist"], {
            required_error: "Оберіть роль",
        }),
        agreeToTerms: z.literal(true, {
            errorMap: () => ({ message: "Необхідно погодитись з умовами використання" }),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Паролі не збігаються",
        path: ["confirmPassword"],
    })

export type RegisterFormValues = z.infer<typeof registerSchema>
