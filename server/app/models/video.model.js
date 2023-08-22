const { Schema, model } = require('mongoose');


const VideoSchema = new Schema({
    title: String,
    idVideo: String,
    timeDuration: Number,
    description: String,
    date: Date
});


module.exports = model('Video', VideoSchema);