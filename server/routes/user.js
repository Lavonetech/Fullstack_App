const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/client');
const {getUser} =require ('../controllers/client');

router.post('/', createUser);
router.get('/', getUser)

module.exports = router;