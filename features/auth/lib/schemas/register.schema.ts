import { UserRoles } from "@/graphql/generated/graphql"
import { z } from "zod"

import { PASSWORD_RULES } from "../constants/password-rules"

export const registerSchema = z
    .object({
        name: z.string().min(2, { message: "Ім'я має містити принаймні 2 символи" }).max(50, { message: "Ім'я занадто довге" }),
        email: z.string().email({ message: "Введіть коректну email-адресу" }),
        password: z
            .string()
            .min(PASSWORD_RULES.minLength, {
                message: `Пароль має містити принаймні ${PASSWORD_RULES.minLength} символів`,
            })
            .regex(/[A-Z]/, { message: "Пароль має містити хоча б одну велику літеру" })
            .regex(/[a-z]/, { message: "Пароль має містити хоча б одну малу літеру" })
            .regex(/[0-9]/, { message: "Пароль має містити хоча б одну цифру" })
            .regex(/[^A-Za-z0-9]/, { message: "Пароль має містити хоча б один спецсимвол" }),
        confirmPassword: z.string(),
        role: z.enum([UserRoles.Student, UserRoles.Specialist], {
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
