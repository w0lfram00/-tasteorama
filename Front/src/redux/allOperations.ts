import {
  getCurUserInfo,
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
} from "./auth/operations";
import { getCategories } from "./categories/operations";
import { getIngredients } from "./ingredients/operations";
import {
  deleteRecipeById,
  getAllRecipes,
  getOwnedRecipes,
  getRecipeById,
  getSavedRecipes,
  postRecipe,
  saveRecipe,
} from "./recipes/operations";

const allOperations = [
  getAllRecipes,
  getRecipeById,
  getCategories,
  getIngredients,
  loginUser,
  registerUser,
  refreshUser,
  logoutUser,
  getCurUserInfo,
  postRecipe,
  deleteRecipeById,
  getOwnedRecipes,
  getSavedRecipes,
  saveRecipe,
];
export default allOperations;
