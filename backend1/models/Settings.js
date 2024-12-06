const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  siteName: { type: String, required: true, default: "Smart Parking" },
  reviewsToShow: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

const Settings = mongoose.model("settings", settingsSchema);
module.exports = Settings;
