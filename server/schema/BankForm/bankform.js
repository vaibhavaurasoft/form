

const mongoose = require("mongoose");

const BankFormSchema = new mongoose.Schema({
  bankId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Banks",
  },
  steps: [
    {
      stepNumber: {
        type: String,
        required: true,
      },
      fileds: [
        {
          type: {
            type: String,
          },
          label: {
            type: String,
          },
          options: [String],
        },
      ],
    },
  ],
});

const BankForm = mongoose.model("BankForm", BankFormSchema);

module.exports = BankForm;
