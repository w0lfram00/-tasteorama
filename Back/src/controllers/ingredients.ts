import createHttpError from 'http-errors';
import { getAllIngredients } from '../services/ingredients.ts';
import type { Request, Response } from 'express';

export const getAllIngredientsController = async (
  req: Request,
  res: Response,
) => {
  const ingredients = await getAllIngredients();

  res.json({
    status: 200,
    message: `Successfully fetched for list of ingredients`,
    data: ingredients,
  });
};
