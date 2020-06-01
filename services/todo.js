// private
function wait(ms) {
    return new Promise(res => setTimeout(res, ms))
}


//public
async function getTodoById(id) {
    await wait(0)
    return _todos[id]
}
async function getTodosByIds(ids) {
    await wait(0)
    return ids.reduce((acc, id) => {
        if (_todos[id]) {
            return acc ? { ...acc, [id]: _todos[id] } : { [id]: _todos[id] }
        }
        return acc
    }, null)
}
async function assignTodos(id, todo) {
    await wait(0)
    _todos[id] = todo
}
async function unassignTodos(id) {
    await wait(0)
    delete _todos[id]
}

// for testing purposes
function getAllTodos() {
    return { ..._todos }
}


const _todos = {
    1: { createdAt: Date.now(), title: 'Eat Banana', description: 'Eat Banana' },
    2: { createdAt: Date.now(), title: 'Eat Apple', description: 'Eat Apple' },
    3: { createdAt: Date.now(), title: 'Eat Almond', description: 'Eat Almond' }

}


module.exports = {
    assignTodos,
    unassignTodos,
    getTodoById,
    getTodosByIds,
    getAllTodos // for testing purposes
};