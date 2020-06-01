
/* ---- use plugins ---- */
require('./plugins/dotenv')

const cors = require('./plugins/cors')
const express = require('express')
const bodyParser = require("body-parser")

// const cookieParser = require("cookie-parser");
// const session = require("express-session");
// const fileUpload = require("express-fileupload");
// const io = require("socket.io")(http);





const app = express()

app.use(cors);
app.use(bodyParser.json())


/* ---- use apis ---- */
app.get('/', (req, res) => res.send(`<h1>HELLO FROM SERVER</h1>`))

const mockAPI = require('./apis/mock')
const todoAPI = require('./apis/todo')

mockAPI(app)
todoAPI(app)


/* ---- run server ---- */
const { PORT = 3003 } = process.env

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});


