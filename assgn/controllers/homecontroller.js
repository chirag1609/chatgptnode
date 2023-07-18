const ChatHistory = require("../models/chatHistoryModel");
const User = require('../models/user');

module.exports.home = async function(req,res){
 
    return res.render('home', {
        title: 'Home-Page'
    })
}