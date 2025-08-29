import { AppDataSource } from "../data-source.js";
import { Todo } from "./entity.js";

export class todoService {

    private repo = AppDataSource.getRepository(Todo)

    async findAll(id) {
        let todos = await this.repo.find({ where: { userId: id } });
        return todos;
    }

    async getAll() {
        let todos = await this.repo.find();
        return todos;
    }

    async findOne(id) {
        let todo = await this.repo.findOne({ where: { id } });
        return todo
    }

    async create(dt) {
        let todo = await this.repo.save(dt);
        return todo
    }
}