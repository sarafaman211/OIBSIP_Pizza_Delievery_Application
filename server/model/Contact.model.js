const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('contact', contactSchema)