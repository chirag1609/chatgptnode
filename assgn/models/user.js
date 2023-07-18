const mongoose = require('mongoose')
const chatHistoryModel = require('../models/chatHistoryModel')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    chatHistory: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'ChatHistory',
        },
      ],
},{
    timestamps: true
})

const User = mongoose.model('User',userSchema)
module.exports = User


