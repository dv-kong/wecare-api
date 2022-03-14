import { Router } from "express";
import { auth } from "../../middlewares";
import SpecialtyController from "./controller";

export default ((controller: SpecialtyController) => {
    const specialtyRouter = Router();

    specialtyRouter
        .route('/')
        // .get(auth.isAuth, controller.getAll)
        .post(controller.create);

    // specialtyRouter.route(`/login`).post(controller.login);

    return specialtyRouter;
});

