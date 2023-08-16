const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const videoServices = require("../services/video.services");
const catchAsync = require("../utils/catchAsync");

const getVideos = catchAsync(async (req, res) => {
    const {title, genres, contentRating, sortBy} = req.query;
    const filters = {
        title: title, 
        genres: genres, 
        contentRating: contentRating, 
        sortBy: sortBy
    };
    const videos = await videoServices.getVideos(filters);  
    res.send(videos); 
})

const getVideoWithId = catchAsync(async (req, res) => {
    const {videoId} = req.params;
    let video = await videoServices.getVideoWithId(videoId);  
    if (!video){
        throw new ApiError(
            httpStatus.NOT_FOUND,
            "No video found with matching id",
        );     
    }
    res.send(video); 
})

const postVideos = catchAsync(async (req, res) => {

    const videoObj = req.body;
    let video = await videoServices.uploadVideo(videoObj);  
    res.status(httpStatus.CREATED).send(video);

})

const patchVotes = catchAsync(async (req, res) => {
    const obj = req.body;
    const {videoId} = req.params;
    video = await videoServices.changeVotes(obj, videoId);  
    if (!video){
        throw new ApiError(
            httpStatus.NOT_FOUND,
            "No video found with matching id",
        ); 
    }
    res.status(httpStatus.NO_CONTENT).send();
})

const patchViews = catchAsync(async (req, res) => {
    const {videoId} = req.params;
    video = await videoServices.changeViews(videoId);  
    if (!video){
        throw new ApiError(
            httpStatus.NOT_FOUND,
            "No video found with matching id",
        ); 
    }
    res.status(httpStatus.NO_CONTENT).send();
})

module.exports = {
    getVideos,
    getVideoWithId,
    postVideos,
    patchVotes,
    patchViews
}