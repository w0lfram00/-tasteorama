import Joi from 'joi';

export const createRecipeSchema = Joi.object({
  title: Joi.string().min(3).max(40).required(),
  category: Joi.string().min(3).max(20).required(),
  owner: Joi.string().min(20).max(35).required(),
  area: Joi.string().min(3).max(20),
  instructions: Joi.string().max(3000).required(),
  description: Joi.string().max(1000).required(),
  thumb: Joi.string()
    .uri({ scheme: ['cloudinary'] })
    .required(),
  time: Joi.string().max(20).required(),
  ingredients: Joi.array()
    .max(20)
    .items(
      Joi.object({
        id: Joi.string().min(20).max(35).required(),
        measure: Joi.string().max(15).required(),
      }).required(),
    ),
});

export const addToSavedSchema = Joi.object({
  recipeId: Joi.string().min(20).max(35).required(),
});

export const addToSavedExtraSchema = Joi.array().items(addToSavedSchema);
