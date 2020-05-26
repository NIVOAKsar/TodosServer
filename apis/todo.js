const { BASE } = process.env || ''
const path = BASE + '/todos'
const todoService = require('../services/todo')

const todos = todoService.getTodos()

const mapTodo = (todo) => {
    return `
    <h3>id: ${todo.id}</h3>
    <h3>createdAt: ${todo.createdAt}</h3>
    <h3>title: ${todo.title}</h3>
    <h3>description: ${todo.description}</h3>
    `
}

const mapTodos = (todos) => `<ul>${todos.map(todo => `<li>${mapTodo(todo)}</li>`)}</ul>`


module.exports = (app) => {
    // get all
    app.get(path, (req, res) => {
        const todosForDisplay = mapTodos(todos)
        res.send(todosForDisplay)
    })

    // get one
    app.get(path + '/:id', async (req, res) => {

        const { id } = req.params

        if (id) {
            const target = await todoService.getTodo(id)
            if (target) {
                const todoForDisplay = mapTodo(target)
                res.send(todoForDisplay)
                return
            }
            // not found
            res.sendStatus(404)
            return
        }
        // bad request
        res.sendStatus(400)
    })

    // add one
    app.post(path, async (req, res) => {

        const { todo } = req.body

        if (todo) {
            if (todo.id && todo.createdAt && todo.title && todo.description) {
                const idx = await todoService.findIdx(todo.id)
                if (idx === -1) {
                    await todoService.addTodo(todo)
                    const todoForDisplay = mapTodo(todo);

                    // created
                    res.status(201).send(todoForDisplay)
                    return
                }

                // conflict
                res.sendStatus(409)
                return
            }
        }
        // bad request
        res.sendStatus(400)

    })

    // replace one
    app.put(path + '/:id', async (req, res) => {

        const { id } = req.params
        const { todo } = req.body

        if (id && todo && todo.id && todo.createdAt && todo.title && todo.description) {
            const idx = await todoService.findIdx(id)

            if (idx && idx !== -1) {
                const todoForDisplay = mapTodo(todo)
                await todoService.replaceTodo(idx, todo)
                res.send(todoForDisplay)
                return
            }
            // not found
            res.sendStatus(404)
            return
        }
        // bad request
        res.sendStatus(400)
    })

    // remove one
    app.delete(path + '/:id', async (req, res) => {

        const { id } = req.params

        if (id) {
            const idx = await todoService.findIdx(id)

            if (idx && idx !== -1) {
                const todosForDisplay = mapTodo(todos[idx])
                await todoService.removeTodo(idx)
                res.send(todosForDisplay)
                return
            }
            // not found
            res.sendStatus(404)
            return
        }
        // bad request
        res.sendStatus(400)
    })




}