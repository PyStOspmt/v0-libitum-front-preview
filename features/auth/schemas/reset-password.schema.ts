import { z } from "zod"

export const resetPasswordSchema = z
    .object({
        password: z.string().min(8, "Мінімум 8 символів"),
        confirmPassword: z.string().min(8, "Мінімум 8 символів"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Паролі не співпадають",
        path: ["confirmPassword"],
    })

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>
