import type { Types } from 'mongoose';
import { RecipesCollection } from '../db/models/recipes.ts';
import type {
  CreateRecipe,
  GetAllRecipesFiltered,
} from '../interfaces/validation/recipes.ts';
import { calculatePaginationData } from '../utils/calculatePaginationData.ts';
import { UsersCollection } from '../db/models/users.ts';
import type {
  Ingredient,
  Recipe,
  RecipePopulated,
  User,
} from '../interfaces/db.ts';
import createHttpError from 'http-errors';
import type { PaginationData } from '../interfaces/PaginationData.ts';

export const getAllRecipesFiltered = async ({
  filter,
  page = 1,
  perPage = 10,
}: GetAllRecipesFiltered): Promise<{ data: Recipe[] } & PaginationData> => {
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

export const getRecipeById = async (
  recipeId: Types.ObjectId | undefined,
): Promise<RecipePopulated | null> => {
  const recipe = await RecipesCollection.findById(recipeId)
    .populate<{
      ingredients: Array<{ ingredient: Ingredient; measure: string }>;
    }>('ingredients', '-_id')
    .exec();

  return recipe;
};

export const createRecipe = async (payload: CreateRecipe): Promise<Recipe> => {
  const recipe = await RecipesCollection.create({ payload });
  return recipe;
};

export const getOwnedRecipes = async (
  userId: Types.ObjectId,
): Promise<Recipe[]> => {
  const recipes = await RecipesCollection.find({ owner: userId });
  return recipes;
};

const checkRecipeId = async (recipeId: Types.ObjectId) => {
  const recipe = await RecipesCollection.findById(recipeId);
  if (!recipe) throw createHttpError(400, 'Invalid recipe id');
};

const isRecipeSaved = (user: User, recipeId: Types.ObjectId): boolean =>
  (user.savedRecipes as Types.ObjectId[]).includes(recipeId);

export const addOrRemoveRecipeToSaved = async (
  user: User,
  recipeId: Types.ObjectId | Array<Types.ObjectId>,
): Promise<User | null> => {
  if (!Array.isArray(recipeId)) {
    checkRecipeId(recipeId);

    if (isRecipeSaved(user, recipeId))
      user.savedRecipes.filter((value) => value != recipeId);
    else user.savedRecipes.push(recipeId);
  } else {
    recipeId.forEach((id) => {
      checkRecipeId(id);

      if (isRecipeSaved(user, id))
        user.savedRecipes.filter((value) => value != id);
      else user.savedRecipes.push(id);
    });
  }

  const result = await UsersCollection.findByIdAndUpdate(
    { _id: user._id },
    { savedRecipes: user.savedRecipes },
    { includeResultMetadata: true, new: true },
  );

  if (!result || !result.value) return null;

  return result.value;
};

export const getSavedRecipes = async (
  user: User,
): Promise<{ data: Recipe[]; hasDeleted: boolean }> => {
  const recipes = await RecipesCollection.find({
    _id: { $in: [user.savedRecipes] },
  });
  let hasDeleted = false;
  if (recipes.length < user.savedRecipes.length) {
    hasDeleted = true;
    user.savedRecipes = recipes.map((recipe) => recipe._id);
    await UsersCollection.findByIdAndUpdate(
      { _id: user._id },
      { savedRecipes: user.savedRecipes },
    );
  }
  return {
    data: recipes,
    hasDeleted,
  };
};

export const deleteRecipe = async (
  recipeId: Types.ObjectId | undefined,
): Promise<Recipe | null> => {
  const recipe = await RecipesCollection.findOneAndDelete({ _id: recipeId });
  return recipe;
};
