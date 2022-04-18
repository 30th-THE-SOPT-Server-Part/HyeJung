import express, { Router } from "express";

import userRouter from './userRouter';
import blogRouter from './blogRouter';
import authRouter from './authRouter';

const router: Router = express.Router();

router.use('/user', userRouter);
router.use('/blog', blogRouter);
router.use('/auth', authRouter);

export default router;
