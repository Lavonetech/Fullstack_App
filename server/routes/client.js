const express = require('express');
const router = express.Router();
const { createProduct, getGeography } = require('../controllers/client');

router.post('/', createProduct);
router.get('/', getGeography);


module.exports = router;