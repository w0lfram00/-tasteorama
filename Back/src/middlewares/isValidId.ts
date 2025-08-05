import type { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId =
  (idName?: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const id = idName ? req.params[idName] : req.params[0];
    if (!id || !isValidObjectId(id)) {
      throw createHttpError(400, 'Bad request');
    }

    next();
  };
