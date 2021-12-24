import { Router } from "express";
import { isAuth, refreshAccess, isAdmin } from "../../middlewares/auth";
// import enableCors  from '../../middlewares/cors';

export default (controller) => {
  const router = Router();

  router.route("/").get(isAuth, controller.getUsers);
  router.route("/register").post(controller.register);
  router.route("/login").post(controller.login);
  router.route("/delete").delete(controller.deleteUser);
  router.route("/update").put(controller.updateUser);

  return router;
};
