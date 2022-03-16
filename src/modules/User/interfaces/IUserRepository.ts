// import User from "../model";
<<<<<<< HEAD

// export default interface IUserRepository {
//     findByEmail(email: string): Promise<User>
//     create(user: User): Promise<User>
//     login(email: string): Promise<User>
//     update(jwtTokens: string, email: string): void
//     delete(id: string): void
//     findById(id: string): Promise<User>
// }

export default {}
=======
import UserDTO from "../dto";
import { User } from '../entity'

export default interface IUserRepository {
    findAll(): Promise<User[]>;
    addNew(userEntity: any): Promise<User>;
    findByEmail(userEntity: any): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    deleteById(id: string): Promise<void>;
    compareHash(password: string, hash: string): Promise<boolean>;
  }
>>>>>>> testing
