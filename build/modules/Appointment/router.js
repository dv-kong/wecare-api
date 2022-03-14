"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _auth = require("../../middlewares/auth");

var _default = controller => {
  const router = (0, _express.Router)();
  router.route("/").get(controller.getAllAppointments);
  router.route("/:id").get(controller.getAppointment);
  router.route("/create").post(controller.createAppointment);
  router.route("/delete").delete(controller.deleteAppointment);
  router.route("/update").put(controller.updateAppointment);
  return router;
};

exports.default = _default;