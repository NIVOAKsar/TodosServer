

const mongoose = require('mongoose')
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0-g2dmp.mongodb.net/test?retryWrites=true&w=majority`;
// const uri = 'mongodb://127.0.0.1:27017'

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('connected to MongoDB')

})



