import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../recipes/operations";
import type { GetIngredients } from "../../interfaces/requests/ingredients";
import axios from "axios";

export const getIngredients = createAsyncThunk(
  "ingredients/getAll",
  async (_, thunkAPI) => {
    try {
      const { data: response } = await api.get<GetIngredients>("/ingredients");
      return response.data;
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
