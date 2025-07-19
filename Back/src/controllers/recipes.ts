import type { Response } from 'express';
import { saveToCloudinary } from '../utils/saveToCloudinary.ts';
import { createRecipe } from '../services/recipes.ts';
import type { RequestWithUser } from '../interfaces/AuthRequest.ts';

export const postRecipeController = async (
  req: RequestWithUser,
  res: Response,
) => {
  const img = req.file;
  let imgUrl;
  if (img) imgUrl = await saveToCloudinary(img);

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
