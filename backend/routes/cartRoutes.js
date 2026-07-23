const express = require('express')
const router = express.Router()
const {getCarts, addToCart, updateCart} = require('../controllers/cartControllers')
const {protect} = require('../middlewares/authMiddleware')

router.route('/').get(protect, getCarts).post(protect, addToCart)
router.route('/').put(protect, updateCart)

module.exports = router