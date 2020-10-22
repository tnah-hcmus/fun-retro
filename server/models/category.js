const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    bid: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    categories: [{
        id: {
            type: String,
            required: true,
            trim: true
        },
        name: {
            type: String,
            trim: true
        }
    }]
})
const Category = mongoose.model('Category', categorySchema)

module.exports = Category;