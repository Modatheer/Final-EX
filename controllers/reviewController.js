const Review = require('../models/reviewModel');
const Book = require('../models/bookModel');

exports.addReview = async (req, res) => {
    const { bookId, content } = req.body;
    const userId = req.user.id;
    try {
        const review = new Review({ book: bookId, user: userId, content });
        await review.save();
        const book = await Book.findById(bookId);
        book.reviews.push(review._id);
        await book.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getReviewsByBook = async (req, res) => {
    const { bookId } = req.params;
    try {
        const reviews = await Review.find({ book: bookId }).populate('user', 'username');
        res.json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteReview = async (req, res) => {
    const { reviewId } = req.params;
    const userId = req.user.id;
    try {
        const review = await Review.findById(reviewId);
        if (!review || review.user.toString() !== userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        await review.remove();
        const book = await Book.findById(review.book);
        book.reviews.pull(reviewId);
        await book.save();
        res.json({ message: 'Review deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
