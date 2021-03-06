// Importing module
const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;

// Create Schema Instance for Product and add properties
const productSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    size: { type: String },
    color: { type: String },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    description: { type: String },
    image_url: { type: String },
}, { timestamps: true }, { collection: "products" });

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", productSchema);