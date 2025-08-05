import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.ts';
import { validateBody } from '../middlewares/validateBody.ts';
import {
  addToSavedExtraSchema,
  addToSavedSchema,
  createRecipeSchema,
} from '../validation/recipes.ts';
import { upload } from '../middlewares/multer.ts';
import { ctrlWrapper } from '../utils/ctrlWrapper.ts';
import {
  addOrRemoveRecipeToSavedController,
  deleteRecipeController,
  getOwnedRecipesController,
  getSavedRecipesController,
  postRecipeController,
} from '../controllers/recipes.ts';
import { isValidId } from '../middlewares/isValidId.ts';
import { isOwnerOfId } from '../middlewares/isOwnerOfId.ts';

const recipesRouter = Router();

recipesRouter.use(authenticate);

recipesRouter.post(
  '/',
  upload.single('thumb'),
  validateBody(createRecipeSchema),
  ctrlWrapper(postRecipeController),
);

recipesRouter.get('/owned', ctrlWrapper(getOwnedRecipesController));

recipesRouter.patch(
  '/saved/:recipeId',
  isValidId('recipeId'),
  validateBody(addToSavedSchema, addToSavedExtraSchema),
  ctrlWrapper(addOrRemoveRecipeToSavedController),
);

recipesRouter.get('/saved', ctrlWrapper(getSavedRecipesController));

recipesRouter.delete(
  '/:recipeId',
  isValidId('recipeId'),
  isOwnerOfId,
  ctrlWrapper(deleteRecipeController),
);

export default recipesRouter;
