import { createSlice, isAnyOf, type PayloadAction } from "@reduxjs/toolkit";
import type { Recipe, RecipeDetailed } from "../../interfaces/db";
import type {
  FilterOptions,
  PaginationInfo,
} from "../../interfaces/requests/recipes";
import { getAllRecipes, getRecipeById } from "./operations";
import selectForAllOperationsStatus from "../../utils/selectForAllOperationsStatus";
import type { RequestError } from "../../interfaces/requests/errors";
import trimRequestType from "../../utils/trimRequestType";

export interface RecipesSliceState {
  recipes: Array<Recipe>;
  selectedRecipe: RecipeDetailed | null;
  page: number;
  paginationInfo: PaginationInfo;
  filterOptions: FilterOptions;
  isLoading: boolean;
  loadingMap: Record<string, boolean>;
  error: RequestError | null;
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
  loadingMap: {},
  error: null,
};

const slice = createSlice({
  name: "recipesReducer",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    nextPage: (state) => {
      state.page++;
    },
    resetRecipes: (state) => {
      state.recipes = [];
    },
    resetFilters: (state) => {
      state.filterOptions = {};
    },
    setFilterOptions: (state, action: PayloadAction<FilterOptions>) => {
      state.filterOptions = { ...state.filterOptions, ...action.payload };
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRecipes.fulfilled, (state, action) => {
        state.paginationInfo = action.payload.paginationInfo;
        if (state.page != 1)
          state.recipes = state.recipes.concat(action.payload.data);
        else state.recipes = action.payload.data;
      })
      .addCase(getRecipeById.fulfilled, (state, action) => {
        state.selectedRecipe = action.payload;
      })
      .addMatcher(
        isAnyOf(...selectForAllOperationsStatus("pending")),
        (state, action) => {
          state.loadingMap[trimRequestType(action.type)] = true;
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(...selectForAllOperationsStatus("fulfilled")),
        (state, action) => {
          console.log(action.type);
          delete state.loadingMap[trimRequestType(action.type)];
          state.isLoading = Object.keys(state.loadingMap).length > 0;
        }
      )
      .addMatcher(
        isAnyOf(...selectForAllOperationsStatus("rejected")),
        (state, action) => {
          state.error = action.payload as RequestError;
          delete state.loadingMap[trimRequestType(action.type)];
          state.isLoading = Object.keys(state.loadingMap).length > 0;
        }
      );
  },
});

export const recipesReducer = slice.reducer;
export const {
  setPage,
  nextPage,
  resetFilters,
  resetRecipes,
  setFilterOptions,
  resetError,
} = slice.actions;
