"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./router"));
const controller_1 = __importDefault(require("./controller"));
const model_1 = __importDefault(require("./model"));
// import User from './../user/model';
// import User from '../User/model';
/**
 * Dependancy injection
 */
const models = {
    Appointment: model_1.default,
    // User
};
// const controller = new AppointmentController(models);
const controller = new controller_1.default();
const routes = (0, router_1.default)(controller);
exports.default = routes;
