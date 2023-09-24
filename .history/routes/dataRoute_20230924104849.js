const express = require('express')
const {
    getByDate, getByWeek, getByMonth
} = require('../controller/dataController')
const router = express.Router()

router
  .route('/')
  .get([verifyUser], getCartProducts)
  .post([verifyUser], addProductInCart)

router.route('/:id').delete([verifyUser], deleteProductInCart)

module.exports = router