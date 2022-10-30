const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VisitorSchema = new Schema({
    userId: {
        type: String,
        unqiue: true,
        required: [true, "The userId field is required"]
    },
    userStatus: {
        type: Number,
        default: 1,
        /* 0: Block, 1: Follow */
    }, 
    createdAt: {
        type: String,
        default: Date.now()
    },
    updatedAt: {
        type: String,
        default: Date.now()
    }
});

const LocationSchema = new Schema({
    locationId: {
        type: String,
        unqiue: true,
        required: [true, "The locationId field is required"]
    },
    locationName: {
        type: String,
        required: [true, "The locationName field is required"]
    },
    locationLat: {
        type: Number
    },
    locationLon: {
        type: Number
    },
    locationBeacon: {
        type: String
    },
    createdAt: {
        type: String,
        default: Date.now()
    }
});

const VisitorLogSchema = new Schema({
    userId: {
        type: String,
        required: [true, "The userId field is required"]
    },
    locationId: {
        type: String,
        required: [true, "The locationId field is required"]
    },
    createdAt: {
        type: String,
        default: Date.now()
    }
});

exports.VisitorModel = mongoose.model('Visitor', VisitorSchema);
exports.LocationModel = mongoose.model('Location', LocationSchema);
exports.VisitorLogModel = mongoose.model('VisitorLog', VisitorLogSchema);