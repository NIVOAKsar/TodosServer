
const todos = [
    { id: 1, createdAt: Date.now(), title: 'Eat Banana', description: 'Eat Banana' },
    { id: 2, createdAt: Date.now(), title: 'Eat Apple', description: 'Eat Apple' },
    { id: 3, createdAt: Date.now(), title: 'Eat Almond', description: 'Eat Almond' },
]

function wait(ms) {
    return new Promise(res => setTimeout(res, ms))
}

function getTodos() {
    return todos;
}

async function findIdx(id) {
    await wait(0)
    return todos.findIndex(todo => todo.id == id)
}

async function getTodo(id) {
    await wait(0)
    return todos.find(todo => todo.id === id)
}

async function addTodo(todo) {
    await wait(0)
    todos.push(todo)
}

async function removeTodo(idx) {
    await wait(0)
    todos.splice(idx, 1)
}

async function replaceTodo(idx, todo) {
    await wait(0)
    todos[idx] = todo
}

module.exports = {
    findIdx,
    getTodos,
    getTodo,
    addTodo,
    removeTodo,
    replaceTodo
};