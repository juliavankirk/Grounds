var mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    forename: {
        type: String,
        required: [true, "Please include your first name."]
     },
    surname: {
        type: String,
        required: true
     },
    role: {
        type: String
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User", userSchema);