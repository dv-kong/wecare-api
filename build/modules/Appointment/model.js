"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.default = void 0;

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("../../config/db.js"));

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Appointment extends _sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: _sequelize.DataTypes.UUID,
        defaultValue: _sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      start_time: {
        type: _sequelize.DataTypes.DATE,
        allowNull: false
      },
      end_time: {
        type: _sequelize.DataTypes.DATE,
        allowNull: false
      },
      validated: {
        type: _sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      paid: {
        type: _sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, {
      sequelize,
      modelName: "Appointment"
    });
  }

  static associate(models) {
    this.belongsTo(models.User, {
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


const validate = appointment => {
  const model = _joi.default.object({
    email: _joi.default.string().required(),
    password: _joi.default.string.required()
  });

  return model.validate(appointment);
};

exports.validate = validate;
Appointment.init(_db.default.sequelize);
var _default = Appointment;
exports.default = _default;