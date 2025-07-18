import type { Schema, Types } from 'mongoose';

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface RefreshUser {
  sessionId: Types.ObjectId;
  refreshToken: string;
}
