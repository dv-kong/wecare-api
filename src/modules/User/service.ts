import UserDTO from "./dto";
import { ApiError } from "../../helpers/error";

//todo: import interface 
import IUserRepository from "./interfaces/IUserRepository";
import { User } from "./entity";

// 
export interface IUserService {
  getAll(): Promise<UserDTO[]>;
  register(userData: any): Promise<{ user: UserDTO; message: string }>;
  login(userData: any): Promise<UserDTO>;
  delete(id: string): Promise<void>;
}

export default class UserService implements IUserService {
  private userRepo;
  constructor(userRepository: IUserRepository) {
    this.userRepo = userRepository;
  }

  async getAll(): Promise<UserDTO[]> {
    const users: User[] = await this.userRepo.findAll();
    return users.map((user: User) => new UserDTO(user));
  }

  async getById(id: string) {
    const user = await this.userRepo.findById(id);
    return new UserDTO(user);
  }

  async register(userData: User) {
    const user = await this.userRepo.findByEmail(userData.email);
    if (user) {
      throw new ApiError(400, "User already exist");
    }

    userData.email_validated = false;
    userData.banned = false;
    userData.access_token = "";
    userData.refresh_token = "";

    const newUser: UserDTO = await this.userRepo.addNew(userData);
    return { user: newUser, message: "Account created." };
  }

  async login(userData: User) {
    if (!userData.email)
      throw new ApiError(400, "Missing required email field.");
    if (!userData.password)
      throw new ApiError(400, "Missing required password field.");

    const user = await this.userRepo.findByEmail(userData.email);

    if (!user) throw new ApiError(400, "User does not exists.");

    const passwordMatch = await this.userRepo.compareHash(
      userData.password,
      user.password
    );
    if (!passwordMatch)
      throw new ApiError(400, "User password does not match.");

    return new UserDTO(user);
  }

  async delete(id: string) {
    const user = await this.userRepo.deleteById(id);
    return user;
  }
}
