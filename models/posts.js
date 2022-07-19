const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
  
    
    
  body: {
    type: String,
    required: true
},
photo: {
  data: Buffer,
  contentType: String
},
  created: {
    type: Date,
    default: Date.now
},
  } 
    
);

module.exports = mongoose.model('post', PostSchema);