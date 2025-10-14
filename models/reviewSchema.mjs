import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        gameId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 10,
        },
    },
    { timestamps: true }
)

export default mongoose.model("Review", reviewSchema);