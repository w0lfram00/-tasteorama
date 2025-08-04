import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../recipes/operations";
import type { GetIngredients } from "../../interfaces/requests/ingredients";

export const getIngredients = createAsyncThunk(
  "ingredients/getAll",
  async (_, thunkAPI) => {
    try {
      const { data: response } = await api.get<GetIngredients>("/ingredients");
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Error");
    }
  }
);
