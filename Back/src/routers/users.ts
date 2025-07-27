import { Router } from 'express';
import { isValidId } from '../middlewares/isValidId.ts';
import { ctrlWrapper } from '../utils/ctrlWrapper.ts';
import { getUserInfoByIdController } from '../controllers/users.ts';
import { authenticate } from '../middlewares/authenticate.ts';

const usersRouter = Router();

usersRouter.use(authenticate);

usersRouter.get(
  '/:userId',
  isValidId('userId'),
  ctrlWrapper(getUserInfoByIdController),
);

export default usersRouter;
