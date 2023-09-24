import { Router } from "express";
import UsersController from "./users.controller.mjs";

const usersRouter = Router();

usersRouter.route('/users')
  .post(UsersController.create)
  .get(UsersController.getList);

export default usersRouter;
