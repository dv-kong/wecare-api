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
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../helpers/error");
class SpecialtyService {
    constructor(userRepository) {
        this.userRepo = userRepository;
    }
    //   async getAll() {
    //     const users = await this.userRepo.findAll();
    //     return users.map((user: any) => new SpecialtyDTO(user));
    //   }
    //   async getById(id: string) {
    //     const user = await this.userRepo.findById(id);
    //     return new SpecialtyDTO(user);
    //   }
    create(specialtyData) {
        return __awaiter(this, void 0, void 0, function* () {
            const specialty = yield this.userRepo.findByName(specialtyData.name);
            if (specialty) {
                throw new error_1.ApiError(400, "Specialty already exists.");
            }
            const newSpecialty = yield this.userRepo.addNew(specialtyData);
            return { specialty: newSpecialty, message: "Specialty created." };
        });
    }
}
exports.default = SpecialtyService;
