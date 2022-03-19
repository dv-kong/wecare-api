import { Router } from "express";
import { auth } from "../../middlewares";
import UserController from "./controller";

export default ((controller: UserController) => {
    const userRouter = Router();

    userRouter
        .route('/')
        .get(auth.isAuth, controller.getAll)
        .post(controller.register);

    userRouter.route(`/login`).post(controller.login);
    userRouter.route(`/test`).post(controller.test);

    return userRouter;
});

