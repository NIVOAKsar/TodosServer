const cors = require('cors');

const origin = [
    "http://localhost:8080"
]

const options = {
    origin,
    credentials: true
}
/* ---- manage authorized domains ---- */
module.exports = cors(options);