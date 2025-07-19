import type { Request } from 'express';
import type { User } from './db.ts';

export interface RequestWithUser extends Request {
  user: User;
}

export interface RequestMulter extends RequestWithUser {
  file: any;
}
