const { BASE } = process.env || ''
const path = BASE + '/todos'
const todoService = require('../services/todo')


module.exports = (app) => {
    // get all (for testing purposes)
    app.get(path, async (req, res) => {
        const todos = await todoService.getAllTodos();
        res.json(todos)
    })

    // add one or many
    // if one is invalid or already exist - cancel all and return error
    // return JSON of added items
    app.post(path, async (req, res) => {
        const { todos } = req.body
        if (todos) {
            // validation: check if existing
            let existingTodos = await todoService.getTodosByIds(Object.keys(todos))
            if (existingTodos && Object.values(existingTodos).length) {
                // conflict
                return res.sendStatus(409)

            }

            // validation: check request fields
            for (let id in todos) {
                let todo = todos[id]
                if (!todo.createdAt || !todo.title || !todo.description) {
                    // bad request
                    return res.sendStatus(400)

                }
            }

            const assignPRM = Object.entries(todos).map(([id, val]) => todoService.assignTodos(id, val))
            await Promise.all(assignPRM)
            const assignedTodos = await todoService.getTodosByIds(Object.keys(todos))

            // created
            return res.status(201).json(assignedTodos)
        }
        // bad request
        return res.sendStatus(400)


    })

    // replace one or many
    // if one is invalid - cancel all and return error
    // return JSON of replaced items
    app.put(path, async (req, res) => {
        let { todos } = req.body

        if (todos) {
            for (let id in todos) {
                let todo = todos[id]
                if (await todoService.getTodoById(id)) {
                    if (!todo.createdAt || !todo.title || !todo.description) {
                        // bad request
                        return res.sendStatus(400)
                    }
                }
                else {
                    // not found
                    return res.sendStatus(404)

                }
            }

            const replacePRM = Object.entries(todos).map(([id, val]) => todoService.assignTodos(id, val))
            await Promise.all(replacePRM);
            const assignedTodos = await todoService.getTodosByIds(Object.keys(todos))
            return res.json(assignedTodos)
        }

        // bad request
        return res.sendStatus(400)
    })

    // delete one or many
    // if one is not found - cancel all and return error
    // return json of deleted items
    app.delete(path + '/:ids', async (req, res) => {

        let { ids } = req.params
        ids = ids.split(',').filter(id => !!id)

        let deleted = {}
        for (id of ids) {
            let todo = await todoService.getTodoById(id)
            if (!todo) {
                // not found
                return res.sendStatus(404)
            }
            deleted[id] = todo
        }
        ids = ids.map(id => todoService.unassignTodos(id))
        await Promise.all(ids);
        return res.json(deleted)
    })

    // get one or many
    // if one is not found - return error 
    // return json of found items
    app.get(path + '/:ids', async (req, res) => {
        let { ids } = req.params
        ids = ids.split(',').filter(id => !!id)

        let found = {}
        for (id of ids) {
            let todo = await todoService.getTodoById(id)
            if (!todo) {
                // not found
                return res.sendStatus(404)
            }
            found[id] = todo
        }
        return res.json(found)

    })




}

