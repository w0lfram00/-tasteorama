import type { Request, Response } from 'express';
import { getUserInfoById } from '../services/users.ts';
import createHttpError from 'http-errors';

export const getUserInfoByIdController = async (
  req: Request,
  res: Response,
) => {
  const userId = req.params.userId as string;
  const user = await getUserInfoById(userId);
  if (!user) throw createHttpError(404, 'User not found');

  res.json({
    status: 200,
    message: `Successfully found user with id ${userId}!`,
    data: user,
  });
};
