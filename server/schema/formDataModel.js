const mongoose = require("mongoose");

const SaveData = new mongoose.Schema({
  bankName: {
    type: String,
    required: true,
  },
  formData: {
    type: Object,
    required: true,
  },
});

const InputData = mongoose.model("FormData", SaveData);

module.exports = InputData;

  