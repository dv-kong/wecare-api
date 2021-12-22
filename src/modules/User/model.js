import { Model, DataTypes, UUID, UUIDV4 } from "sequelize";
import db from "../../config/db.js";
import Joi from "joi";

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
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        access_token: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        refresh_token: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "User",
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.TODO, { through: models.TODO });
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
