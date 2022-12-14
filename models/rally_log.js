const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RallyLogSchema = new Schema({
    userId: {
        type: String,
        required: [true, "The userId field is required"]
    },
    rallyId: {
        type: String,
        required: [true, "The userId field is required"]
    },
    // Q4.2 add field for location

    createdAt: {
        type: String,
        default: Date.now()
    }
});


module.exports = new mongoose.model('rally_log', RallyLogSchema);