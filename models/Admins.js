const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: "please enter your password"
    },
    password: {
        type: String,
        required: true
    },
    
});

AdminSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

AdminSchema.set('toJSON', {
    virtuals: true
});

module.exports = Admin = mongoose.model("admins", AdminSchema);
