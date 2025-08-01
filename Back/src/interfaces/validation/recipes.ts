import type { Types } from 'mongoose';
import type { Recipe, User } from '../db.ts';

export interface CreateRecipe extends Omit<Recipe, '_id'> {}

interface Pagination
  extends Partial<{
    page: number;
    perPage: number;
  }> {}

export interface GetAllRecipesForUser extends Pagination {
  user: User;
}

export interface GetAllRecipesFiltered extends Pagination {
  filter: Partial<{
    title: string;
    category: string;
    ingredient: string;
  }>;
}
