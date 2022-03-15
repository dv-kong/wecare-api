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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], User.prototype, "email_validated", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "postal_code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "social_security_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], User.prototype, "banned", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "access_token", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "refresh_token", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
// import { Model, DataTypes, UUID, UUIDV4 } from "sequelize";
// import db from "../../config/db.ts";
// import Joi from "joi";
// import AppointmentModel from '../Appointment/model';
// class User extends Model {
//   static init(sequelize) {
//     return super.init(
//       {
//         id: {
//           type: DataTypes.UUID,
//           defaultValue: DataTypes.UUIDV4,
//           primaryKey: true,
//           allowNull: false,
//           unique: true,
//         },
//         first_name: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//         last_name: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//         gender: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//         email: {
//           type: DataTypes.STRING,
//           allowNull: false,
//           unique: true,
//         },
//         password: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//         role: {
//           type: DataTypes.STRING,
//           allowNull: false,
//           defaultValue: "user",
//         },
//         phone_number: {
//           type: DataTypes.STRING,
//           allowNull: true,
//         },
//         social_security_number: {
//           type: DataTypes.STRING,
//           allowNull: true,
//         },
//         address: {
//           type: DataTypes.STRING,
//           allowNull: true,
//         },
//         city: {
//           type: DataTypes.STRING,
//           allowNull: true,
//         },
//         postal_code: {
//           type: DataTypes.STRING,
//           allowNull: true
//         },
//         access_token: {
//           type: DataTypes.STRING,
//           allowNull: true,
//         },
//         refresh_token: {
//           type: DataTypes.STRING,
//           allowNull: true,
//         },
//         email_validated: {
//           type: DataTypes.BOOLEAN,
//           allowNull: true,
//           defaultValue: false,
//         },
//         banned: {
//           type: DataTypes.BOOLEAN,
//           allowNull: true,
//           defaultValue: false,
//         },
//       },
//       {
//         sequelize,
//         modelName: "User",
//       }
//     );
//   }
// static associate() {
//   this.hasMany(AppointmentModel, { as: "appointment_id" });
//   return this;
//   }
// }
// /**
//  * @func validate Data validator
//  * @param user User Object contains users data
//  * @returns The data if it's valid / error message if it's not valid
//  */
// export const validate = (user) => {
//   const model = Joi.object({
//     email: Joi.string().required(),
//     password: Joi.string.required(),
//   });
//   return model.validate(user);
// };
// User.init(db.sequelize);
// export default User;
