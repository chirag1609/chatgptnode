// models/chatHistoryModel.js
const mongoose = require("mongoose");

const chatHistorySchema = new mongoose.Schema({
  userInput: {
    type: String,
    required: true,
  },
  completionText: {
    type: String,
    required: true,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});

const ChatHistory = mongoose.model("ChatHistory", chatHistorySchema);

module.exports = ChatHistory;
