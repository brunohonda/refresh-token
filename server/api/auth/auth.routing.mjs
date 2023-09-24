import { Router } from 'express';

import AuthController from './auth.controller.mjs';

const authRouter = Router();

authRouter
  .post('/login', AuthController.login)
  .post('/refresh-token', AuthController.refreshToken);

export default authRouter;
