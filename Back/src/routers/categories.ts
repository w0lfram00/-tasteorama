import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.ts';
import { ctrlWrapper } from '../utils/ctrlWrapper.ts';
import { getAllCategoriesController } from '../controllers/categories.ts';

const categoriesRouter = Router();

categoriesRouter.get('/', ctrlWrapper(getAllCategoriesController));

export default categoriesRouter;
