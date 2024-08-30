const Review = require('../models/reviewModel');
const Book = require('../models/bookModel');

// إضافة مراجعة جديدة
exports.addReview = async (req, res) => {
    const { book, rating, comment } = req.body;
    const user = req.user.id; // تأكد من أن توكن المستخدم يتم التحقق منه بشكل صحيح في `authMiddleware`

    try {
        // تحقق من وجود الكتاب
        const bookExists = await Book.findById(book);
        if (!bookExists) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const review = new Review({ book, user, rating, comment });
        await review.save();

        // إضافة معرف المراجعة إلى الكتاب المرتبط
        await Book.findByIdAndUpdate(book, { $push: { reviews: review._id } });

        res.status(201).json({ message: 'Review added', review });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// تحديث مراجعة موجودة
exports.updateReview = async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const user = req.user.id; // تأكد من أن توكن المستخدم يتم التحقق منه بشكل صحيح في `authMiddleware`

    try {
        const review = await Review.findOne({ _id: id, user });
        if (!review) {
            return res.status(404).json({ message: 'Review not found or unauthorized' });
        }

        review.rating = rating || review.rating;
        review.comment = comment || review.comment;
        await review.save();

        res.json({ message: 'Review updated', review });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// الحصول على مراجعة حسب ID
exports.getReviewById = async (req, res) => {
    const { id } = req.params;

    try {
        const review = await Review.findById(id).populate('user', 'username');
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// الحصول على جميع المراجعات لكتاب محدد
exports.getReviewsByBook = async (req, res) => {
    const { bookId } = req.params;

    try {
        const reviews = await Review.find({ book: bookId }).populate('user', 'username');
        if (!reviews.length) {
            return res.status(404).json({ message: 'No reviews found for this book' });
        }

        res.json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// حذف مراجعة موجودة
exports.deleteReview = async (req, res) => {
    const { id } = req.params;
    const user = req.user.id;

    try {
        // سجل المعرّف المستخدم والمراجعة
        console.log('User ID:', user);
        console.log('Review ID:', id);

        // البحث عن المراجعة التي تخص المستخدم
        const review = await Review.findOne({ _id: id, user });
        console.log('Review found:', review);

        if (!review) {
            return res.status(404).json({ message: 'Review not found or unauthorized' });
        }

        // حذف المراجعة
        await Review.findByIdAndDelete(id);
        res.json({ message: 'Review deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


