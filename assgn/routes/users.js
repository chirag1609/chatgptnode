const express = require('express')

const router = express.Router()
const passport = require('passport')

const UserController = require('../controllers/usercontroller')

router.get('/sign-up',UserController.signUp)
router.get('/sign-in',UserController.signIn)
router.post('/create',UserController.create)
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/users/sign-in'}),UserController.createSession)
router.get('/sign-out',UserController.signOut)
router.get('/profile/:id',UserController.profile)
router.post('/update/:id',UserController.update)

module.exports = router