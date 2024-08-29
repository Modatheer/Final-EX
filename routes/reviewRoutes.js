const express = require('express');
const router = express.Router();
const { addReview, getReviewsByBook, deleteReview } = require('../controllers/reviewController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/', authenticate, addReview);
router.get('/:bookId', getReviewsByBook);
router.delete('/:reviewId', authenticate, deleteReview);

module.exports = router;
