import type { StoreState } from "../store";

export const selectCategories = (state: StoreState) =>
  state.categories.categories;
