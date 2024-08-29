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

// Add this function
exports.getReviewById = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findById(id).populate('book').populate('user');
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
