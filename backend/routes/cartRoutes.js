const express = require('express')
const router = express.Router()
const {getCarts, addToCart, updateCart, deleteCart} = require('../controllers/cartControllers')
const {protect} = require('../middlewares/authMiddleware')

router.route('/').get(protect, getCarts).post(protect, addToCart)
router.route('/').put(protect, updateCart)
router.route('/:id').delete(protect, deleteCart)

module.exports = router