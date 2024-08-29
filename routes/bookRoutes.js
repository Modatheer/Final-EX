const express = require('express');
const router = express.Router();
const { getBooks, getBookByISBN, getBooksByAuthor, getBooksByTitle } = require('../controllers/bookController');

router.get('/', getBooks);
router.get('/:isbn', getBookByISBN);
router.get('/author/:author', getBooksByAuthor);
router.get('/title/:title', getBooksByTitle);

module.exports = router;
