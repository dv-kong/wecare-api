"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const typeorm_1 = require("typeorm");
const repository_1 = __importDefault(require("./repository"));
const service_1 = __importDefault(require("./service"));
const controller_1 = __importDefault(require("./controller"));
const libs_1 = require("../../libs");
const userRepository = (0, typeorm_1.getCustomRepository)(repository_1.default);
const userService = new service_1.default(userRepository);
const userController = new controller_1.default(userService, libs_1.jwtService);
exports.userController = userController;
// // import User from './model';
// // import Appointment from '../Appointment/model';
// import User from './entity.js';
// import UserRepository from './repository';
// import UserService from './service';
// import UserController from './controller';
// import UserRouter from './router';
// import { jwtService } from '../../libs';
// // dependencies injection
// // const models = {User, Appointment}; // IoD for Unit Testing
// // const controller = new UserController(models)
// // const routes = router(controller)
// const userRepository = new UserRepository(User);
// const userService = new UserService(userRepository);
// const userController = new UserController(userService, jwtService);
// const userRouter = new UserRouter(userController);
// export { userRouter, User };
