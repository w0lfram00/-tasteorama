import type { Recipe } from '../db.ts';

export interface CreateRecipe extends Omit<Recipe, '_id'> {}

export interface GetAllRecipesFiltered
  extends Partial<{
    page: number;
    perPage: number;
    filter: Partial<{
      title: string;
      category: string;
      ingredient: string;
    }>;
  }> {}
