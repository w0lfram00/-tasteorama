import { AnyArray, Schema } from 'mongoose';

export interface Area {
  _id: Schema.Types.ObjectId;
  name: string;
}

export interface Category {
  _id: Schema.Types.ObjectId;
  name: string;
}

export interface ingredients {
  _id: Schema.Types.ObjectId;
  name: string;
  desc: string;
  img: string;
}

export interface Recipe {
  _id: Schema.Types.ObjectId;
  title: string;
  category: string;
  owner: Schema.Types.ObjectId;
  area: string;
  instructions: string;
  description: string;
  thumb: string;
  time: string;
  ingredients: Array<{ id: Schema.Types.ObjectId; measure: string }>;
}

export interface User {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  savedRecipes: Array<Recipe>;
}

export interface Session {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  accessToken: string;
  refreshToken: string;
  accessTokenValidUntil: Date;
  refreshTokenValidUntil: Date;
}
