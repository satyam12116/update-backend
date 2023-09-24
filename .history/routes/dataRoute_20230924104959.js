const express = require('express')
const {
    getByDate, getByWeek, getByMonth
} = require('../controller/dataController')
const router = express.Router()
router.route('records/:date')
router.route('/:id').delete([verifyUser], deleteProductInCart)

module.exports = router