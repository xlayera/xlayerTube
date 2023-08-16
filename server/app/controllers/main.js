const { google } = require('googleapis');
const axios = require('axios');
const configApi = require('../config/youtube-api-config')
const youtube = google.youtube({
    version: "v3",
    auth: configApi.youtubeApiKey
});
const moment = require('moment')

/* search function */
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
        console.log("arror in get videos from search by api", error)
        return res.status(500).json({ success: false, msg: 'Something went wrong' });
    }

}

/* get by id function */
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

const getVideosByIdAPI = async (req, res) => {
    try {
        const { idVideo } = req.body
        console.log(idVideo);

        // https://www.googleapis.com/youtube/v3/search
        const response = await youtube.videos.list({
            part: 'snippet',
            id: idVideo
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

const getVideosInfoByIdAPI = async (req, res) => {
    try {
        const { idVideo } = req.body
        console.log(idVideo);

        // https://www.googleapis.com/youtube/v3/videos
        const response = await youtube.videos.list({
            part: 'contentDetails',
            id: idVideo
        })
        await console.log(response);

        let videoInfo = response.data.items[0].contentDetails
        let videoDuration = moment.duration(videoInfo.duration).asMilliseconds();
        // let videoDuration = convert_time(videoInfo.duration)
        console.log(videoDuration);

        if (videoDuration) {
            return res.status(200).json({ success: true, msg: 'Data successful', idVideo: idVideo, time: videoDuration });
        } else {
            return res.status(404).json({ success: false, msg: 'Data not found' });
        }

    } catch (error) {
        console.log("Error in get videos by id", error)
        return res.status(500).json({ success: false, msg: 'Something went wrong' });
    }

}

function convert_time(duration) {
    var a = duration.match(/\d+/g);

    if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
        a = [0, a[0], 0];
    }

    if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
        a = [a[0], 0, a[1]];
    }
    if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
        a = [a[0], 0, 0];
    }

    duration = 0;

    if (a.length == 3) {
        duration = duration + parseInt(a[0]) * 3600;
        duration = duration + parseInt(a[1]) * 60;
        duration = duration + parseInt(a[2]);
    }

    if (a.length == 2) {
        duration = duration + parseInt(a[0]) * 60;
        duration = duration + parseInt(a[1]);
    }

    if (a.length == 1) {
        duration = duration + parseInt(a[0]);
    }
    return duration
}


module.exports = {
    getVideosFromSearch,
    getVideosFromSearchAPI,
    getVideoByID,
    getVideosByIdAPI,
    getVideosInfoByIdAPI
}
