import { Response, Request, NextFunction } from "express";
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core'
import JwtService from "../../libs/jwt";
import { IUserService } from './service';
import { auth } from "../../middlewares";


@Controller('users')
class UserController {
  private userService;
  private jwtService;
  constructor(userService: IUserService, jwtService: JwtService) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  @Get()
  @Middleware(auth.isAuth)
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let users = await this.userService.getAll();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  @Post("register")
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.register({ ...req.body });
      res.status(201).json(user);
    }
    catch (err) {
      next(err);
    }
  }

  @Post("login")
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.login({ ...req.body });
      const token = await this.jwtService.generateToken({ id: user.id });
      res.cookie('auth-cookie', token, { expires: new Date(Date.now() + (30 * 86400 * 1000)) });
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }

  }
}

export default UserController;

// Legacy code

// import { Response, Request, NextFunction } from "express";
// import JwtService from "../../libs/jwt";
// import IUserService from "./interfaces/IUserService";

// class UserController {
//   private userService;
//   private jwtService;

//   constructor(userService: IUserService, jwtService: JwtService) {
//     this.userService = userService;
//     this.jwtService = jwtService;
//   }


// getUserById = async (req: Request, res: Response, next: NextFunction) => {

//   try {
//     const user = await this.userService.findById(req, res);
//     res.status(200).json(user);
//   } catch (error) {
//     next(error);
//   }
// };

// register = async (req: Request, res: Response, next: NextFunction) => {
//   try {

//     const user = req.body;
//     console.log(`USER `, user);
//     await this.userService.findByEmail(user.email);
//     await this.userService.create(user);

//     return res.status(200).json({
//       message: "Successfully created an account with email: " + user.email,
//     });

//   } catch (error) {
//     next(error);
//   }
// };

// login = async (req: Request, res: Response, next: NextFunction) => {
//   const credentials = req.body;

//   try {

//     const user = await this.userService.login(credentials);
//     const token = await this.jwtService.generateToken({ id: user.id, role: user.role });


//     const expirationDate = new Date(Date.now() + (30 * 86400 * 1000)) // TODO / 30 days => 7days?
//     res.cookie('refresh_token', token, { expires: expirationDate, httpOnly: true });


//     res.status(200).json({
//       access_token: user.access_token,
//       // refresh_token: user.refresh_token,
//       id: user.id,
//       email: user.email,
//       first_name: user.first_name,
//       last_name: user.last_name,
//       gender: user.gender,
//       postal_code: user.postal_code,
//       city: user.city,
//       address: user.address,
//       social_security_number: user.social_security_number,
//       phone_number: user.phone_number,
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// updateUser = async (req: Request, res: Response, next: NextFunction) => {
//   console.log("TODO: Update user");
// };


// //   silentUserAuthentication = async (req, res, next) => {
// //     const { access_token,refresh_token } = req.body;

// // // jwtService.verify(access_token, )
// //     try {
// //       const docs = await this.#models;
// //       await res.status(200).json({ message: "GET ALL USERS FROM DB" });
// //     } catch (err) {
// //       next(err);
// //     }
// //   };

// deleteUser = async (req: Request, res: Response, next: NextFunction) => {
//   const { id } = req.body;

//   try {
//     await this.userService.deleteUser(id);
//   } catch (error) {
//     next(error);
//   }
// };
// }

// export default UserController;








