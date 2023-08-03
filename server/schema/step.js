// step.js
const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema({
  stepname: {
    type: String,
  },
});

const Step = mongoose.model("step", stepSchema);

module.exports = Step;
