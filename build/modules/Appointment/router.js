"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
exports.default = (controller) => {
    const router = (0, express_1.Router)();
    router.route("/").get(controller.getAllAppointments);
    router.route("/:id").get(controller.getAppointment);
    router.route("/create").post(controller.createAppointment);
    router.route("/delete").delete(controller.deleteAppointment);
    router.route("/update").put(controller.updateAppointment);
    return router;
};
