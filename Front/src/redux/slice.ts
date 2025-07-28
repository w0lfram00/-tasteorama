import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SliceState {
  count: number;
}

const initialState: SliceState = { count: 0 };

const slice = createSlice({
  name: "mainReducer",
  initialState,
  reducers: {
    resetCarsState: (state) => {
      state.count = 0;
    },
    setFilter: (state, action: PayloadAction<number>) => {},
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getRecipeById.fulfilled, (state, action) => {
  //
  //   });
  // },
});

export const mainReducer = slice.reducer;
export const {} = slice.actions;
