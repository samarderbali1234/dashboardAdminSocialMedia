const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: {
        type: String,
    
        required:  true,
       
    },
    place: {
        type: String,
    
        required:  true,
       
    },
    
    description: {
        type: String,
        
        required:  true,
       
    },
    starttime: {
        type: String,
        
     
       
    },
    endtime: {
        type: String,
        
     
       
    },
    date: {
        type: String,
    
        required:  true,
       

    },
    Valide: {//pour que la poste est valide
        type: String,
        default:false,//valeur par défaut
        required: true,
      },
      photo: {
        data: Buffer,
        contentType: String,
      
    },
    Isprivate: {//pour que la poste est valide
        type: Boolean,
      
        required: true,
      },
      created: {
        type: Date,
        default: Date.now
    },
    
});


EventSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

EventSchema.set('toJSON', {
    virtuals: true
});

module.exports = events = mongoose.model("events", EventSchema);