const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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


module.exports = new mongoose.model('Location', LocationSchema);