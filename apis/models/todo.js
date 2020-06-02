const mongoose = require('mongoose')
const todoModel = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
})


module.exports = mongoose.model('Todo', todoModel)