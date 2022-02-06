// import ApiError from "../../helpers/ApiError"
import User from "./model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../../config/env";
import ApiError from "../../helpers/error";
class UserController {
  // To function correctly, this controller needs the supplied models
  // dependency == what a class need to function
  #models;
  constructor(models) {
    this.#models = models;
  }
  /**
   * @login takes a request, a response and a next function
   * @param
   */
  register = async (req, res, next) => {
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
    } = req.body;
    console.log("email>>>", email);
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

      return res.status(200).json({
        message: "Successfully created an account with email: " + email,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
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

      // Compares the password in the request (req) with the password stored in the database.
      const correct = await bcrypt.compare(password, user.password);
      if (!correct) {
        throw new ApiError(400, "Incorrect credentials.");
      }

      /**
       * @object "user" contains User datas
       * @property access_token contains jwt token
       * @property refresh_token define time to refresh an access_token
       */
      // Store the tokens in the user object

      user.access_token = jwt.sign(
        { id: user.id, role: user.role },
        env.jwt_secret,
        {
          expiresIn: "5m", // TODO: change to 15m
        }
      );
      user.refresh_token = jwt.sign({ id: user.id, role: user.role }, env.jwt_secret, {
        expiresIn: "30d",
        httpOnly: true,

      });
      // Save the user properties to the database
      // user.first_name = "joe"
      await user.save();

      // Store refresh token and his properties in cookie with "refresh_token" key
      // The HttpOnly flag is an additional flag included in a Set-Cookie HTTP response header. It is used to prevent a Cross-Site Scripting exploit from gaining access to the session cookie and hijacking the victim's session.
     
      res.cookie("refresh_token", user.refresh_token, {
        expiresIn: "30d",
        httpOnly: true,
      });
      // user.refresh_token = jwt.sign({ id: user.id }, env.jwt_secret, {
        // expiresIn: "30d",
      // });
     
     
      res.status(200).json({
        // access_token: user.access_token,
        // refresh_token: user.refresh_token,
          // id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          gender: user.gender,
          postal_code: user.postal_code,
          city: user.city,
          address: user.address,
          social_security_number: user.social_security_number,
          phone_number: user.phone_number,
      });
    } catch (error) {
      next(error);
    }
  };

  addUsers = async (req, res, next) => {};

  updateUser = async (req, res, next) => {
    console.log("TODO: Update user");
  };

  getUsers = async (req, res, next) => {
    try {
      const docs = await this.#models;
      await res.status(200).json({ message: "GET ALL USERS FROM DB" });
    } catch (err) {
      next(err);
    }
  };

  

  //   silentUserAuthentication = async (req, res, next) => {
  //     const { access_token,refresh_token } = req.body;

  // // jwt.verify(access_token, )
  //     try {
  //       const docs = await this.#models;
  //       await res.status(200).json({ message: "GET ALL USERS FROM DB" });
  //     } catch (err) {
  //       next(err);
  //     }
  //   };



  deleteUser = async (req, res, next) => {
    //TODO
    const { id } = req.body;
    try {
      const userDeleted = await User.destroy({
        where: { id: id },
      });
      // console.log(userDeleted);
      // if(!userDeleted) {
      // }
      return res
        .status(200)
        .json({ message: `Successfully deleted user with ID: ${id}}` });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
