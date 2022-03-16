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
const typeorm_1 = require("typeorm");
const entity_1 = require("./entity");
const dto_1 = __importDefault(require("./dto"));
let SpecialtyRepository = class SpecialtyRepository {
    constructor(manager) {
        this.manager = manager;
    }
    //   async findAll() {
    //     return await this.manager.find(Specialty);
    //   }
    addNew(specialtyEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            const newSpecialty = yield this.manager.save(entity_1.Specialty, specialtyEntity);
            return new dto_1.default(newSpecialty);
        });
    }
    //   async findById(id: string) {
    //     return await this.manager.findOne(Specialty, id);
    //   }
    findByName(specialtyName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.manager.findOne(entity_1.Specialty, { name: specialtyName });
        });
    }
};
SpecialtyRepository = __decorate([
    (0, typeorm_1.EntityRepository)(),
    __metadata("design:paramtypes", [typeorm_1.EntityManager])
], SpecialtyRepository);
exports.default = SpecialtyRepository;
