"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
exports.default = ((controller) => {
    const specialtyRouter = (0, express_1.Router)();
    specialtyRouter
        .route('/')
        // .get(auth.isAuth, controller.getAll)
        .post(controller.create);
    // specialtyRouter.route(`/login`).post(controller.login);
    return specialtyRouter;
});
