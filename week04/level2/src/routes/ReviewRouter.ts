import { Router } from "express";
import ReviewController from "../controllers/ReviewController";
import { body } from "express-validator/check"

const router: Router = Router();

router.post("/movie/:movieId", [
    body('title').notEmpty(),
    body('content').notEmpty(),
    body('writer').notEmpty(),
], ReviewController.createReview);
router.get("/movie/:movieId", ReviewController.getReviews);

export default router;