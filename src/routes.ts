import express from "express";
import { createUser, getAllUsers } from "./user/controller.js";
import { allUserToDo, createToDo, getAllToDo, reAssignToDo } from "./todo/controller.js";
import { userIDValidate, userValidate } from "./user/middleware.js";
import { reAssignValidate, todoValidate } from "./todo/middleware.js";


const Routes = express.Router();

Routes.get('/users/all', getAllUsers);
Routes.get('/todo/all', getAllToDo);
Routes.get('/users/:userId', userIDValidate, allUserToDo);


Routes.post('/users/create', userValidate, createUser)
Routes.post('/todo/create', todoValidate, createToDo)
Routes.post('/todo/assign', reAssignValidate, reAssignToDo)




export default Routes;