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


module.exports = new mongoose.model('info', InfoSchema);
