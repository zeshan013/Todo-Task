import "reflect-metadata"
import { DataSource } from "typeorm"
import { Todo } from "./todo/entity.js"
import { User } from "./user/entity.js"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [Todo, User],
    migrations: [],
    subscribers: [],
})
