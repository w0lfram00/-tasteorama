import type { StoreState } from "../store";

export const selectRecipes = (state: StoreState) => state.recipes.recipes;
export const selectSelectedRecipe = (state: StoreState) =>
  state.recipes.selectedRecipe;
export const selectFilterOptions = (state: StoreState) =>
  state.recipes.filterOptions;
export const selectPaginationInfo = (state: StoreState) =>
  state.recipes.paginationInfo;
