const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/assignmentariveguru')

const db = mongoose.connection

db.on('error',function(err){console.log(err.message)})

db.once('open',function(){
    console.log("Connected to the database Successfully")
})

module.exports = db