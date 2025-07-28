import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Recipe } from "../interfaces/db";

const api = axios.create({ baseURL: "https://car-rental-api.goit.global" });

export const getRecipeById = createAsyncThunk(
  "main/getRecipeById",
  async (id: string, thunkAPI) => {
    try {
      const response = await api.get<Recipe>("/");
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Error");
    }
  }
);
