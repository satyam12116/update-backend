const express = require('express')
const { getByDate, getByWeek, getByMonth} = require('../controller/dataController')

const router = express.Router()
router.route('/records/:date').get(getByDate);
router.route('/records/of/last-week').get(getByWeek);
router.route('/records/of/last-month').get(getByMonth);

module.exports = router