import { createSlice, isAnyOf, type PayloadAction } from "@reduxjs/toolkit";
import type { Recipe, RecipeDetailed } from "../../interfaces/db";
import type { PaginationInfo } from "../../interfaces/requests/recipes";
import { getAllRecipes, getRecipeById } from "./operations";
import selectForAllOperationsStatus from "../../utils/selectForAllOperationsStatus";

export interface RecipesSliceState {
  recipes: Array<Recipe>;
  selectedRecipe: RecipeDetailed | null;
  page: number;
  paginationInfo: PaginationInfo;
  filterOptions: Partial<{
    title: string;
    category: string;
    ingredient: string;
  }>;
  isLoading: boolean;
  isError: unknown | null;
}

const initialState: RecipesSliceState = {
  recipes: [],
  selectedRecipe: null,
  page: 1,
  paginationInfo: {
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  filterOptions: {},
  isLoading: false,
  isError: null,
};

const slice = createSlice({
  name: "mainReducer",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    nextPage: (state) => {
      state.page++;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRecipes.fulfilled, (state, action) => {
        state.recipes = action.payload.data;
        state.paginationInfo = action.payload.paginationInfo;
      })
      .addCase(getRecipeById.fulfilled, (state, action) => {
        state.selectedRecipe = action.payload;
      })
      .addMatcher(
        isAnyOf(...selectForAllOperationsStatus("pending")),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(...selectForAllOperationsStatus("fulfilled")),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(...selectForAllOperationsStatus("rejected")),
        (state) => {
          state.isError = true;
          state.isLoading = false;
        }
      );
  },
});

export const recipesReducer = slice.reducer;
export const { setPage, nextPage } = slice.actions;
