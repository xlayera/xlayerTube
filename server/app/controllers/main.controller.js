const { google } = require('googleapis');
const axios = require('axios');
const configApi = require('../config/youtube-api-config')
const youtube = google.youtube({
    version: "v3",
    auth: configApi.youtubeApiKey
});
const moment = require('moment')

/* search function - axios */
const getVideosFromSearch = async (req, res) => {
    try {
        const { searchQuery } = req.body
        // https://www.googleapis.com/youtube/v3/search

        const url = `${configApi.youtubeBaseApiUrl}/search?key=${configApi.youtubeApiKey}&type=video&part=snippet&q=${searchQuery}`
        const response = await axios.get(url)
        await console.log(response.data);
        if (response) {
            return res.status(200).json({ success: true, msg: 'Data successful', data: response.data });
        } else {
            return res.status(404).json({ success: false, msg: 'Data not found' });
        }
    } catch (error) {
        console.log("Error in get videos from search by id", error)
        return res.status(500).json({ success: false, msg: 'Something went wrong' });
    }

}

/* search function - api */
const getVideosFromSearchAPI = async (req, res) => {
    try {
        const { searchQuery } = req.body
        console.log(searchQuery);

        // https://www.googleapis.com/youtube/v3/search
        const response = await youtube.search.list({
            part: 'snippet',
            type: 'video',
            q: searchQuery,
            chart: 'mostPopular'
        })
        await console.log(response);
        if (response) {
            return res.status(200).json({ success: true, msg: 'Data successful', data: response.data });
        } else {
            return res.status(404).json({ success: false, msg: 'Data not found' });
        }

    } catch (error) {
        console.log("Error in get videos from search by api", error)
        return res.status(500).json({ success: false, msg: 'Something went wrong' });
    }

}

/* get by id function - axios*/
const getVideoByID = async (req, res) => {

    try {
        //https://www.googleapis.com/youtube/v3/videos?id=H4JE6XDR6UE&key=AIzaSyBD95lKWG4hwu0LeaSyQV6Mi7BtM81m4Ss&part=snippet
        const { idVideo } = req.body

        const url = `${configApi.youtubeBaseApiUrl}/videos?key=${configApi.youtubeApiKey}&id=${idVideo}&part=snippet`
        const response = await axios.get(url)
        await console.log(response.data);
        if (response.data) {
            return res.status(200).json({ success: true, msg: 'Data successful', data: response.data });
        } else {
            return res.status(404).json({ success: false, msg: 'Data not found' });
        }
    } catch (error) {
        console.log("Error in get videos from search by id", error)
        return res.status(500).json({ success: false, msg: 'Something went wrong' });
    }
}

/* get by id function - api*/
const getVideosByIdAPI = async (req, res) => {
    try {
        const { idVideo } = req.body

        // https://www.googleapis.com/youtube/v3/search
        const response = await youtube.videos.list({
            part: 'snippet',
            id: idVideo
        })
        if (response) {
            return res.status(200).json({ success: true, msg: 'Data successful', data: response.data });
        } else {
            return res.status(404).json({ success: false, msg: 'Data not found' });
        }

    } catch (error) {
        console.log("Error in get videos from search by api", error)
        return res.status(500).json({ success: false, msg: 'Something went wrong' });
    }

}

/* get info by id function - api */
const getVideosInfoByIdAPI = async (req, res) => {
    try {
        console.log("get info by id");
        const { idVideo } = req.body

        // https://www.googleapis.com/youtube/v3/videos
        const response = await youtube.videos.list({
            part: 'contentDetails',
            id: idVideo
        })

        let videoInfo = response.data.items[0].contentDetails

        if (videoInfo) {
            let videoDuration = moment.duration(videoInfo.duration).asMilliseconds();

            return res.status(200).json({ success: true, msg: 'Data successful', idVideo: idVideo, time: videoDuration ? videoDuration : 0 });
        } else {
            return res.status(404).json({ success: false, msg: 'Data not found' });
        }

    } catch (error) {
        console.log("Error in get videos by id", error)
        return res.status(500).json({ success: false, msg: 'Something went wrong' });
    }

}

module.exports = {
    getVideosFromSearch,
    getVideosFromSearchAPI,
    getVideoByID,
    getVideosByIdAPI,
    getVideosInfoByIdAPI
}
