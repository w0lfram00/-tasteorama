import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/sessions.ts';
import { UsersCollection } from '../db/models/users.ts';
import type { NextFunction, Response, Request } from 'express';
import type { RequestWithUser } from '../interfaces/AuthRequest.ts';
import type { Recipe } from '../interfaces/db.ts';

export const authenticate = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }

  const session = await SessionsCollection.findOne({ accessToken: token });

  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired) {
    next(createHttpError(401, 'Access token expired'));
  }

  const user = await UsersCollection.findById(session.userId)
    .populate<{ savedRecipes: Array<Recipe> }>('recipes')
    .exec();
  if (!user) {
    next(createHttpError(401, 'Wrong user to session relation'));
    return;
  }
  req.user = user;
  next();
};
