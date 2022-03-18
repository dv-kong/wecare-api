import { EntityRepository, EntityManager, DeleteResult } from "typeorm";
import bcrypt from "bcrypt";
import { User } from "./entity";
import UserDTO from "./dto";
import IUserRepository from "./interfaces/IUserRepository";

// data access layer -> repository have methods to manipulate the database 


@EntityRepository()
class UserRepository implements IUserRepository {
  constructor(private manager: EntityManager) {}

  async findAll(): Promise<User[]> {
    return await this.manager.find(User);
  }

  async addNew(userEntity): Promise<User> {
    const salt = bcrypt.genSaltSync(10);
    userEntity.password = bcrypt.hashSync(userEntity.password, salt);
    return await this.manager.save(User, userEntity);
  }

  async findById(id: string): Promise<User | undefined> {
    return await this.manager.findOne(User, id);
  }

  async findByEmail(userEmail: string) {
    return await this.manager.findOne(User, { email: userEmail });
  }

  async deleteById(id: string): Promise<void> {
    //TODO voir DefaultResult
    // 
    await this.manager.delete(User, id);
    // return await this.manager.remove(User, id);
  }

  compareHash = async (password: string, hash: string) =>
    await bcrypt.compareSync(password, hash);
}

export default UserRepository;

