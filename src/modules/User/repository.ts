import { EntityRepository, EntityManager, DeleteResult } from "typeorm";
import bcrypt from "bcrypt";
import { User } from "./entity";
import UserDTO from "./dto";

export interface IUserRepository {
  findAll(): Promise<User[]>;
  addNew(userEntity: any): Promise<UserDTO>;
  findByEmail(userEntity: any): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  deleteById(id: string): Promise<DeleteResult>;
  compareHash(password: string, hash: string): Promise<boolean>;
}

@EntityRepository()
class UserRepository implements IUserRepository {
  constructor(private manager: EntityManager) {}

  async findAll() {
    return await this.manager.find(User);
  }

  async addNew(userEntity) {
    const salt = bcrypt.genSaltSync(10);
    userEntity.password = bcrypt.hashSync(userEntity.password, salt);
    const newUser = await this.manager.save(User, userEntity);
    return new UserDTO(newUser);
  }

  async findById(id: string) {
    return await this.manager.findOne(User, id);
  }

  async findByEmail(userEmail: string) {
    return await this.manager.findOne(User, { email: userEmail });
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return await this.manager.delete(User, id);
    // return await this.manager.remove(User, id);
  }

  compareHash = async (password: string, hash: string) =>
    await bcrypt.compareSync(password, hash);
}

export default UserRepository;

// import bcrypt from "bcrypt";
// import IUserRepository from "./interfaces/IUserRepository";
// // repository: handle database operations
// // send data back to service

// class UserRepository implements IUserRepository {

//   private userDAO;

//   constructor(userDAO) {
//       this.userDAO = userDAO;
//   }

//   async findByEmail(email:string) {
//     const user = await this.userDAO.findOne({
//       attributes: ["email"],
//       where: { email: email },
//     });

//     return user;
//   }

//   async create(user) {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(user.password, salt);

//     let newUser = await this.userDAO.create({
//       ...user,
//       ...{password: hashedPassword, // replace user's stored password with hashedPassword
//       role: "user"}
//     });

//     return newUser;
//   }

//   async login(email) {

//     const user = await this.userDAO.findOne({
//         attributes: [
//           "id",
//           "email",
//           "password",
//           "first_name",
//           "last_name",
//           "gender",
//           "postal_code",
//           "city",
//           "address",
//           "social_security_number",
//           "role",
//           "gender",
//         ],
//         where: { email: email },
//       });

//       return user;

//   }

//   async update(jwtTokens, email) {
//     const {access_token, refresh_token} = jwtTokens;

//     const user = this.userDAO.findOne({
//         attributes: ["email"],
//         where: { email: email },
//       });

//     user.access_token = access_token;
//     user.refresh_token = refresh_token;

//     // Save the user properties to the database
//     const userLog = await this.userDAO.save();
//     console.log(`UPDATED USER`, userLog);
//   }

//   async delete(id) {
//     const deletedUser = await this.userDAO.destroy({
//       where: { id: id },
//     });
//     console.log(deletedUser, "deletedUser");
//    }

//   async findById(id) {

//     const user = await this.userDAO.findOne({
//       attributes: [
//         "id",
//         "email",
//         "password",
//         "first_name",
//         "last_name",
//         "gender",
//         "postal_code",
//         "city",
//         "address",
//         "social_security_number",
//         "role",
//         "gender",
//       ],
//       where: { id: id },
//     });
//     return await user;
//   }
// }

// export default UserRepository;
