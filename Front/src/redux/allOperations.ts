import { getCategories } from "./categories/operations";
import { getIngredients } from "./ingredients/operations";
import { getAllRecipes, getRecipeById } from "./recipes/operations";

const allOperations = [
  getAllRecipes,
  getRecipeById,
  getCategories,
  getIngredients,
];
export default allOperations;
