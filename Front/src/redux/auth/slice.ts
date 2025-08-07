import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { loginUser, logoutUser, refreshUser, registerUser } from "./operations";
import type { User } from "../../interfaces/db";
import { saveRecipe } from "../recipes/operations";

export interface AuthSliceState {
  user: User | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  accessToken: string | null;
}

const initialState: AuthSliceState = {
  user: null,
  isLoggedIn: false,
  accessToken: null,
  isRefreshing: false,
};

const slice = createSlice({
  name: "categoriesReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        state.isRefreshing = false;
        state.isLoggedIn = true;
      })
      .addCase(logoutUser.pending, () => {
        return initialState;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        state.isRefreshing = false;
        state.isLoggedIn = true;
      })
      .addCase(saveRecipe.fulfilled, (state, action) => {
        if (state.user) state.user.savedRecipes = action.payload.savedRecipes;
        else state.user = action.payload;
      });
  },
});

export const authReducer = slice.reducer;
