import { z } from "zod"

import { PASSWORD_RULES } from "../constants/password-rules"

export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(PASSWORD_RULES.minLength, {
                message: `Мінімум ${PASSWORD_RULES.minLength} символів`,
            })
            .regex(/[A-Z]/, { message: "Хоча б одна велика літера" })
            .regex(/[a-z]/, { message: "Хоча б одна мала літера" })
            .regex(/[0-9]/, { message: "Хоча б одна цифра" })
            .regex(/[^A-Za-z0-9]/, { message: "Хоча б один спецсимвол" }),
        confirmPassword: z.string().min(PASSWORD_RULES.minLength, {
            message: `Мінімум ${PASSWORD_RULES.minLength} символів`,
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Паролі не співпадають",
        path: ["confirmPassword"],
    })

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>
