import UserDTO from './dto';
import bcrypt from "bcrypt";
import { ApiError } from '../../helpers/error';

// get data sent by repository

class UserService {
  
    constructor(userRepository) {
        this.UserRepository = userRepository;
    }

  async create(user) {
    const newUser = await this.UserRepository.create(user);
    return new UserDTO(newUser);
  }

  async findByEmail(email) {
    
    const user = await this.UserRepository.findByEmail(email);

    if (user) {
      throw new ApiError(403, "Email already exists!");
    }

    return user;
  }

  async login(credentials) {
    
    const {email, password} = credentials;

    const requestedUser = await this.UserRepository.login(email);

    const user = new UserDTO(requestedUser);

    // Compares the password in the request (req) with the password stored in the database.
    const correct = await bcrypt.compare(password, user.password);
    if (!correct) {
      throw new ApiError(400, "Incorrect credentials.");
    }

    return user;
  }

  async update(jwtTokens, email) {
      await this.UserRepository.update(jwtTokens,email);

  }


  async delete(id) {
    //throw errow if not successful
    if (!id) {
      throw new ApiError(400, "ID not found.");
    }
    return await this.UserRepository.delete(id);
  }

  async findById(req, res) {
    let userId;

    if (res.locals.user) {
      userId = res.locals.user.dataValues.id;
    }

    const user = await this.UserRepository.findOne(userId);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }
    return user;
  }
}

export default UserService;
