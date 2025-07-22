import createHttpError from 'http-errors';
import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateBody = (
  schema: Joi.ObjectSchema | Joi.ArraySchema,
  extraSchema?: Joi.ObjectSchema | Joi.ArraySchema,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let errDetail;
    try {
      await schema.validateAsync(req.body, { abortEarly: false });

      next();
    } catch (e: any) {
      errDetail = e.details;
      if (extraSchema) {
        try {
          await extraSchema.validateAsync(req.body, { abortEarly: false });
          next();
        } catch (err: any) {
          errDetail += ` or ${err.details}`;
          const error = createHttpError(400, 'Bad request', {
            errors: errDetail,
          });
          next(error);
        }
      } else {
        const error = createHttpError(400, 'Bad request', {
          errors: errDetail,
        });
        next(error);
      }
    }
  };
};
