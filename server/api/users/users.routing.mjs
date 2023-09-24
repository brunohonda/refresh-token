import { Router } from "express";
import UsersController from "./users.controller.mjs";
import AuthMiddleware from "./../../middlewares/auth.middleware.mjs";

const usersRouter = Router();

usersRouter.route('/users')
  .post(UsersController.create)
  .get(
    AuthMiddleware,
    UsersController.getList,
  );

export default usersRouter;
