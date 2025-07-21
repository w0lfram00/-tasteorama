import type { Request, Response } from 'express';
import { saveToCloudinary } from '../utils/saveToCloudinary.ts';
import {
  createRecipe,
  getAllRecipesFiltered,
  getOwnedRecipes,
  getRecipeById,
} from '../services/recipes.ts';
import type { RequestWithUser } from '../interfaces/AuthRequest.ts';
import { parsePaginationParams } from '../utils/parsePaginationParams.ts';
import { parseFilterParams } from '../utils/parseFilterParams.ts';
import createHttpError from 'http-errors';
import { Types } from 'mongoose';

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
  const recipeId = new Types.ObjectId(req.params.recipeId);
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
  const img = req.file;
  let imgUrl;
  if (img) imgUrl = await saveToCloudinary(img);

  const query = req.query;

  const recipe = await createRecipe({
    ...req.body,
    thumb: imgUrl,
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
  const recipes = await getOwnedRecipes(req.user._id);

  res.json({
    status: 200,
    message: 'Successfully found recipes!',
    data: recipes,
  });
};
