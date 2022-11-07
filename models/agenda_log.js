const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AgendaLogSchema = new Schema({
    userId: {
        type: String,
        unqiue: true,
        required: [true, "The userId field is required"]
    },
    eventId: {
        type: String,
    },
    // your data model here
    createdAt: {
        type: String,
        default: Date.now()
    },
});


module.exports = new mongoose.model('agenda_log', AgendaLogSchema);