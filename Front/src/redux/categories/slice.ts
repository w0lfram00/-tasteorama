import { createSlice } from "@reduxjs/toolkit";
import type { Category } from "../../interfaces/db";
import { getCategories } from "./operations";

export interface CategoriesSliceState {
  categories: Array<Category>;
}

const initialState: CategoriesSliceState = {
  categories: [],
};

const slice = createSlice({
  name: "categoriesReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const categoriesReducer = slice.reducer;
