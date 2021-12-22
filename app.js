import express from "express";
import env from "./src/config/env.js";
import Server from "./src/config/server.js";
import middlewares from "./src/config/middlewares.js";
import cors from "cors";
import routes from "./src/modules";

import db from "./src/config/db.js";
const http = express();
const server = new Server(http);

server.middlewares(middlewares);
server.routes(routes);

(async () => {
  try {
    await db.associateAll(db.sequelize.models);
    await db.sequelize.sync({
      force: true,
    });
    await server.start(env.port);
    console.log(`Database started on port ${env.db_port}.`);
  } catch (error) {
    console.error(error);
  }
})();
