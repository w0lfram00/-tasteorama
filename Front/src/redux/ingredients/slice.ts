import { createSlice } from "@reduxjs/toolkit";
import type { Ingredient } from "../../interfaces/db";
import { getIngredients } from "./operations";

export interface IngredientsSliceState {
  ingredients: Array<Ingredient>;
}

const initialState: IngredientsSliceState = {
  ingredients: [],
};

const slice = createSlice({
  name: "ingredientsReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
    });
  },
});

export const ingredientsReducer = slice.reducer;
