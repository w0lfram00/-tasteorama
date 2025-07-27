import createHttpError from 'http-errors';
import type { Request, Response, NextFunction } from 'express';
import { RecipesCollection } from '../db/models/recipes.ts';
import type { RequestWithUser } from '../interfaces/AuthRequest.ts';

export const isOwnerOfId = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  if (!(await RecipesCollection.findById(req.params.recipeId))) {
    next(createHttpError(404, 'Recipe not found'));
    return;
  }

  const recipe = await RecipesCollection.findOne({
    owner: req.user._id,
    _id: req.params.recipeId,
  });

  if (!recipe) {
    next(createHttpError(403));
    return;
  }
  next();
};
