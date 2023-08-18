const { Router } = require('express');
const { getVideosFromSearch, getVideosFromSearchAPI, getVideoByID, getVideosByIdAPI, getVideosInfoByIdAPI } = require('../controllers/main.controller');
const { addVideo, listAllVideos, deleteVideo } = require('../controllers/crud.controller');
const app = Router();

/* main routes */
app.post('/search', getVideosFromSearch);
app.post('/search-api', getVideosFromSearchAPI);
app.post('/byId', getVideoByID);
app.post('/byId-api', getVideosByIdAPI);
app.post('/info-byId-api', getVideosInfoByIdAPI);

/* crud routes */
app.post('/add-video', addVideo);
app.get('/all-video', listAllVideos);
app.post('/delete-video', deleteVideo);

module.exports = app;