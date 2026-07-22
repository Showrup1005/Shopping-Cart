const express = require('express')
const router = express.Router()
const {registerUser, login, getMe} = require('../controllers/userControllers')
const {protect} = require('../middlewares/authMiddleware')


router.post('/', registerUser)
router.post('/login', login)
router.get('/me', protect, getMe)

module.exports = router