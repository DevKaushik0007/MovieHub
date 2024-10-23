const Review = require('../models/Review');
const Movie = require('../models/Movie');
const User = require('../models/User');

// Get all reviews for a specific movie
exports.getReviewsByMovieId = async (req, res) => {
    try {
        const reviews = await Review.find({ movieId: req.params.id }).populate('userId', 'username');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Submit a new review
exports.createReview = async (req, res) => {
    const { reviewText, rating } = req.body;
    const userId = req.user.id; // Assuming you're using middleware to attach user info

    try {
        const newReview = new Review({
            movieId: req.params.id,
            userId,
            reviewText,
            rating
        });

        const savedReview = await newReview.save();

        // Add review reference to user's reviews array
        await User.findByIdAndUpdate(userId, { $push: { reviews: savedReview._id } });

        // Add review reference to the movie's reviews array
        await Movie.findByIdAndUpdate(req.params.id, { $push: { reviews: savedReview._id } });

        res.status(201).json(savedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user.id; // Assuming you're using middleware to attach user info

    try {
        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (review.userId.toString() !== userId && !req.user.isAdmin) {
            return res.status(403).json({ message: 'You are not authorized to delete this review' });
        }

        await Review.findByIdAndDelete(reviewId);

        // Remove review reference from user's reviews array
        await User.findByIdAndUpdate(userId, { $pull: { reviews: reviewId } });

        // Remove review reference from the movie's reviews array
        await Movie.findByIdAndUpdate(review.movieId, { $pull: { reviews: reviewId } });

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
