import * as z from "zod";

export const userSchema = z.object({
    name: z.string().max(255).min(3),
    email: z.email(),
    password: z.string().max(1000).min(3),
    status: z.enum(["active", "in-active"]).optional()
});