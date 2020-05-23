function getTodos() {
    return [
        { id: 1, createdAt: Date.now(), title: 'Eat Banana', description: 'Eat Banana' },
        { id: 2, createdAt: Date.now(), title: 'Eat Apple', description: 'Eat Apple' },
        { id: 3, createdAt: Date.now(), title: 'Eat Almond', description: 'Eat Almond' },
    ]
}

module.exports = {
    getTodos
};