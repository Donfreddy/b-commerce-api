// Importing module
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create Schema Instance for Category and add properties
const categorySchema = new Schema(
  {
    name: { type: String },
    image_url: { type: String },
  },
  { collection: "categories" }
);

module.exports = mongoose.model("Category", categorySchema);
