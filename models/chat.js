const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const chatSchema = new mongoose.Schema({
   
    message: {
            type:String, 
        required: true,
    },
  
    reciever: {
        type: Object,
        required: true
    },
    sender: {
        type: Object,
        required: true
    },
});

module.exports = mongoose.model("chat", chatSchema);