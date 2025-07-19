import type { Recipe } from '../db.ts';

export interface CreateRecipe extends Omit<Recipe, '_id'> {}
