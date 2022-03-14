"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.default = void 0;

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("../../config/db.js"));

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class User extends _sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: _sequelize.DataTypes.UUID,
        defaultValue: _sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      first_name: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
      },
      gender: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false,
        defaultValue: "user"
      },
      phone_number: {
        type: _sequelize.DataTypes.STRING,
        allowNull: true
      },
      social_security_number: {
        type: _sequelize.DataTypes.STRING,
        allowNull: true
      },
      address: {
        type: _sequelize.DataTypes.STRING,
        allowNull: true
      },
      city: {
        type: _sequelize.DataTypes.STRING,
        allowNull: true
      },
      postal_code: {
        type: _sequelize.DataTypes.STRING,
        allowNull: true
      },
      access_token: {
        type: _sequelize.DataTypes.STRING,
        allowNull: true
      },
      refresh_token: {
        type: _sequelize.DataTypes.STRING,
        allowNull: true
      },
      email_validated: {
        type: _sequelize.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      banned: {
        type: _sequelize.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }
    }, {
      sequelize,
      modelName: "User"
    });
  }

  static associate(models) {
    this.hasMany(models.Appointment, {
      as: "appointment_id"
    });
    return this;
  }

}
/**
 * @func validate Data validator
 * @param user User Object contains users data
 * @returns The data if it's valid / error message if it's not valid
 */


const validate = user => {
  const model = _joi.default.object({
    email: _joi.default.string().required(),
    password: _joi.default.string.required()
  });

  return model.validate(user);
};

exports.validate = validate;
User.init(_db.default.sequelize);
var _default = User;
exports.default = _default;