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
    // your data model here
    createdAt: {
        type: String,
        default: Date.now()
    }
});


module.exports = new mongoose.model('rally_log', RallyLogSchema);