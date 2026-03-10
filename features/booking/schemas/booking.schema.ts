import { z } from "zod"

export const bookingSchema = z.object({
    format: z.enum(["online", "offline"], {
        required_error: "Будь ласка, оберіть формат заняття",
    }),
    date: z.date({
        required_error: "Будь ласка, оберіть дату",
    }),
    time: z.string({
        required_error: "Будь ласка, оберіть час",
    }),
    phone: z.string().min(10, { message: "Введіть коректний номер телефону" }),
    message: z.string().optional(),
})

export type BookingFormValues = z.infer<typeof bookingSchema>
