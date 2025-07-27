import type { Request, Response } from 'express';
import { getUserInfoById } from '../services/users.ts';
import createHttpError from 'http-errors';
import type { RequestWithUser } from '../interfaces/AuthRequest.ts';
import { toObjId } from '../utils/toObjId.ts';

export const getUserInfoByIdController = async (
  req: RequestWithUser,
  res: Response,
) => {
  const userId = toObjId(req.params.userId);

  if (userId?.toString() != req.user._id.toString())
    throw createHttpError(401, 'Access denied');
  const user = await getUserInfoById(userId);
  if (!user) throw createHttpError(404, 'User not found');

  res.json({
    status: 200,
    message: `Successfully found user with id ${userId}!`,
    data: user,
  });
};
