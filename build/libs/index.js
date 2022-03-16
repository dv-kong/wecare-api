"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
// config
const env_1 = __importDefault(require("../config/env"));
// services
const jwt_1 = __importDefault(require("./jwt"));
// services dependencies
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// instanciate all singleton service with dependency injection
const jwtService = new jwt_1.default(jsonwebtoken_1.default, env_1.default.jwt_secret);
exports.jwtService = jwtService;
