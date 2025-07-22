import { CategoriesCollection } from '../db/models/categories.ts';
import type { Category } from '../interfaces/db.ts';

export const getAllCategories = async (): Promise<Category[]> => {
  const categories = await CategoriesCollection.find({});
  return categories;
};
