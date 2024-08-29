const express = require('express');
const router=express.Router();
const {createStat, getOverallStat}=require('../controllers/sales')

router.post('/',createStat)
router.get('/', getOverallStat)

module.exports=router