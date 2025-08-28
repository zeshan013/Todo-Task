import "reflect-metadata"
import { DataSource } from "typeorm"
import { ToDo } from "./entity/todo.js"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [ToDo],
    migrations: [],
    subscribers: [],
})
