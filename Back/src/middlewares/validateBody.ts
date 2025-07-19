import createHttpError from 'http-errors';
import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateBody = (schema: Joi.ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (err: any) {
      const error = createHttpError(400, 'Bad request', {
        errors: err.details,
      });
      next(error);
    }
  };
};
