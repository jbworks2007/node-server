const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: [true, "price must be provided"] },
  featured: { type: Boolean, default: false },
  rating: { type: Number, default: 2.5 },
  createAt: { type: Date, default: Date.now() },
  company: {
    type: String,
    enum: {
      values: ["apple", "samsung", "oneplus", "xiomi", "motorola"],
      message: `{VALUE} is not Supported`,
    },
  },
});

module.exports = mongoose.model("Product", productSchema);
