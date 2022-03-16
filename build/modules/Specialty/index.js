"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specialtyController = void 0;
const typeorm_1 = require("typeorm");
const repository_1 = __importDefault(require("./repository"));
const service_1 = __importDefault(require("./service"));
const controller_1 = __importDefault(require("./controller"));
const specialtyRepository = (0, typeorm_1.getCustomRepository)(repository_1.default);
const specialtyService = new service_1.default(specialtyRepository);
const specialtyController = new controller_1.default(specialtyService);
exports.specialtyController = specialtyController;
