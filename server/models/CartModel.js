const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, // Reference to User ID
      ref: "UserModel",
      required: true 
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId, // Reference to Object ID
          ref: "ProductModel"
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CartModel", CartSchema);