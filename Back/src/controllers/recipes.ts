import type { Request, Response } from 'express';
import { saveToCloudinary } from '../utils/saveToCloudinary.ts';
import {
  addOrRemoveRecipeToSaved,
  createRecipe,
  deleteRecipe,
  getAllRecipesFiltered,
  getOwnedRecipes,
  getRecipeById,
  getSavedRecipes,
} from '../services/recipes.ts';
import type { RequestWithUser } from '../interfaces/AuthRequest.ts';
import { parsePaginationParams } from '../utils/parsePaginationParams.ts';
import { parseFilterParams } from '../utils/parseFilterParams.ts';
import createHttpError from 'http-errors';
import { toObjId } from '../utils/toObjId.ts';

export const getAllRecipesFilteredController = async (
  req: Request,
  res: Response,
) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const filter = parseFilterParams(req.query);
  const recipes = await getAllRecipesFiltered({ page, perPage, filter });

  res.json({
    status: 200,
    message: 'Successfully found recipes!',
    data: recipes,
  });
};

export const getRecipeByIdController = async (req: Request, res: Response) => {
  const recipeId = toObjId(req.params.recipeId);
  const recipe = await getRecipeById(recipeId);

  if (!recipe) throw createHttpError(404, 'Recipe not found');

  res.json({
    status: 200,
    message: 'Successfully found recipe!',
    data: recipe,
  });
};

export const postRecipeController = async (
  req: RequestWithUser,
  res: Response,
) => {
  const thumb = req.file;
  let imgUrl;
  if (thumb) imgUrl = await saveToCloudinary(thumb);

  const recipe = await createRecipe({
    ...req.body,
    ingredients: JSON.parse(req.body.ingredients),
    thumb: imgUrl,
    img: imgUrl,
    owner: req.user._id,
  });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a recipe!',
    data: recipe,
  });
};

export const getOwnedRecipesController = async (
  req: RequestWithUser,
  res: Response,
) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const result = await getOwnedRecipes({ user: req.user, page, perPage });

  res.json({
    status: 200,
    message: 'Successfully found recipes!',
    data: result,
  });
};

export const addOrRemoveRecipeToSavedController = async (
  req: RequestWithUser,
  res: Response,
) => {
  const result = await addOrRemoveRecipeToSaved(
    req.user,
    toObjId(req.params.recipeId),
  );
  if (!result) throw createHttpError(404, 'User not found');

  res.json({
    status: 200,
    message: `Successfully ${
      result.addedRecipe ? 'added recipe to' : 'removed recipe from'
    } saved!`,
    data: result,
  });
};

export const getSavedRecipesController = async (
  req: RequestWithUser,
  res: Response,
) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const result = await getSavedRecipes({ user: req.user, page, perPage });

  res.json({
    status: 200,
    message: 'Successfully found saved recipes',
    data: result,
  });
};

export const deleteRecipeController = async (
  req: RequestWithUser,
  res: Response,
) => {
  const recipe = await deleteRecipe(toObjId(req.params.recipeId));
  if (!recipe) throw createHttpError(404, 'Recipe not found');

  res.status(204).send();
};
