import { z } from "zod"

import { PASSWORD_RULES } from "../constants/password-rules"

export const loginSchema = z.object({
    email: z.string().email({ message: "Введіть коректну email-адресу" }),
    password: z.string().min(PASSWORD_RULES.minLength, {
        message: `Пароль має містити принаймні ${PASSWORD_RULES.minLength} символів`,
    }),
    rememberMe: z.boolean().optional().default(false),
})

export type LoginFormValues = z.infer<typeof loginSchema>
