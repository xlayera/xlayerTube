const Video = require('../models/video.model')

const addVideo = async (req, res) => {
    try {
        const { idVideo, title, timeDuration, description } = req.body;
        console.log("add video body", req.body);
        if (!idVideo) return res.status(200).send({ success: false, msg: "The video id is required" })

        const videoFound = await Video.findOne({ idVideo: idVideo })
        if (videoFound) return res.status(200).send({ success: false, msg: "This video is already registered" })


        const newVideo = new Video({ idVideo: idVideo, title: title, timeDuration: timeDuration, description: description })
        const video = await newVideo.save();
        if (!video) return res.status(200).send({ success: false, msg: "Couldn't save video" })

        return res.status(200).send({ success: true, msg: "Video saved successfully" })


    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).send({ success: false, msg: "Something went wrong" })
    }
}


const listAllVideos = async (req, res) => {
    try {
        const videoFound = await Video.find()

        if (!videoFound) return res.status(200).send({ success: false, msg: "Videos not found" })

        return res.status(200).send({ success: true, msg: "Video found successfully", data: videoFound })
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).send({ success: false, msg: "Something went wrong" })
    }
}

const deleteVideo = async (req, res) => {
    try {
        const { idVideo } = req.body;

        if (!idVideo) return res.status(200).send({ success: false, msg: "The video id is required" })

        const videoDeleted = await Video.deleteOne({ idVideo: idVideo })

        if (!videoDeleted) return res.status(200).send({ success: false, msg: "Couldn't delete video" })

        return res.status(200).send({ success: true, msg: "Video deleted successfully" })


    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).send({ success: false, msg: "Something went wrong" })
    }
}


module.exports = {
    addVideo,
    listAllVideos,
    deleteVideo
}