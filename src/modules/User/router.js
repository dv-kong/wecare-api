import { Router } from "express";
import { isAuth, refreshAccessToken, isAdmin } from "../../middlewares/auth";
// import enableCors  from '../../middlewares/cors';

export default (controller) => {
  const router = Router();

  router.route("/").get(isAuth, controller.getUsers); //TODO
  router.route("/register").post(controller.register);
  router.route("/login").post(controller.login);
  router.route("/delete").delete(controller.deleteUser);
  router.route("/update").put(controller.updateUser);
  // router.route("/refresh-data").post(isAuth);

  return router;
};
