import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
export type ToDoStatusType = "completed" | "pending" 
@Entity()
export class ToDo {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    user_id: string

    @Column({ type: "varchar", length: 255 })
    email: string

    @Column({ type: "varchar", length: 255 })
    title:string

    @Column({
        type: "enum",
        enum: ["completed", "pending"],
        default: "pending"
    })
    status: ToDoStatusType

}
