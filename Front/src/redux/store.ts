import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { recipesReducer, type RecipesSliceState } from "./recipes/slice";
import {
  categoriesReducer,
  type CategoriesSliceState,
} from "./categories/slice";
import {
  ingredientsReducer,
  type IngredientsSliceState,
} from "./ingredients/slice";

// const persistConfig = {
//   key: "main",
//   storage,
//   whitelist: [""],
// };

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    categories: categoriesReducer,
    ingredients: ingredientsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type StoreState = {
  recipes: RecipesSliceState;
  categories: CategoriesSliceState;
  ingredients: IngredientsSliceState;
};

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
export const persistor = persistStore(store);
