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
      const response = await api.get<GetAllRecipesResult>("/recipes/public", {
        params: {
          ...options.filter,
          page: options.page,
          perPage: options.perPage,
        },
      });
      const result = response.data;

      return {
        data: result.data.data,
        paginationInfo: {
          ...result.data,
          data: undefined,
        },
      };
    } catch (e) {
      if (axios.isAxiosError(e))
        return thunkAPI.rejectWithValue({
          status: e.status,
          message: e.response?.data.message,
        });
      return thunkAPI.rejectWithValue({
        status: 500,
        message: "Unexpected Error",
      });
    }
  }
);

export const getRecipeById = createAsyncThunk(
  "recipes/getById",
  async (id: string, thunkAPI) => {
    try {
      const response = await api.get<Request<RecipeDetailed>>(
        "/recipes/public/" + id
      );
      const result = response.data;
      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e))
        return thunkAPI.rejectWithValue({
          status: e.status,
          message: e.response?.data.message,
        });
      return thunkAPI.rejectWithValue({
        status: 500,
        message: "Unexpected Error",
      });
    }
  }
);
