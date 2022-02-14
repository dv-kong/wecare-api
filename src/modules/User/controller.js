// import ApiError from "../../helpers/ApiError"
import User from "./model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../../config/env";
import ApiError from "../../helpers/error";
import UserService from "./service";

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

  getUserById = async (req, res, next) => {

    try {
      const user = await this.UserService.findById(req, res);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  register = async (req, res, next) => {
    try {

      const user = req.body;
      await UserService.findUser(user.email);
      await UserService.create(user);

      return res.status(200).json({
        message: "Successfully created an account with email: " + user.email,
      });

    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    const credentials = req.body;

    try {
      
      const user = await UserService.login(credentials);
      

      const access_token = jwt.sign(
        { id: user.id, role: user.role },
        env.jwt_secret,
        {
          expiresIn: "5m", // TODO: change to 15m
        }
      );

      const refresh_token = jwt.sign(
        { id: user.id, role: user.role },
        env.jwt_secret,
        {
          expiresIn: "30d",
        }
      );

      const jwtTokens = {
         access_token,
         refresh_token
      }

      await UserService.update(jwtTokens, email);

      // Store refresh token and his properties in cookie with "refresh_token" key
      // The HttpOnly flag is an additional flag included in a Set-Cookie HTTP response header. It is used to prevent a Cross-Site Scripting exploit from gaining access to the session cookie and hijacking the victim's session.
      res.cookie("refresh_token", refresh_token, {
        expiresIn: "30d",
        httpOnly: true,
      });

      res.status(200).json({
        access_token: user.access_token,
        // refresh_token: user.refresh_token,
        id: user.id,
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
    const { id } = req.body;
    
    try {
      UserService.deleteUser(id);
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
