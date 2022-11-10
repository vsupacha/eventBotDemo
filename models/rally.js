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
    // Q4.2 add field for checking location is valid or not

    createdAt: {
        type: String,
        default: Date.now()
    },
    updatedAt: {
        type: String,
        default: Date.now()
    }
});


module.exports = new mongoose.model('rally', RallySchema);
