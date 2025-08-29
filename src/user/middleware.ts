import { NextFunction, Request, Response } from "express"
import { userSchema as schema } from "./zod-validator.js"
import * as z from "zod";


export async function userValidate(req: Request, res: Response, next: NextFunction) {
    try {
        //vars
        const { name, email, password, status } = req.body

        //valiadtion
        const vd = schema.safeParse({ name, email, password, status });

        if (!vd.success)
            return res
            .status(400)
            .json({ message: z.prettifyError(vd.error) })

        next()

    } catch (e) {
        return res
        .status(400)
        .json({ message: e.message })
    }
}

export async function userIDValidate(req: Request, res: Response, next: NextFunction) {
    try {
        //vars
        const { userId } = req.params

        //validation
        const vd = z.coerce.number().int().positive().safeParse(userId)

        if (!vd.success)
            return res
            .status(400)
            .json({ message: z.prettifyError(vd.error) })

        next()

    } catch (e) {
        return res
        .status(400)
        .json({ message: e.message })
    }
}
