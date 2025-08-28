import * as z from "zod";

export const userSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{8}$/),
    name: z.string().max(255).min(3),
    email: z.email(),
    password: z.string().max(1000).min(3),
    status: z.enum(["active", "in-active"]).optional()
});