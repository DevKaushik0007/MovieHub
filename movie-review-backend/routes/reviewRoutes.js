const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Get all reviews for a specific movie
router.get('/movies/:id/reviews', reviewController.getReviewsByMovieId);

// Submit a new review
router.post('/movies/:id/reviews', verifyToken, reviewController.createReview);

// Delete a review
router.delete('/reviews/:id', verifyToken, reviewController.deleteReview);

module.exports = router;
