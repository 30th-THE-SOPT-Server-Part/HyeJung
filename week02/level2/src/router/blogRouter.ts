import express, { Router } from 'express';
import { selectPost, likePost } from '../api/blog';

const router: Router = express.Router();

router.get('/', selectPost);
router.get('/like', likePost);

export default router;
