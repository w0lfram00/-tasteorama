import type { Types } from 'mongoose';
import { RecipesCollection } from '../db/models/recipes.ts';
import type {
  CreateRecipe,
  GetAllRecipesFiltered,
  GetAllRecipesForUser,
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
import { toObjId } from '../utils/toObjId.ts';
import { log } from 'console';

export const getAllRecipesFiltered = async ({
  filter,
  page = 1,
  perPage = 10,
}: GetAllRecipesFiltered): Promise<{ data: Recipe[] } & PaginationData> => {
  const skip = (page - 1) * perPage;

  if (!filter.title) filter.title = '';

  const recipesQuery = RecipesCollection.find({
    title: { $regex: filter.title, $options: 'i' },
  });

  if (filter?.category) recipesQuery.where('category').equals(filter.category);
  if (filter?.ingredient) {
    recipesQuery.where('ingredients._id').equals(toObjId(filter.ingredient));
  }

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
      ingredients: Array<{ id: Ingredient; measure: string }>;
    }>('ingredients.id')
    .exec();

  return recipe;
};

export const createRecipe = async (payload: CreateRecipe): Promise<Recipe> => {
  const recipe = await RecipesCollection.create(payload);
  return recipe;
};

export const getOwnedRecipes = async ({
  user,
  page = 1,
  perPage = 10,
}: GetAllRecipesForUser): Promise<{ data: Recipe[] } & PaginationData> => {
  const skip = (page - 1) * perPage;

  const recipesQuery = RecipesCollection.find({ owner: user._id });

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

const checkRecipeId = async (recipeId: Types.ObjectId) => {
  const recipe = await RecipesCollection.findById(recipeId);
  if (!recipe) throw createHttpError(400, 'Invalid recipe id');
};

const isRecipeSaved = (user: User, recipeId: Types.ObjectId): boolean =>
  (user.savedRecipes as Types.ObjectId[]).includes(recipeId);

export const addOrRemoveRecipeToSaved = async (
  user: User,
  recipeId: Types.ObjectId | undefined,
): Promise<{ data: User; addedRecipe: boolean } | null> => {
  if (!recipeId) return null;

  checkRecipeId(recipeId);
  let addedRecipe = true;
  console.log(user.savedRecipes);

  if (isRecipeSaved(user, recipeId)) {
    addedRecipe = false;
    user.savedRecipes = user.savedRecipes.filter(
      (value) => value.toString() !== recipeId.toString(),
    );
  } else user.savedRecipes.push(recipeId);

  const result = await UsersCollection.findByIdAndUpdate(
    { _id: user._id },
    { savedRecipes: user.savedRecipes },
    { includeResultMetadata: true, new: true },
  );

  if (!result || !result.value) return null;

  return {
    data: result.value,
    addedRecipe,
  };
};

export const getSavedRecipes = async ({
  user,
  page = 1,
  perPage = 10,
}: GetAllRecipesForUser): Promise<
  { data: Recipe[]; hadDeleted: boolean } & PaginationData
> => {
  const skip = (page - 1) * perPage;

  console.log(user.savedRecipes);

  const recipesQuery = RecipesCollection.find({
    _id: { $in: user.savedRecipes },
  });

  const [recipesCount, recipes] = await Promise.all([
    RecipesCollection.find().merge(recipesQuery).countDocuments(),
    recipesQuery.skip(skip).limit(perPage).exec(),
  ]);
  const paginationData = calculatePaginationData(recipesCount, page, perPage);

  let hadDeleted = false;
  if (recipesCount < user.savedRecipes.length) {
    hadDeleted = true;
    user.savedRecipes = recipes.map((recipe) => recipe._id);
    await UsersCollection.findByIdAndUpdate(
      { _id: user._id },
      { savedRecipes: user.savedRecipes },
    );
  }

  return {
    data: recipes,
    hadDeleted,
    ...paginationData,
  };
};

export const deleteRecipe = async (
  recipeId: Types.ObjectId | undefined,
): Promise<Recipe | null> => {
  const recipe = await RecipesCollection.findOneAndDelete({ _id: recipeId });
  return recipe;
};
