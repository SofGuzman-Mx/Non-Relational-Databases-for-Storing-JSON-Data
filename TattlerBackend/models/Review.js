// A user writes a review for a specific restaurant. This model links the User and Restaurant models together

import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
    comment: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    // Reference to the user who wrote the review
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', // This 'User' must match the User model name
        required: true
    },
    // Reference to the restaurant this review is for
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant', // This 'Restaurant' must match the Restaurant model name
        required: true
    }
}, {
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;