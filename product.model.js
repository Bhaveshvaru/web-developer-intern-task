const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    avgSpeed: Number,
    total_travel_duration: Number,
    total_travel_distance: Number,
    safe_travel_distance: Number,
    safe_travel_duration: Number,
    moderate_travel_distance: Number,
    modedrate_travel_duration: Number,
    risky_travel_distance: Number,
    risky_travel_duration: Number,
    Date: Date
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Products", ProductSchema);
