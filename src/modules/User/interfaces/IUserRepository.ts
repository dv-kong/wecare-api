import User from "../model";
import UserDTO from "../dto";

export interface IUserRepository {
    findAll(): Promise<User[]>;
    addNew(userEntity: any): Promise<UserDTO>;
    findByEmail(userEntity: any): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    deleteById(id: string): Promise<any>;
    compareHash(password: string, hash: string): Promise<boolean>;
  }