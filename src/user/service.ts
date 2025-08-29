import { AppDataSource } from "../data-source.js";
import { User } from "./entity.js";

export class userService{

    private repo = AppDataSource.getRepository(User)

    async findAll(){
        let users=await this.repo.find();
        return users;
    }

    async  findOne(id){
        let user = await this.repo.findOne({ where: { id } });
        return user
    }

    async  create(dt){
        let user=await this.repo.save(dt);
        return user;
    }
}