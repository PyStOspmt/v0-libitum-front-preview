import { z } from "zod"

export const personalInfoSchema = z.object({
    name: z.string().min(2, { message: "Ім'я має містити принаймні 2 символи" }),
    email: z.string().email({ message: "Введіть коректну email-адресу" }),
    phone: z.string().optional(),
})

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>

export const passwordSchema = z
    .object({
        currentPassword: z.string().min(1, { message: "Введіть поточний пароль" }),
        newPassword: z.string().min(8, { message: "Новий пароль має містити принаймні 8 символів" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Паролі не збігаються",
        path: ["confirmPassword"],
    })

export type PasswordValues = z.infer<typeof passwordSchema>

export const notificationSchema = z.object({
    emailReminders: z.boolean(),
    smsReminders: z.boolean(),
    marketingEmails: z.boolean(),
})

export type NotificationValues = z.infer<typeof notificationSchema>
