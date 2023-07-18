// const express = require('express');
// const router = express.Router();

// const chatController = require('../controllers/chatController')

// router.get('/', (req, res) => {
//   res.render('chatview', {
//      chatHistory: [] 
//     });
// });

// router.post('/chat', chatController.chatBot);

// module.exports = router;

const express = require("express");
const passport = require('passport')
const router = express.Router();
const chatController = require("../controllers/chatController");

router.get("/", passport.checkAuthentication,chatController.getIndex);
router.post("/",passport.checkAuthentication, chatController.postMessage);
router.post("/clear",passport.checkAuthentication, chatController.clearChat);

module.exports = router;