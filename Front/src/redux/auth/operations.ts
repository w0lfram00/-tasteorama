import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../recipes/operations";
import axios from "axios";
import type { LoginUser, RegisterUser } from "../../interfaces/requests/auth";
import type { User, UserDetailed } from "../../interfaces/db";
import type { Request } from "../../interfaces/requests/request";
import errorHandling from "../../utils/errorHandling";

export const setAuthHeader = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload: RegisterUser, thunkAPI) => {
    try {
      const { data: response } = await api.post<Request<User>>(
        "/auth/register",
        payload
      );
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

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: LoginUser, thunkAPI) => {
    try {
      const { data: response } = await api.post<Request<string>>(
        "/auth/login",
        payload
      );
      setAuthHeader(response.data);
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

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const { data: response } = await api.post<Request<string>>(
        "/auth/refresh"
      );
      setAuthHeader(response.data);
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

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await api.post("/auth/logout");
      setAuthHeader("");
    } catch (e) {
      if (axios.isAxiosError(e)) return errorHandling(e, thunkAPI);
      return thunkAPI.rejectWithValue({
        status: 500,
        message: "Unexpected Error",
      });
    }
  }
);

export const getCurUserInfo = createAsyncThunk(
  "user/getInfo",
  async (userId: string, thunkAPI) => {
    try {
      const { data: response } = await api.get<Request<UserDetailed>>(
        "/users/" + userId
      );
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
