import { CategoriesCollection } from '../db/models/categories.ts';

export const getAllCategories = async () => {
  const categories = await CategoriesCollection.find({});
  return categories;
};
