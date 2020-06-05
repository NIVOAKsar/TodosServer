const mongoose = require('mongoose')

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    isDone: { type: Boolean, required: true },
    createdAt: { type: Date, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
})


module.exports = mongoose.model('Todo', schema, 'todos')