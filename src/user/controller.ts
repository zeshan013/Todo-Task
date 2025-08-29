import { Request, Response } from "express"
import { userService } from "./service.js";




    export async function createUser(req: Request, res: Response){

        try {

            //vars
            const { name, email, password, status } = req.body
            let newUser={name, email, password, status};

            // Inits
            let u_Ser = new userService()


            newUser=await u_Ser.create(newUser)

            if (newUser) 
                return res
                .status(200)
                .json({ message: `User successfully created`, data: newUser })

            return res
            .status(201)
            .json({ message: `User not created`})

        } catch (e) {

            return res
            .status(400)
            .json({ message: e.message })
        }
        
    }

    export async function getAllUsers(req: Request, res: Response){
        try {

            //vars
            let newUser=[]

            // Inits
            let u_Ser = new userService()


            newUser=await u_Ser.findAll()

            if (newUser) 
                return res
                .status(200)
                .json({ message: `Users successfully retrived`, data: newUser })

            return res
            .status(201)
            .json({ message: `Users not found`})

        } catch (e) {

            return res
            .status(400)
            .json({ message: e.message })
        }
    }