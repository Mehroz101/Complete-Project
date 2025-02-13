const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const userSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: String,
    //   default: uuidv4, // Automatically generate a unique UUID
    //   unique: true,
    //   immutable: true,
    // }, // Once set, userId cannot be changed
    email: {
      type: String,
      unique: true,
      required: true,
    },
        userID:{ type: Number, required: true, unique: true },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    fName: {
      type: String,
    },
    lName: {
      type: String,
    },
    phone: {
      type: String,
      trim: true,
    },

    isAccessToList: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    // userStatus: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
// const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");

// const userSchema = new mongoose.Schema({
//   userId: {
//     type: String,
//     default: uuidv4, // Automatically generate a unique UUID
//     unique: true,
//     immutable: true, // Once set, userId cannot be changed
//   },
//   name: {
//     type: String,
//     // required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true,
//   },
//   phone: {
//     type: String,
//     // required: true,
//     trim: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     enum: ["user", "admin", "owner"],
//     default: "user",
//   },
//   isAccessToList: {
//     type: Boolean,
//     default: false,
//   },
//   created_at: {
//     type: Date,
//     default: Date.now,
//   },
//   updated_at: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Pre-save middleware to update the updated_at field before saving the document
// userSchema.pre("save", function (next) {
//   this.updated_at = Date.now();
//   next();
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;
