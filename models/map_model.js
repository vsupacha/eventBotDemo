const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MapLogSchema = new Schema({
    userId: {
        type: String,
        required: [true, "The userId field is required"]
    },
    fromLoc: {
        type: String,
        required: [true, "The fromLoc field is required"]
    },
    toLoc: {
        type: String,
        required: [true, "The toLoc field is required"]
    },
    // your data model here
    createdAt: {
        type: String,
        default: Date.now()
    }
});

exports.MapLogModel = mongoose.model('MapLog', MapLogSchema);