import type { Types } from 'mongoose';
import { UsersCollection } from '../db/models/users.ts';
import type { Recipe, User, UserPopulated } from '../interfaces/db.ts';

export const getUserInfoById = async (
  userId: string,
): Promise<UserPopulated | null> => {
  const user = await UsersCollection.findById(userId)
    .populate<{ savedRecipes: Recipe[] }>('recipes')
    .exec();
  return user;
};
