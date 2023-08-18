const mongoose = require('mongoose');
const URI = "mongodb+srv://xlayer:5OC6xWKcajJ7U26X@cluster0.ycsorpl.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(result => {
    console.log('Mongodb connected');

}).catch(error => {
    console.log('Error to connect mongodb', error);
})