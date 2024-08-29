const Book = require('../models/bookModel');

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getBookByISBN = async (req, res) => {
    const { isbn } = req.params;
    try {
        const book = await Book.findOne({ isbn });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Implement other methods as needed
