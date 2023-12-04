const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/getProduct');

router.get('/',getProducts);

module.exports = router;