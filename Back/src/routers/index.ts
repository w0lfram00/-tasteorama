import { Router } from 'express';
import authRouter from './auth.ts';
import usersRouter from './users.ts';
import categoriesRouter from './categories.ts';
import ingredientsRouter from './ingredients.ts';
import recipesRouter from './recipes.ts';

const router = Router();

router.use('/api/auth', authRouter);
router.use('/api/users', usersRouter);
router.use('/api/categories', categoriesRouter);
router.use('/api/ingredients', ingredientsRouter);
router.use('/api/recipes', recipesRouter);

export default router;
