const express = require('express');
const router = express.Router();
const { addReview, getReviewById, updateReview, getReviewsByBook, deleteReview } = require('../controllers/reviewController');
const { authenticate } = require('../middleware/authMiddleware');

// Route for adding a review
router.post('/', authenticate, addReview);

// Route for getting a review by ID
router.get('/:id', getReviewById);

// Route for getting reviews by book ID
router.get('/book/:bookId', getReviewsByBook);

// Route for updating a review
router.put('/:id', authenticate, updateReview);

// Route for deleting a review
router.delete('/:id', authenticate, deleteReview);

module.exports = router;
