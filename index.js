
/* ---- use plugins ---- */
require('./plugins/dotenv')

const cors = require('./plugins/cors')
const express = require('express');
const app = express();

app.use(cors);

/* ---- use apis ---- */
app.get('/', (req, res) => res.send(`<h1>HELLO FROM SERVER</h1>`));

const mockAPI = require('./apis/mock');
const todoAPI = require('./apis/todo')

mockAPI(app)
todoAPI(app)

/* ---- run server ---- */
const { PORT = 3003 } = process.env

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});