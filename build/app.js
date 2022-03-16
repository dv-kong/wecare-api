"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const server_1 = __importDefault(require("./config/server"));
const database_1 = __importDefault(require("./config/database"));
const env_1 = __importDefault(require("./config/env"));
const modules_1 = __importDefault(require("./modules"));
const middlewares_1 = __importStar(require("./middlewares"));
const application = new server_1.default(modules_1.default, middlewares_1.default);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.connect();
        application.listen(env_1.default.app_port);
    }
    catch (e) {
        console.error(e);
        middlewares_1.logger.log(500, e.message);
    }
}))();
// Legacy code
// import express from "express";
// import env from "./config/env";
// import App from "./config/server";
// import middlewares from "./config/middlewares";
// import routes from "./modules";
// // import UserController from "./src/modules/User/controller"; // To create a user on database reset
// // import User from "./src/modules/User/model";
// // import signUpTestUser from "../dev/signUpTestUser.js";
// import db from "./config/database";
// const http = express();
// const server = new App(http);
// server.middlewares(middlewares);
// server.routes(routes);
// (async () => {
//   try {
//     await db.associateAll(db.sequelize.models);
//     await db.sequelize.sync({
//       force: true,
//       // alter:true // update db tables
//     });
//     await server.start(env.port);
//     console.log(`Database started on port ${env.db_port}.`);
//     // Create a user on database reset
//     // const testUser = await User.findOne({
//     //   attributes: ["email"],
//     //   where: { email:"doejoe@protonmail.com"},
//     // });
//     // if(!testUser){
//     //   UserController.create({
// // console.log(
//     // signUpTestUser({
//     //   email: "doejoe@protonmail.com",
//     //   password: "!1Password",
//     //   first_name: "Joe",
//     //   last_name: "Doe",
//     //   role: "user",
//     //   postal_code: "75001",
//     //   address: "1 rue des Fleurs",
//     //   gender: "male",
//     //   city: "CucumberLand",
//     //   phone_number: "0601020304",
//     //   social_security_number: "1234987609",
//     // }).then(response =>
//     //           console.log(`Created user`, response)
//     //     )
// // );
//     // }
//   } catch (error) {
//     console.error(error);
//   }
// })();
