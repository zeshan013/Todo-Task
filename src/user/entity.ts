import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


// Types
export type UserStatusType = "active" | "in-active" 


// Schemas
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ type: "varchar", length: 255 })
    email: string

    @Column({ type: "varchar", length: 255 })
    password:string

    @Column({
        type: "enum",
        enum: ["active", "in-active"],
        default: "active"
    })
    status: UserStatusType

}
