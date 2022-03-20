import { Response, Request, NextFunction } from "express";
import {
  Controller,
  Middleware,
  Get,
  Post,
  Put,
  Delete,
} from "@overnightjs/core";
import JwtService from "../../libs/jwt";
import { IUserService } from "./service";
import { auth } from "../../middlewares";

@Controller("users")
class UserController {
  private userService;
  private jwtService;
  constructor(userService: IUserService, jwtService: JwtService) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  @Get()
  // @Middleware(auth.isAuth)
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let users = await this.userService.getAll();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };

  @Get(":id")
  async getById(req: Request, res: Response, next: NextFunction): Promise<any> {
    let id = req.params.id;
    try {
      const user = await this.userService.getById(id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  @Post("register")
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.register({ ...req.body });
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  };

  @Post("login")
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.login({ ...req.body });
      const access_token =
        await this.jwtService.generateTokenWithExpirationDate(
          {
            id: user.id,
            role: user.role,
          },
          "1h"
        );
      user.access_token = access_token;

      const refresh_token = await this.jwtService.generateToken({
        id: user.id,
      });
      res.cookie("refresh_token", refresh_token, {
        expires: new Date(Date.now() + 7 * 86400 * 1000), // 7 days
      });
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  @Delete(":id")
  // @Middleware(auth.isAuth)
  deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // if (!user) {
      //   res.status(404).json({ message: "User does not exists." });
      // }
      const deletedUser = await this.userService.delete({ ...req.body.id });
      console.log(`deletedUser msg ->`, deletedUser);
      // deleted ?
      res
        .status(200)
        .json({ message: `Successfully deleted user with ID: ${req.body.id}` });
    } catch (err) {
      next(err);
    }
  };

  @Get("test")
  test = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ message: "hello world! -> test-3" });
    } catch (err) {
      next(err);
    }
  };

};


export default UserController;
