//router index file
import { Router } from 'express';
import FileRouter from "./FileRouter";
import MovieRouter from "./MovieRouter";
import ReviewRouter from "./ReviewRouter";
import UserRouter from "./UserRouter";

const router = Router();

router.use('/user', UserRouter);
router.use('/review', ReviewRouter);
router.use('/movie', MovieRouter);
router.use('/file', FileRouter);

export default router;