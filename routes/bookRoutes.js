const express = require('express');
const router = express.Router();
const { getBooks, getBookByISBN } = require('../controllers/bookController');

router.get('/', getBooks);
router.get('/:isbn', getBookByISBN);

// Add other routes as needed

module.exports = router;
