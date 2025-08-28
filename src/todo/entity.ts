import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../user/entity";


// Types
export type TodoStatusType = "completed" | "pending" 


// Schemas
@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => User)
    @JoinColumn({name: "userId"})
    userId: User

    @Column({ type: "varchar", length: 255 })
    title:string

    @Column({
        type: "enum",
        enum: ["completed", "pending"],
        default: "pending"
    })
    status: TodoStatusType

}
