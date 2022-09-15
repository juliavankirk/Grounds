var mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
    total: {
        type: Number,
        required: true
     },
    quantity: {
        type: Number
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }
});

module.exports = mongoose.model("Cart", cartSchema);