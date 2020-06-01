
const { BASE } = process.env || ''
const path = BASE

const Axios = require('axios')

// const axios = Axios.create({
//     baseURL: 'https://localhost:3003/api',
// });


module.exports = (app) => {
    /* ----- TESTING API -----*/

    app.get(`${path}/proxy/:id`, async (req, res) => {

        console.log(req.params);


        // try {
        //     const { data } = await Axios.get('http://localhost:3003/api/json');
        //     res.json(data)
        // }
        // catch (err) {
        //     // bad request
        //     res.status(400)
        // }
        res.sendStatus(207)
    });

    app.get(`${path}/json`, (req, res) => {
        res.json('json reponse from server');
    });

    app.get(`${path}/send`, (req, res) => {
        res.send('<h1>html reponse from server</h1>');
    });

    app.get(`${path}/end`, (req, res) => {
        res.end('<h1>no response from server</h1>');
    });
    app.get(`${path}/418`, (req, res) => {
        res.sendStatus(418)
    });

}