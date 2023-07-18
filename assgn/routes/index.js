const express = require('express')
const HomeController = require('../controllers/homecontroller')
const passport = require('passport')

const router = express.Router()
router.get('/',HomeController.home)
router.use('/users', require('./users'))
router.use('/chatbots', require('./chatbots'))

module.exports = router

// routes/index.js

// const express = require("express");
// const router = express.Router();
// const chatController = require("../controllers/chatController");

// router.get("/", chatController.getIndex);
// router.post("/", chatController.postMessage);

// module.exports = router;
