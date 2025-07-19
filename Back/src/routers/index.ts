import { Router } from 'express';
import authRouter from './auth.ts';
import usersRouter from './users.ts';

const router = Router();

router.use('/api/auth', authRouter);
router.use('/api/users', usersRouter);

export default router;
