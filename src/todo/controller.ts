import { AppDataSource } from "../../data-source.js"
import { NextFunction, Request, Response } from "express"
import { Todo } from "./entity.js";
import { todoSchema } from "./zod-validator.js";



export class ToDoController {

    private repo = AppDataSource.getRepository(Todo)
    
    async all(request: Request, res: Response, next: NextFunction) {
        try {
            const todos = await this.repo.find();

            if (!todos)  
                res
                .status(204)
                .json({ message: "No Todo Found", data: todos });
 
            res
            .status(200)
            .json({ message: "All Todo Successfully Retrived", data: todos })
            
        } catch (error) { 
            res
            .status(400)
            .json({ message: error.message }) 
        }
    }

    async allToDo(request: Request, res: Response, next: NextFunction) {
        try {
            //vars
            const user_id = request.params.id
            let todos;
            let csvString = "User_ID|User_Name|User_Email|ToDo_ID|ToDo_Title|Status|\n"

            //inits
            let tdr = this.repo

            //validation 
            const uId = todoSchema.pick({ userId: true })
            const vd = uId.safeParse({ user_id })
            if (!vd.success) res.status(400).json({ message: `${z.prettifyError(vd.error)}` })


            let user = await tdr.findOne({ where: { user_id } })
            if (user == null) res.status(400).json({ message: "No User Found" })


            todos = await tdr.find({ where: { user_id } })
            if (todos.length >= 1) {
                for (const key in todos) {
                    const todo = todos[key];
                    csvString += `|${todo.user_id}|${todo.name}|${todo.email}|${todo.id}|${todo.title}|${todo.status}|\n`;
                }
                res.status(200).type('text').send(csvString)
            } else {
                res.status(400).json({ message: "No Todo Found" })
            }

        } catch (error) { res.status(400).json({ message: error.message }) }
    }

    async reAssign(req: Request, res: Response, next: NextFunction) {
        try {
            // Vars
            const { todoId, originalUserId: oldId, newUserId: newId } = req.body;
            let newUser;
            let todo;
            let newToDo;

            // Inits
            let tdr = this.repo

            // Validations by ZOD
            const input = z.object({ todoId: z.number(), oldId: z.string(), newId: z.string() });
            const vd = input.safeParse({ todoId, oldId, newId });
            if (!vd.success) res.status(400).json({ message: `${z.prettifyError(vd.error)}` })


            
            todo = await tdr.findOne({ where: { id: vd.data.todoId } })
            if (!todo) res.status(400).json({ message: `todo not found` })
            if (todo.user_id != vd.data.todoId) res.status(400).json({ message: `user_id not belong to original User` })


            
            newUser = await tdr.findOne({ where: { user_id: vd.data.newId } })
            if (newUser == null) res.status(400).json({ message: `User not found against new user_id` })



            newToDo = {...newUser, title: todo.title, status: "pending" }
            newToDo = await tdr.save(newToDo);
            if (newToDo) res.status(200).json({ message: `TODO successfully ReAssigned`, data: newToDo })
            

        } catch (error) { res.status(400).json({ message: error.message }) }
    }

    async newToDo(req: Request, res: Response, next: NextFunction) {

        try {
            //vars
            const { name, email, user_id, title, status } = req.body
            let newTodo;

            // Inits
            let tdr = this.repo

            //validation
            const vd = todo.safeParse({ name, email, user_id, title, status });

            if (!vd.success) {
                res.status(400).json({ message: `${z.prettifyError(vd.error)}` })
            } else {
                newTodo = await tdr.save(vd.data);

                if (newTodo) res.status(200).json({ message: `TODO successfully created`, data: newTodo })
            }


        } catch (error) { res.status(400).json({ message: error.message }) }
    }
}