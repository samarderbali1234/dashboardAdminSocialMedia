const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    UserName: {
        type: String,
        required: true
    },
    
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    PhoneNumber: {
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
  
});

UserSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

UserSchema.set('toJSON', {
    virtuals: true
});

module.exports = User = mongoose.model("users", UserSchema);
