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


module.exports = new mongoose.model('visitor', VisitorSchema);
