const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const notificationSchema = new mongoose.Schema({
   
    notif: {
            type:String, 
        required: true,
       
    },
    Vu: {
  type:String, 
    required: true,
    default:false
},
message: {
    type:String, 
      required: true,
     
  },
    
});

module.exports = mongoose.model("notification", notificationSchema);