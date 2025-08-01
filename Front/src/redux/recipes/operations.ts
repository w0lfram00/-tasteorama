import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Recipe, RecipeDetailed } from "../../interfaces/db";
import type {
  GetAllRecipesFiltered,
  PaginationInfo,
} from "../../interfaces/requests/recipes";

const api = axios.create({ baseURL: "http://localhost:3000/api" });

export const getAllRecipes = createAsyncThunk(
  "recipes/getAll",
  async (options: GetAllRecipesFiltered, thunkAPI) => {
    try {
      const response = await api.get<
        { data: Recipe[]; page: number } & PaginationInfo
      >("recipes", { params: { options } });
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Error");
    }
  }
);

export const getRecipeById = createAsyncThunk(
  "recipes/getById",
  async (id: string, thunkAPI) => {
    try {
      const response = await api.get<RecipeDetailed>("/recipes/" + id);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Error");
    }
  }
);
