import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().email({
        message: "Please enter your email"
    }),
    name: z.string().min(3, "Name must be at least 3 characters"),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters"
    })
})

export type RegisterSchema = z.infer<typeof registerSchema>