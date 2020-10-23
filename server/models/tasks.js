const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    bid: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    tasks: [{
        id: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        timestamp: {
            type : Date, 
            default: Date.now
        },
        owner: {
            type: String,
            required: true,
            trim: true
        }
    }]
})
const Tasks = mongoose.model('Task', taskSchema)

module.exports = Tasks;