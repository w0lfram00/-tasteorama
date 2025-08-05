import Joi from 'joi';

export const createRecipeSchema = Joi.object({
  title: Joi.string().min(3).max(40).required(),
  category: Joi.string().min(3).max(20).required(),
  area: Joi.string().min(3).max(20),
  instructions: Joi.string().max(1200).required(),
  description: Joi.string().max(1000).required(),
  time: Joi.number().max(999).required(),
  ingredients: Joi.string().max(512).required(),
});

export const addToSavedSchema = Joi.object({
  recipeId: Joi.string().min(20).max(35).required(),
});

export const addToSavedExtraSchema = Joi.array().items(addToSavedSchema);
