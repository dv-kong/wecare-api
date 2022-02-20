import User from "../src/modules/User/model";


import bcrypt from "bcrypt";

const signUpTestUser = async (user) => {

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
  try {
    const user = await User.findOne({
      attributes: ["email"],
      where: { email: email },
    });

    if (user) {
      throw new ApiError(403, "Email already exists!");
    }

    const salt = await bcrypt.genSalt(10); // param = saltRounds
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
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

    return  `Successfully created an account with email: ${email}`;

  } catch (error) {
    console.log(error);
  }
  };

  export default signUpTestUser;