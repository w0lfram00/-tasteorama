import { Router } from 'express';
import authRouter from './auth.ts';
import usersRouter from './users.ts';
import categoriesRouter from './categories.ts';
import ingredientsRouter from './ingredients.ts';
import recipesRouter from './recipes.ts';
import recipesPublicRouter from './recipesPublic.ts';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);
router.use('/ingredients', ingredientsRouter);
router.use('/recipes/public', recipesPublicRouter);
router.use('/recipes', recipesRouter);

export default router;
