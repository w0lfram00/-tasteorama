import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.ts';
import { validateBody } from '../middlewares/validateBody.ts';
import { createRecipeSchema } from '../validation/recipes.ts';
import { upload } from '../middlewares/multer.ts';
import { ctrlWrapper } from '../utils/ctrlWrapper.ts';
import { postRecipeController } from '../controllers/recipes.ts';

const recipesRouter = Router();

recipesRouter.use(authenticate);

recipesRouter.post(
  '/recipes',
  upload.single('img'),
  validateBody(createRecipeSchema),
  ctrlWrapper(postRecipeController),
);

export default recipesRouter;
