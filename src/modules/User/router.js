import { Router } from "express";
import { isAuth, refreshAccessToken, isAdmin } from "../../middlewares/auth";
// import enableCors  from '../../middlewares/cors';
import UserController from "./controller";

class UserRouter {

  constructor(controller) {
    this.router = Router();
    this.initializeRoutes(controller);
    return this.router;
  }
  
  initializeRoutes(controller) {
    console.log(`CLASS ROUTER > controller`, controller);
  
    // this.router.route("/").get(isAuth, controller.getUsers); //TODO
    this.router.route("/register").post(controller.register);
    this.router.route("/login").post(controller.login);
    // this.router.route("/delete").delete(controller.deleteUser);
    // this.router.route("/update").put(controller.updateUser);
    // this.router.route("/refresh-data").post(isAuth, controller.getUserById);

  }
}

  export default UserRouter;
