"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    app_port: process.env.APP_PORT,
    db_port: Number(process.env.TYPEORM_PORT),
    db_name: process.env.TYPEORM_DATABASE,
    db_user: process.env.TYPEORM_USERNAME,
    db_host: process.env.TYPEORM_HOST,
    db_type: process.env.TYPEORM_CONNECTION,
    db_password: process.env.TYPEORM_PASSWORD,
    db_entities: process.env.TYPEORM_ENTITIES,
    db_synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
    db_migration: process.env.TYPEORM_MIGRATIONS,
    db_migrationDir: process.env.TYPEORM_MIGRATIONS_DIR,
    jwt_secret: process.env.JWT_SECRET
};
exports.default = config;
