"use strict";
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
const dto_1 = __importDefault(require("./dto"));
const error_1 = require("../../helpers/error");
class UserService {
    constructor(userRepository) {
        this.userRepo = userRepository;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepo.findAll();
            return users.map((user) => new dto_1.default(user));
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findById(id);
            return new dto_1.default(user);
        });
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findByEmail(userData.email);
            if (user) {
                throw new error_1.ApiError(400, "User already exist");
            }
            userData.email_validated = false;
            userData.banned = false;
            userData.access_token = "";
            userData.refresh_token = "";
            const newUser = yield this.userRepo.addNew(userData);
            return { user: newUser, message: "Account created." };
        });
    }
    login(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userData.email)
                throw new error_1.ApiError(400, "Missing required email field.");
            if (!userData.password)
                throw new error_1.ApiError(400, "Missing required password field.");
            const user = yield this.userRepo.findByEmail(userData.email);
            if (!user)
                throw new error_1.ApiError(400, "User does not exists.");
            const passwordMatch = yield this.userRepo.compareHash(userData.password, user.password);
            if (!passwordMatch)
                throw new error_1.ApiError(400, "User password does not match.");
            return new dto_1.default(user);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.deleteById(id);
            return user;
        });
    }
}
exports.default = UserService;
// import UserDTO from './dto';
// import bcrypt from "bcrypt";
// import ApiError from '../../helpers/error';
// import { Request, Response } from 'express';
// import IUserService from './interfaces/IUserService';
// import IUserRepository from './interfaces/IUserRepository';
// // get data sent by repository
// class UserService implements IUserService {
//     private UserRepository: IUserRepository;
//     constructor(userRepository: IUserRepository) {
//         this.UserRepository = userRepository;
//     }
//   async create(user: UserDTO) {
//     const newUser = await this.UserRepository.create(user);
//     return new UserDTO(newUser);
//   }
//   async findByEmail(email: string) {
//     const user = await this.UserRepository.findByEmail(email);
//     if (user) {
//       throw new ApiError(403, "Email already exists!");
//     }
//     return user;
//   }
//   async login(credentials: {email: string, password: string}) {
//     const {email, password} = credentials;
//     const requestedUser = await this.UserRepository.login(email);
//     const user = new UserDTO(requestedUser);
//     // Compares the password in the request (req) with the password stored in the database.
//     const correct = await bcrypt.compare(password, user.password);
//     if (!correct) {
//       throw new ApiError(400, "Incorrect credentials.");
//     }
//     return user;
//   }
//   // async update(jwtTokens: {access_token: string, refresh_token: string}, email: string) {
//   //     await this.UserRepository.update(jwtTokens, email);
//   // }
//   async delete(id:string) {
//     //throw errow if not successful
//     if (!id) {
//       throw new ApiError(400, "ID not found.");
//     }
//     return await this.UserRepository.delete(id);
//   }
//   async findById(req: Request, res: Response) {
//     let userId: string;
//     if (!res.locals.user.dataValues.id) {
//       throw new ApiError(500, "User ID not provided.");
//     }
//     userId = res.locals.user.dataValues.id;
//     const user: Promise<any> = await this.UserRepository.findById(userId);
//     if (!user) {
//       throw new ApiError(404, "User not found.");
//     }
//     return user;
//   }
// }
// export default UserService;
