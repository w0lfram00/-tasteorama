import createHttpError from 'http-errors';
import type { Request, Response, NextFunction } from 'express';
import { RecipesCollection } from '../db/models/recipes.ts';
import type { RequestWithUser } from '../interfaces/AuthRequest.ts';

export const isOwnerOfId = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  if (!(await RecipesCollection.findById(req.params.contactId))) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const contact = await RecipesCollection.findOne({
    userId: req.user._id,
    _id: req.params.contactId,
  });

  if (!contact) {
    next(createHttpError(403));
    return;
  }
  next();
};
