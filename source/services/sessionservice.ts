import { DataSource, Repository } from "typeorm";
import { User } from "../models/user";
import providers from "../providers/respository/repository";
import { UserDetails } from "../models/userdetails";
import { Role } from "../models/role";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { EntityFactory } from "../lib/entityfactory";


export class SessionService {
    private providerRepository: Repository<User>;

    public constructor(database_connection: DataSource) {
        this.providerRepository = providers.provideUsersRepository(database_connection);
    }

    public async addUserDetails(email: string, date_created: Date, username: string, password: string, role_id: number = 2): Promise<void> {
        const hashed_password: string = await bcrypt.hash(password, 8);
        const new_user_id: string = uuidv4();
        const user: User = EntityFactory.createUser(new_user_id, username, hashed_password, email, date_created, role_id);
        await this.providerRepository.save(user);
        /*
        const role: Role = new Role();
        role.id = role_id;
        const user_details: UserDetails = new UserDetails();
        user_details.email = email;
        user_details.date_created = date_created;
        user_details.role = role;
        const user: User = new User();
        user.id = uuidv4();
        user.username = username;
        user.details = user_details;
        user.password = await bcrypt.hash(password, 8);
        await this.providerRepository.save(user);
        */
    }
}