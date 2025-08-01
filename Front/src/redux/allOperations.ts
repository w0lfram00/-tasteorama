import { getAllRecipes, getRecipeById } from "./recipes/operations";

const allOperations: [typeof getAllRecipes, typeof getRecipeById] = [
  getAllRecipes,
  getRecipeById,
];
export default allOperations;
