const express = require('express');
const router = express.Router();
const {createTransaction} = require('../controllers/transaction');
const {getTransaction} = require('../controllers/transaction');

router.post('/', createTransaction);
router.get('/', getTransaction);


module.exports = router;