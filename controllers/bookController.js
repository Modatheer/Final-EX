const Book = require('../models/bookModel');

// الحصول على جميع الكتب باستخدام async/await
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// الحصول على كتاب بواسطة ISBN
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

// إضافة كتاب جديد
exports.addBook = async (req, res) => {
    const { title, author, isbn } = req.body;
    try {
        const newBook = new Book({ title, author, isbn });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// الحصول على كتب بواسطة المؤلف
exports.getBooksByAuthor = async (req, res) => {
    const { author } = req.params;
    try {
        const books = await Book.find({ author });
        if (books.length === 0) return res.status(404).json({ message: 'No books found by this author' });
        res.json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// الحصول على كتب بواسطة العنوان
exports.getBooksByTitle = async (req, res) => {
    const { title } = req.params;
    try {
        const books = await Book.find({ title: { $regex: title, $options: 'i' } });
        if (!books.length) return res.status(404).json({ message: 'No books found with this title' });
        res.json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// الحصول على الكتب باستخدام callback
exports.getBooksWithCallback = async (req, res) => {
    try {
        const books = await Book.find().exec();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBookByISBNWithPromise = (req, res) => {
    const { isbn } = req.params;
    Book.findOne({ isbn }).exec()
        .then(book => {
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.json(book);
        })
        .catch(error => {
            res.status(400).json({ error: error.message });
        });
};

exports.getBooksByAuthorWithPromises = (req, res) => {
    const { author } = req.params;

    Book.find({ author })
        .then(books => {
            if (books.length === 0) {
                return res.status(404).json({ message: 'No books found by this author' });
            }
            res.json(books);
        })
        .catch(error => {
            res.status(400).json({ error: error.message });
        });
};

exports.getBooksByTitleWithPromises = (req, res) => {
    const { title } = req.params;

    Book.find({ title: { $regex: title, $options: 'i' } })
        .then(books => {
            if (books.length === 0) {
                return res.status(404).json({ message: 'No books found with this title' });
            }
            res.json(books);
        })
        .catch(error => {
            res.status(400).json({ error: error.message });
        });
};
