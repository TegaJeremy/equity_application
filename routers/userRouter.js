const express = require('express')
const router = express.Router()
const{registration, login, logout,forgetPassword,changepassword} = require('../controllers/userController')

router.route("/Registration").post(registration)
router.route("/login").post(login)
router.route("/login").post(logout)
router.route("/forgotPassword").post(forgetPassword)
router.route("/changePassword/:token").post(changepassword)

module.exports =router