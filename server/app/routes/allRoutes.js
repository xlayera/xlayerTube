const { Router } = require('express');
const { getVideosFromSearch, getVideosFromSearchAPI, getVideoByID, getVideosByIdAPI, getVideosInfoByIdAPI } = require('../controllers/main');
const app = Router();

app.post('/search', getVideosFromSearch);
app.post('/search-api', getVideosFromSearchAPI);
app.post('/byId', getVideoByID);
app.post('/byId-api', getVideosByIdAPI);
app.post('/info-byId-api', getVideosInfoByIdAPI);


module.exports = app;