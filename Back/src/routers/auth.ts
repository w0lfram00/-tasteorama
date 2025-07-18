import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.ts';
import { loginUserSchema, registerUserSchema } from '../validation/auth.ts';
import { ctrlWrapper } from '../utils/ctrlWrapper.ts';
import {
  loginUserController,
  logoutUserController,
  refreshUsersSessionController,
  registerUserController,
} from '../controllers/auth.ts';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post('/refresh', ctrlWrapper(refreshUsersSessionController));

export default authRouter;
