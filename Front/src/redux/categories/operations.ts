import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../recipes/operations";
import type { GetCategories } from "../../interfaces/requests/categories";
import axios from "axios";
import errorHandling from "../../utils/errorHandling";

export const getCategories = createAsyncThunk(
  "categories/getAll",
  async (_, thunkAPI) => {
    try {
      const { data: response } = await api.get<GetCategories>("/categories");
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
