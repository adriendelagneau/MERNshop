const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    imgS: { type: String, required: true },
    imgL: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    oldPrice: { type: Number},
    inStock : {type: Boolean, default: true},
    numReviews: { type: Number, default: 0},
    reviews: [reviewSchema],
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
