const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const storySchema = new mongoose.Schema({
   
    photo: {
        data: Buffer,
        contentType: String
    
    },
    views: [{type: ObjectId, ref: "User"}],
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    expire_at: {type: Date, default: Date.now, expires: 20} //pour effacer la story aprés 20 sec
});

module.exports = mongoose.model("Story", storySchema);