const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    userId: {
        type: String,
        required: [true, "The userId field is required"]
    },
    // Q3.8 add fields to store name/phone/email

    createdAt: {
        type: String,
        default: Date.now()
    }
});

module.exports = new mongoose.model('contact', ContactSchema);
