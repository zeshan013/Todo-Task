import { NextFunction, Request, Response } from "express";
import { todoSchema as schema} from "./zod-validator.js";
import { reAssignSchema as reAssign } from "./zod-validator.js";
import * as z from "zod";



export async function  todoValidate(req: Request, res: Response, next: NextFunction) {
    try {
        //vars
        const {  userId, description,title, status } = req.body

        const vd = schema.safeParse({ title, description, userId, status });

        if (!vd.success) {
            res
                .status(400)
                .json({ message: `${z.prettifyError(vd.error)}` })
        } else {
            next()
        }

    } catch (e) {
        res
            .status(400)
            .json({ message: e.message })
    }

}


export async function reAssignValidate(req: Request, res: Response, next: NextFunction) {
    try {
        //vars
        const { todoId, originalUserId: oldId, newUserId: newId } = req.body;
        
        const vd = reAssign.safeParse({ tId:todoId,oId:oldId,nId:newId});
        
        if (!vd.success) 
            res
            .status(400)
            .json({ message: `${z.prettifyError(vd.error)}` })
        else 
            next()
        
    } catch (e) {
        res
        .status(400)
        .json({ message: e.message })
    }
}