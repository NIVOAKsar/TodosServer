const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Todo = require('../models/todo')

const { mapArray, mapObject } = require('../../services/util')

// get all
router.get('/', async (req, res) => {
    try {
        let todos = await Todo.find().lean()
        res.status(200).json(mapArray(todos, '_id'))
    }
    catch (error) {
        res.status(500).json(error)
    }
})

// insert many
// input [{id, createdAt, title, description}]
router.post('/', async (req, res) => {

    const todos = req.body

    const todosToSave = todos.map(todo => new Todo({
        _id: todo.id,
        createdAt: todo.createdAt,
        title: todo.title,
        description: todo.description
    }))

    try {
        await Todo.insertMany(todosToSave)
        res.status(201).json({ message: 'inserted' })
    }
    catch (error) {
        return res.status(500).json(error)
    }
})

// get many
router.get('/:ids', async (req, res) => {
    let { ids } = req.params;
    ids = ids.split(',').filter(id => !!id)

    try {
        let todos = await Todo.find({ _id: { $in: ids } }).lean()
        if (!todos.length) {
            return res.status(404).json({ message: 'not found' })
        }

        res.status(200).json(mapArray(todos, '_id'))
    }
    catch (error) {
        res.status(500).json(error)
    }
})

// delete many
router.delete('/:ids', async (req, res) => {
    let { ids } = req.params;
    ids = ids.split(',').filter(id => !!id)

    try {
        const report = await Todo.deleteMany({ _id: { $in: ids } })
        if (!report.deletedCount) {
            return res.status(404).json({ message: 'not found' })
        }

        res.status(200).json({ message: 'removed' })
    }
    catch (error) {
        res.status(500).json(error)
    }
})

// update one
// input {[key1]: {value}, [key2]: {value}}
router.patch('/:id', async (req, res) => {

    const id = req.params.id
    const props = req.body
    console.log(id, props);

    try {
        await Todo.updateOne({ _id: id }, props)
        res.status(200).json({ message: 'updated' })
    }
    catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router


// router.post('/', async (req, res) => {

//     let _id = new mongoose.Types.ObjectId() // or req.body.todo.id
//     let createdAt = _id.getTimestamp() // or new Date()
//     let todo = new Todo({
//         _id,
//         createdAt,
//         title: 'blah',
//         description: 'blah'
//     })
//     try {
//         await todo.save()
//         res.status(201).end()
//         // res.status(200).json(todo)
//         // res.status(200).json(mapObject(todo, '_id'))

//     }
//     catch (error) {
//         res.status(500).json(error)
//     }
// })
