const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    cName: {
      type: String,
      required: true,
    },
    
   
   
  },

);

const categoryModel = mongoose.model("categories", categorySchema);
module.exports = categoryModel;
