import { Router } from "express";
import ReviewController from "../controllers/ReviewController";
import { body } from "express-validator/check";
import auth from "../middleware/auth";

const router: Router = Router();

router.post("/movie/:movieId", [
    body('title').notEmpty(),
    body('content').notEmpty(),
    body('writer').notEmpty(),
], ReviewController.createReview);
router.get("/movie/:movieId", auth, ReviewController.getReviews); //auth 거치고 검증 후 reviewController로

export default router;