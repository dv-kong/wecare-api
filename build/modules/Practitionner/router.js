"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _auth = require("../../middlewares/auth");

var _default = controller => {
  const router = (0, _express.Router)();
  router.route("/").get(_auth.isAuth, controller.getUsers);
  router.route("/signup").post(controller.signUp);
  router.route("/login").post(controller.login);
  router.route("/delete").delete(controller.deleteUser);
  router.route("/update").put(controller.updateUser);
  return router;
};

exports.default = _default;