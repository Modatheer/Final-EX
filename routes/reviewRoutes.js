const express = require('express');
const router = express.Router();
const { addReview, getReviewById } = require('../controllers/reviewController');
const { authenticate } = require('../middleware/authMiddleware');

// Route for adding a review
router.post('/', authenticate, addReview);

// Route for getting a review by ID
router.get('/:id', getReviewById);

module.exports = router;
