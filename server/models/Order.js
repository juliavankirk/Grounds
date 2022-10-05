const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, // Reference to User ID
      ref: "User",
      required: true 
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId, // Reference to Object ID
          ref: "Product"
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
      type: Object, // Object in place of String as Swipe library returns an object
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