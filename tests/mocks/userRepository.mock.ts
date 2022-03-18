import IUserRepository from "../../src/modules/User/interfaces/IUserRepository";
import { User } from "../../src/modules/User/entity";
import users from "./users";
import { createMock } from "ts-auto-mock";
import UserService from "../../src/modules/User/service";

const mockedRepository = createMock<IUserRepository>({
  findAll: async (): Promise<User[]> => {
    return await users;
  },
  addNew: async (user: any): Promise<User> => {
    await users.push(user);
    return users[users.length];
  },
});

export default mockedRepository;
