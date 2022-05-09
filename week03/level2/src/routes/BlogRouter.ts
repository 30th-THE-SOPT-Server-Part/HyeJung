import express, { Router } from "express";
import { BlogController } from "../controllers";
const router: Router = express.Router();

router.post('/', BlogController.createPost);
router.put('/:postId', BlogController.updatePost);
router.get('/:postId', BlogController.findPostById);
router.delete('/:postId', BlogController.deletePost);

export default router;
