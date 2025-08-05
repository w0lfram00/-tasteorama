import { Schema, Types } from 'mongoose';

export interface Area {
  _id: Types.ObjectId;
  name: string;
}

export interface Category {
  _id: Types.ObjectId;
  name: string;
}

export interface Ingredient {
  _id: Types.ObjectId;
  name: string;
}

export interface Recipe {
  _id: Types.ObjectId;
  title: string;
  category: string;
  owner: Types.ObjectId;
  area?: string | null;
  instructions: string;
  description: string;
  thumb: string;
  img?: string | null;
  time: string;
  ingredients: Array<{ id: Types.ObjectId; measure: string }>;
}

export interface RecipePopulated extends Omit<Recipe, 'ingredients'> {
  ingredients: Array<{ id: Ingredient; measure: string }>;
}

export interface User {
  _id: Types.ObjectId;
  name: string;
  email: string;
  savedRecipes: Array<Types.ObjectId>;
}

export interface UserPopulated {
  _id: Types.ObjectId;
  name: string;
  email: string;
  savedRecipes: Array<Recipe>;
}

export interface Session {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  accessToken: string;
  refreshToken: string;
  accessTokenValidUntil: Date;
  refreshTokenValidUntil: Date;
}
