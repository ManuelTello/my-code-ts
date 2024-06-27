import { User } from "../../models/user";
import { DataSource, Repository } from "typeorm";

function provideUsersRepository(data_source: DataSource): Repository<User> {
    const repository: Repository<User> = data_source.getRepository(User);
    return repository;
}

export default {
    provideUsersRepository
}