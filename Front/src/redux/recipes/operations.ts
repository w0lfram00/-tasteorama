import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RecipeDetailed } from "../../interfaces/db";
import type {
  GetAllRecipesFiltered,
  GetAllRecipesResult,
} from "../../interfaces/requests/recipes";
import { type Request } from "../../interfaces/requests/request";

export const api = axios.create({ baseURL: "http://localhost:3000/api" });

export const getAllRecipes = createAsyncThunk(
  "recipes/getAll",
  async (options: GetAllRecipesFiltered, thunkAPI) => {
    try {
      const { data: response } = await api.get<GetAllRecipesResult>("recipes", {
        params: {
          ...options.filter,
          page: options.page,
          perPage: options.perPage,
        },
      });

      return {
        data: response.data.data,
        paginationInfo: {
          ...response.data,
          data: undefined,
        },
      };
    } catch {
      return thunkAPI.rejectWithValue("Error");
    }
  }
);

export const getRecipeById = createAsyncThunk(
  "recipes/getById",
  async (id: string, thunkAPI) => {
    try {
      const { data: response } = await api.get<Request<RecipeDetailed>>(
        "/recipes/" + id
      );
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Error");
    }
  }
);
