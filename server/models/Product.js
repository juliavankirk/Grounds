var mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
     },
    price: {
        type: Number,
        required: true
     },
    quantity: {
        type: Number
    },
    description: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String
    }
});

module.exports = mongoose.model("Product", productSchema);