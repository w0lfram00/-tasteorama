import { RecipesCollection } from '../db/models/recipes.ts';
import type { CreateRecipe } from '../interfaces/validation/recipes.ts';

export const createRecipe = async (payload: CreateRecipe) => {
  const recipe = await RecipesCollection.create({ payload });
  return recipe;
};
