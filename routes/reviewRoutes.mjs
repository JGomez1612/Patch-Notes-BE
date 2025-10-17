import { Router } from "express";
import reviewCTRL from "../controllers/reviewController.mjs";

const router = Router();

router
    .route('/')
    .post(reviewCTRL.createReview) // Create Review
    .get(reviewCTRL.getAllReviews); // Get All reviews

router
    .route("/:id")
    .get(reviewCTRL.getOneReview) // Get One review by id
    .put(reviewCTRL.updateReview) // Update review by id
    .delete(reviewCTRL.deleteReview); // Delete Review by id

export default router
