import type { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export function isValidId(req: Request, res: Response, next: NextFunction) {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw createHttpError(400, 'Bad request');
  }
  next();
}
