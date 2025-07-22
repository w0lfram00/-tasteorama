import createHttpError from 'http-errors';
import { IngredientsCollection } from '../db/models/ingredients.ts';
import type { Ingredient } from '../interfaces/db.ts';

export const getAllIngredients = async (): Promise<Ingredient[]> => {
  const ingredients = await IngredientsCollection.find({});
  return ingredients;
};
