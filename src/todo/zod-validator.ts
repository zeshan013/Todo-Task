import * as z from "zod";

export const todoSchema = z.object({
    name: z.string().max(255).min(3),
    userId: z.string().regex(/^[0-9a-fA-F]{8}$/),
    title: z.string().max(255).min(3),
    description: z.string().max(1000).min(3),
    status: z.enum(["completed", "pending"]).optional()
});