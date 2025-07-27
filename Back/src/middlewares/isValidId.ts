import type { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId =
  (idName: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params[idName];
    if (!isValidObjectId(id)) {
      throw createHttpError(400, 'Bad request');
    }
    next();
  };
