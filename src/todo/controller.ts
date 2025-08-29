import { Request, Response } from "express"
import { todoService } from "./service.js";
import { userService } from "../user/service.js";


export async function getAllToDo(req: Request, res: Response) {
    try {
        const service=new todoService()
        
        const todos = await service.getAll()

        if (!todos)  
            return res
            .status(204)
            .json({ message: "No Todo Found" });
        
        return res
        .status(200)
        .json({ message: "All Todo Successfully Retrived", data: todos })
        
    } catch (e) { 
        return res
        .status(400)
        .json({ message: e.message }) 
    }
}

export async function allUserToDo(req: Request, res: Response) {
    try {
        //vars
        const Id = req.params.userId
        let todos;
        let csvString = "User_ID|User_Name|User_Email|ToDo_ID|ToDo_Title|Status|\n"

        //inits
        let u_Ser =  new userService()
        let td_Ser = new todoService()

        
        let user = await u_Ser.findOne(Id)
        
        if (user == null)
            return res
            .status(400)
            .json({ message: "No User Found" })


        todos = await td_Ser.findAll(Id)

        if (!todos || todos.length < 1) 
            return res
            .status(400)
            .json({ message: "No Todo Found" })

        for (const key in todos) {
            const todo = todos[key];
            csvString += `|${todo.userId}|${user.name}|${user.email}|${todo.id}|${todo.title}|${todo.status}|\n`;
        }
        return res
        .status(200)
        .type('text').send(csvString)

    } catch (e) {
        return res
        .status(400)
        .json({ message: e.message })
    }
}

export async function reAssignToDo(req: Request, res: Response) {
    try {
        // Vars
        const { todoId, originalUserId: oldId, newUserId: newId } = req.body;
        let newUser;
        let todo;
        let newToDo;

        // Inits
        let u_Ser =  new userService()
        let td_Ser = new todoService()

    
        todo = await td_Ser.findOne(todoId)
        if (!todo) 
            return  res
            .status(400)
            .json({ message: `todo not found` })
        
        if (todo.userId != oldId) 
            return res
            .status(400)
            .json({ message: `user_id not belong to original User` })
        

        newUser = await u_Ser.findOne(newId)
        if (newUser == null) 
            return res
            .status(400)
            .json({ message: `User not found against new user_id` })



        newToDo = {userId:newId,description:todo.description, title: todo.title, status: "pending" }
        newToDo = await td_Ser.create(newToDo);
        if (newToDo) 
            return res
            .status(200)
            .json({ message: `ToDo successfully ReAssigned`, data: newToDo })
        

    } catch (e) { 
        return res
        .status(400)
        .json({ message: e.message }) 
    }
}

export async function createToDo(req: Request, res: Response) {

    try {
        //vars
        const { description, userId, title, status } = req.body
        let newTodo={description,  userId, title, status};

        // Inits
        let td_Ser = new todoService()

        newTodo = await td_Ser.create(newTodo);
        if (newTodo) 
            return res
            .status(200)
            .json({ message: `ToDo successfully created`, data: newTodo })

        return res
        .status(201)
        .json({ message: `ToDo not created`})
        


    } catch (e) { 
        return res
        .status(400)
        .json({ message: e.message }) 
    }
}
