import type { Types } from 'mongoose';
import { RecipesCollection } from '../db/models/recipes.ts';
import type {
  CreateRecipe,
  GetAllRecipesFiltered,
} from '../interfaces/validation/recipes.ts';
import { calculatePaginationData } from '../utils/calculatePaginationData.ts';
import { UsersCollection } from '../db/models/users.ts';

export const getAllRecipesFiltered = async ({
  filter,
  page = 1,
  perPage = 10,
}: GetAllRecipesFiltered) => {
  const skip = (page - 1) * perPage;

  const recipesQuery = RecipesCollection.find({ title: filter?.title });

  if (filter?.category) recipesQuery.where('category').equals(filter.category);
  if (filter?.ingredient)
    recipesQuery.where('ingredient').equals(filter.ingredient);

  const [recipesCount, recipes] = await Promise.all([
    RecipesCollection.find().merge(recipesQuery).countDocuments(),
    recipesQuery.skip(skip).limit(perPage).exec(),
  ]);

  const paginationData = calculatePaginationData(recipesCount, page, perPage);

  return {
    data: recipes,
    ...paginationData,
  };
};

export const getRecipeById = async (recipeId: Types.ObjectId | undefined) => {
  const recipe = await RecipesCollection.findById(recipeId)
    .populate('ingredients', '-_id')
    .exec();

  return recipe;
};

export const createRecipe = async (payload: CreateRecipe) => {
  const recipe = await RecipesCollection.create({ payload });
  return recipe;
};

export const getOwnedRecipes = async (userId: Types.ObjectId) => {
  const recipes = await RecipesCollection.find({ owner: userId });
  return recipes;
};

export const addRecipeToSaved = async (
  userId: Types.ObjectId,
  recipeId: Types.ObjectId | Array<Types.ObjectId>,
) => {
  const user = await UsersCollection.findById(userId);

  if (!Array.isArray(recipeId)) {
    user?.savedRecipes.push(recipeId);
  } else {
    recipeId.forEach((id) => {
      user?.savedRecipes.push(id);
    });
  }

  const result = await UsersCollection.findByIdAndUpdate(
    { _id: userId },
    { savedRecipes: user?.savedRecipes },
    { includeResultMetadata: true, new: true },
  );

  if (!result || !result.value) return null;

  return result.value;
};
