const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    reservartionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },

  { timestamps: true }
);
const order = mongoose.model("order", orderSchema);
module.exports = order;
