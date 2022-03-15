"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@overnightjs/core");
const jwt_1 = __importDefault(require("../../libs/jwt"));
const middlewares_1 = require("../../middlewares");
let UserController = class UserController {
    constructor(userService, jwtService) {
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let users = yield this.userService.getAll();
                res.status(200).json(users);
            }
            catch (err) {
                next(err);
            }
        });
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.register(Object.assign({}, req.body));
                res.status(201).json(user);
            }
            catch (err) {
                next(err);
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.login(Object.assign({}, req.body));
                const access_token = yield this.jwtService.generateTokenWithExpirationDate({
                    id: user.id,
                    role: user.role,
                }, "1h");
                user.access_token = access_token;
                const refresh_token = yield this.jwtService.generateToken({
                    id: user.id,
                });
                res.cookie("refresh_token", refresh_token, {
                    expires: new Date(Date.now() + 7 * 86400 * 1000), // 7 days
                });
                res.status(200).json(user);
            }
            catch (err) {
                next(err);
            }
        });
        // @Middleware(auth.isAuth)
        this.deleteById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                // if (!user) {
                //   res.status(404).json({ message: "User does not exists." });
                // }
                const deletedUser = yield this.userService.delete(Object.assign({}, req.body.id));
                console.log(`deletedUser msg ->`, deletedUser);
                // deleted ?
                res
                    .status(200)
                    .json({ message: `Successfully deleted user with ID: ${req.body.id}` });
            }
            catch (err) {
                next(err);
            }
        });
        this.userService = userService;
        this.jwtService = jwtService;
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            try {
                const user = yield this.userService.getById(id);
                res.status(200).json(user);
            }
            catch (err) {
                next(err);
            }
        });
    }
};
__decorate([
    (0, core_1.Get)(),
    (0, core_1.Middleware)(middlewares_1.auth.isAuth),
    __metadata("design:type", Object)
], UserController.prototype, "getAll", void 0);
__decorate([
    (0, core_1.Get)(":id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getById", null);
__decorate([
    (0, core_1.Post)("register"),
    __metadata("design:type", Object)
], UserController.prototype, "register", void 0);
__decorate([
    (0, core_1.Post)("login"),
    __metadata("design:type", Object)
], UserController.prototype, "login", void 0);
__decorate([
    (0, core_1.Delete)(":id"),
    __metadata("design:type", Object)
], UserController.prototype, "deleteById", void 0);
UserController = __decorate([
    (0, core_1.Controller)("users"),
    __metadata("design:paramtypes", [Object, jwt_1.default])
], UserController);
exports.default = UserController;
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
