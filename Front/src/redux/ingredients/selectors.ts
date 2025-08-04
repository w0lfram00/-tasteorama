import type { StoreState } from "../store";

export const selectIngredients = (state: StoreState) =>
  state.ingredients.ingredients;
