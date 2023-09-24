const express = require('express')
const {
    getByDate, getByWeek, getByMonth
} = require('../controller/dataController')
const router = express.Router()
router.route('records/:date').get
router.route('/:id').delete([verifyUser], deleteProductInCart)

module.exports = router