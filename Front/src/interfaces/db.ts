export interface Area {
  _id: string;
  name: string;
}

export interface Category {
  _id: string;
  name: string;
}

export interface Ingredient {
  _id: string;
  name: string;
}

export interface Recipe {
  _id: string;
  title: string;
  category: string;
  owner: string;
  area?: string | null;
  instructions: string;
  description: string;
  thumb: string;
  img?: string | null;
  time: number;
  ingredients: Array<{ id: string; measure: string }>;
}

export interface RecipeDetailed extends Omit<Recipe, "ingredients"> {
  ingredients: Array<{ id: Ingredient; measure: string }>;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  savedRecipes: Array<string>;
}

export interface UserDetailed {
  _id: string;
  name: string;
  email: string;
  savedRecipes: Array<Recipe>;
}

export interface Session {
  _id: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
  accessTokenValidUntil: Date;
  refreshTokenValidUntil: Date;
}
