import {Sequelize} from "sequelize";
import env from "./env";

const sequelize = new Sequelize(
    env.db_name,
    env.db_user,
    env.db_password, {
        dialect: 'mysql',
        port: env.db_port,
        host: env.db_host
    }
)

const associateAll = async (models) => {
    Object.values(models).map((model: any) => model.associate(models))

}

const db = {
    sequelize,
    associateAll
}

export default db;