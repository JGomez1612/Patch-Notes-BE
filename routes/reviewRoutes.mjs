import express from 'express';
import review from '../models/reviewSchema.mjs';

const router = express.Router();

// Create
router
    .route('/')
    .post(async (req, res) => {

        try {
            let newReview = await review.create(req.body);

            res.json(newReview);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: `Error - ${err.message}` })
        }

    })

    // Read
    .get(async (req, res) => {
        try {
            let allReviews = await review.find({}).populate('userId', 'username')

            res.json(allReviews);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: `Error - ${err.message}` });
        }
    });

// Update
router
    .route("/:id")
    .put(
        async (req, res) => {
            try {
                let updatedReview = await review.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true }
                );

                res.json(updatedReview);
            } catch (err) {
                console.error(err);
                res.status(500).json({ msg: `Error - ${err.message}` });
            }
        })
    // Delete
    .delete(async (req, res) => {
        try {
            let deleteReview = await review.findByIdAndDelete(
                req.params.id
            );

            res.json(deleteReview)
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: `Error - ${err.message}` });
        }
    });

export default router
