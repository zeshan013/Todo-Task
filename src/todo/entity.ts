import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../user/entity.js";


// Types
export type TodoStatusType = "completed" | "pending" 


// Schemas
@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ nullable: true })
    userId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })

    
    @Column({ type: "varchar", length: 1000 })
    description:string

    @Column({
        type: "enum",
        enum: ["completed", "pending"],
        default: "pending"
    })
    status: TodoStatusType

}
