import bcrypt from "bcrypt";
import User from "./dao";

// repository: handle database operations
// send data back to service

class UserRepository {
  async findByEmail(email) {
    const user = await User.findOne({
      attributes: ["email"],
      where: { email: email },
    });

    return user;
  }

  async create(user) {
    const {
      email,
      password,
      first_name,
      last_name,
      postal_code,
      address,
      gender,
      city,
      phone_number,
      social_security_number,
    } = user;

    const salt = await bcrypt.genSalt(10); // param = saltRounds
    const hashedPassword = await bcrypt.hash(password, salt);

    let user = await User.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      role: "user",
      postal_code,
      address,
      gender,
      city,
      phone_number,
      social_security_number,
    });

    console.log(`LOG CREATE USER `, user);
  }

  async login(email) {

    const user = await User.findOne({
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
    
    const user = User.findOne({
        attributes: ["email"],
        where: { email: email },
      });

    user.access_token = access_token;
    user.refresh_token = refresh_token;

    // Save the user properties to the database
    let user = await user.save();
    console.log(`UPDATED USER`, user);
  }


  async delete(id) {
    const deletedUser = await User.destroy({
      where: { id: id },
    });
    console.log(deletedUser, "deletedUser");
   }

  async findById(id) {

    const user = await User.findOne({
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
