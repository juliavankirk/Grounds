var mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "A user is required to make an order"]
     },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
     },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true, 
    },
    postCode: {
        type: Number,
        required: true
    },
    country: {
        type: String
    },
    phoneNumber: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Order", orderSchema);