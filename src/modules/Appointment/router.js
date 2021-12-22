import { Router } from "express";
import { isAuth, refreshAccess, isAdmin } from "../../middlewares/auth";

export default (controller) => {
  const router = Router();

  router.route("/").get(controller.getAllAppointments);
  router.route("/:id").get(controller.getAppointment);
  router.route("/create").post(controller.createAppointment);
  router.route("/delete").delete(controller.deleteAppointment);
  router.route("/update").put(controller.updateAppointment);

  return router;
};
