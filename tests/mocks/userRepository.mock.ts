import IUserRepository from "../../src/modules/User/interfaces/IUserRepository";
import { User } from "../../src/modules/User/entity";
import users from "./users";
import { createMock } from "ts-auto-mock";

const mockedRepository = createMock<IUserRepository>({
  findAll: async (): Promise<User[]> => {
    return await users;
  },
});

export default mockedRepository;
