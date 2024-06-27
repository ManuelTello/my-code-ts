import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { UserDetails } from "./userdetails";

@Entity("users")
export class User {
    @PrimaryColumn({ type: "varchar", name: "id", length: 40 })
    public id?: string;

    @Column({ type: "varchar", name: "username" })
    public username?: string;

    @Column({ type: "varchar", name: "password" })
    public password?: string;

    @OneToOne(() => UserDetails, { cascade: true })
    @JoinColumn({ name: "details_id" })
    public details?: UserDetails;
}