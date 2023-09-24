const express = require('express')
const {
    getByDate, getByWeek, getByMonth
} = require('../controller/dataController')
const router = express.Router()
router.route('records/:date').get(getByDate);
router.route('records/:date').get(getByDate);

module.exports = router