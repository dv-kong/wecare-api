// import User from "../model";
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