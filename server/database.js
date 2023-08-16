const mongoose = require('mongoose');
const config = require('./app/config/config.js');


const URI = `mongodb://${config.mongoUser}:${config.mongoPassword}@${config.mongoUrl}`;
mongoose.connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(result => {
    console.log('Mongodb conectado');

}).catch(error => {
    console.log('Error al conectar mongodb');
})