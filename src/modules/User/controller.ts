import { Response, Request, NextFunction } from "express";
import JwtService from "../../libs/jwt";
import IUserService from "./interfaces/IUserService";


class UserController {
  // To function correctly, this controller needs the supplied models
  // dependency = what a class need to function
  private userService;
  private jwtService;

  constructor(userService: IUserService, jwtService: JwtService) {
    this.userService = userService;
    this.jwtService = jwtService; //TODO Need to be refactored
  }

  /**
   * @login takes a request, a response and a next function
   * @param
   */

  getUserById = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const user = await this.userService.findById(req, res);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const user = req.body;
      console.log(`USER `, user);
      await this.userService.findByEmail(user.email);
      await this.userService.create(user);

      return res.status(200).json({
        message: "Successfully created an account with email: " + user.email,
      });

    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    const credentials = req.body;

    try {

      const user = await this.userService.login(credentials);
      const token = await this.jwtService.generateToken({ id: user.id, role: user.role });


      const expirationDate = new Date(Date.now() + (30 * 86400 * 1000)) // TODO / 30 days => 7days?
      res.cookie('refresh_token', token, { expires: expirationDate, httpOnly: true });


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


  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log("TODO: Update user");
  };


  //   silentUserAuthentication = async (req, res, next) => {
  //     const { access_token,refresh_token } = req.body;

  // // jwtService.verify(access_token, )
  //     try {
  //       const docs = await this.#models;
  //       await res.status(200).json({ message: "GET ALL USERS FROM DB" });
  //     } catch (err) {
  //       next(err);
  //     }
  //   };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    try {
      await this.userService.deleteUser(id);
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
