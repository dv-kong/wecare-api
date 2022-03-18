import {
  ConnectionOptions,
  createConnection,
  getConnectionManager,
} from "typeorm";
import { User } from "../../src/modules/User/entity";

const options: ConnectionOptions = {
  type: "sqlite",
  database: ":memory:",
  dropSchema: true,
  entities: [User],
  synchronize: true,
  logging: false,
};

const connectionManager = getConnectionManager();

const db = connectionManager.create(options);

export default db;
