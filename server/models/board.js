const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    owner: {
        type: String,
        required: true,
        trim: true
    },
    permission: {
        type: String,
        required: true,
    }
})
const Board = mongoose.model('Board', boardSchema)

module.exports = Board;