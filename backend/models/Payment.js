const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accountType: {
      type: String,
      required: true,
    },
    accountName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: Number,
      required: true,
    },
    withdrawAmount: {
      type: String,
      required: true,
    },
    status:{
      type:String,
      default:"pending"
    }
  },
  {
    timestamps: true,
  }
);
const payment = mongoose.model("payment", paymentSchema);
module.exports = payment;
