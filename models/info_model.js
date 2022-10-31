const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InfoSchema = new Schema({
    infoId: {
        type: String,
        unique: true,
        required: [true, "The userId field is required"]
    },
    infoTitle: {
        type: String,
        required: [true, "The infoTitle field is required"]        
    },
    infoDesc: {
        type: String
    },
    locationId: {
        type: String,
    },
    // your data model here
    createdAt: {
        type: String,
        default: Date.now()
    },
    updatedAt: {
        type: String,
        default: Date.now()
    }
});

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

exports.InfoModel = mongoose.model('Info', InfoSchema);
exports.InfoLogModel = mongoose.model('InfoLog', InfoLogModel);