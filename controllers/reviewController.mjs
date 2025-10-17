import Review from '../models/reviewSchema.mjs';

const createReview = async (req, res) => {
    try {
        const newReview = await Review.create(req.body);

        res.json(newReview);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: `Error - ${err.message}` });
    }
};

const getAllReviews = async (req, res) => {
    try {
        const allReviews = await Review
            .find({})
            .populate("userId", "username")

        return res.json(allReviews)
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: `Error - ${err.message}` });
    }
};

const getOneReview = async (req, res) => {
    try {
        const oneReview = await Review
            .findById(req.params.id)
            .populate("userId", "username");

        if (!oneReview) return res.status(404).json({ errors: [{ msg: "Review not found" }] });

        return res.json(oneReview);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: `Error - ${err.message}` });
    }
};

const updateReview = async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedReview) return res.status(404).json({ errors: [{ msg: "Review not found" }] });

        res.json(updatedReview);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: `Error - ${err.message}` });
    }
};

const deleteReview = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);

        if (!deletedReview) return res.status(404).json({ errors: [{ msg: "Review not found" }] });

        return res.json(deletedReview)
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: `Error - ${err.message}` });
    }
}

export default { createReview, getAllReviews, getOneReview, updateReview, deleteReview }