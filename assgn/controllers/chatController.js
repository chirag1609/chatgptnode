
const ChatHistory = require("../models/chatHistoryModel");
//const User = require('../models/user');
const User = require("../models/user")
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


// exports.getIndex = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id)
//     if(user){
//     const chatHistory = await ChatHistory.find();
//     res.render("index", { history: chatHistory });
//   }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("An error occurred");
//   }
// };

exports.getIndex = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'chatHistory',
      options: { sort: { createdAt: 1 } }, 
    });
    const chatHistory = user.chatHistory
    res.render('index', { history: chatHistory });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred');
  }
};


// exports.getIndex = async (req, res) => {
//   try {
//     // Get the current user ID from the session or request
//     const userId = req.session.userId; // Adjust this based on your authentication method

//     // Find the user in the database
//     const user = await User.findById(userId).populate("chatHistory");

//     // Check if user exists and has chat history
//     const chatHistory = user && user.chatHistory ? user.chatHistory : [];

//     res.render("index", { history: chatHistory });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("An error occurred");
//   }
// };
// exports.getIndex = async (req, res) => {
//   try {
//     // Get the current user from req.user
//     const user = req.user;
//     console.log(user)

//     // Check if user is authenticated
//     if (!user) {
//       return res.render("index", { history: [] });
//     }

//     // Find the user in the database and populate the chat history
//     const populatedUser = await User.findById(user._id).populate("chatHistory");

//     // Extract the chat history for the current user
//     const chatHistory = populatedUser ? populatedUser.chatHistory : [];

//     res.render("index", { history: chatHistory });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("An error occurred");
//   }
// };





exports.postMessage = async (req, res) => {
  const user_input = req.body.user_input;

  try {
    const messages = [];

    // Retrieve chat history from the database
    const user = await User.findById(req.user._id)
    console.log(user)
    if(user){
    const chatHistory = await ChatHistory.find();
    for (const { userInput, completionText } of chatHistory) {
      messages.push({ role: "user", content: userInput });
      messages.push({ role: "assistant", content: completionText });
    }

    messages.push({ role: "user", content: user_input });
    messages.push({ role: "assistant", content: "typing" });
    
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const completion_text = completion.data.choices[0].message.content;

    // Save chat history to the database
    const newChat = await ChatHistory.create({
      userInput: user_input,
      completionText: completion_text,
      user:req.user._id
    });
    user.chatHistory.push(newChat)
    user.save()
  }
    // await newChat.save();
  
      // Associate chat history with the user
      // const user = await User.findOne({}); // Find the appropriate user based on your logic
      // user.chatHistory.push(newChat._id);
      // await user.save();

      // await ChatHistory.findOneAndUpdate(
      //   { _id: newChat._id },
      //   { completionText: completion_text }
      // );

    res.redirect("/chatbots");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};


exports.clearChat = async (req, res) => {
  try {
    // Clear the chat history from the database
    const user = await User.findById(req.user._id)
    if(user){
      user.chatHistory = [];
      await user.save();

    res.redirect("/chatbots");
  }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};

