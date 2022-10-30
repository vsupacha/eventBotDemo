const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AgendaSchema = new Schema({
    eventId: {
        type: String,
        unqiue: true,
        required: [true, "The eventId field is required"]
    },
    eventTitle: {
        type: String,
        required: [true, "The eventTitle field is required"]
    },
    eventDesc: {
        type: String,
        required: [true, "The eventDesc field is required"]
    },
    locationId: {
        type: String,
        required: [true, "The locationId field is required"]
    },
    eventStart: {
        type: String,
    },
    eventEnd: {
        type: String,
    },
    // your data model here
    createdAt: {
        type: String,
        default: Date.now()
    },
});

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

exports.AgendaModel = mongoose.model('Agenda', AgendaSchema);
exports.AgendaLogModel = mongoose.model('AgendaLog', AgendaLogSchema);