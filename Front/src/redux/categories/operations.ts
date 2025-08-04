import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../recipes/operations";
import type { GetCategories } from "../../interfaces/requests/categories";

export const getCategories = createAsyncThunk(
  "categories/getAll",
  async (_, thunkAPI) => {
    try {
      const { data: response } = await api.get<GetCategories>("/categories");
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Error");
    }
  }
);
