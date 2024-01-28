const express = require('express')
const router = express.Router()
const{registration, login} = require('../controllers/userController')

router.route("/Registration").post(registration)
router.route("/login").post(login)

module.exports =router