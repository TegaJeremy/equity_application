const express = require('express')
const router = express.Router()
const{registration} = require('../controllers/userController')

router.route("/Registration").post(registration)

module.exports =router