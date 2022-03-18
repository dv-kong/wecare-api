import UserService from "../../src/modules/User/service";
import UserDTO from "../../src/modules/User/dto";
import mockedRepository from "../mocks/userRepository.mock";
import users from "../mocks/users";

//to do - mock repo

/**
 * supply mock to UserService
 */

const userService = new UserService(mockedRepository);

describe("OUR FIRST TEST", () => {
  it("should return a list of users", async () => {
    const users = await userService.getAll();
    expect(users[0] instanceof UserDTO).toBe(true);
  });
});

describe("Create a new user", () => {
  it("should create a new user with the supplied data", async () => {
    const newUser = await userService.register(users[0]); // supply new user input?
    expect(newUser instanceof Object).toBe(true);
  });
});
