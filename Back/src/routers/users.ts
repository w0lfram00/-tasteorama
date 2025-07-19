import { Router } from 'express';
import { isValidId } from '../middlewares/isValidId.ts';
import { ctrlWrapper } from '../utils/ctrlWrapper.ts';
import { getUserInfoByIdController } from '../controllers/users.ts';

const usersRouter = Router();

usersRouter.get('/users', isValidId, ctrlWrapper(getUserInfoByIdController));

export default usersRouter;
