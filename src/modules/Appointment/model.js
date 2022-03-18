import { Model, DataTypes, UUID, UUIDV4 } from "sequelize";
import db from "../../config/database.js";
import Joi from "joi";

class Appointment extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        start_time: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        end_time: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        validated: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        paid: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: "Appointment",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { as: "appointment_id" });
    return this;
  }
}

/**
 * @func validate Data validator
 * @param user User Object contains users data
 * @returns The data if it's valid / error message if it's not valid
 */

export const validate = (appointment) => {
  const model = Joi.object({
    email: Joi.string().required(),
    password: Joi.string.required(),
  });

  return model.validate(appointment);
};

Appointment.init(db.sequelize);

export default Appointment;
