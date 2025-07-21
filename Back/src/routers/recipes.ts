import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.ts';
import { validateBody } from '../middlewares/validateBody.ts';
import { createRecipeSchema } from '../validation/recipes.ts';
import { upload } from '../middlewares/multer.ts';
import { ctrlWrapper } from '../utils/ctrlWrapper.ts';
import {
  getAllRecipesFilteredController,
  getOwnedRecipesController,
  getRecipeByIdController,
  postRecipeController,
} from '../controllers/recipes.ts';
import { isValidId } from '../middlewares/isValidId.ts';

const recipesRouter = Router();

recipesRouter.get('/', ctrlWrapper(getAllRecipesFilteredController));

recipesRouter.get(
  '/:recipeId',
  isValidId,
  ctrlWrapper(getRecipeByIdController),
);

recipesRouter.use(authenticate);

recipesRouter.post(
  '/',
  upload.single('img'),
  validateBody(createRecipeSchema),
  ctrlWrapper(postRecipeController),
);

recipesRouter.get('/owned', ctrlWrapper(getOwnedRecipesController));

export default recipesRouter;
