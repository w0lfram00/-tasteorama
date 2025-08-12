import type { StoreState } from "../store";

export const selectRecipes = (state: StoreState) => state.recipes.recipes;
export const selectSelectedRecipe = (state: StoreState) =>
  state.recipes.selectedRecipe;
export const selectFilterOptions = (state: StoreState) =>
  state.recipes.filterOptions;
export const selectPaginationInfo = (state: StoreState) =>
  state.recipes.paginationInfo;
export const selectPage = (state: StoreState) => state.recipes.page;
export const selectIsLoading = (state: StoreState) => state.recipes.isLoading;
export const selectError = (state: StoreState) => state.recipes.error;
export const selectSavedRecipes = (state: StoreState) =>
  state.recipes.savedRecipes;
export const selectLoadingMap = (state: StoreState) => state.recipes.loadingMap;
