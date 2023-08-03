const mongoose = require("mongoose");
const BankSchema = new mongoose.Schema({
    bankname: {
        type: String,
        // required: true,
      },
    location: {
      type: String,
      // required: true,
    },
  });
  
  const BankModel = mongoose.model("Banks", BankSchema);
  
  module.exports = BankModel;