
const { BASE } = process.env || ''
const path = BASE
const todoService = require('../services/todo');


module.exports = (app) => {
    /* ----- TESTING API -----*/
    app.get(`${path}/todo`, (req, res) => {


        const mapTodo = (todo) => {
            return `
            <h3>id: ${todo.id}</h3>
            <h3>createdAt: ${todo.createdAt}</h3>
            <h3>title: ${todo.title}</h3>
            <h3>description: ${todo.description}</h3>
        `
        }

        const mapTodos = (todos) => {
            return todos.map(todo => `<li>${mapTodo(todo)}</li>`)
        }

        const todos = todoService.getTodos();
        const todosForDisplay = `<ul>${mapTodos(todos)}</ul>`

        res.send(todosForDisplay)
    });
}