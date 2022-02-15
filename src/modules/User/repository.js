import bcrypt from "bcrypt";

// repository: handle database operations
// send data back to service

class UserRepository {

    constructor(userDao) {
        this.userDAO = userDao;
    }


  async findByEmail(email) {
    const user = await this.userDAO.findOne({
      attributes: ["email"],
      where: { email: email },
    });

    return user;
  }

  async create(user) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser = await this.userDAO.create({
      ...user,
      ...{password: hashedPassword,
      role: "user"} 
    });

    console.log(`LOG CREATE USER `, newUser);

    return newUser;
  }

  async login(email) {

    const user = await this.userDAO.findOne({
        attributes: [
          "id",
          "email",
          "password",
          "first_name",
          "last_name",
          "gender",
          "postal_code",
          "city",
          "address",
          "social_security_number",
          "role",
          "gender",
        ],
        where: { email: email },
      });

      return user;

  }

  async update(jwtTokens, email) {
    const {access_token, refresh_token} = jwtTokens;
    
    const user = this.userDAO.findOne({
        attributes: ["email"],
        where: { email: email },
      });

    user.access_token = access_token;
    user.refresh_token = refresh_token;

    // Save the user properties to the database
    const userLog = await this.userDAO.save();
    console.log(`UPDATED USER`, userLog);
  }


  async delete(id) {
    const deletedUser = await this.userDAO.destroy({
      where: { id: id },
    });
    console.log(deletedUser, "deletedUser");
   }

  async findById(id) {

    const user = await this.userDAO.findOne({
      attributes: [
        "id",
        "email",
        "password",
        "first_name",
        "last_name",
        "gender",
        "postal_code",
        "city",
        "address",
        "social_security_number",
        "role",
        "gender",
      ],
      where: { id: id },
    });
    return await user;
  }
}

export default UserRepository;