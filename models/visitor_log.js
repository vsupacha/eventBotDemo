const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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


module.exports = new mongoose.model('visitor_log', VisitorLogSchema);
