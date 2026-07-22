const express = require('express')
const router = express.Router()
const {getProduct, setProduct} = require('../controllers/productControllers')

router.route('/').get(getProduct).post(setProduct)

module.exports = router