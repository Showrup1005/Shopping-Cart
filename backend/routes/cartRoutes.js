const express = require('express')
const router = express.Router()
const {getCarts, addToCart} = require('../controllers/cartControllers')
const {protect} = require('../middlewares/authMiddleware')

router.route('/').get(protect, getCarts).post(protect, addToCart)

module.exports = router