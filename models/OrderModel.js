const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String, 
      required: true ,
      unique: true
    },
    userEmail: { 
      type: String, 
      required: true 
    },
    userName: {
      type: String, 
      required: true
    },
    userId: {
      type: String, 
      required: true 
    },
    products: [
      {
        productId: {
          type: String,
        },
        title: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { 
      type: Number, 
      required: true 
    },
    address: { 
      type: Object, 
      required: true 
    },
    status: { 
      type: String, 
      default: "pending" 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
