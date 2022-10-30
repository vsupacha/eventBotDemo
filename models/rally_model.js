const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RallySchema = new Schema({
    rallyId: {
        type: String,
        unqiue: true,
        required: [true, "The userId field is required"]
    },
    rallyTitle: {
        type: String,
        required: [true, "The rallyTitle field is required"]
    },
    rallyDesc: {
        type: String,
    },
    qrCode: {
        type: String,
        required: [true, "The qrCode field is required"]
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

exports.RallyModel = mongoose.model('Rally', RallySchema);
exports.RallyLogModel = mongoose.model('RallyLog', RallyLogSchema);
