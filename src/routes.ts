import { ToDoController } from "./controller/ToDoController.js"

export const Routes =
[
    {
        method: "get",
        route: "/users/all",
        controller: ToDoController,
        action: "all"
    },
    {
        method: "get",
        route: "/users/:id",
        controller: ToDoController,
        action: "allToDo"
    },
    {
        method: "post",
        route: "/users/reAssign",
        controller: ToDoController,
        action: "reAssign"
    },
    {
        method: "post",
        route: "/users/create",
        controller: ToDoController,
        action: "newToDo"
    }
]