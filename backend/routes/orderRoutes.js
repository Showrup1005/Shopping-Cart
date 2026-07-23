const express = require('express')
const router = express.Router()
const {createOrder, getOrders, getOrder} = require('../controllers/orderControllers')
const {protect} = require('../middlewares/authMiddleware')

router.route('/').get(protect, getOrders).post(protect, createOrder)
router.route('/:id').get(protect, getOrder)

module.exports = router