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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@overnightjs/core");
let SpecialtyController = class SpecialtyController {
    constructor(specialtyService) {
        //   @Get()
        //   @Middleware(auth.isAuth)
        //   getAll = async (req: Request, res: Response, next: NextFunction) => {
        //     try {
        //       let specialtys = await this.specialtyService.getAll();
        //       res.status(200).json(specialtys);
        //     } catch (err) {
        //       next(err);
        //     }
        //   };
        //   @Get(":id")
        //   async getById(req: Request, res: Response, next: NextFunction): Promise<any> {
        //     let id = req.params.id;
        //     try {
        //       const specialty = await this.specialtyService.getById(id);
        //       res.status(200).json(specialty);
        //     } catch (err) {
        //       next(err);
        //     }
        //   }
        // @Middleware(auth.isAuth) // + admin
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const specialty = yield this.specialtyService.create(Object.assign({}, req.body));
                res.status(201).json(specialty);
            }
            catch (err) {
                next(err);
            }
        });
        this.specialtyService = specialtyService;
    }
};
__decorate([
    (0, core_1.Post)("create"),
    __metadata("design:type", Object)
], SpecialtyController.prototype, "create", void 0);
SpecialtyController = __decorate([
    (0, core_1.Controller)("specialties"),
    __metadata("design:paramtypes", [Object])
], SpecialtyController);
exports.default = SpecialtyController;
