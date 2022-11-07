const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InfoLogModel = new Schema({
    userId: {
        type: String,
        required: [true, "The userId field is required"]
    },
    infoId: {
        type: String,
        required: [true, "The infoId field is required"]
    },
    // your data model here
    createdAt: {
        type: String,
        default: Date.now()
    },
    name: {
        type: String,
        required: [true, "The userId field is required"]
    },
    tel: {
        type: String,
        required: [true, "The userId field is required"]
    },
    email: {
        type: String,
        required: [true, "The userId field is required"]
    },
    search: {
        type: String,
        required: [true, "The userId field is required"]
    }
});


module.exports = new mongoose.model('info_log', InfoLogModel);