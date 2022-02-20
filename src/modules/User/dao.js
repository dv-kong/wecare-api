import { Model, DataTypes, UUID, UUIDV4 } from "sequelize";
import db from "../../config/db.ts";
import Joi from "joi";
import AppointmentModel from '../Appointment/model';

class User extends Model {
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
        first_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        last_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        gender: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "user",
        },
        phone_number: {
          type: DataTypes.STRING,
          allowNull: true,
        },

        social_security_number: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        city: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        postal_code: {
          type: DataTypes.STRING,
          allowNull: true
        },
        access_token: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        refresh_token: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        email_validated: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        banned: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: "User",
      }
    );
  }

static associate() {
  this.hasMany(AppointmentModel, { as: "appointment_id" });
  return this;

  }
}

/**
 * @func validate Data validator
 * @param user User Object contains users data
 * @returns The data if it's valid / error message if it's not valid
 */

export const validate = (user) => {
  const model = Joi.object({
    email: Joi.string().required(),
    password: Joi.string.required(),
  });

  return model.validate(user);
};

User.init(db.sequelize);

export default User;
