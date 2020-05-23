
const { BASE } = process.env || ''
const path = BASE


module.exports = (app) => {
    /* ----- TESTING API -----*/
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