import express from "express";
import env from "./src/config/env.js";
import Server from "./src/config/server.js";
import middlewares from "./src/config/middlewares.js";
import routes from "./src/modules";

// import UserController from "./src/modules/User/controller"; // To create a user on database reset
// import User from "./src/modules/User/model";
import signUpTestUser from "./dev/signUpTestUser";

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
      // alter:true // update db tables
    });
    await server.start(env.port);
    console.log(`Database started on port ${env.db_port}.`);

    // Create a user on database reset
    // const testUser = await User.findOne({
    //   attributes: ["email"],
    //   where: { email:"doejoe@protonmail.com"},
    // });

    // if(!testUser){
    //   UserController.create({
// console.log(

    signUpTestUser({
      email: "doejoe@protonmail.com",
      password: "!1Password",
      first_name: "Joe",
      last_name: "Doe",
      role: "user",
      postal_code: "75001",
      address: "1 rue des Fleurs",
      gender: "male",
      city: "CucumberLand",
      phone_number: "0601020304",
      social_security_number: "1234987609",
    }).then(response =>
              console.log(`Created user`, response)
        )
// );


 
    // }
  } catch (error) {
    console.error(error);
  }
})();
