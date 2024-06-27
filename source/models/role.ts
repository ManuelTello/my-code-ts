import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserDetails } from "./userdetails";

@Entity("roles")
export class Role {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    public id?: number;

    @Column({ type: "varchar", name: "role_name" })
    public role_name?: string;

    @Column({ type: "varchar", name: "role_description" })
    public role_description?: string;

    @OneToMany(() => UserDetails, (details) => details.role)
    public details?: UserDetails[];
}