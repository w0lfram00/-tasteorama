import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../recipes/operations";
import type { GetIngredients } from "../../interfaces/requests/ingredients";
import axios from "axios";
import errorHandling from "../../utils/errorHandling";

export const getIngredients = createAsyncThunk(
  "ingredients/getAll",
  async (_, thunkAPI) => {
    try {
      const { data: response } = await api.get<GetIngredients>("/ingredients");
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) return errorHandling(e, thunkAPI);
      return thunkAPI.rejectWithValue({
        status: 500,
        message: "Unexpected Error",
      });
    }
  }
);
