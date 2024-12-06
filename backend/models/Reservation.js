const mongoose = require("mongoose");
const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    spaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
      required: true,
    },
    reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      default:null,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    vehicleNo: {
      type: String,
      required: true,
    },
    arrivalTime: {
      type: String,
      required: true,
    },
    leaveTime: {
      type: String,
      required: true,
    },
    arrivalDate: {
      type: String,
      required: true,
    },
    leaveDate: {
      type: String,
      required: true,
    },
    totalPrice:{
      type:String,
      required:true
    },
    isCustom:{
      type:Boolean,
      default:false
    },
    state: {
      type: String,
      default: "pending",
    },
    withdrawn:{
      type:Boolean,
      default:false
    },

  },
  {
    timestamps: true,
  }
);
const reservation = mongoose.model("reservation", reservationSchema);
module.exports = reservation;
