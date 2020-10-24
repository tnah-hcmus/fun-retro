const mongoose = require('mongoose');
const User = require('../models/user');

const boardSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: String,
        required: true,
        trim: true
    },
    ownerId: {
        type: String,
        required: true,
        trim: true
    },
    timestamp: {
        type : String, 
    },
    permission: {
        type: String,
        required: true,
    }
});
boardSchema.statics.checkPermission = async (id, token) => {
    // Search for a user by email and password.
    const board = await Board.findById(id);
    if(board.permission === 'public') return 0;
    else {
        if(!token) return 2;
        const user = await User.findByToken(token);
        if(board.ownerId == user._id) return 1
        else return 2;
    }
}
const Board = mongoose.model('Board', boardSchema);


module.exports = Board;