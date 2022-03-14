import express from "express";
import env from "./config/env.js";
import Server from "./config/server.js";
import middlewares from "./config/middlewares.js";
import routes from "./modules";
import "core-js/stable";
import "regenerator-runtime/runtime";

import db from "./config/db.js";
const http = express();
const server = new Server(http);
server.middlewares(middlewares);
server.routes(routes);

(async () => {
  try {
    await db.associateAll(db.sequelize.models);
    await db.sequelize.sync({
      // force: true,
      alter:true // update db tables
    });
    await server.start(env.port);
    console.log(`Database started on port ${env.db_port}.`);
  } catch (error) {
    console.error(error);
  }
})();
