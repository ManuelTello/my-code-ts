import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role";

@Entity("user_details")
export class UserDetails {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    public id?: number;

    @Column({ type: "varchar", name: "email" })
    public email?: string;

    @Column({ type: "timestamp", name: "date_created" })
    public date_created?: Date;

    @ManyToOne(() => Role, (roles) => roles.details)
    @JoinColumn({ name: "role_id" })
    public role?: Role;
}