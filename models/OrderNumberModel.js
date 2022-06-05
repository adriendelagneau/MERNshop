const mongoose = require("mongoose");

const OrderNumberSchema = new mongoose.Schema(
  {
    number: {type: Number, required: true}
  }
);

module.exports = mongoose.model("OrderNumber", OrderNumberSchema);