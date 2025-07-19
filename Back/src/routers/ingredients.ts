import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.ts';
import { getAllIngredientsController } from '../controllers/ingredients.ts';
import { authenticate } from '../middlewares/authenticate.ts';

const ingredientsRouter = Router();

ingredientsRouter.get('/ingredients', ctrlWrapper(getAllIngredientsController));

export default ingredientsRouter;
