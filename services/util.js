function wait(ms) {
    return new Promise(res => setTimeout(res, ms))
}

// function mapArray(arr, keyField) {
//     return Object.assign({},
//         ...arr.map(item => ({
//             [item[keyField]]: item
//         })))
// }

function mapArray(arr, key) {
    return arr.reduce((acc, item) => {
        const prop = item[key]

        if (prop) {

            delete item[key];

            return { ...acc, [prop]: item }
        }
        return acc
    }, {})
}

function mapObject(obj, key) {
    delete obj[obj.key]
    return { [prop]: obj }
}


module.exports = {
    wait,
    mapArray,
    mapObject
}