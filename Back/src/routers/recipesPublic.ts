import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.ts';
import {
  getAllRecipesFilteredController,
  getRecipeByIdController,
} from '../controllers/recipes.ts';
import { isValidId } from '../middlewares/isValidId.ts';

const recipesPublicRouter = Router();

recipesPublicRouter.get('/', ctrlWrapper(getAllRecipesFilteredController));

recipesPublicRouter.get(
  '/:recipeId',
  isValidId('recipeId'),
  ctrlWrapper(getRecipeByIdController),
);

export default recipesPublicRouter;
