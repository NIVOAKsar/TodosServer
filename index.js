
/* ---- use plugins ---- */
require('./plugins/dotenv')
require('./plugins/mongoose')

const cors = require('./plugins/cors')
const express = require('express')
const bodyParser = require('body-parser')
const {
    BASE = '',
    PORT = 3003
} = process.env


// const cookieParser = require("cookie-parser");
// const session = require("express-session");
// const fileUpload = require("express-fileupload");
// const io = require("socket.io")(http);

const app = express()

/* ---- use middlewares ---- */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Authorization')

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})
app.use(cors);
app.use(bodyParser.json())

/* ---- use apis ---- */
app.use(BASE + '/todos', require('./apis/routes/todos'))

/* ---- use 404 ---- */
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

/* ---- run server ---- */
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});


