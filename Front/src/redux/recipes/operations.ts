import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Recipe, RecipeDetailed, User } from "../../interfaces/db";
import type {
  CreateRecipe,
  GetAllRecipesFiltered,
  GetAllRecipesResult,
} from "../../interfaces/requests/recipes";
import { type Request } from "../../interfaces/requests/request";
import errorHandling from "../../utils/errorHandling";
import api from "../apiCore";

export const getAllRecipes = createAsyncThunk(
  "recipes/getAll",
  async (options: GetAllRecipesFiltered, thunkAPI) => {
    try {
      const { data: response } = await api.get<GetAllRecipesResult>(
        "/recipes/public",
        {
          params: {
            ...options.filter,
            page: options.page,
            perPage: options.perPage,
          },
        }
      );

      return {
        data: response.data.data,
        paginationInfo: {
          ...response.data,
          data: undefined,
        },
      };
    } catch (e) {
      if (axios.isAxiosError(e)) return errorHandling(e, thunkAPI);
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
      const { data: response } = await api.get<Request<RecipeDetailed>>(
        "/recipes/public/" + id
      );
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e))
        if (axios.isAxiosError(e)) return errorHandling(e, thunkAPI);
      return thunkAPI.rejectWithValue({
        status: 500,
        message: "Unexpected Error",
      });
    }
  }
);

export const deleteRecipeById = createAsyncThunk(
  "recipes/delete",
  async (id: string, thunkAPI) => {
    try {
      await api.delete("/recipes/" + id);
      return id;
    } catch (e) {
      if (axios.isAxiosError(e))
        if (axios.isAxiosError(e)) return errorHandling(e, thunkAPI);
      return thunkAPI.rejectWithValue({
        status: 500,
        message: "Unexpected Error",
      });
    }
  }
);

export const saveRecipe = createAsyncThunk(
  "recipes/save",
  async (id: string, thunkAPI) => {
    try {
      const { data: response } = await api.patch<
        Request<{ data: User; addedRecipe: boolean }>
      >("/recipes/saved/" + id);
      return response.data.data;
    } catch (e) {
      if (axios.isAxiosError(e))
        if (axios.isAxiosError(e)) return errorHandling(e, thunkAPI);
      return thunkAPI.rejectWithValue({
        status: 500,
        message: "Unexpected Error",
      });
    }
  }
);

export const postRecipe = createAsyncThunk(
  "recipes/create",
  async (payload: CreateRecipe, thunkAPI) => {
    try {
      const { data: response } = await api.post<Request<Recipe>>(
        "/recipes",
        payload
      );
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e))
        if (axios.isAxiosError(e)) return errorHandling(e, thunkAPI);
      return thunkAPI.rejectWithValue({
        status: 500,
        message: "Unexpected Error",
      });
    }
  }
);

export const getOwnedRecipes = createAsyncThunk(
  "recipes/getOwned",
  async (options: { page: number; perPage: number }, thunkAPI) => {
    try {
      const { data: response } = await api.get<GetAllRecipesResult>(
        "/recipes/owned",
        {
          params: {
            page: options.page,
            perPage: options.perPage,
          },
        }
      );

      return {
        data: response.data.data,
        paginationInfo: {
          ...response.data,
          data: undefined,
        },
      };
    } catch (e) {
      if (axios.isAxiosError(e)) return errorHandling(e, thunkAPI);
      return thunkAPI.rejectWithValue({
        status: 500,
        message: "Unexpected Error",
      });
    }
  }
);

export const getSavedRecipes = createAsyncThunk(
  "recipes/getSaved",
  async (options: { page: number; perPage: number }, thunkAPI) => {
    try {
      const { data: response } = await api.get<GetAllRecipesResult>(
        "/recipes/saved",
        {
          params: {
            page: options.page,
            perPage: options.perPage,
          },
        }
      );

      return {
        data: response.data.data,
        paginationInfo: {
          ...response.data,
          data: undefined,
        },
      };
    } catch (e) {
      if (axios.isAxiosError(e)) return errorHandling(e, thunkAPI);
      return thunkAPI.rejectWithValue({
        status: 500,
        message: "Unexpected Error",
      });
    }
  }
);
