// const express = require('express')
// const router = express.Router()
// const authController = require('../controller/authController')
// const captchaValidator = require('../middleware/captchaValidator')

// router.post('/register', captchaValidator, authController.register)
// router.post('/login', captchaValidator, authController.login)

// module.exports = router

import express from 'express'
import { register, login } from '../controller/authController.js'
import captchaValidator from '../middleware/captchaValidator.js'

const router = express.Router()

router.post('/register', captchaValidator, register)
router.post('/login', captchaValidator, login)

export default router
