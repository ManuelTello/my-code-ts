import { Role } from "../models/role";
import { User } from "../models/user";
import { UserDetails } from "../models/userdetails";

export class EntityFactory {
    public constructor() { }

    static createUser(user_id: string, username: string, password: string, email: string, date_created: Date, role_id: number): User {
        const user: User = new User();
        const user_details: UserDetails = new UserDetails();
        const role: Role = new Role();

        role.id = role_id;
        user_details.email = email;
        user_details.date_created = date_created;
        user_details.role = role;
        user.id = user_id;
        user.username = username;
        user.password = password;
        user.details = user_details;

        return user;
    }
}