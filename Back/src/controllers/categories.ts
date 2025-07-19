import type { Request, Response } from 'express';
import { getAllCategories } from '../services/categories.ts';
import createHttpError from 'http-errors';

export const getAllCategoriesController = async (
  req: Request,
  res: Response,
) => {
  const categories = await getAllCategories();
  if (!categories) throw createHttpError(404, 'No categories has been found');
  res.json({
    status: 200,
    message: `Successfully fetched for list of categories`,
    data: categories,
  });
};
