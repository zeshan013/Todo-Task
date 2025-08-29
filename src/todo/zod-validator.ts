import * as z from "zod";

export const todoSchema = z.object({
    id:z.number().optional(),
    userId: z.number(),
    title: z.string().max(255).min(3),
    description: z.string().max(1000).min(3),
    status: z.enum(["completed", "pending"]).optional()
});

export const reAssignSchema=z.object({
    tId:z.number(),
    oId:z.number(),
    nId:z.number(),
})