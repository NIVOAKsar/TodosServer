async function all(req, res) {
    try {
        let todos = await Todo.find().lean()
        res.status(200).json(mapArray(todos, '_id'))
    }
    catch (error) {
        res.status(500).json(error)
    }
}

async function insertMany(req, res) {
    const todos = req.body

    const todosToSave = todos.map(todo => new Todo({
        _id: todo.id,
        createdAt: todo.createdAt,
        isDone: todo.isDone,
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
}

async function updateMany(req, res) {
    const entries = req.body
    const ids = Object.keys(entries).filter(id => !!id)

    // let todos = await Todo.find({ _id: { $in: ids } })
    // const actions = todos.map(todo => Todo.updateOne({ _id: todo.id }, entries[todo.id]))
    const actions = ids.map(id => Todo.updateOne({ _id: id }, entries[id]))

    try {
        await Promise.all(actions)
        res.status(200).json({ message: 'updated' })
    }
    catch (error) {
        res.status(500).json(error)
    }
}

async function deleteMany(req, res) {
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
}

async function findMany(req, res) {
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
}


const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')
const { mapArray } = require('../../services/util')
const { makeTodos } = require('../../services/todo')

// router.get('/', all)
router.post('/', insertMany)
router.patch('/', updateMany)
router.delete('/:ids', deleteMany)
router.get('/:ids', findMany)

Todo.find({})
    .then(async todos => {
        if (!todos.length) {
            todos = makeTodos()
            try {
                await Todo.insertMany(todos)
                console.log('[SERVER]: todos collection populated')
            }
            catch (error) {
                console.log(error)
            }

        }
    })


module.exports = router

