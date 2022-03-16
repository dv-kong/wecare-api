import UserService from "../../src/modules/User/service";
import UserDTO from "../../src/modules/User/dto";
import mockedRepository from "../mocks/userRepository.mock";

//to do - mock repo

/**
 * supply mock to UserService
 */

const userService = new UserService(mockedRepository); 


describe('OUR FIRST TEST', () => {
    it('should return a list of users', async () => {
        const users = await userService.getAll();
        expect(users[0] instanceof UserDTO).toBe(true);
    });
});



// describe('Create a new user', () => {
//     it('should create a new user with the supplied data', async () => {
//         const newUser = await userService.addNew(); // supply new user input?

//         users.push(newUser);

//         expect(newUser instanceof UserDTO).toBe(true);
//     });
// });