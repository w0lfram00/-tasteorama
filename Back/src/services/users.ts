import type { Types } from 'mongoose';
import { UsersCollection } from '../db/models/users.ts';
import type { User } from '../interfaces/db.ts';

export const getUserInfoById = async (userId: string) => {
  const user = await UsersCollection.findById(userId);
  return user;
};
