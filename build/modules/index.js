"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Specialty_1 = require("./Specialty");
const User_1 = require("./User");
const routes = [
    User_1.userController,
    Specialty_1.specialtyController
];
exports.default = routes;
