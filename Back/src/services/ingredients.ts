import createHttpError from 'http-errors';
import { IngredientsCollection } from '../db/models/ingredients.ts';

export const getAllIngredients = async () => {
  const ingredients = await IngredientsCollection.find({});
  return ingredients;
};
