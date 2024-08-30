const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// المسارات الموجودة
router.get('/', bookController.getBooks);
router.get('/isbn/:isbn', bookController.getBookByISBN);
router.get('/author/:author', bookController.getBooksByAuthor);
router.get('/promise/isbn/:isbn', bookController.getBookByISBNWithPromise);
router.get('/author/:author/promises', bookController.getBooksByAuthorWithPromises);
router.get('/title/:title/promises', bookController.getBooksByTitleWithPromises);
router.get('/title/:title', bookController.getBooksByTitle);
router.post('/', bookController.addBook);

// مسار جديد لاختبار استخدام async/await
router.get('/callback', bookController.getBooksWithCallback);

module.exports = router;
