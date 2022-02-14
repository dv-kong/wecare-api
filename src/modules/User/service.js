// get data sent by repository

class UserService {
  constructor() {}

  async create(user) {
    await UserRepository.create(user);
  }

  async findUser(email) {
    const user = await UserRepository.findUser(email);

    if (user) {
      throw new ApiError(403, "Email already exists!");
    }

    return user;
  }

  async login(credentials) {
    
    const {email, password} = credentials;

    const user = await UserRepository.getUser(email);

    // Compares the password in the request (req) with the password stored in the database.
    const correct = await bcrypt.compare(password, user.password);
    if (!correct) {
      throw new ApiError(400, "Incorrect credentials.");
    }

    return user;
  }

  async update(jwtTokens, email) {
      await UserRepository.update(jwtTokens,email);

  }


  async delete(id) {
    //throw errow if not successful
    if (!id) {
      throw new ApiError(400, "ID not found.");
    }
    return await UserRepository.delete(id);
  }

  async findById(req, res) {
    let userId;

    if (res.locals.user) {
      userId = res.locals.user.dataValues.id;
    }

    const user = await this.userRepo.findOne(userId);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }
    return user;
  }
}

export default UserService;
