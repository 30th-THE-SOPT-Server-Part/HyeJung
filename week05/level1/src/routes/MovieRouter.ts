import { body } from "express-validator";
import { Router } from "express";
import { MovieController } from "../controllers";
import auth from "../middleware/auth";

const router: Router = Router();

router.post("/", [
    body('title').notEmpty(),
    body('director').notEmpty()
], MovieController.createMovie);
router.post("/:movieId/comment", [
    body('writer').notEmpty(),
    body('comment').notEmpty()
], MovieController.createMovieComment);
router.get("/:movieId", MovieController.getMovie);
router.get("/:movieId/comments/;commentId", [
    body('comment').notEmpty()
], auth, MovieController.getMovie);

export default router;