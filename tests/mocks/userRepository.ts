import { IUserRepository } from "../../src/modules/User/interfaces/IUserRepository";
import UserDTO from "../../src/modules/User/dto";
import { User } from "../../src/modules/User/entity";
import UserService from "../../src/modules/User/service";
import users from ''

const userRepository: IUserRepository = {
    
    findAll: jest.fn((): Promise<User[]> => {


        return users;
    }),

    addNew: function (userEntity: any): Promise<UserDTO> {
        throw new Error("Function not implemented.")
    },
    findByEmail: function (userEntity: any): Promise<any> {
        throw new Error("Function not implemented.")
    },
    findById: function (id: string): Promise<any> {
        throw new Error("Function not implemented.")
    },
    deleteById: function (id: string): Promise<any> {
        throw new Error("Function not implemented.")
    },
    compareHash: function (password: string, hash: string): Promise<boolean> {
        throw new Error("Function not implemented.")
    }
}

export default userRepository;