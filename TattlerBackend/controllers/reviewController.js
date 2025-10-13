import Review from '../models/Review.js';
import Restaurant from '../models/Restaurant.js';

// @desc    Create a new review for a restaurant
// @route   POST /api/reviews
export const createReview = async (req, res) => {
    try {
        const { rating, comment, authorId, restaurantId } = req.body;

        // 1. Find the restaurant to add the review to
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        
        // 2. Create the new review document
        const review = new Review({
            rating,
            comment,
            author: authorId,
            restaurant: restaurantId,
        });
        const createdReview = await review.save();

        // 3. Add the new review's ID to the restaurant's reviews array
        restaurant.reviews.push(createdReview._id);
        await restaurant.save();

        res.status(201).json({ message: 'Review added!', review: createdReview });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        
        // 1. Remove the review's ID from its associated restaurant
        await Restaurant.findByIdAndUpdate(review.restaurant, {
            $pull: { reviews: review._id }
        });
        
        // 2. Delete the review document itself
        await review.deleteOne();
        
        res.status(200).json({ message: 'Review removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};S