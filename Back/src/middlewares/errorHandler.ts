import { HttpError } from 'http-errors';
import type { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof HttpError) {
    res
      .status(err.status)
      .json({ status: err.status, message: err.name, data: err });
    return;
  }
  res
    .status(500)
    .json({ status: 500, message: 'Something went wrong', error: err.message });
};
